import { BarChart3, TrendingUp, Package, ShoppingCart } from 'lucide-react';

export default function AdminStats() {
  return (
    <div className="p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold mb-1">Statystyki</h1>
        <p className="text-white/40 text-sm">Przychody, zamówienia, trendy</p>
      </div>

      {/* Charts placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[
          { title: 'Przychód miesięczny', icon: TrendingUp, desc: 'Wykres przychodów po integracji Stripe' },
          { title: 'Zamówienia', icon: ShoppingCart, desc: 'Wykres zamówień dziennych' },
          { title: 'Najpopularniejsze produkty', icon: Package, desc: 'Ranking sprzedaży produktów' },
          { title: 'Regiony', icon: BarChart3, desc: 'Podział zamówień PL / UK' },
        ].map((chart, i) => (
          <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <chart.icon size={16} className="text-amber-500" />
              <h3 className="text-white font-semibold text-sm">{chart.title}</h3>
            </div>
            <div className="h-40 flex items-center justify-center border border-dashed border-white/[0.06] rounded-lg">
              <p className="text-white/20 text-sm">{chart.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
