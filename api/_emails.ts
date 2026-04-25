interface OrderItem {
  name: string;
  quantity: number;
  amount: number;
}

interface OrderEmailData {
  orderId: string;
  amountTotal: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
  items: OrderItem[];
  shippingAddress?: {
    line1?: string | null;
    line2?: string | null;
    postal_code?: string | null;
    city?: string | null;
    country?: string | null;
  } | null;
  lang: 'pl' | 'en' | 'es';
}

const formatPrice = (amount: number, currency: string): string => {
  const major = (amount / 100).toFixed(2);
  const symbol = currency === 'pln' ? 'zł' : currency === 'gbp' ? '£' : currency === 'eur' ? '€' : currency.toUpperCase();
  return currency === 'pln' ? `${major} ${symbol}` : `${symbol}${major}`;
};

const formatAddress = (a: OrderEmailData['shippingAddress']): string => {
  if (!a) return '';
  const parts = [a.line1, a.line2, a.postal_code, a.city, a.country].filter(Boolean);
  return parts.join(', ');
};

const COPY = {
  pl: {
    customerSubject: (id: string) => `Potwierdzenie zamówienia #${id} — PEPTIVEX LABS`,
    customerHeading: 'Dziękujemy za zamówienie',
    customerIntro: 'Twoja płatność została zarejestrowana. Wysyłka realizowana w ciągu 24h w dni robocze.',
    orderId: 'Numer zamówienia',
    amount: 'Wartość',
    address: 'Adres dostawy',
    nextSteps: 'Co dalej?',
    nextStepsBody: 'Otrzymasz osobnego maila z numerem przesyłki i linkiem do śledzenia, gdy paczka zostanie nadana.',
    questions: 'Masz pytanie? Napisz na info@peptivexlabs.com',
    disclaimer: 'ODCZYNNIK LABORATORYJNY. WYŁĄCZNIE DO CELÓW BADAWCZYCH. NIE DO UŻYTKU NA LUDZIACH ANI ZWIERZĘTACH.',
    adminSubject: (id: string, amount: string) => `Nowe zamówienie #${id} — ${amount}`,
    adminHeading: 'Nowe zamówienie',
  },
  en: {
    customerSubject: (id: string) => `Order confirmation #${id} — PEPTIVEX LABS`,
    customerHeading: 'Thank you for your order',
    customerIntro: 'Your payment has been registered. Shipping within 24h on business days.',
    orderId: 'Order number',
    amount: 'Amount',
    address: 'Shipping address',
    nextSteps: 'What\'s next?',
    nextStepsBody: 'You will receive a separate email with tracking number once your package is dispatched.',
    questions: 'Questions? Email us at info@peptivexlabs.com',
    disclaimer: 'LABORATORY REAGENT. FOR RESEARCH USE ONLY. NOT FOR HUMAN OR ANIMAL USE.',
    adminSubject: (id: string, amount: string) => `New order #${id} — ${amount}`,
    adminHeading: 'New order received',
  },
  es: {
    customerSubject: (id: string) => `Confirmación de pedido #${id} — PEPTIVEX LABS`,
    customerHeading: 'Gracias por tu pedido',
    customerIntro: 'Tu pago ha sido registrado. Envío en 24h en días hábiles.',
    orderId: 'Número de pedido',
    amount: 'Importe',
    address: 'Dirección de envío',
    nextSteps: '¿Qué sigue?',
    nextStepsBody: 'Recibirás un correo separado con el número de seguimiento cuando se envíe tu paquete.',
    questions: '¿Preguntas? Escribe a info@peptivexlabs.com',
    disclaimer: 'REACTIVO DE LABORATORIO. SOLO PARA INVESTIGACIÓN. NO PARA USO HUMANO O ANIMAL.',
    adminSubject: (id: string, amount: string) => `Nuevo pedido #${id} — ${amount}`,
    adminHeading: 'Nuevo pedido',
  },
};

const baseStyle = `
<style>
  body { margin:0; padding:0; background:#0c0a08; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color:#fff; }
  .wrapper { max-width:560px; margin:0 auto; padding:32px 16px; }
  .card { background:#141210; border:1px solid rgba(255,255,255,0.06); border-radius:16px; padding:32px; }
  .logo { font-size:24px; font-weight:800; letter-spacing:0.05em; margin-bottom:24px; }
  .logo-p { color:#2dd4bf; }
  .logo-x { color:#f59e0b; }
  h1 { font-size:24px; font-weight:800; color:#fff; margin:0 0 12px 0; }
  p { color:rgba(255,255,255,0.6); font-size:15px; line-height:1.7; margin:0 0 16px 0; }
  .row { display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid rgba(255,255,255,0.06); }
  .label { color:rgba(255,255,255,0.4); font-size:13px; }
  .value { color:#fff; font-size:14px; font-weight:600; }
  .amount { color:#f59e0b; font-size:18px; font-weight:800; }
  .disclaimer { background:rgba(245,158,11,0.06); border:1px solid rgba(245,158,11,0.2); border-radius:12px; padding:16px; margin-top:24px; }
  .disclaimer-text { color:#fbbf24; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; margin:0; line-height:1.6; }
  .footer { color:rgba(255,255,255,0.3); font-size:12px; text-align:center; margin-top:24px; }
  a { color:#f59e0b; text-decoration:none; }
</style>
`;

export function buildCustomerEmail(data: OrderEmailData): { subject: string; html: string; text: string } {
  const c = COPY[data.lang];
  const id = data.orderId.slice(-12);
  const amount = formatPrice(data.amountTotal, data.currency);
  const address = formatAddress(data.shippingAddress);

  const html = `<!doctype html><html><head><meta charset="utf-8">${baseStyle}</head><body>
<div class="wrapper">
  <div class="card">
    <div class="logo"><span class="logo-p">P</span><span class="logo-x">X</span> PEPTIVEX LABS</div>
    <h1>${c.customerHeading}</h1>
    <p>${c.customerIntro}</p>
    <div class="row"><span class="label">${c.orderId}</span><span class="value">#${id}</span></div>
    <div class="row"><span class="label">${c.amount}</span><span class="amount">${amount}</span></div>
    ${address ? `<div class="row"><span class="label">${c.address}</span><span class="value">${address}</span></div>` : ''}
    <p style="margin-top:24px;"><strong style="color:#fff;">${c.nextSteps}</strong></p>
    <p>${c.nextStepsBody}</p>
    <p>${c.questions}</p>
    <div class="disclaimer">
      <p class="disclaimer-text">⚠ ${c.disclaimer}</p>
    </div>
  </div>
  <p class="footer">PEPTIVEXLABS LTD · Company number 17178009 · 66 Paul Street, London, EC2A 4NA, UK</p>
</div>
</body></html>`;

  const text = `${c.customerHeading}

${c.customerIntro}

${c.orderId}: #${id}
${c.amount}: ${amount}
${address ? `${c.address}: ${address}\n` : ''}
${c.nextSteps}
${c.nextStepsBody}

${c.questions}

---
${c.disclaimer}
PEPTIVEXLABS LTD · Company number 17178009 · 66 Paul Street, London, EC2A 4NA, UK`;

  return { subject: c.customerSubject(id), html, text };
}

export function buildAdminEmail(data: OrderEmailData): { subject: string; html: string; text: string } {
  const c = COPY[data.lang];
  const id = data.orderId.slice(-12);
  const amount = formatPrice(data.amountTotal, data.currency);
  const address = formatAddress(data.shippingAddress);

  const itemsHtml = data.items.map(it => `
    <div class="row">
      <span class="value">${it.quantity}× ${it.name}</span>
      <span class="value">${formatPrice(it.amount, data.currency)}</span>
    </div>`).join('');

  const itemsText = data.items.map(it => `  ${it.quantity}× ${it.name} — ${formatPrice(it.amount, data.currency)}`).join('\n');

  const html = `<!doctype html><html><head><meta charset="utf-8">${baseStyle}</head><body>
<div class="wrapper">
  <div class="card">
    <div class="logo"><span class="logo-p">P</span><span class="logo-x">X</span> PEPTIVEX LABS</div>
    <h1>${c.adminHeading}</h1>
    <div class="row"><span class="label">Order ID</span><span class="value">#${id}</span></div>
    <div class="row"><span class="label">Amount</span><span class="amount">${amount}</span></div>
    <p style="margin:24px 0 8px 0; color:rgba(255,255,255,0.4); font-size:13px; text-transform:uppercase; letter-spacing:0.05em;">Items</p>
    ${itemsHtml}
    <p style="margin:24px 0 8px 0; color:rgba(255,255,255,0.4); font-size:13px; text-transform:uppercase; letter-spacing:0.05em;">Customer</p>
    <div class="row"><span class="label">Name</span><span class="value">${data.customerName || '—'}</span></div>
    <div class="row"><span class="label">Email</span><span class="value">${data.customerEmail}</span></div>
    ${data.customerPhone ? `<div class="row"><span class="label">Phone</span><span class="value">${data.customerPhone}</span></div>` : ''}
    <div class="row"><span class="label">Lang</span><span class="value">${data.lang.toUpperCase()}</span></div>
    ${address ? `<div class="row"><span class="label">Shipping</span><span class="value">${address}</span></div>` : ''}
    <p style="margin-top:24px;">Stripe Dashboard: <a href="https://dashboard.stripe.com/payments/${data.orderId}">View payment</a></p>
  </div>
</div>
</body></html>`;

  const text = `${c.adminHeading}

Order ID: #${id}
Amount: ${amount}

Items:
${itemsText}

Customer: ${data.customerName || '—'}
Email: ${data.customerEmail}
${data.customerPhone ? `Phone: ${data.customerPhone}\n` : ''}Lang: ${data.lang.toUpperCase()}
${address ? `Shipping: ${address}\n` : ''}
https://dashboard.stripe.com/payments/${data.orderId}`;

  return { subject: c.adminSubject(id, amount), html, text };
}
