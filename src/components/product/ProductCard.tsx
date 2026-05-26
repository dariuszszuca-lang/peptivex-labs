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
    <div className="group product-card rounded-xl overflow-hidden">
      {/* Image */}
      <Link to={`/${lang}/product/${product.slug}`} className="block relative aspect-square overflow-hidden bg-[#fafaf7]">
        <img
          src={imgSrc}
          alt={name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
          {product.featured && (
            <span className="bg-[#ea580c] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
              {lang === 'pl' ? 'Wyróżniony' : lang === 'es' ? 'Destacado' : 'Featured'}
            </span>
          )}
          {product.format === 'pen' && (
            <span className="bg-[#1a1a1a] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
              PEN
            </span>
          )}
          {product.pen_kit && product.format === 'vial' && (
            <span className="bg-[#1a1a1a] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide whitespace-nowrap">
              VIAL + PEN
            </span>
          )}
        </div>

        {/* Dosage badge bottom-right */}
        <span className="absolute bottom-3 right-3 z-20 bg-white/95 backdrop-blur-sm text-[#1a1a1a] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#ececec]">
          {product.dosage}
        </span>
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link to={`/${lang}/product/${product.slug}`}>
          <h3 className="text-[#1a1a1a] font-semibold text-sm mb-1 group-hover:text-[#ea580c] transition-colors">{name}</h3>
        </Link>
        <p className="text-[#737373] text-xs leading-relaxed mb-2 line-clamp-2">{short}</p>

        {product.pen_kit && product.format === 'vial' && (
          <p className="text-[#525252] text-[11px] font-semibold mb-3 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-[#ea580c]" />
            {lang === 'pl' ? 'Fiolka lub Reusable Pen Kit' : lang === 'es' ? 'Vial o Reusable Pen Kit' : 'Vial or Reusable Pen Kit'}
          </p>
        )}

        <div className="flex items-center justify-between">
          <span className="text-[#1a1a1a] font-bold text-lg">{formatPrice(price)}</span>
          <button
            onClick={() => inStock && addItem(product)}
            disabled={!inStock}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
              inStock
                ? 'bg-[#ea580c] text-white hover:bg-[#c2410c] cursor-pointer'
                : 'bg-[#f5f5f0] text-[#a3a3a3] cursor-not-allowed'
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
