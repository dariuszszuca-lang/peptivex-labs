import { useCallback, useEffect, useState } from 'react';
import { BarChart3, TrendingUp, Package, RefreshCw } from 'lucide-react';

interface StatsResponse {
  ordersTotal: number;
  ordersToday: number;
  ordersMonth: number;
  ordersYear: number;
  revenueMonth: Record<string, number>;
  revenueYear: Record<string, number>;
  revenueAllTime: Record<string, number>;
  uniqueCustomers: number;
  topProducts: { name: string; quantity: number; revenue: Record<string, number> }[];
  langCounts: Record<string, number>;
  statusCounts: Record<string, number>;
  ordersByDay: Record<string, number>;
}

const formatRevenue = (rev: Record<string, number>): string => {
  const parts: string[] = [];
  for (const [curr, amount] of Object.entries(rev)) {
    const major = (amount / 100).toFixed(2);
    if (curr === 'pln') parts.push(`${major} zł`);
    else if (curr === 'gbp') parts.push(`£${major}`);
    else if (curr === 'eur') parts.push(`€${major}`);
    else parts.push(`${major} ${curr.toUpperCase()}`);
  }
  return parts.join(' · ') || '—';
};

const formatPrice = (amount: number, currency: string): string => {
  const major = (amount / 100).toFixed(2);
  if (currency === 'pln') return `${major} zł`;
  if (currency === 'gbp') return `£${major}`;
  if (currency === 'eur') return `€${major}`;
  return `${major} ${currency.toUpperCase()}`;
};

export default function AdminStats() {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const password = localStorage.getItem('px-admin-password') || '';
      const res = await fetch('/api/admin-stats', { headers: { 'X-Admin-Password': password } });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      setStats(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // Daily orders chart data (last 30 days, sorted oldest → newest)
  const dailyEntries = stats
    ? Object.entries(stats.ordersByDay).sort((a, b) => a[0].localeCompare(b[0]))
    : [];
  const maxDaily = Math.max(1, ...dailyEntries.map(([, v]) => v));

  // Lang split
  const langTotal = stats ? Object.values(stats.langCounts).reduce((a, b) => a + b, 0) : 0;

  // Status counts
  const statusOrder = ['paid', 'shipped', 'delivered', 'cancelled'] as const;
  const statusLabels: Record<string, string> = {
    paid: 'Opłacone',
    shipped: 'Wysłane',
    delivered: 'Dostarczone',
    cancelled: 'Anulowane',
    new: 'Nowe',
  };
  const statusColors: Record<string, string> = {
    paid: 'bg-amber-500',
    shipped: 'bg-violet-500',
    delivered: 'bg-emerald-500',
    cancelled: 'bg-red-500',
    new: 'bg-sky-500',
  };

  return (
    <div className="p-6 max-w-6xl">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold mb-1">Statystyki</h1>
          <p className="text-white/40 text-sm">Przychody, zamówienia, trendy</p>
        </div>
        <button
          onClick={load}
          className="bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white/70 px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors"
        >
          <RefreshCw size={12} className={loading ? 'animate-spin' : ''} /> Odśwież
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
          <p className="text-red-400 text-sm font-semibold mb-1">Błąd</p>
          <p className="text-white/50 text-xs font-mono break-all">{error}</p>
        </div>
      )}

      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SummaryCard label="Razem zamówień" value={stats ? String(stats.ordersTotal) : '—'} />
        <SummaryCard label="Klienci" value={stats ? String(stats.uniqueCustomers) : '—'} />
        <SummaryCard label="Przychód roczny" value={stats ? formatRevenue(stats.revenueYear) : '—'} highlight />
        <SummaryCard label="Przychód all-time" value={stats ? formatRevenue(stats.revenueAllTime) : '—'} highlight />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily orders chart */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-amber-500" />
            <h3 className="text-white font-semibold text-sm">Zamówienia — ostatnie 30 dni</h3>
          </div>
          {dailyEntries.length === 0 ? (
            <div className="h-40 flex items-center justify-center border border-dashed border-white/[0.06] rounded-lg">
              <p className="text-white/20 text-sm">Brak danych</p>
            </div>
          ) : (
            <div className="flex items-end gap-1 h-40">
              {dailyEntries.map(([day, count]) => (
                <div
                  key={day}
                  className="flex-1 flex flex-col items-center justify-end group relative"
                >
                  <div
                    className={`w-full rounded-t ${count > 0 ? 'bg-amber-500/60 group-hover:bg-amber-400' : 'bg-white/[0.04]'} transition-colors`}
                    style={{ height: `${(count / maxDaily) * 100}%`, minHeight: count > 0 ? '4px' : '2px' }}
                  />
                  <div className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none z-10">
                    {day}: {count}
                  </div>
                </div>
              ))}
            </div>
          )}
          <p className="text-white/30 text-[11px] mt-2">Łącznie ten miesiąc: {stats?.ordersMonth ?? '—'}</p>
        </div>

        {/* Top products */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Package size={16} className="text-amber-500" />
            <h3 className="text-white font-semibold text-sm">Najpopularniejsze produkty</h3>
          </div>
          {!stats || stats.topProducts.length === 0 ? (
            <div className="h-40 flex items-center justify-center border border-dashed border-white/[0.06] rounded-lg">
              <p className="text-white/20 text-sm">Brak sprzedaży</p>
            </div>
          ) : (
            <div className="space-y-2">
              {stats.topProducts.slice(0, 8).map(p => {
                const maxQty = stats.topProducts[0].quantity;
                return (
                  <div key={p.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/70 truncate flex-1">{p.name}</span>
                      <span className="text-amber-400 font-semibold ml-2">{p.quantity}×</span>
                    </div>
                    <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500/60 rounded-full" style={{ width: `${(p.quantity / maxQty) * 100}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Status split */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={16} className="text-amber-500" />
            <h3 className="text-white font-semibold text-sm">Statusy zamówień</h3>
          </div>
          <div className="space-y-2">
            {statusOrder.map(s => {
              const count = stats?.statusCounts[s] || 0;
              const total = stats?.ordersTotal || 1;
              const percent = (count / total) * 100;
              return (
                <div key={s}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/70">{statusLabels[s]}</span>
                    <span className="text-white/50">{count}</span>
                  </div>
                  <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                    <div className={`h-full ${statusColors[s]} rounded-full opacity-60`} style={{ width: `${percent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lang split */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={16} className="text-amber-500" />
            <h3 className="text-white font-semibold text-sm">Języki zamówień</h3>
          </div>
          {langTotal === 0 ? (
            <div className="h-40 flex items-center justify-center border border-dashed border-white/[0.06] rounded-lg">
              <p className="text-white/20 text-sm">Brak danych</p>
            </div>
          ) : (
            <div className="space-y-2">
              {Object.entries(stats!.langCounts).map(([lang, count]) => {
                const percent = (count / langTotal) * 100;
                const flag = lang === 'pl' ? '🇵🇱' : lang === 'en' ? '🇬🇧' : lang === 'es' ? '🇪🇸' : '🌐';
                return (
                  <div key={lang}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/70">{flag} {lang.toUpperCase()}</span>
                      <span className="text-white/50">{count} ({percent.toFixed(0)}%)</span>
                    </div>
                    <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                      <div className="h-full bg-sky-500/60 rounded-full" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Top products revenue table */}
      {stats && stats.topProducts.length > 0 && (
        <div className="mt-6 bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
          <h3 className="text-white font-semibold text-sm mb-4">Przychód per produkt</h3>
          <div className="space-y-1">
            {stats.topProducts.map(p => (
              <div key={p.name} className="flex justify-between py-1.5 border-b border-white/[0.04] last:border-0">
                <span className="text-white/70 text-sm">{p.name}</span>
                <div className="flex gap-3">
                  <span className="text-white/40 text-xs">{p.quantity}×</span>
                  <span className="text-amber-400 text-sm font-semibold">
                    {Object.entries(p.revenue).map(([c, a]) => formatPrice(a, c)).join(' · ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
      <p className={`text-${highlight ? 'amber-400' : 'white'} text-lg font-bold leading-tight`}>{value}</p>
      <p className="text-white/30 text-xs mt-1">{label}</p>
    </div>
  );
}
