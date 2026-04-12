import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCart } from '../../contexts/CartContext';

export default function ProductCard({ product }: { product: Product }) {
  const { lang, formatPrice } = useLanguage();
  const { addItem } = useCart();

  const name = lang === 'pl' ? product.name_pl : product.name_en;
  const short = lang === 'pl' ? product.short_pl : product.short_en;
  const price = lang === 'pl' ? product.price_pln : product.price_gbp;
  const stock = lang === 'pl' ? product.stock_pl : product.stock_uk;
  const inStock = stock > 0;

  return (
    <div className="group bg-white/[0.03] border border-white/[0.08] rounded-xl overflow-hidden hover:border-amber-500/30 transition-all duration-300">
      {/* Image placeholder */}
      <Link to={`/${lang}/product/${product.slug}`} className="block relative aspect-square bg-gradient-to-b from-white/[0.02] to-transparent flex items-center justify-center">
        <div className="text-5xl opacity-30 group-hover:opacity-50 transition-opacity">🧪</div>
        {product.featured && (
          <span className="absolute top-3 left-3 bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
            Featured
          </span>
        )}
        {product.format === 'pen' && (
          <span className="absolute top-3 right-3 bg-teal-500/20 text-teal-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
            PEN
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link to={`/${lang}/product/${product.slug}`}>
          <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-amber-400 transition-colors">{name}</h3>
        </Link>
        <p className="text-white/40 text-xs leading-relaxed mb-3 line-clamp-2">{short}</p>

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
            {inStock ? (lang === 'pl' ? 'Dodaj' : 'Add') : (lang === 'pl' ? 'Brak' : 'Out')}
          </button>
        </div>
      </div>
    </div>
  );
}
