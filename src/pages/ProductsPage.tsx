import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import type { ProductCategory } from '../types';

export default function ProductsPage() {
  const { lang, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');

  const pl = lang === 'pl';
  const activeCategory = searchParams.get('category') as ProductCategory | null;

  const categories: ProductCategory[] = ['healing', 'anti-aging', 'metabolic', 'growth-hormone', 'cognitive', 'weight-loss', 'mitochondrial', 'melanogenesis', 'cosmeceutical'];

  const filtered = useMemo(() => {
    let result = [...PRODUCTS].sort((a, b) => a.order - b.order);
    if (activeCategory) {
      result = result.filter(p => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name_pl.toLowerCase().includes(q) ||
        p.name_en.toLowerCase().includes(q) ||
        p.dosage.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, search]);

  return (
    <div>
      {/* Header with background */}
      <div className="relative overflow-hidden section-warm py-12">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-3">{pl ? 'Katalog' : 'Catalog'}</p>
          <h1 className="text-white text-3xl font-extrabold mb-2">{t('nav.products')}</h1>
          <p className="text-white/40 text-sm">{pl ? '19 peptydów badawczych. Czystość >98%.' : '19 research peptides. Purity >98%.'}</p>
        </div>
      </div>
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={lang === 'pl' ? 'Szukaj produktu...' : 'Search products...'}
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-10 pr-4 py-2.5 text-white text-sm placeholder:text-white/30 focus:border-amber-500/40 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Category Chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSearchParams({})}
          className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
            !activeCategory
              ? 'bg-amber-500/15 border-amber-500/40 text-amber-400'
              : 'bg-white/[0.03] border-white/10 text-white/40 hover:border-amber-500/20'
          }`}
        >
          {lang === 'pl' ? 'Wszystkie' : 'All'}
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSearchParams({ category: cat })}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
              activeCategory === cat
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-400'
                : 'bg-white/[0.03] border-white/10 text-white/40 hover:border-amber-500/20'
            }`}
          >
            {t(`categories.${cat}`)}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <div className="text-center py-20 text-white/30">
          {lang === 'pl' ? 'Brak produktów pasujących do filtrów.' : 'No products match your filters.'}
        </div>
      )}
    </div>
    </div>
  );
}
