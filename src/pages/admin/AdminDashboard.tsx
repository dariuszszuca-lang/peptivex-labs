import { Package, ShoppingCart, Users, TrendingUp, ArrowUp, ArrowDown, Clock } from 'lucide-react';
import { PRODUCTS } from '../../data/products';

export default function AdminDashboard() {
  // TODO: Replace with real Firestore data
  const stats = [
    { label: 'Zamówienia dziś', value: '0', change: null, icon: ShoppingCart, color: 'text-amber-400' },
    { label: 'Przychód (mies.)', value: '0 zł', change: null, icon: TrendingUp, color: 'text-emerald-400' },
    { label: 'Produkty', value: String(PRODUCTS.length), change: null, icon: Package, color: 'text-violet-400' },
    { label: 'Klienci', value: '0', change: null, icon: Users, color: 'text-sky-400' },
  ];

  const recentOrders = [
    // Placeholder - will come from Firestore
  ];

  const lowStock = PRODUCTS.filter(p => p.stock_pl < 10 || p.stock_uk < 10);

  return (
    <div className="p-6 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-white text-2xl font-bold mb-1">Dashboard</h1>
        <p className="text-white/40 text-sm">Przegląd sklepu PEPTIVEX LABS</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center`}>
                <stat.icon size={18} className={stat.color} />
              </div>
              {stat.change !== null && (
                <span className={`text-xs flex items-center gap-0.5 ${Number(stat.change) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {Number(stat.change) >= 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                  {stat.change}%
                </span>
              )}
            </div>
            <p className="text-white text-2xl font-bold">{stat.value}</p>
            <p className="text-white/30 text-xs mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
          <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Clock size={16} className="text-amber-500" />
            Ostatnie zamówienia
          </h2>
          {recentOrders.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-3xl mb-3 opacity-20">📦</div>
              <p className="text-white/30 text-sm">Brak zamówień</p>
              <p className="text-white/15 text-xs mt-1">Zamówienia pojawią się po integracji Stripe</p>
            </div>
          ) : null}
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
          <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Package size={16} className="text-amber-500" />
            Niski stan magazynowy
          </h2>
          {lowStock.length > 0 ? (
            <div className="flex flex-col gap-2">
              {lowStock.slice(0, 6).map(p => (
                <div key={p.id} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                  <div>
                    <span className="text-white text-sm">{p.name_pl}</span>
                    <span className="text-white/20 text-xs ml-2">{p.dosage}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className={`text-xs px-2 py-0.5 rounded ${p.stock_pl < 10 ? 'bg-red-500/10 text-red-400' : 'bg-white/[0.04] text-white/30'}`}>
                      PL: {p.stock_pl}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded ${p.stock_uk < 10 ? 'bg-red-500/10 text-red-400' : 'bg-white/[0.04] text-white/30'}`}>
                      UK: {p.stock_uk}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/30 text-sm text-center py-10">Wszystkie produkty mają wystarczający stan</p>
          )}
        </div>
      </div>

      {/* Integration Status */}
      <div className="mt-6 bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
        <h2 className="text-white font-semibold mb-4">Status integracji</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { name: 'Stripe', status: 'config', desc: 'Wymaga klucza API' },
            { name: 'InPost PL', status: 'config', desc: 'Wymaga konta Business' },
            { name: 'InPost UK', status: 'config', desc: 'Wymaga konta Business' },
          ].map((int, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <span className={`w-2 h-2 rounded-full ${int.status === 'active' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <div>
                <p className="text-white text-sm font-medium">{int.name}</p>
                <p className="text-white/30 text-xs">{int.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
