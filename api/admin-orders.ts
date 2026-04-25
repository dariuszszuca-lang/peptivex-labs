import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from './_firebase.js';
import { FieldValue } from 'firebase-admin/firestore';

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

  try {
    if (req.method === 'GET') {
      const snap = await db.collection('peptivex_orders').orderBy('createdAt', 'desc').limit(200).get();
      const orders = snap.docs.map(d => {
        const data = d.data();
        return {
          ...data,
          createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
          updatedAt: data.updatedAt?.toDate?.()?.toISOString() || null,
        };
      });
      res.status(200).json({ orders });
      return;
    }

    if (req.method === 'PATCH') {
      const { orderId, status, trackingNumber, carrier } = req.body as {
        orderId?: string;
        status?: 'paid' | 'shipped' | 'delivered' | 'cancelled';
        trackingNumber?: string | null;
        carrier?: string | null;
      };

      if (!orderId) {
        res.status(400).json({ error: 'orderId required' });
        return;
      }

      const update: Record<string, unknown> = { updatedAt: FieldValue.serverTimestamp() };
      if (status) update.status = status;
      if (trackingNumber !== undefined) update.trackingNumber = trackingNumber || null;
      if (carrier !== undefined) update.carrier = carrier || null;

      await db.collection('peptivex_orders').doc(orderId).update(update);
      res.status(200).json({ ok: true });
      return;
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[admin-orders] error:', message);
    res.status(500).json({ error: message });
  }
}
