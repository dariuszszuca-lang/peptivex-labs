import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from './_firebase.js';

function checkAuth(req: VercelRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  const header = req.headers['x-admin-password'];
  return typeof header === 'string' && header === adminPassword;
}

interface OrderItem {
  name: string;
  quantity: number;
  amount: number;
}

interface OrderDoc {
  status: 'paid' | 'shipped' | 'delivered' | 'cancelled' | 'new';
  amountTotal: number;
  currency: string;
  lang: 'pl' | 'en' | 'es';
  items: OrderItem[];
  customer: { email: string };
  createdAt: { toDate?: () => Date } | null;
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
    const snap = await db.collection('peptivex_orders').orderBy('createdAt', 'desc').limit(500).get();
    const orders = snap.docs.map(d => d.data() as OrderDoc);

    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    let todayCount = 0;
    let monthCount = 0;
    let yearCount = 0;
    const revenueMonth: Record<string, number> = {};
    const revenueYear: Record<string, number> = {};
    const revenueAllTime: Record<string, number> = {};
    const uniqueEmails = new Set<string>();
    const productCounts = new Map<string, { quantity: number; revenue: Record<string, number> }>();
    const langCounts: Record<string, number> = {};
    const statusCounts: Record<string, number> = {};
    const last30Days: Record<string, number> = {};

    // Init last 30 days as 0
    for (let i = 0; i < 30; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      last30Days[key] = 0;
    }

    for (const o of orders) {
      const isCancelled = o.status === 'cancelled';
      const created = o.createdAt?.toDate?.();

      // Status
      statusCounts[o.status] = (statusCounts[o.status] || 0) + 1;

      // Lang
      langCounts[o.lang] = (langCounts[o.lang] || 0) + 1;

      // Customer
      if (o.customer?.email) uniqueEmails.add(o.customer.email.toLowerCase());

      if (isCancelled) continue;

      // All-time revenue
      revenueAllTime[o.currency] = (revenueAllTime[o.currency] || 0) + o.amountTotal;

      // Time-based
      if (created) {
        if (created >= startOfDay) todayCount += 1;
        if (created >= startOfMonth) {
          monthCount += 1;
          revenueMonth[o.currency] = (revenueMonth[o.currency] || 0) + o.amountTotal;
        }
        if (created >= startOfYear) {
          yearCount += 1;
          revenueYear[o.currency] = (revenueYear[o.currency] || 0) + o.amountTotal;
        }

        const dayKey = created.toISOString().slice(0, 10);
        if (dayKey in last30Days) last30Days[dayKey] += 1;
      }

      // Top products
      for (const it of o.items) {
        // Skip shipping line item
        if (it.name?.toLowerCase().includes('wysyłka') || it.name?.toLowerCase() === 'shipping') continue;
        const existing = productCounts.get(it.name);
        if (existing) {
          existing.quantity += it.quantity;
          existing.revenue[o.currency] = (existing.revenue[o.currency] || 0) + it.amount;
        } else {
          productCounts.set(it.name, {
            quantity: it.quantity,
            revenue: { [o.currency]: it.amount },
          });
        }
      }
    }

    const topProducts = Array.from(productCounts.entries())
      .map(([name, data]) => ({ name, quantity: data.quantity, revenue: data.revenue }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 10);

    res.status(200).json({
      ordersTotal: orders.length,
      ordersToday: todayCount,
      ordersMonth: monthCount,
      ordersYear: yearCount,
      revenueMonth,
      revenueYear,
      revenueAllTime,
      uniqueCustomers: uniqueEmails.size,
      topProducts,
      langCounts,
      statusCounts,
      ordersByDay: last30Days,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[admin-stats] error:', message);
    res.status(500).json({ error: message });
  }
}
