import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PRODUCTS } from './_products.js';
import {
  PAYPAL_BASE,
  getPayPalAccessToken,
  PP_CURRENCY,
  SHIPPING_THRESHOLD,
  SHIPPING_COST,
  unitPrice,
  money,
  type Lang,
} from './_paypal.js';

interface Body {
  items: { productId: string; quantity: number }[];
  lang: Lang;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  try {
    const { items, lang }: Body = req.body;
    if (!items?.length) {
      res.status(400).json({ error: 'Cart is empty' });
      return;
    }
    if (!['pl', 'en', 'es'].includes(lang)) {
      res.status(400).json({ error: 'Invalid lang' });
      return;
    }

    const currency = PP_CURRENCY[lang];
    let subtotal = 0;
    const ppItems = [];

    for (const { productId, quantity } of items) {
      const product = PRODUCTS.find((p) => p.id === productId);
      if (!product) throw new Error(`Product not found: ${productId}`);
      const qty = Math.max(1, Math.floor(quantity));
      const unit = unitPrice(product, lang);
      subtotal += unit * qty;
      ppItems.push({
        name: (lang === 'pl' ? product.name_pl : product.name_en).slice(0, 127),
        description: `${product.dosage} · ${product.format}`.slice(0, 127),
        quantity: String(qty),
        unit_amount: { currency_code: currency, value: money(unit) },
      });
    }

    const shipping = subtotal >= SHIPPING_THRESHOLD[lang] ? 0 : SHIPPING_COST[lang];
    const total = subtotal + shipping;

    const token = await getPayPalAccessToken();
    const ppRes = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: money(total),
              breakdown: {
                item_total: { currency_code: currency, value: money(subtotal) },
                shipping: { currency_code: currency, value: money(shipping) },
              },
            },
            items: ppItems,
          },
        ],
        application_context: {
          // GET_FROM_FILE: PayPal zbiera adres wysylki (tez przy karcie-goscie),
          // capture odczytuje go i wstawia do maila/zamowienia.
          shipping_preference: 'GET_FROM_FILE',
          user_action: 'PAY_NOW',
          brand_name: 'PEPTIVEX LABS',
        },
      }),
    });

    const order = await ppRes.json();
    if (!ppRes.ok) {
      console.error('[paypal-create] failed:', order);
      res.status(500).json({ error: 'PayPal create order failed', detail: order });
      return;
    }
    res.status(200).json({ orderID: order.id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[paypal-create] error:', message);
    res.status(500).json({ error: message });
  }
}
