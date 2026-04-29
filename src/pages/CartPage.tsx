import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, Mail, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import type { CartItem } from '../types';
import SeoHead from '../components/SeoHead';

const ORDERS_EMAIL = 'orders@peptivexlabs.com';

type MailtoArgs = {
  items: CartItem[];
  lang: 'pl' | 'en';
  formatPrice: (cents: number) => string;
  priceKey: 'price_pln' | 'price_gbp';
  total: number;
  shippingCost: number;
  grandTotal: number;
};

function buildMailto({ items, lang, formatPrice, priceKey, total, shippingCost, grandTotal }: MailtoArgs): string {
  const pl = lang === 'pl';
  const subject = pl ? 'Zamówienie Peptivex Labs' : 'Peptivex Labs order request';

  const lines = items.map(it => {
    const name = pl ? it.product.name_pl : it.product.name_en;
    const dosage = it.product.dosage;
    const lineTotal = it.product[priceKey] * it.quantity;
    return `- ${name} ${dosage} × ${it.quantity}    ${formatPrice(lineTotal)}`;
  });

  const greeting = pl ? 'Witam,\n\nChciałbym zamówić poniższe produkty:' : 'Hi,\n\nI\'d like to order:';
  const subtotalLabel = pl ? 'Suma produktów' : 'Subtotal';
  const shippingLabel = pl ? 'Dostawa' : 'Shipping';
  const totalLabel = pl ? 'Razem' : 'Total';
  const ruoLine = pl
    ? '\n\nPotwierdzam: 18+, badania in vitro, nie do spożycia, jurysdykcja legalna.'
    : '\n\nI confirm: 18+, in vitro research, not for consumption, legal jurisdiction.';
  const closing = pl
    ? 'Proszę o link do płatności. Preferowana forma: (przelew/karta/BLIK)\n\nDziękuję!'
    : 'Please send me a payment link. Preferred method: (bank transfer / card)\n\nThanks!';

  const body =
    `${greeting}\n\n` +
    lines.join('\n') +
    `\n\n${subtotalLabel}: ${formatPrice(total)}\n` +
    `${shippingLabel}: ${shippingCost === 0 ? (pl ? 'GRATIS' : 'FREE') : formatPrice(shippingCost)}\n` +
    `${totalLabel}: ${formatPrice(grandTotal)}` +
    ruoLine +
    `\n\n${closing}\n`;

  return `mailto:${ORDERS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function CartPage() {
  const { lang, t, formatPrice } = useLanguage();
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const [accepted, setAccepted] = useState(false);

  const priceKey = lang === 'pl' ? 'price_pln' as const : 'price_gbp' as const;
  const total = totalPrice(priceKey);
  const shippingThreshold = lang === 'pl' ? 50000 : 10000;
  const shippingCost = total >= shippingThreshold ? 0 : (lang === 'pl' ? 1299 : 766);
  const grandTotal = total + shippingCost;

  const seoBlock = (
    <SeoHead
      title={lang === 'pl' ? 'Koszyk' : 'Cart'}
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
        <h1 className="text-white text-xl font-bold mb-3">{t('cart.empty')}</h1>
        <Link to={`/${lang}/products`} className="text-amber-500 hover:text-amber-400 text-sm inline-flex items-center gap-1.5">
          <ArrowLeft size={14} /> {t('cart.continueShopping')}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {seoBlock}
      <h1 className="text-white text-2xl font-bold mb-8">{t('cart.title')}</h1>

      {/* Items */}
      <div className="flex flex-col gap-3 mb-8">
        {items.map(item => {
          const name = lang === 'pl' ? item.product.name_pl : item.product.name_en;
          const price = item.product[priceKey];
          return (
            <div key={item.product.id} className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 flex items-center gap-4">
              <div className="w-14 h-14 bg-white/[0.03] rounded-lg overflow-hidden shrink-0">
                <img
                  src={item.product.image || (item.product.format === 'pen' ? '/images/products/retatrutide-pens.jpg' : '/images/products/bpc-157-vial.png')}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white text-sm font-semibold truncate">{name}</h3>
                <p className="text-white/30 text-xs">{item.product.dosage} · {t(`product.${item.product.format}`)}</p>
              </div>
              <div className="flex items-center bg-white/[0.04] border border-white/10 rounded-lg">
                <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-2 py-1 text-white/40 hover:text-white">
                  <Minus size={12} />
                </button>
                <span className="text-white text-xs w-6 text-center">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-2 py-1 text-white/40 hover:text-white">
                  <Plus size={12} />
                </button>
              </div>
              <span className="text-amber-400 font-semibold text-sm w-24 text-right">{formatPrice(price * item.quantity)}</span>
              <button onClick={() => removeItem(item.product.id)} className="text-white/20 hover:text-red-400 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-white/50">{lang === 'pl' ? 'Produkty' : 'Subtotal'}</span>
          <span className="text-white">{formatPrice(total)}</span>
        </div>
        <div className="flex justify-between text-sm mb-4">
          <span className="text-white/50">{t('checkout.shipping')}</span>
          <span className="text-white">
            {shippingCost === 0
              ? (lang === 'pl' ? 'GRATIS' : 'FREE')
              : formatPrice(shippingCost)
            }
          </span>
        </div>
        {shippingCost > 0 && (
          <p className="text-amber-500/60 text-xs mb-4">
            {t('checkout.freeFrom')}
          </p>
        )}
        <div className="border-t border-white/[0.06] pt-4 flex justify-between items-center">
          <span className="text-white font-bold">{t('cart.total')}</span>
          <span className="text-amber-400 text-2xl font-extrabold">{formatPrice(grandTotal)}</span>
        </div>

        {/* Payment unavailable notice */}
        <div className="mt-6 bg-amber-500/[0.08] border border-amber-500/25 rounded-lg p-4">
          <div className="flex gap-3">
            <AlertCircle size={18} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-100 text-sm font-semibold mb-1">
                {lang === 'pl' ? 'Płatności online czasowo niedostępne' : 'Online payments temporarily unavailable'}
              </p>
              <p className="text-amber-100/70 text-xs leading-relaxed">
                {lang === 'pl'
                  ? 'Wyślij zamówienie mailem (z poniższego przycisku). W ciągu 24h dostaniesz spersonalizowany link do płatności (przelew, karta, BLIK).'
                  : "Send your order by email (button below). Within 24h you'll receive a personalized payment link (bank transfer, card, BLIK)."}
              </p>
            </div>
          </div>
        </div>

        {/* RUO disclaimer + required acceptance */}
        <div className="mt-3 bg-amber-500/[0.05] border border-amber-500/20 rounded-lg p-3">
          <p className="text-amber-500/90 text-[10px] font-semibold uppercase tracking-wide mb-1.5">
            ⚠ {t('product.researchOnly')}
          </p>
          <p className="text-white/45 text-[11px] leading-relaxed mb-3">
            {t('checkout.disclaimer')}
          </p>
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-amber-500 cursor-pointer shrink-0"
            />
            <span className="text-white/70 text-xs leading-snug">{t('checkout.confirmAccept')}</span>
          </label>
        </div>

        {/* Email order button — gated by RUO acceptance */}
        {accepted ? (
          <a
            href={buildMailto({ items, lang, formatPrice, priceKey, total, shippingCost, grandTotal })}
            className="w-full mt-3 bg-amber-500 text-black font-semibold py-3 rounded-lg hover:bg-amber-400 transition-colors flex items-center justify-center gap-2"
          >
            <Mail size={16} />
            {lang === 'pl' ? 'Wyślij zamówienie mailem' : 'Send order by email'}
          </a>
        ) : (
          <button
            disabled
            className="w-full mt-3 bg-amber-500 text-black font-semibold py-3 rounded-lg flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
          >
            <Mail size={16} />
            {lang === 'pl' ? 'Wyślij zamówienie mailem' : 'Send order by email'}
          </button>
        )}
        <p className="text-white/30 text-[10px] text-center mt-3">
          orders@peptivexlabs.com
        </p>
        <p className="text-white/20 text-[10px] text-center mt-1">
          {lang === 'pl' ? 'Pay by Bank · BLIK · Karty (po dostarczeniu linku)' : 'Pay by Bank · BLIK · Cards (after link is sent)'}
        </p>
      </div>

      <Link to={`/${lang}/products`} className="text-amber-500/60 hover:text-amber-400 text-sm inline-flex items-center gap-1.5 mt-6">
        <ArrowLeft size={14} /> {t('cart.continueShopping')}
      </Link>
    </div>
  );
}
