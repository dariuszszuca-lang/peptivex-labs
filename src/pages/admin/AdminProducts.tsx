import { useState } from 'react';
import { Save, X, Search, Image, ChevronDown, ChevronUp, Upload } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import type { Product, ProductCategory, ProductFormat } from '../../types';

const CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: 'healing', label: 'Regeneracja' },
  { value: 'anti-aging', label: 'Anti-aging' },
  { value: 'metabolic', label: 'Metabolizm' },
  { value: 'growth-hormone', label: 'Hormon wzrostu' },
  { value: 'weight-loss', label: 'Odchudzanie' },
  { value: 'cognitive', label: 'Kognitywne' },
  { value: 'mitochondrial', label: 'Mitochondria' },
  { value: 'melanogenesis', label: 'Melanogeneza' },
  { value: 'cosmeceutical', label: 'Kosmeceutyki' },
];

const FORMATS: { value: ProductFormat; label: string }[] = [
  { value: 'vial', label: 'Fiolka' },
  { value: 'pen', label: 'Pen' },
  { value: 'capsule', label: 'Kapsułki' },
  { value: 'spray', label: 'Spray' },
];

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [editing, setEditing] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [editForm, setEditForm] = useState<Product | null>(null);

  const filtered = products.filter(p =>
    p.name_pl.toLowerCase().includes(search.toLowerCase()) ||
    p.name_en.toLowerCase().includes(search.toLowerCase()) ||
    p.dosage.toLowerCase().includes(search.toLowerCase())
  );

  const startEdit = (product: Product) => {
    setEditing(product.id);
    setEditForm({ ...product });
  };

  const saveEdit = () => {
    if (!editing || !editForm) return;
    setProducts(prev => prev.map(p => p.id === editing ? editForm : p));
    setEditing(null);
    setEditForm(null);
    // TODO: Save to Firestore
  };

  const cancelEdit = () => {
    setEditing(null);
    setEditForm(null);
  };

  const updateField = <K extends keyof Product>(key: K, value: Product[K]) => {
    if (!editForm) return;
    setEditForm({ ...editForm, [key]: value });
  };

  return (
    <div className="p-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[#0a0a0a] text-2xl font-bold mb-1">Produkty</h1>
          <p className="text-[#737373] text-sm">{products.length} produktów w katalogu</p>
        </div>
      </div>

      {/* Source-of-truth notice */}
      <div className="bg-[#fff7ed] border border-[#fed7aa] rounded-xl p-4 mb-6 text-xs text-[#525252]">
        <p className="font-semibold text-[#ea580c] mb-1">⚠ Produkty są zarządzane w kodzie</p>
        <p>
          Lista produktów, ceny (PLN/GBP) i opisy są w pliku <code className="bg-[#fafaf7] px-1.5 py-0.5 rounded">src/data/products.ts</code> oraz <code className="bg-[#fafaf7] px-1.5 py-0.5 rounded">api/_products.ts</code> (kopia dla Stripe).
          Edycja w panelu poniżej jest <strong>tylko lokalna</strong> — nie zapisuje się do bazy. Aby trwale zmienić produkt: edytuj kod, commit, push do GitHub.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373]" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Szukaj produktu..."
          className="w-full bg-[#fafaf7] border border-[#ececec] rounded-lg pl-10 pr-4 py-2.5 text-[#0a0a0a] text-sm focus:border-amber-500/40 focus:outline-none"
        />
      </div>

      {/* Product Cards */}
      <div className="flex flex-col gap-4">
        {filtered.map(product => {
          const isEditing = editing === product.id && editForm;

          return (
            <div key={product.id} className={`bg-[#fafaf7] border rounded-xl overflow-hidden transition-colors ${isEditing ? 'border-amber-500/30' : 'border-[#ececec]'}`}>
              {/* Card Header — always visible */}
              <div
                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-[#fafaf7] transition-colors"
                onClick={() => isEditing ? null : startEdit(product)}
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-lg bg-[#fafaf7] overflow-hidden shrink-0 border border-[#ececec]">
                  {product.image ? (
                    <img src={product.image} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center"><Image size={20} className="text-[#a3a3a3]" /></div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[#0a0a0a] font-semibold text-sm">{product.name_pl}</h3>
                    <span className="text-[#a3a3a3] text-xs">/ {product.name_en}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-[#fff7ed] text-[#ea580c]">{product.category}</span>
                    <span className="text-[#737373] text-xs">{product.dosage}</span>
                    <span className="text-[#737373] text-xs">{product.format}</span>
                  </div>
                </div>

                {/* Prices */}
                <div className="text-right shrink-0 hidden sm:block">
                  <p className="text-[#ea580c] font-bold text-sm">{(product.price_pln / 100).toFixed(2)} zł</p>
                  <p className="text-[#737373] text-xs">£{(product.price_gbp / 100).toFixed(2)}</p>
                </div>

                {/* Stock */}
                <div className="text-right shrink-0 hidden sm:block">
                  <p className={`text-xs ${product.stock_pl < 10 ? 'text-red-400' : 'text-[#737373]'}`}>PL: {product.stock_pl}</p>
                  <p className={`text-xs ${product.stock_uk < 10 ? 'text-red-400' : 'text-[#737373]'}`}>UK: {product.stock_uk}</p>
                </div>

                <div className="shrink-0 text-[#a3a3a3]">
                  {isEditing ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>

              {/* Expanded Edit Form */}
              {isEditing && editForm && (
                <div className="border-t border-[#ececec] p-5 bg-white/[0.01]">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Column 1: Image + Basic */}
                    <div className="flex flex-col gap-4">
                      <h4 className="text-[#525252] text-xs uppercase tracking-wide font-semibold">Zdjęcie</h4>
                      <div className="aspect-square rounded-xl bg-[#fafaf7] border border-dashed border-[#ececec] overflow-hidden relative group">
                        {editForm.image ? (
                          <img src={editForm.image} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                            <Upload size={24} className="text-[#a3a3a3]" />
                            <span className="text-[#a3a3a3] text-xs">Upuść zdjęcie lub kliknij</span>
                          </div>
                        )}
                        {/* TODO: File upload handler */}
                      </div>
                      <div>
                        <label className="text-[#737373] text-xs mb-1 block">URL zdjęcia</label>
                        <input
                          value={editForm.image || ''}
                          onChange={e => updateField('image', e.target.value || undefined)}
                          placeholder="/images/products/..."
                          className="w-full bg-[#fafaf7] border border-[#ececec] rounded-lg px-3 py-2 text-[#0a0a0a] text-xs font-mono focus:border-amber-500/40 focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[#737373] text-xs mb-1 block">Kategoria</label>
                          <select
                            value={editForm.category}
                            onChange={e => updateField('category', e.target.value as ProductCategory)}
                            className="w-full bg-[#fafaf7] border border-[#ececec] rounded-lg px-3 py-2 text-[#0a0a0a] text-sm focus:border-amber-500/40 focus:outline-none"
                          >
                            {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="text-[#737373] text-xs mb-1 block">Format</label>
                          <select
                            value={editForm.format}
                            onChange={e => updateField('format', e.target.value as ProductFormat)}
                            className="w-full bg-[#fafaf7] border border-[#ececec] rounded-lg px-3 py-2 text-[#0a0a0a] text-sm focus:border-amber-500/40 focus:outline-none"
                          >
                            {FORMATS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-[#737373] text-xs mb-1 block">Dawka</label>
                        <input
                          value={editForm.dosage}
                          onChange={e => updateField('dosage', e.target.value)}
                          className="w-full bg-[#fafaf7] border border-[#ececec] rounded-lg px-3 py-2 text-[#0a0a0a] text-sm focus:border-amber-500/40 focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editForm.featured}
                            onChange={e => updateField('featured', e.target.checked)}
                            className="accent-[#ea580c]"
                          />
                          <span className="text-[#525252] text-sm">Wyróżniony</span>
                        </label>
                      </div>
                    </div>

                    {/* Column 2: Names + Descriptions PL */}
                    <div className="flex flex-col gap-4">
                      <h4 className="text-[#525252] text-xs uppercase tracking-wide font-semibold">🇵🇱 Wersja polska</h4>
                      <div>
                        <label className="text-[#737373] text-xs mb-1 block">Nazwa PL</label>
                        <input
                          value={editForm.name_pl}
                          onChange={e => updateField('name_pl', e.target.value)}
                          className="w-full bg-[#fafaf7] border border-[#ececec] rounded-lg px-3 py-2 text-[#0a0a0a] text-sm focus:border-amber-500/40 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[#737373] text-xs mb-1 block">Krótki opis PL</label>
                        <textarea
                          value={editForm.short_pl}
                          onChange={e => updateField('short_pl', e.target.value)}
                          rows={2}
                          className="w-full bg-[#fafaf7] border border-[#ececec] rounded-lg px-3 py-2 text-[#0a0a0a] text-sm focus:border-amber-500/40 focus:outline-none resize-none"
                        />
                      </div>
                      <div>
                        <label className="text-[#737373] text-xs mb-1 block">Opis pełny PL</label>
                        <textarea
                          value={editForm.description_pl}
                          onChange={e => updateField('description_pl', e.target.value)}
                          rows={5}
                          className="w-full bg-[#fafaf7] border border-[#ececec] rounded-lg px-3 py-2 text-[#0a0a0a] text-sm focus:border-amber-500/40 focus:outline-none resize-none"
                        />
                      </div>

                      {/* Prices + Stock */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[#737373] text-xs mb-1 block">Cena PLN (zł)</label>
                          <input
                            type="number"
                            step="0.01"
                            value={(editForm.price_pln / 100).toFixed(2)}
                            onChange={e => updateField('price_pln', Math.round(Number(e.target.value) * 100))}
                            className="w-full bg-[#fafaf7] border border-[#ececec] rounded-lg px-3 py-2 text-[#ea580c] text-sm font-bold focus:border-amber-500/40 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[#737373] text-xs mb-1 block">Stock PL</label>
                          <input
                            type="number"
                            value={editForm.stock_pl}
                            onChange={e => updateField('stock_pl', Number(e.target.value))}
                            className={`w-full bg-[#fafaf7] border border-[#ececec] rounded-lg px-3 py-2 text-sm focus:border-amber-500/40 focus:outline-none ${editForm.stock_pl < 10 ? 'text-red-400' : 'text-[#0a0a0a]'}`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Column 3: Names + Descriptions EN */}
                    <div className="flex flex-col gap-4">
                      <h4 className="text-[#525252] text-xs uppercase tracking-wide font-semibold">🇬🇧 English version</h4>
                      <div>
                        <label className="text-[#737373] text-xs mb-1 block">Name EN</label>
                        <input
                          value={editForm.name_en}
                          onChange={e => updateField('name_en', e.target.value)}
                          className="w-full bg-[#fafaf7] border border-[#ececec] rounded-lg px-3 py-2 text-[#0a0a0a] text-sm focus:border-amber-500/40 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[#737373] text-xs mb-1 block">Short description EN</label>
                        <textarea
                          value={editForm.short_en}
                          onChange={e => updateField('short_en', e.target.value)}
                          rows={2}
                          className="w-full bg-[#fafaf7] border border-[#ececec] rounded-lg px-3 py-2 text-[#0a0a0a] text-sm focus:border-amber-500/40 focus:outline-none resize-none"
                        />
                      </div>
                      <div>
                        <label className="text-[#737373] text-xs mb-1 block">Full description EN</label>
                        <textarea
                          value={editForm.description_en}
                          onChange={e => updateField('description_en', e.target.value)}
                          rows={5}
                          className="w-full bg-[#fafaf7] border border-[#ececec] rounded-lg px-3 py-2 text-[#0a0a0a] text-sm focus:border-amber-500/40 focus:outline-none resize-none"
                        />
                      </div>

                      {/* GBP Price + Stock */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[#737373] text-xs mb-1 block">Cena GBP (£)</label>
                          <input
                            type="number"
                            step="0.01"
                            value={(editForm.price_gbp / 100).toFixed(2)}
                            onChange={e => updateField('price_gbp', Math.round(Number(e.target.value) * 100))}
                            className="w-full bg-[#fafaf7] border border-[#ececec] rounded-lg px-3 py-2 text-[#ea580c] text-sm font-bold focus:border-amber-500/40 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[#737373] text-xs mb-1 block">Stock UK</label>
                          <input
                            type="number"
                            value={editForm.stock_uk}
                            onChange={e => updateField('stock_uk', Number(e.target.value))}
                            className={`w-full bg-[#fafaf7] border border-[#ececec] rounded-lg px-3 py-2 text-sm focus:border-amber-500/40 focus:outline-none ${editForm.stock_uk < 10 ? 'text-red-400' : 'text-[#0a0a0a]'}`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#ececec]">
                    <button
                      onClick={() => {
                        if (confirm('Usunąć produkt?')) {
                          setProducts(prev => prev.filter(p => p.id !== product.id));
                          cancelEdit();
                        }
                      }}
                      className="text-red-400/60 hover:text-red-400 text-sm transition-colors"
                    >
                      Usuń produkt
                    </button>
                    <div className="flex gap-3">
                      <button
                        onClick={cancelEdit}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#737373] hover:text-[#525252] text-sm transition-colors border border-[#ececec] hover:border-[#ececec]"
                      >
                        <X size={14} /> Anuluj
                      </button>
                      <button
                        onClick={saveEdit}
                        className="flex items-center gap-1.5 bg-[#ea580c] text-[#0a0a0a] font-semibold px-5 py-2 rounded-lg hover:bg-[#c2410c] transition-colors text-sm"
                      >
                        <Save size={14} /> Zapisz zmiany
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
