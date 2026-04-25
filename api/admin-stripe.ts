import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
});

function checkAuth(req: VercelRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  const header = req.headers['x-admin-password'];
  return typeof header === 'string' && header === adminPassword;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!checkAuth(req)) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const isLiveMode = !process.env.STRIPE_SECRET_KEY?.startsWith('sk_test_');

    const [balance, payments] = await Promise.all([
      stripe.balance.retrieve(),
      stripe.paymentIntents.list({ limit: 20 }),
    ]);

    res.status(200).json({
      mode: isLiveMode ? 'live' : 'test',
      balance: {
        available: balance.available.map(b => ({ amount: b.amount, currency: b.currency })),
        pending: balance.pending.map(b => ({ amount: b.amount, currency: b.currency })),
      },
      payments: payments.data.map(p => ({
        id: p.id,
        amount: p.amount,
        currency: p.currency,
        status: p.status,
        description: p.description,
        receiptEmail: p.receipt_email,
        created: p.created,
      })),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[admin-stripe] error:', message);
    res.status(500).json({ error: message });
  }
}
