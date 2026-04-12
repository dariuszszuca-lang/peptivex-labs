import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, CreditCard } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';

export default function CartPage() {
  const { lang, t, formatPrice } = useLanguage();
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  const priceKey = lang === 'pl' ? 'price_pln' as const : 'price_gbp' as const;
  const total = totalPrice(priceKey);
  const shippingThreshold = lang === 'pl' ? 50000 : 10000;
  const shippingCost = total >= shippingThreshold ? 0 : (lang === 'pl' ? 1299 : 766);
  const grandTotal = total + shippingCost;

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
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

        {/* Checkout button — placeholder for Stripe */}
        <button
          className="w-full mt-6 bg-amber-500 text-black font-semibold py-3 rounded-lg hover:bg-amber-400 transition-colors flex items-center justify-center gap-2"
          onClick={() => alert('Stripe checkout — coming soon')}
        >
          <CreditCard size={16} />
          {t('checkout.pay')}
        </button>
        <p className="text-white/20 text-[10px] text-center mt-3">
          {lang === 'pl' ? 'Stripe · BLIK · Przelewy24 · Karty' : 'Stripe · Card payments'}
        </p>
      </div>

      <Link to={`/${lang}/products`} className="text-amber-500/60 hover:text-amber-400 text-sm inline-flex items-center gap-1.5 mt-6">
        <ArrowLeft size={14} /> {t('cart.continueShopping')}
      </Link>
    </div>
  );
}
