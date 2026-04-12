import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { PRODUCTS } from '../data/products';
import { DisclaimerFull } from '../components/product/DisclaimerBadge';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { lang, t, formatPrice } = useLanguage();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  const product = PRODUCTS.find(p => p.slug === slug);
  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center text-white/30">
        Product not found.
      </div>
    );
  }

  const name = lang === 'pl' ? product.name_pl : product.name_en;
  const description = lang === 'pl' ? product.description_pl : product.description_en;
  const price = lang === 'pl' ? product.price_pln : product.price_gbp;
  const stock = lang === 'pl' ? product.stock_pl : product.stock_uk;
  const inStock = stock > 0;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Back */}
      <Link to={`/${lang}/products`} className="inline-flex items-center gap-1.5 text-white/40 hover:text-white text-sm mb-8 transition-colors">
        <ArrowLeft size={14} />
        {t('nav.products')}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl aspect-square flex items-center justify-center">
          <div className="text-8xl opacity-20">🧪</div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-6">
          {/* Category + Format */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 uppercase tracking-wide font-semibold">
              {t(`categories.${product.category}`)}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.06] text-white/40 uppercase tracking-wide">
              {t(`product.${product.format}`)}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.06] text-white/40 uppercase tracking-wide">
              {product.dosage}
            </span>
          </div>

          {/* Name + Price */}
          <div>
            <h1 className="text-white text-3xl font-bold mb-3">{name}</h1>
            <p className="text-amber-400 text-3xl font-extrabold">{formatPrice(price)}</p>
          </div>

          {/* Description */}
          <p className="text-white/50 text-sm leading-relaxed">{description}</p>

          {/* Stock */}
          <div className="text-xs text-white/30">
            {inStock
              ? (lang === 'pl' ? `${stock} szt. w magazynie` : `${stock} in stock`)
              : (lang === 'pl' ? 'Brak w magazynie' : 'Out of stock')
            }
          </div>

          {/* Add to Cart */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white/[0.04] border border-white/10 rounded-lg">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 text-white/40 hover:text-white transition-colors">
                <Minus size={14} />
              </button>
              <span className="text-white text-sm w-8 text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-2 text-white/40 hover:text-white transition-colors">
                <Plus size={14} />
              </button>
            </div>
            <button
              onClick={handleAdd}
              disabled={!inStock}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm transition-all ${
                inStock
                  ? 'bg-amber-500 text-black hover:bg-amber-400 cursor-pointer'
                  : 'bg-white/5 text-white/20 cursor-not-allowed'
              }`}
            >
              <ShoppingCart size={16} />
              {t('product.addToCart')}
            </button>
          </div>

          {/* Disclaimer */}
          {product.disclaimer && <DisclaimerFull />}
        </div>
      </div>
    </div>
  );
}
