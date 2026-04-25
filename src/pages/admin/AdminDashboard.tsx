import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, Users, TrendingUp, Clock, ExternalLink, RefreshCw } from 'lucide-react';
import { PRODUCTS } from '../../data/products';

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
  statusCounts: Record<string, number>;
}

interface RecentOrder {
  stripeSessionId: string;
  status: string;
  amountTotal: number;
  currency: string;
  customer: { name: string; email: string };
  createdAt: string | null;
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
  return parts.join(' · ') || '0';
};

const formatDate = (iso: string | null): string => {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleString('pl-PL', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  } catch {
    return '—';
  }
};

const formatPrice = (amount: number, currency: string): string => {
  const major = (amount / 100).toFixed(2);
  if (currency === 'pln') return `${major} zł`;
  if (currency === 'gbp') return `£${major}`;
  if (currency === 'eur') return `€${major}`;
  return `${major} ${currency.toUpperCase()}`;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stripeMode, setStripeMode] = useState<'live' | 'test' | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const password = localStorage.getItem('px-admin-password') || '';
      const headers = { 'X-Admin-Password': password };

      const [statsRes, ordersRes, stripeRes] = await Promise.all([
        fetch('/api/admin-stats', { headers }),
        fetch('/api/admin-orders', { headers }),
        fetch('/api/admin-stripe', { headers }).catch(() => null),
      ]);

      if (!statsRes.ok) throw new Error(`Stats: HTTP ${statsRes.status}`);
      const statsData = await statsRes.json();
      setStats(statsData);

      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setRecentOrders((ordersData.orders || []).slice(0, 5));
      }

      if (stripeRes && stripeRes.ok) {
        const stripeData = await stripeRes.json();
        setStripeMode(stripeData.mode);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const lowStock = PRODUCTS.filter(p => p.stock_pl < 10 || p.stock_uk < 10);

  return (
    <div className="p-6 max-w-6xl">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold mb-1">Dashboard</h1>
          <p className="text-white/40 text-sm">Przegląd sklepu PEPTIVEX LABS</p>
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
          <p className="text-red-400 text-sm font-semibold mb-1">Błąd ładowania</p>
          <p className="text-white/50 text-xs font-mono">{error}</p>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={ShoppingCart}
          color="text-amber-400"
          label="Zamówienia dziś"
          value={stats ? String(stats.ordersToday) : '—'}
          sub={stats ? `${stats.ordersMonth} w tym mies.` : undefined}
        />
        <StatCard
          icon={TrendingUp}
          color="text-emerald-400"
          label="Przychód (mies.)"
          value={stats ? formatRevenue(stats.revenueMonth) : '—'}
          sub={stats ? `Rok: ${formatRevenue(stats.revenueYear)}` : undefined}
        />
        <StatCard
          icon={Package}
          color="text-violet-400"
          label="Produkty"
          value={String(PRODUCTS.length)}
          sub={`${lowStock.length} z niskim stanem`}
        />
        <StatCard
          icon={Users}
          color="text-sky-400"
          label="Klienci"
          value={stats ? String(stats.uniqueCustomers) : '—'}
          sub={stats ? `${stats.ordersTotal} zamówień łącznie` : undefined}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold flex items-center gap-2">
              <Clock size={16} className="text-amber-500" />
              Ostatnie zamówienia
            </h2>
            <Link to="/admin/orders" className="text-amber-400 text-xs hover:underline">Wszystkie →</Link>
          </div>
          {recentOrders.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-3xl mb-3 opacity-20">📦</div>
              <p className="text-white/30 text-sm">Brak zamówień</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {recentOrders.map(order => (
                <div key={order.stripeSessionId} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                  <div className="min-w-0 flex-1">
                    <p className="text-white text-sm truncate">{order.customer.name || order.customer.email}</p>
                    <p className="text-white/30 text-xs font-mono">#{order.stripeSessionId.slice(-12)} · {formatDate(order.createdAt)}</p>
                  </div>
                  <span className="text-amber-400 font-semibold text-sm whitespace-nowrap ml-3">
                    {formatPrice(order.amountTotal, order.currency)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold flex items-center gap-2">
              <Package size={16} className="text-amber-500" />
              Niski stan magazynowy
            </h2>
            <Link to="/admin/products" className="text-amber-400 text-xs hover:underline">Produkty →</Link>
          </div>
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

      {/* Top products */}
      {stats && stats.topProducts.length > 0 && (
        <div className="mt-6 bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
          <h2 className="text-white font-semibold mb-4">Top produkty (wszystkie zamówienia)</h2>
          <div className="space-y-2">
            {stats.topProducts.slice(0, 5).map(p => (
              <div key={p.name} className="flex items-center justify-between py-1.5">
                <span className="text-white/70 text-sm truncate flex-1">{p.name}</span>
                <span className="text-amber-400 text-xs font-semibold ml-3">{p.quantity}× sprzedanych</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Integration Status */}
      <div className="mt-6 bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
        <h2 className="text-white font-semibold mb-4">Status integracji</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <IntegrationCard
            name="Stripe"
            status={stripeMode === 'live' ? 'live' : stripeMode === 'test' ? 'test' : 'config'}
            desc={stripeMode === 'live' ? 'Prawdziwe płatności' : stripeMode === 'test' ? 'Tryb testowy' : 'Wymaga klucza API'}
            href="https://dashboard.stripe.com"
          />
          <IntegrationCard
            name="Resend (e-mail)"
            status="live"
            desc="orders@peptivexlabs.com"
            href="https://resend.com"
          />
          <IntegrationCard
            name="InPost"
            status="config"
            desc="Wkrótce — paczki ręcznie"
            href="https://manager.paczkomaty.pl"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, color, label, value, sub }: {
  icon: typeof Clock;
  color: string;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center">
          <Icon size={18} className={color} />
        </div>
      </div>
      <p className="text-white text-2xl font-bold">{value}</p>
      <p className="text-white/30 text-xs mt-1">{label}</p>
      {sub && <p className="text-white/20 text-[11px] mt-0.5">{sub}</p>}
    </div>
  );
}

function IntegrationCard({ name, status, desc, href }: {
  name: string;
  status: 'live' | 'test' | 'config';
  desc: string;
  href?: string;
}) {
  const colors = {
    live: 'bg-emerald-400',
    test: 'bg-sky-400',
    config: 'bg-amber-400',
  };
  const labels = { live: 'Live', test: 'Test', config: 'Setup' };
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
      <span className={`w-2 h-2 rounded-full ${colors[status]}`} />
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium flex items-center gap-1.5">
          {name}
          <span className="text-[10px] text-white/40 uppercase tracking-wide">{labels[status]}</span>
        </p>
        <p className="text-white/30 text-xs truncate">{desc}</p>
      </div>
      {href && (
        <a href={href} target="_blank" rel="noreferrer" className="text-white/30 hover:text-white/60">
          <ExternalLink size={12} />
        </a>
      )}
    </div>
  );
}
