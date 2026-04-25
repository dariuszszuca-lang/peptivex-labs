import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { buildCustomerEmail, buildAdminEmail } from './_emails.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
});

const resend = new Resend(process.env.RESEND_API_KEY!);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
const FROM_EMAIL = 'PEPTIVEX LABS <orders@peptivexlabs.com>';
const REPLY_TO = 'info@peptivexlabs.com';
const ADMIN_EMAIL = 'info@peptivexlabs.com';

export const config = {
  api: { bodyParser: false },
};

async function readRawBody(req: VercelRequest): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const sig = req.headers['stripe-signature'];
  if (!sig) {
    res.status(400).send('Missing signature');
    return;
  }

  let event: Stripe.Event;
  try {
    const rawBody = await readRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, sig as string, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Signature verification failed';
    console.error('[webhook] verify failed:', message);
    res.status(400).send(`Webhook Error: ${message}`);
    return;
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const shippingDetails = (session as unknown as { shipping_details?: { address: { line1?: string | null; line2?: string | null; postal_code?: string | null; city?: string | null; country?: string | null }; name: string } }).shipping_details;

      // Retrieve full session with line items expanded
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ['line_items'],
      });

      const items = (fullSession.line_items?.data || []).map(li => ({
        name: li.description || 'Product',
        quantity: li.quantity || 1,
        amount: li.amount_total || 0,
      }));

      const lang = (session.metadata?.lang as 'pl' | 'en' | 'es') || 'en';
      const customerEmail = session.customer_details?.email;
      const customerName = session.customer_details?.name || '';
      const customerPhone = session.customer_details?.phone || null;

      const orderData = {
        orderId: session.id,
        amountTotal: session.amount_total || 0,
        currency: session.currency || 'gbp',
        customerName,
        customerEmail: customerEmail || '',
        customerPhone,
        items,
        shippingAddress: shippingDetails?.address || null,
        lang,
      };

      console.log('[webhook] checkout.session.completed', {
        id: session.id,
        amount: session.amount_total,
        currency: session.currency,
        email: customerEmail,
        lang,
      });

      // Send customer confirmation
      if (customerEmail) {
        const customerMail = buildCustomerEmail(orderData);
        const { error: customerErr } = await resend.emails.send({
          from: FROM_EMAIL,
          to: customerEmail,
          replyTo: REPLY_TO,
          subject: customerMail.subject,
          html: customerMail.html,
          text: customerMail.text,
        });
        if (customerErr) console.error('[webhook] customer email error:', customerErr);
      }

      // Send admin notification
      const adminMail = buildAdminEmail(orderData);
      const { error: adminErr } = await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        replyTo: customerEmail || REPLY_TO,
        subject: adminMail.subject,
        html: adminMail.html,
        text: adminMail.text,
      });
      if (adminErr) console.error('[webhook] admin email error:', adminErr);
    }

    res.status(200).json({ received: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[webhook] handler error:', message);
    res.status(500).json({ error: message });
  }
}
