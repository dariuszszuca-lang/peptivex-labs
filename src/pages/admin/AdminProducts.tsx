import { useState } from 'react';
import { Plus, Edit3, Trash2, Save, X, Search, Image } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import type { Product } from '../../types';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [editing, setEditing] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [editForm, setEditForm] = useState<Partial<Product>>({});

  const filtered = products.filter(p =>
    p.name_pl.toLowerCase().includes(search.toLowerCase()) ||
    p.name_en.toLowerCase().includes(search.toLowerCase())
  );

  const startEdit = (product: Product) => {
    setEditing(product.id);
    setEditForm({ ...product });
  };

  const saveEdit = () => {
    if (!editing) return;
    setProducts(prev => prev.map(p => p.id === editing ? { ...p, ...editForm } as Product : p));
    setEditing(null);
    // TODO: Save to Firestore
  };

  const deleteProduct = (id: string) => {
    if (confirm('Usunąć produkt?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
      // TODO: Delete from Firestore
    }
  };

  return (
    <div className="p-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-2xl font-bold mb-1">Produkty</h1>
          <p className="text-white/40 text-sm">{products.length} produktów w katalogu</p>
        </div>
        <button className="flex items-center gap-2 bg-amber-500 text-black font-semibold px-4 py-2 rounded-lg hover:bg-amber-400 transition-colors text-sm">
          <Plus size={16} />
          Dodaj produkt
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Szukaj produktu..."
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-10 pr-4 py-2.5 text-white text-sm focus:border-amber-500/40 focus:outline-none"
        />
      </div>

      {/* Products Table */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="text-left text-white/40 text-xs uppercase tracking-wide px-4 py-3">Produkt</th>
              <th className="text-left text-white/40 text-xs uppercase tracking-wide px-4 py-3">Dawka</th>
              <th className="text-left text-white/40 text-xs uppercase tracking-wide px-4 py-3">Cena PLN</th>
              <th className="text-left text-white/40 text-xs uppercase tracking-wide px-4 py-3">Cena GBP</th>
              <th className="text-left text-white/40 text-xs uppercase tracking-wide px-4 py-3">Stock PL</th>
              <th className="text-left text-white/40 text-xs uppercase tracking-wide px-4 py-3">Stock UK</th>
              <th className="text-left text-white/40 text-xs uppercase tracking-wide px-4 py-3">Kategoria</th>
              <th className="text-right text-white/40 text-xs uppercase tracking-wide px-4 py-3">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(product => (
              <tr key={product.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                {editing === product.id ? (
                  /* Edit mode */
                  <>
                    <td className="px-4 py-3">
                      <input
                        value={editForm.name_pl || ''}
                        onChange={e => setEditForm({ ...editForm, name_pl: e.target.value })}
                        className="bg-white/[0.06] border border-amber-500/30 rounded px-2 py-1 text-white text-sm w-full focus:outline-none"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        value={editForm.dosage || ''}
                        onChange={e => setEditForm({ ...editForm, dosage: e.target.value })}
                        className="bg-white/[0.06] border border-amber-500/30 rounded px-2 py-1 text-white text-sm w-20 focus:outline-none"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={editForm.price_pln ? editForm.price_pln / 100 : ''}
                        onChange={e => setEditForm({ ...editForm, price_pln: Math.round(Number(e.target.value) * 100) })}
                        className="bg-white/[0.06] border border-amber-500/30 rounded px-2 py-1 text-white text-sm w-24 focus:outline-none"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={editForm.price_gbp ? editForm.price_gbp / 100 : ''}
                        onChange={e => setEditForm({ ...editForm, price_gbp: Math.round(Number(e.target.value) * 100) })}
                        className="bg-white/[0.06] border border-amber-500/30 rounded px-2 py-1 text-white text-sm w-24 focus:outline-none"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={editForm.stock_pl ?? ''}
                        onChange={e => setEditForm({ ...editForm, stock_pl: Number(e.target.value) })}
                        className="bg-white/[0.06] border border-amber-500/30 rounded px-2 py-1 text-white text-sm w-16 focus:outline-none"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={editForm.stock_uk ?? ''}
                        onChange={e => setEditForm({ ...editForm, stock_uk: Number(e.target.value) })}
                        className="bg-white/[0.06] border border-amber-500/30 rounded px-2 py-1 text-white text-sm w-16 focus:outline-none"
                      />
                    </td>
                    <td className="px-4 py-3 text-white/40 text-sm">{product.category}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={saveEdit} className="p-1.5 rounded hover:bg-emerald-500/10 text-emerald-400 transition-colors">
                          <Save size={14} />
                        </button>
                        <button onClick={() => setEditing(null)} className="p-1.5 rounded hover:bg-white/[0.06] text-white/30 transition-colors">
                          <X size={14} />
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  /* View mode */
                  <>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-white/[0.04] overflow-hidden shrink-0">
                          {product.image ? (
                            <img src={product.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center"><Image size={12} className="text-white/20" /></div>
                          )}
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{product.name_pl}</p>
                          <p className="text-white/20 text-xs">{product.name_en}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-white/50 text-sm">{product.dosage}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-white text-sm font-medium">{(product.price_pln / 100).toFixed(2)} zł</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-white text-sm font-medium">£{(product.price_gbp / 100).toFixed(2)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm ${product.stock_pl < 10 ? 'text-red-400 font-medium' : 'text-white/50'}`}>
                        {product.stock_pl}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm ${product.stock_uk < 10 ? 'text-red-400 font-medium' : 'text-white/50'}`}>
                        {product.stock_uk}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400">{product.category}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => startEdit(product)} className="p-1.5 rounded hover:bg-amber-500/10 text-white/30 hover:text-amber-400 transition-colors">
                          <Edit3 size={14} />
                        </button>
                        <button onClick={() => deleteProduct(product.id)} className="p-1.5 rounded hover:bg-red-500/10 text-white/30 hover:text-red-400 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
