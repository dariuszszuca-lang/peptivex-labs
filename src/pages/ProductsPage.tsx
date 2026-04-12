import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import HexPattern from '../components/home/HexPattern';
import SeoHead from '../components/SeoHead';
import ParticleField from '../components/home/ParticleField';
import type { ProductCategory } from '../types';

export default function ProductsPage() {
  const { lang, t } = useLanguage();
  const pl = lang === 'pl';
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');

  const activeCategory = searchParams.get('category') as ProductCategory | null;
  const categories: ProductCategory[] = ['healing', 'anti-aging', 'metabolic', 'growth-hormone', 'cognitive', 'weight-loss', 'mitochondrial', 'melanogenesis', 'cosmeceutical'];

  const filtered = useMemo(() => {
    let result = [...PRODUCTS].sort((a, b) => a.order - b.order);
    if (activeCategory) result = result.filter(p => p.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p => p.name_pl.toLowerCase().includes(q) || p.name_en.toLowerCase().includes(q) || p.dosage.toLowerCase().includes(q));
    }
    return result;
  }, [activeCategory, search]);

  return (
    <div>
      <SeoHead
        title={pl ? 'Katalog peptydów badawczych' : 'Research Peptide Catalog'}
        description={pl ? '19 peptydów badawczych o czystości >98% HPLC. BPC-157, Retatrutide, NAD+, GHK-Cu, Ipamorelin. Szybka dostawa InPost.' : '19 research peptides with >98% HPLC purity. BPC-157, Retatrutide, NAD+, GHK-Cu, Ipamorelin. Fast InPost delivery.'}
        path={`/${lang}/products`}
      />
      {/* Hero header */}
      <div className="relative overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/[0.1] via-[#0c0a08] to-[#0c0a08]" />
        <HexPattern className="text-amber-500/[0.03]" />
        <ParticleField />
        <div className="absolute top-0 right-1/4 w-[300px] h-[300px] rounded-full bg-amber-500/[0.06] blur-[100px]" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-4">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <span className="text-amber-400 text-xs font-medium">{filtered.length} {pl ? 'produktów' : 'products'}</span>
          </div>
          <h1 className="text-white text-3xl sm:text-4xl font-extrabold mb-3">
            {pl ? (
              <><span className="text-gradient">Katalog</span> peptydów</>
            ) : (
              <>Peptide <span className="text-gradient">Catalog</span></>
            )}
          </h1>
          <p className="text-white/40 text-sm max-w-lg">{pl ? 'Peptydy badawcze o czystości >98%. Każda partia z certyfikatem HPLC.' : 'Research peptides with >98% purity. Every batch HPLC certified.'}</p>
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
              placeholder={pl ? 'Szukaj produktu...' : 'Search products...'}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder:text-white/30 focus:border-amber-500/40 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setSearchParams({})}
            className={`text-xs px-4 py-2 rounded-full border transition-all ${!activeCategory ? 'bg-amber-500/15 border-amber-500/40 text-amber-400 shadow-[0_0_15px_rgba(249,115,22,0.1)]' : 'bg-white/[0.03] border-white/10 text-white/40 hover:border-amber-500/20'}`}
          >
            {pl ? 'Wszystkie' : 'All'}
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSearchParams({ category: cat })}
              className={`text-xs px-4 py-2 rounded-full border transition-all ${activeCategory === cat ? 'bg-amber-500/15 border-amber-500/40 text-amber-400 shadow-[0_0_15px_rgba(249,115,22,0.1)]' : 'bg-white/[0.03] border-white/10 text-white/40 hover:border-amber-500/20'}`}
            >
              {t(`categories.${cat}`)}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-4xl mb-4 opacity-20">🔍</div>
            <p className="text-white/30">{pl ? 'Brak produktów pasujących do filtrów.' : 'No products match your filters.'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
