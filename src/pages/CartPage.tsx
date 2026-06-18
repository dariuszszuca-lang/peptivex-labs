import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, Mail, AlertCircle } from 'lucide-react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import type { CartItem } from '../types';
import SeoHead from '../components/SeoHead';

const ORDERS_EMAIL = 'info@peptivexlabs.com';

type MailtoArgs = {
  items: CartItem[];
  lang: 'pl' | 'en' | 'es';
  formatPrice: (cents: number) => string;
  priceKey: 'price_pln' | 'price_gbp' | 'price_eur';
  total: number;
  shippingCost: number;
  grandTotal: number;
};

function buildMailto({ items, lang, formatPrice, priceKey, total, shippingCost, grandTotal }: MailtoArgs): string {
  const pl = lang === 'pl';
  const es = lang === 'es';
  const subject = pl ? 'Zamówienie Peptivex Labs' : es ? 'Pedido Peptivex Labs' : 'Peptivex Labs order request';

  const lines = items.map(it => {
    const name = pl ? it.product.name_pl : es ? (it.product.name_es || it.product.name_en) : it.product.name_en;
    const dosage = it.product.dosage;
    const lineTotal = (it.product[priceKey] ?? it.product.price_gbp) * it.quantity;
    return `- ${name} ${dosage} × ${it.quantity}    ${formatPrice(lineTotal)}`;
  });

  const greeting = pl ? 'Witam,\n\nChciałbym zamówić poniższe produkty:' : es ? 'Hola,\n\nQuisiera realizar el siguiente pedido:' : 'Hi,\n\nI\'d like to order:';
  const subtotalLabel = pl ? 'Suma produktów' : es ? 'Subtotal' : 'Subtotal';
  const shippingLabel = pl ? 'Dostawa' : es ? 'Envío' : 'Shipping';
  const totalLabel = pl ? 'Razem' : es ? 'Total' : 'Total';
  const ruoLine = pl
    ? '\n\nPotwierdzam: 18+, badania in vitro, nie do spożycia, jurysdykcja legalna.'
    : es
    ? '\n\nConfirmo: 18+, investigación in vitro, no apto para consumo, jurisdicción legal.'
    : '\n\nI confirm: 18+, in vitro research, not for consumption, legal jurisdiction.';
  const closing = pl
    ? 'Proszę o link do płatności.\n\nDziękuję!'
    : es
    ? 'Solicito el enlace de pago.\n\n¡Gracias!'
    : 'Please send me a payment link.\n\nThanks!';

  const body =
    `${greeting}\n\n` +
    lines.join('\n') +
    `\n\n${subtotalLabel}: ${formatPrice(total)}\n` +
    `${shippingLabel}: ${shippingCost === 0 ? (pl ? 'GRATIS' : es ? 'GRATIS' : 'FREE') : formatPrice(shippingCost)}\n` +
    `${totalLabel}: ${formatPrice(grandTotal)}` +
    ruoLine +
    `\n\n${closing}\n`;

  return `mailto:${ORDERS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function CartPage() {
  const { lang, t, formatPrice } = useLanguage();
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const [accepted, setAccepted] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);
  const navigate = useNavigate();

  const priceKey = lang === 'pl' ? 'price_pln' as const : lang === 'es' ? 'price_eur' as const : 'price_gbp' as const;
  const total = totalPrice(priceKey);
  const shippingThreshold = lang === 'pl' ? 50000 : lang === 'es' ? 11500 : 10000;
  const shippingCost = total >= shippingThreshold ? 0 : (lang === 'pl' ? 1299 : lang === 'es' ? 999 : 766);
  const grandTotal = total + shippingCost;

  const ppCurrency = lang === 'pl' ? 'PLN' : lang === 'es' ? 'EUR' : 'GBP';
  const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID as string | undefined;

  const seoBlock = (
    <SeoHead
      title={lang === 'pl' ? 'Koszyk' : lang === 'es' ? 'Carrito' : 'Cart'}
      description=""
      path={`/${lang}/cart`}
      noIndex
    />
  );

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        {seoBlock}
        <div className="text-5xl mb-6 opacity-20">🛒</div>
        <h1 className="text-[#0a0a0a] text-xl font-bold mb-3">{t('cart.empty')}</h1>
        <Link to={`/${lang}/products`} className="text-[#ea580c] hover:text-[#ea580c] text-sm inline-flex items-center gap-1.5">
          <ArrowLeft size={14} /> {t('cart.continueShopping')}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {seoBlock}
      <h1 className="text-[#0a0a0a] text-2xl font-bold mb-8">{t('cart.title')}</h1>

      {/* Items */}
      <div className="flex flex-col gap-3 mb-8">
        {items.map(item => {
          const name = lang === 'pl' ? item.product.name_pl : lang === 'es' ? (item.product.name_es || item.product.name_en) : item.product.name_en;
          const price = item.product[priceKey] ?? item.product.price_gbp;
          return (
            <div key={item.product.id} className="bg-[#fafaf7] border border-[#ececec] rounded-xl p-4 flex items-center gap-4">
              <div className="w-14 h-14 bg-[#fafaf7] rounded-lg overflow-hidden shrink-0">
                <img
                  src={item.product.image || (item.product.format === 'pen' ? '/images/products/retatrutide-pens.jpg' : '/images/products/bpc-157-vial.png')}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[#0a0a0a] text-sm font-semibold truncate">{name}</h3>
                <p className="text-[#737373] text-xs">{item.product.dosage} · {t(`product.${item.product.format}`)}</p>
              </div>
              <div className="flex items-center bg-[#fafaf7] border border-[#ececec] rounded-lg">
                <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-2 py-1 text-[#737373] hover:text-[#0a0a0a]">
                  <Minus size={12} />
                </button>
                <span className="text-[#0a0a0a] text-xs w-6 text-center">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-2 py-1 text-[#737373] hover:text-[#0a0a0a]">
                  <Plus size={12} />
                </button>
              </div>
              <span className="text-[#ea580c] font-semibold text-sm w-24 text-right">{formatPrice(price * item.quantity)}</span>
              <button onClick={() => removeItem(item.product.id)} className="text-[#a3a3a3] hover:text-red-400 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="bg-[#fafaf7] border border-[#ececec] rounded-xl p-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-[#525252]">{lang === 'pl' ? 'Produkty' : 'Subtotal'}</span>
          <span className="text-[#0a0a0a]">{formatPrice(total)}</span>
        </div>
        <div className="flex justify-between text-sm mb-4">
          <span className="text-[#525252]">{t('checkout.shipping')}</span>
          <span className="text-[#0a0a0a]">
            {shippingCost === 0
              ? (lang === 'pl' ? 'GRATIS' : 'FREE')
              : formatPrice(shippingCost)
            }
          </span>
        </div>
        {shippingCost > 0 && (
          <p className="text-[#ea580c]/60 text-xs mb-4">
            {t('checkout.freeFrom')}
          </p>
        )}
        <div className="border-t border-[#ececec] pt-4 flex justify-between items-center">
          <span className="text-[#0a0a0a] font-bold">{t('cart.total')}</span>
          <span className="text-[#ea580c] text-2xl font-extrabold">{formatPrice(grandTotal)}</span>
        </div>

        {/* Payment unavailable notice */}
        <div className="mt-6 bg-[#fff7ed] border border-[#fed7aa] rounded-lg p-4">
          <div className="flex gap-3">
            <AlertCircle size={18} className="text-[#ea580c] shrink-0 mt-0.5" />
            <div>
              <p className="text-[#9a3412] text-sm font-semibold mb-1">
                {lang === 'pl' ? 'Zapłać przez PayPal albo zamów mailem' : lang === 'es' ? 'Paga con PayPal o pide por correo' : 'Pay with PayPal or order by email'}
              </p>
              <p className="text-[#7c2d12] text-xs leading-relaxed">
                {lang === 'pl'
                  ? 'Zapłać od razu przez PayPal, albo wyślij zamówienie mailem, a dostaniesz link do płatności.'
                  : lang === 'es'
                  ? 'Paga al instante con PayPal, o envía tu pedido por correo y recibirás un enlace de pago.'
                  : "Pay instantly with PayPal, or send your order by email and we'll send a payment link."}
              </p>
            </div>
          </div>
        </div>

        {/* RUO disclaimer + required acceptance */}
        <div className="mt-3 bg-amber-500/[0.05] border border-[#fed7aa] rounded-lg p-3">
          <p className="text-[#ea580c]/90 text-[10px] font-semibold uppercase tracking-wide mb-1.5">
            ⚠ {t('product.researchOnly')}
          </p>
          <p className="text-[#525252] text-[11px] leading-relaxed mb-3">
            {t('checkout.disclaimer')}
          </p>
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-[#ea580c] cursor-pointer shrink-0"
            />
            <span className="text-[#525252] text-xs leading-snug">{t('checkout.confirmAccept')}</span>
          </label>
        </div>

        {/* PayPal — gated by RUO acceptance */}
        {accepted && paypalClientId && (
          <div className="mt-4">
            <p className="text-[#525252] text-xs leading-snug mb-3 text-center">
              {lang === 'pl'
                ? 'Nie musisz zakładać konta PayPal. Kliknij „Zapłać z PayPal”, a w okienku wybierz „Zapłać kartą debetową lub kredytową”, podaj dane karty i gotowe.'
                : lang === 'es'
                ? 'No necesitas una cuenta de PayPal. Pulsa «Pagar con PayPal» y luego elige «Pagar con tarjeta de débito o crédito», introduce los datos y listo.'
                : 'You don’t need a PayPal account. Click “Pay with PayPal”, then choose “Pay with Debit or Credit Card”, enter your card details and you’re done.'}
            </p>
            <PayPalScriptProvider key={ppCurrency} options={{ clientId: paypalClientId, currency: ppCurrency, intent: 'capture', 'disable-funding': 'card,credit,paylater,blik,p24,sepa,bancontact,eps,giropay,ideal,mybank,sofort' }}>
              <PayPalButtons
                style={{ layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay' }}
                createOrder={async () => {
                  setPayError(null);
                  const res = await fetch('/api/paypal-create-order', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity })), lang }),
                  });
                  const data = await res.json();
                  if (!res.ok || !data.orderID) throw new Error(data.error || 'create failed');
                  return data.orderID as string;
                }}
                onApprove={async (data) => {
                  const res = await fetch('/api/paypal-capture', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ orderID: data.orderID, lang }),
                  });
                  const r = await res.json();
                  if (!res.ok || r.status !== 'COMPLETED') {
                    setPayError(lang === 'pl' ? 'Płatność nie powiodła się. Spróbuj ponownie.' : lang === 'es' ? 'El pago falló. Inténtalo de nuevo.' : 'Payment failed. Please try again.');
                    return;
                  }
                  clearCart();
                  navigate(`/${lang}/success`);
                }}
                onError={(err) => {
                  console.error('[paypal] error', err);
                  setPayError(lang === 'pl' ? 'Błąd PayPal. Spróbuj ponownie lub zamów mailem.' : lang === 'es' ? 'Error de PayPal. Inténtalo o pide por correo.' : 'PayPal error. Try again or order by email.');
                }}
              />
            </PayPalScriptProvider>
            {payError && <p className="text-red-500 text-xs mt-2 text-center">{payError}</p>}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-[#ececec]" />
              <span className="text-[#a3a3a3] text-[10px] uppercase">{lang === 'pl' ? 'lub' : lang === 'es' ? 'o' : 'or'}</span>
              <div className="flex-1 h-px bg-[#ececec]" />
            </div>
          </div>
        )}

        {/* Email order button — gated by RUO acceptance */}
        {accepted ? (
          <a
            href={buildMailto({ items, lang, formatPrice, priceKey, total, shippingCost, grandTotal })}
            className="w-full mt-3 bg-[#ea580c] text-white font-semibold py-3 rounded-lg hover:bg-[#c2410c] transition-colors flex items-center justify-center gap-2"
          >
            <Mail size={16} />
            {lang === 'pl' ? 'Wyślij zamówienie mailem' : 'Send order by email'}
          </a>
        ) : (
          <button
            disabled
            className="w-full mt-3 bg-[#ea580c] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
          >
            <Mail size={16} />
            {lang === 'pl' ? 'Wyślij zamówienie mailem' : 'Send order by email'}
          </button>
        )}
        <p className="text-[#737373] text-[10px] text-center mt-3">
          info@peptivexlabs.com
        </p>
        <p className="text-[#a3a3a3] text-[10px] text-center mt-1">
          {lang === 'pl' ? 'Bezpieczne płatności online (po dostarczeniu linku)' : 'Secure online payments (after link is sent)'}
        </p>
      </div>

      <Link to={`/${lang}/products`} className="text-[#ea580c]/60 hover:text-[#ea580c] text-sm inline-flex items-center gap-1.5 mt-6">
        <ArrowLeft size={14} /> {t('cart.continueShopping')}
      </Link>
    </div>
  );
}
