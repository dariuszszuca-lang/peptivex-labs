import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { buildCustomerEmail, buildAdminEmail } from './_emails.js';
import { db } from './_firebase.js';
import { FieldValue } from 'firebase-admin/firestore';
import { PAYPAL_BASE, getPayPalAccessToken, type Lang } from './_paypal.js';

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM_EMAIL = 'PEPTIVEX LABS <orders@peptivexlabs.com>';
const REPLY_TO = 'info@peptivexlabs.com';
const ADMIN_EMAIL = 'info@peptivexlabs.com';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  try {
    const { orderID, lang: langRaw, shipping: form } = req.body as {
      orderID?: string;
      lang?: Lang;
      shipping?: {
        name?: string; email?: string; phone?: string;
        line1?: string; line2?: string; postal_code?: string; city?: string; country?: string;
      };
    };
    if (!orderID) {
      res.status(400).json({ error: 'Missing orderID' });
      return;
    }
    const lang: Lang = (['pl', 'en', 'es'] as const).includes(langRaw as Lang) ? (langRaw as Lang) : 'en';

    const token = await getPayPalAccessToken();
    const capRes = await fetch(`${PAYPAL_BASE}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    });
    const cap = await capRes.json();

    if (!capRes.ok || cap.status !== 'COMPLETED') {
      console.error('[paypal-capture] failed:', cap);
      res.status(400).json({ error: 'Capture not completed', detail: cap });
      return;
    }

    const pu = cap.purchase_units?.[0];
    const capture = pu?.payments?.captures?.[0];
    const payer = cap.payer;
    const shipping = pu?.shipping;

    const currency = String(capture?.amount?.currency_code || 'GBP').toLowerCase();
    const amountTotal = Math.round(parseFloat(capture?.amount?.value || '0') * 100);

    const items = (pu?.items || []).map((it: { name: string; quantity: string; unit_amount: { value: string } }) => ({
      name: it.name,
      quantity: Number(it.quantity),
      amount: Math.round(parseFloat(it.unit_amount.value) * 100) * Number(it.quantity),
    }));

    // Dane klienta i adres bierzemy z formularza na stronie (PayPal ma NO_SHIPPING).
    // Fallback do danych z PayPala, gdyby formularz byl pusty.
    const customerName = form?.name?.trim() || `${payer?.name?.given_name || ''} ${payer?.name?.surname || ''}`.trim();
    const customerEmail = form?.email?.trim() || payer?.email_address || '';
    const a = shipping?.address;
    const shippingAddress =
      form && (form.line1 || form.city)
        ? {
            line1: form.line1 || null,
            line2: form.line2 || null,
            postal_code: form.postal_code || null,
            city: form.city || null,
            country: form.country || null,
          }
        : a
        ? {
            line1: a.address_line_1 || null,
            line2: a.address_line_2 || null,
            postal_code: a.postal_code || null,
            city: a.admin_area_2 || null,
            country: a.country_code || null,
          }
        : null;

    const orderData = {
      orderId: orderID,
      amountTotal,
      currency,
      customerName,
      customerEmail,
      customerPhone: form?.phone?.trim() || null,
      items,
      shippingAddress,
      lang,
    };

    // Zapis zamówienia (ta sama kolekcja + kształt co dawniej Stripe -> panel "Zamówienia" działa bez zmian)
    try {
      await db.collection('peptivex_orders').doc(orderID).set(
        {
          paypalOrderId: orderID,
          provider: 'paypal',
          status: 'paid',
          amountTotal,
          currency,
          lang,
          items,
          customer: { name: customerName, email: customerEmail, phone: form?.phone?.trim() || null },
          shippingAddress,
          shippingName: shipping?.name?.full_name || customerName || null,
          trackingNumber: null,
          carrier: null,
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true },
      );
    } catch (dbErr) {
      console.error('[paypal-capture] firestore write error:', dbErr);
    }

    if (customerEmail) {
      const m = buildCustomerEmail(orderData);
      const { error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: customerEmail,
        replyTo: REPLY_TO,
        subject: m.subject,
        html: m.html,
        text: m.text,
      });
      if (error) console.error('[paypal-capture] customer email error:', error);
    }

    const adminMail = buildAdminEmail(orderData);
    const { error: adminErr } = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      replyTo: customerEmail || REPLY_TO,
      subject: adminMail.subject,
      html: adminMail.html,
      text: adminMail.text,
    });
    if (adminErr) console.error('[paypal-capture] admin email error:', adminErr);

    res.status(200).json({ status: 'COMPLETED', orderId: orderID });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[paypal-capture] error:', message);
    res.status(500).json({ error: message });
  }
}
