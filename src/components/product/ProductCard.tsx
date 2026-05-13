import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCart } from '../../contexts/CartContext';

const DEFAULT_VIAL = '/images/products/bpc-157-vial.png';
const DEFAULT_PEN = '/images/products/retatrutide-pens.jpg';

export default function ProductCard({ product }: { product: Product }) {
  const { lang, formatPrice } = useLanguage();
  const { addItem } = useCart();

  const name = lang === 'pl' ? product.name_pl : lang === 'es' ? (product.name_es || product.name_en) : product.name_en;
  const short = lang === 'pl' ? product.short_pl : lang === 'es' ? (product.short_es || product.short_en) : product.short_en;
  const price = lang === 'pl' ? product.price_pln : lang === 'es' ? (product.price_eur ?? product.price_gbp) : product.price_gbp;
  const stock = lang === 'pl' ? product.stock_pl : lang === 'es' ? (product.stock_es ?? product.stock_uk) : product.stock_uk;
  const inStock = stock > 0;
  const imgSrc = product.image || (product.format === 'pen' ? DEFAULT_PEN : DEFAULT_VIAL);

  return (
    <div className="group product-card bg-white/[0.03] border border-white/[0.08] rounded-xl overflow-hidden hover:border-amber-500/30 transition-all duration-300">
      {/* Image */}
      <Link to={`/${lang}/product/${product.slug}`} className="block relative aspect-square overflow-hidden bg-[#0a0908]">
        {/* Gradient frame */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 pointer-events-none" />
        {/* Subtle corner glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/[0.08] to-transparent z-10 pointer-events-none" />

        <img
          src={imgSrc}
          alt={name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
          {product.featured && (
            <span className="bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide shadow-lg">
              {lang === 'pl' ? 'Wyróżniony' : lang === 'es' ? 'Destacado' : 'Featured'}
            </span>
          )}
          {product.format === 'pen' && (
            <span className="bg-teal-500/80 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide shadow-lg">
              PEN
            </span>
          )}
          {product.pen_kit && product.format === 'vial' && (
            <span className="bg-teal-500/80 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide shadow-lg whitespace-nowrap">
              VIAL + PEN
            </span>
          )}
        </div>

        {/* Dosage badge bottom-right */}
        <span className="absolute bottom-3 right-3 z-20 bg-black/60 backdrop-blur-sm text-white/80 text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/10">
          {product.dosage}
        </span>
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link to={`/${lang}/product/${product.slug}`}>
          <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-amber-400 transition-colors">{name}</h3>
        </Link>
        <p className="text-white/40 text-xs leading-relaxed mb-2 line-clamp-2">{short}</p>

        {product.pen_kit && product.format === 'vial' && (
          <p className="text-teal-400/70 text-[11px] font-semibold mb-3 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-teal-400/70" />
            {lang === 'pl' ? 'Fiolka lub Reusable Pen Kit' : lang === 'es' ? 'Vial o Reusable Pen Kit' : 'Vial or Reusable Pen Kit'}
          </p>
        )}

        <div className="flex items-center justify-between">
          <span className="text-amber-400 font-bold text-lg">{formatPrice(price)}</span>
          <button
            onClick={() => inStock && addItem(product)}
            disabled={!inStock}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
              inStock
                ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/20 cursor-pointer'
                : 'bg-white/5 text-white/20 border border-white/5 cursor-not-allowed'
            }`}
          >
            <ShoppingCart size={13} />
            {inStock ? (lang === 'pl' ? 'Dodaj' : lang === 'es' ? 'Añadir' : 'Add') : (lang === 'pl' ? 'Brak' : lang === 'es' ? 'Agotado' : 'Out')}
          </button>
        </div>
      </div>
    </div>
  );
}
