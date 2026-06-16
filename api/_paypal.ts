// PayPal REST helper — środowisko (sandbox/live) + token OAuth.
export const PAYPAL_BASE =
  (process.env.PAYPAL_ENV || 'sandbox') === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';

export async function getPayPalAccessToken(): Promise<string> {
  const id = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_SECRET;
  if (!id || !secret) throw new Error('Brak PAYPAL_CLIENT_ID / PAYPAL_SECRET');
  const auth = Buffer.from(`${id}:${secret}`).toString('base64');
  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  if (!res.ok) {
    throw new Error(`PayPal auth failed: ${res.status} ${await res.text()}`);
  }
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

export type Lang = 'pl' | 'en' | 'es';

export const PP_CURRENCY: Record<Lang, 'PLN' | 'GBP' | 'EUR'> = {
  pl: 'PLN',
  en: 'GBP',
  es: 'EUR',
};

// Progi i koszt wysyłki — spójne z dawnym checkout Stripe (kwoty w groszach/pence/cents)
export const SHIPPING_THRESHOLD: Record<Lang, number> = { pl: 50000, en: 10000, es: 12000 };
export const SHIPPING_COST: Record<Lang, number> = { pl: 1299, en: 766, es: 800 };

// Cena produktu w najmniejszej jednostce (grosze/pence/cents) dla danego języka.
// EUR fallback do GBP, gdy produkt nie ma price_eur (jak w dawnym checkout).
export function unitPrice(p: { price_pln: number; price_gbp: number; price_eur?: number }, lang: Lang): number {
  if (lang === 'pl') return p.price_pln;
  if (lang === 'es') return p.price_eur ?? p.price_gbp;
  return p.price_gbp;
}

// najmniejsza jednostka -> string dziesiętny "12.99"
export const money = (minor: number) => (minor / 100).toFixed(2);
