import { Link } from 'react-router-dom';
import { ArrowRight, FlaskConical, Shield, Truck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/product/ProductCard';

export default function HomePage() {
  const { lang, t } = useLanguage();
  const featured = PRODUCTS.filter(p => p.featured).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/[0.04] to-transparent" />
        <div className="max-w-6xl mx-auto px-4 py-24 sm:py-32 relative">
          <div className="max-w-2xl">
            <p className="text-amber-500/80 text-xs tracking-[0.3em] uppercase mb-4">PEPTIVEX LABS</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
              {t('home.hero')}
            </h1>
            <p className="text-white/50 text-lg mb-8 leading-relaxed">
              {t('home.heroSub')}
            </p>
            <Link
              to={`/${lang}/products`}
              className="inline-flex items-center gap-2 bg-amber-500 text-black font-semibold px-6 py-3 rounded-lg hover:bg-amber-400 transition-colors"
            >
              {t('home.shopNow')}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="border-y border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 text-white/40">
            <FlaskConical size={18} className="text-amber-500/60" />
            <span className="text-sm">{lang === 'pl' ? 'Najwyższa czystość badawcza' : 'Highest research purity'}</span>
          </div>
          <div className="flex items-center gap-3 text-white/40">
            <Truck size={18} className="text-amber-500/60" />
            <span className="text-sm">{lang === 'pl' ? 'InPost Paczkomaty / Lockers' : 'InPost Lockers delivery'}</span>
          </div>
          <div className="flex items-center gap-3 text-white/40">
            <Shield size={18} className="text-amber-500/60" />
            <span className="text-sm">{lang === 'pl' ? 'Bezpieczna płatność Stripe' : 'Secure Stripe payments'}</span>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-white text-xl font-bold">{t('home.featured')}</h2>
          <Link to={`/${lang}/products`} className="text-amber-500 text-sm hover:text-amber-400 flex items-center gap-1">
            {t('nav.products')} <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-white text-xl font-bold mb-8">{t('home.categories')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {(['healing', 'anti-aging', 'metabolic', 'growth-hormone', 'cognitive', 'weight-loss', 'mitochondrial', 'melanogenesis', 'cosmeceutical'] as const).map(cat => (
            <Link
              key={cat}
              to={`/${lang}/products?category=${cat}`}
              className="bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-center hover:border-amber-500/30 transition-all"
            >
              <span className="text-white/60 text-sm">{t(`categories.${cat}`)}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
