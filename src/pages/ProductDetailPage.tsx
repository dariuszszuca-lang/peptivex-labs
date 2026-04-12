import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Plus, Minus, FlaskConical, Truck, Shield, Check } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { PRODUCTS } from '../data/products';
import { DisclaimerFull } from '../components/product/DisclaimerBadge';
import HexPattern from '../components/home/HexPattern';
import SeoHead from '../components/SeoHead';
import { PROTOCOLS } from '../data/protocols';
import { Beaker, Clock, Calendar, Layers, Thermometer } from 'lucide-react';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { lang, t, formatPrice } = useLanguage();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const pl = lang === 'pl';

  const product = PRODUCTS.find(p => p.slug === slug);
  if (!product) {
    return <div className="max-w-6xl mx-auto px-4 py-20 text-center text-white/30">Product not found.</div>;
  }

  const name = pl ? product.name_pl : product.name_en;
  const description = pl ? product.description_pl : product.description_en;
  const price = pl ? product.price_pln : product.price_gbp;
  const stock = pl ? product.stock_pl : product.stock_uk;
  const inStock = stock > 0;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Related products (same category, exclude current)
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: `https://peptivexlabs.com${product.image || '/images/products/bpc-157-vial.png'}`,
    sku: product.id,
    brand: { '@type': 'Brand', name: 'PEPTIVEX LABS' },
    category: `Research Peptides / ${product.category}`,
    url: `https://peptivexlabs.com/${lang}/product/${product.slug}`,
    offers: {
      '@type': 'Offer',
      priceCurrency: pl ? 'PLN' : 'GBP',
      price: (price / 100).toFixed(2),
      availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: 'PEPTIVEX LABS' },
    },
  };

  return (
    <div>
      <SeoHead
        title={`${name} — ${product.dosage}`}
        description={(pl ? product.short_pl : product.short_en) + ` ${formatPrice(price)}. PEPTIVEX LABS.`}
        path={`/${lang}/product/${product.slug}`}
        image={product.image ? `https://peptivexlabs.com${product.image}` : undefined}
        schema={productSchema}
      />
      {/* Breadcrumb with bg */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/[0.06] to-transparent" />
        <HexPattern className="text-amber-500/[0.02]" />
        <div className="max-w-6xl mx-auto px-4 pt-6 pb-2 relative z-10">
          <Link to={`/${lang}/products`} className="inline-flex items-center gap-1.5 text-white/30 hover:text-amber-400 text-sm transition-colors">
            <ArrowLeft size={14} />
            {t('nav.products')}
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] aspect-square group">
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30 z-10" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-amber-500/[0.08] to-transparent z-10" />
            <img
              src={product.image || (product.format === 'pen' ? '/images/products/retatrutide-pens.jpg' : '/images/products/bpc-157-vial.png')}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <span className="absolute bottom-4 right-4 z-20 bg-black/60 backdrop-blur-sm text-white/80 text-xs font-bold px-3 py-1.5 rounded-full border border-white/10">
              {product.dosage}
            </span>
            {product.featured && (
              <span className="absolute top-4 left-4 z-20 bg-amber-500 text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-lg">
                {pl ? 'Wyróżniony' : 'Featured'}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5">
            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 uppercase tracking-wide font-semibold border border-amber-500/20">
                {t(`categories.${product.category}`)}
              </span>
              <span className="text-[11px] px-3 py-1 rounded-full bg-white/[0.06] text-white/40 uppercase tracking-wide border border-white/[0.06]">
                {t(`product.${product.format}`)}
              </span>
              <span className="text-[11px] px-3 py-1 rounded-full bg-white/[0.06] text-white/40 uppercase tracking-wide border border-white/[0.06]">
                {product.dosage}
              </span>
            </div>

            {/* Name + Price */}
            <div>
              <h1 className="text-white text-3xl sm:text-4xl font-extrabold mb-4">{name}</h1>
              <p className="text-gradient text-3xl sm:text-4xl font-extrabold">{formatPrice(price)}</p>
            </div>

            {/* Description */}
            <p className="text-white/45 text-[15px] leading-[1.8]">{description}</p>

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: FlaskConical, text: pl ? 'Czystość >98%' : 'Purity >98%' },
                { icon: Truck, text: pl ? 'Wysyłka 24h' : '24h Dispatch' },
                { icon: Shield, text: 'Stripe Secure' },
              ].map((ts, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <ts.icon size={14} className="text-amber-500/60 shrink-0" />
                  <span className="text-white/40 text-xs">{ts.text}</span>
                </div>
              ))}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${inStock ? 'bg-emerald-400' : 'bg-red-400'}`} />
              <span className="text-white/30 text-xs">
                {inStock
                  ? (pl ? `${stock} szt. w magazynie` : `${stock} in stock`)
                  : (pl ? 'Brak w magazynie' : 'Out of stock')
                }
              </span>
            </div>

            {/* Add to Cart */}
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-white/[0.04] border border-white/[0.08] rounded-xl">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 text-white/40 hover:text-white transition-colors">
                  <Minus size={16} />
                </button>
                <span className="text-white text-sm w-8 text-center font-bold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4 py-3 text-white/40 hover:text-white transition-colors">
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={handleAdd}
                disabled={!inStock}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all ${
                  added
                    ? 'bg-emerald-500 text-white'
                    : inStock
                      ? 'cta-primary bg-amber-500 text-black hover:bg-amber-400 cursor-pointer'
                      : 'bg-white/5 text-white/20 cursor-not-allowed'
                }`}
              >
                {added ? <><Check size={16} /> {pl ? 'Dodano!' : 'Added!'}</> : <><ShoppingCart size={16} /> {t('product.addToCart')}</>}
              </button>
            </div>

            {/* Disclaimer */}
            {product.disclaimer && <DisclaimerFull />}
          </div>
        </div>

        {/* Research Protocol Reference */}
        {PROTOCOLS[product.id] && (() => {
          const proto = PROTOCOLS[product.id];
          const protocolItems = [
            { icon: Beaker, label: pl ? 'Rekonstytucja' : 'Reconstitution', value: proto.reconstitution },
            { icon: FlaskConical, label: pl ? 'Stężenie' : 'Concentration', value: proto.concentration },
            { icon: Plus, label: pl ? 'Typowa dawka' : 'Typical Dose', value: proto.typicalDose },
            { icon: Clock, label: 'Timing', value: proto.timing },
            { icon: Calendar, label: pl ? 'Częstotliwość' : 'Frequency', value: proto.frequency },
            { icon: Layers, label: pl ? 'Długość cyklu' : 'Cycle Length', value: proto.cycleLength },
            { icon: Thermometer, label: pl ? 'Przechowywanie' : 'Storage', value: proto.storage },
          ];
          return (
            <div className="mt-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/15 to-amber-500/5 border border-amber-500/15 flex items-center justify-center">
                  <Beaker size={18} className="text-amber-400" />
                </div>
                <div>
                  <h2 className="text-white text-xl font-bold">
                    {pl ? 'Protokół badawczy — dane referencyjne' : 'Research Protocol Reference'}
                  </h2>
                  <p className="text-white/30 text-xs">{pl ? 'Dane edukacyjne — nie stanowią porady medycznej' : 'Educational data — not medical advice'}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {protocolItems.map((item, i) => (
                  <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 hover:border-amber-500/15 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <item.icon size={14} className="text-amber-500/60" />
                      <span className="text-white/40 text-xs uppercase tracking-wide">{item.label}</span>
                    </div>
                    <p className="text-white text-sm font-medium">{item.value}</p>
                  </div>
                ))}
              </div>

              {proto.stackNotes && (
                <div className="mt-4 bg-amber-500/[0.04] border border-amber-500/10 rounded-xl p-4">
                  <p className="text-amber-500/60 text-xs uppercase tracking-wide mb-1">{pl ? 'Notatki / Stacki' : 'Notes / Stacks'}</p>
                  <p className="text-white/60 text-sm">{proto.stackNotes}</p>
                </div>
              )}

              <p className="text-white/15 text-[10px] mt-4 text-center">
                {pl
                  ? 'Dane referencyjne na podstawie opublikowanych przewodników badawczych. Wyłącznie do celów edukacyjnych i laboratoryjnych.'
                  : 'Reference data based on published research guides. For educational and laboratory purposes only.'}
              </p>
            </div>
          );
        })()}

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-white text-xl font-bold mb-6">{pl ? 'Podobne produkty' : 'Related Products'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map(p => (
                <Link key={p.id} to={`/${lang}/product/${p.slug}`} className="group bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden hover:border-amber-500/20 transition-all">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={p.image || (p.format === 'pen' ? '/images/products/retatrutide-pens.jpg' : '/images/products/bpc-157-vial.png')}
                      alt={pl ? p.name_pl : p.name_en}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white text-sm font-semibold group-hover:text-amber-400 transition-colors">{pl ? p.name_pl : p.name_en}</h3>
                    <p className="text-amber-400 font-bold mt-1">{formatPrice(pl ? p.price_pln : p.price_gbp)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
