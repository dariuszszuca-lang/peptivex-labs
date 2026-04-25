import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { PRODUCTS } from './_products.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
});

type Lang = 'pl' | 'en' | 'es';

interface CheckoutBody {
  items: { productId: string; quantity: number }[];
  lang: Lang;
}

const CURRENCY: Record<Lang, 'pln' | 'gbp' | 'eur'> = {
  pl: 'pln',
  en: 'gbp',
  es: 'eur',
};

type PaymentMethod = 'card' | 'blik' | 'p24' | 'klarna';
type AllowedCountry = 'PL' | 'GB' | 'ES';

const PAYMENT_METHODS: Record<Lang, PaymentMethod[]> = {
  pl: ['card', 'blik', 'p24'],
  en: ['card'],
  es: ['card'],
};

const SHIPPING_COUNTRIES: Record<Lang, AllowedCountry[]> = {
  pl: ['PL'],
  en: ['GB'],
  es: ['ES'],
};

const SHIPPING_THRESHOLD: Record<Lang, number> = {
  pl: 50000,  // 500 PLN
  en: 10000,  // 100 GBP
  es: 12000,  // 120 EUR (placeholder)
};

const SHIPPING_COST: Record<Lang, number> = {
  pl: 1299,   // 12.99 PLN (InPost paczkomaty default; later dynamic)
  en: 766,    // 7.66 GBP
  es: 800,    // 8.00 EUR (placeholder)
};

const LOCALE: Record<Lang, 'pl' | 'en' | 'es'> = {
  pl: 'pl',
  en: 'en',
  es: 'es',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { items, lang }: CheckoutBody = req.body;

    if (!items?.length) {
      res.status(400).json({ error: 'Cart is empty' });
      return;
    }
    if (!['pl', 'en', 'es'].includes(lang)) {
      res.status(400).json({ error: 'Invalid lang' });
      return;
    }

    const currency = CURRENCY[lang];
    const priceKey = lang === 'pl' ? 'price_pln' : 'price_gbp'; // EUR fallback to GBP for now

    type LineItem = NonNullable<Stripe.Checkout.SessionCreateParams['line_items']>[number];
    let subtotal = 0;
    const line_items: LineItem[] = [];

    for (const { productId, quantity } of items) {
      const product = PRODUCTS.find(p => p.id === productId);
      if (!product) throw new Error(`Product not found: ${productId}`);
      const unit_amount = product[priceKey];
      subtotal += unit_amount * quantity;

      line_items.push({
        price_data: {
          currency,
          unit_amount,
          product_data: {
            name: lang === 'pl' ? product.name_pl : product.name_en,
            description: `${product.dosage} · ${product.format}`,
            images: product.image ? [`https://peptivexlabs.com${product.image}`] : undefined,
            metadata: { productId: product.id },
          },
        },
        quantity,
      });
    }

    // Shipping as line_item (free above threshold)
    const shippingCost = subtotal >= SHIPPING_THRESHOLD[lang] ? 0 : SHIPPING_COST[lang];
    if (shippingCost > 0) {
      line_items.push({
        price_data: {
          currency,
          unit_amount: shippingCost,
          product_data: {
            name: lang === 'pl' ? 'Wysyłka InPost' : 'Shipping',
          },
        },
        quantity: 1,
      });
    }

    const origin = req.headers.origin || `https://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: PAYMENT_METHODS[lang],
      line_items,
      locale: LOCALE[lang],
      shipping_address_collection: {
        allowed_countries: SHIPPING_COUNTRIES[lang],
      },
      phone_number_collection: { enabled: true },
      success_url: `${origin}/${lang}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${lang}/cart`,
      metadata: {
        lang,
        itemCount: String(items.reduce((s, i) => s + i.quantity, 0)),
      },
    });

    res.status(200).json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[checkout] error:', message);
    res.status(500).json({ error: message });
  }
}
