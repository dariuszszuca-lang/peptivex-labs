import { Search, Eye, Truck, CheckCircle, XCircle, Clock, ExternalLink, RefreshCw } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

type OrderStatus = 'paid' | 'shipped' | 'delivered' | 'cancelled' | 'new';

interface ApiOrder {
  stripeSessionId: string;
  status: OrderStatus;
  amountTotal: number;
  currency: string;
  lang: 'pl' | 'en' | 'es';
  items: { name: string; quantity: number; amount: number }[];
  customer: { name: string; email: string; phone: string | null };
  shippingAddress: { line1?: string | null; line2?: string | null; postal_code?: string | null; city?: string | null; country?: string | null } | null;
  shippingName: string | null;
  trackingNumber: string | null;
  carrier: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: typeof Clock }> = {
  new: { label: 'Nowe', color: 'text-sky-400 bg-sky-500/10', icon: Clock },
  paid: { label: 'Opłacone', color: 'text-amber-400 bg-amber-500/10', icon: CheckCircle },
  shipped: { label: 'Wysłane', color: 'text-violet-400 bg-violet-500/10', icon: Truck },
  delivered: { label: 'Dostarczone', color: 'text-emerald-400 bg-emerald-500/10', icon: CheckCircle },
  cancelled: { label: 'Anulowane', color: 'text-red-400 bg-red-500/10', icon: XCircle },
};

const formatPrice = (amount: number, currency: string): string => {
  const major = (amount / 100).toFixed(2);
  if (currency === 'pln') return `${major} zł`;
  if (currency === 'gbp') return `£${major}`;
  if (currency === 'eur') return `€${major}`;
  return `${major} ${currency.toUpperCase()}`;
};

const formatDate = (iso: string | null): string => {
  if (!iso) return '—';
  try {
    const d = new Date(iso);
    return d.toLocaleString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch {
    return '—';
  }
};

const formatAddress = (a: ApiOrder['shippingAddress']): string => {
  if (!a) return '—';
  return [a.line1, a.line2, a.postal_code, a.city, a.country].filter(Boolean).join(', ');
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<ApiOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [openOrder, setOpenOrder] = useState<ApiOrder | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const password = localStorage.getItem('px-admin-password') || '';
      const res = await fetch('/api/admin-orders', {
        headers: { 'X-Admin-Password': password },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      setOrders(data.orders || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = orders.filter(o => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (search) {
      const s = search.toLowerCase();
      const haystack = `${o.customer.name} ${o.customer.email} ${o.stripeSessionId}`.toLowerCase();
      if (!haystack.includes(s)) return false;
    }
    return true;
  });

  const updateOrder = async (orderId: string, updates: { status?: OrderStatus; trackingNumber?: string | null; carrier?: string | null }) => {
    try {
      const password = localStorage.getItem('px-admin-password') || '';
      const res = await fetch('/api/admin-orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Password': password },
        body: JSON.stringify({ orderId, ...updates }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      await load();
      if (openOrder && openOrder.stripeSessionId === orderId) {
        setOpenOrder({ ...openOrder, ...updates } as ApiOrder);
      }
    } catch (e) {
      alert(`Błąd zapisu: ${e instanceof Error ? e.message : String(e)}`);
    }
  };

  return (
    <div className="p-6 max-w-6xl">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold mb-1">Zamówienia</h1>
          <p className="text-white/40 text-sm">{orders.length} zamówień łącznie</p>
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

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Szukaj po kliencie, emailu lub ID..."
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-10 pr-4 py-2.5 text-white text-sm focus:border-amber-500/40 focus:outline-none"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['all', 'paid', 'shipped', 'delivered', 'cancelled'] as const).map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`text-xs px-3 py-2 rounded-lg border transition-all ${
                statusFilter === s
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                  : 'bg-white/[0.02] border-white/[0.06] text-white/30 hover:text-white/50'
              }`}
            >
              {s === 'all' ? 'Wszystkie' : statusConfig[s].label}
            </button>
          ))}
        </div>
      </div>

      {!loading && filtered.length === 0 && !error ? (
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-16 text-center">
          <div className="text-4xl mb-4 opacity-20">📦</div>
          <h2 className="text-white text-lg font-semibold mb-2">{orders.length === 0 ? 'Brak zamówień' : 'Brak wyników'}</h2>
          <p className="text-white/30 text-sm max-w-sm mx-auto">
            {orders.length === 0 ? 'Pierwsze zamówienie pojawi się tu po pierwszej płatności.' : 'Zmień filtry lub wyszukiwanie.'}
          </p>
        </div>
      ) : (
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left text-white/40 text-xs uppercase tracking-wide px-4 py-3">ID</th>
                <th className="text-left text-white/40 text-xs uppercase tracking-wide px-4 py-3">Data</th>
                <th className="text-left text-white/40 text-xs uppercase tracking-wide px-4 py-3">Klient</th>
                <th className="text-left text-white/40 text-xs uppercase tracking-wide px-4 py-3">Produkty</th>
                <th className="text-left text-white/40 text-xs uppercase tracking-wide px-4 py-3">Kwota</th>
                <th className="text-left text-white/40 text-xs uppercase tracking-wide px-4 py-3">Lang</th>
                <th className="text-left text-white/40 text-xs uppercase tracking-wide px-4 py-3">Status</th>
                <th className="text-right text-white/40 text-xs uppercase tracking-wide px-4 py-3">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(order => {
                const sc = statusConfig[order.status];
                const itemsLabel = order.items.map(i => `${i.quantity}× ${i.name}`).join(', ');
                return (
                  <tr key={order.stripeSessionId} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                    <td className="px-4 py-3 text-white/50 text-xs font-mono">{order.stripeSessionId.slice(-12)}</td>
                    <td className="px-4 py-3 text-white/40 text-sm whitespace-nowrap">{formatDate(order.createdAt)}</td>
                    <td className="px-4 py-3">
                      <p className="text-white text-sm">{order.customer.name || '—'}</p>
                      <p className="text-white/20 text-xs">{order.customer.email}</p>
                    </td>
                    <td className="px-4 py-3 text-white/50 text-sm max-w-[200px] truncate" title={itemsLabel}>{itemsLabel}</td>
                    <td className="px-4 py-3 text-white font-medium text-sm whitespace-nowrap">{formatPrice(order.amountTotal, order.currency)}</td>
                    <td className="px-4 py-3 text-white/50 text-sm uppercase">{order.lang}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${sc.color}`}>
                        {sc.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setOpenOrder(order)}
                        className="p-1.5 rounded hover:bg-white/[0.06] text-white/30 hover:text-white transition-colors"
                      >
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {openOrder && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setOpenOrder(null)}>
          <div
            onClick={e => e.stopPropagation()}
            className="bg-[#0e0c09] border border-white/[0.08] rounded-2xl p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-white text-lg font-bold">Zamówienie #{openOrder.stripeSessionId.slice(-12)}</h2>
                <p className="text-white/40 text-xs">{formatDate(openOrder.createdAt)}</p>
              </div>
              <a
                href={`https://dashboard.stripe.com/${openOrder.stripeSessionId.startsWith('cs_test') ? 'test/' : ''}payments/${openOrder.stripeSessionId}`}
                target="_blank"
                rel="noreferrer"
                className="text-amber-400 text-xs flex items-center gap-1 hover:underline"
              >
                Stripe <ExternalLink size={12} />
              </a>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-white/[0.06] pb-2">
                <span className="text-white/40">Status</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${statusConfig[openOrder.status].color}`}>
                  {statusConfig[openOrder.status].label}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/[0.06] pb-2">
                <span className="text-white/40">Kwota</span>
                <span className="text-amber-400 font-bold">{formatPrice(openOrder.amountTotal, openOrder.currency)}</span>
              </div>
              <div className="border-b border-white/[0.06] pb-2">
                <p className="text-white/40 text-xs uppercase tracking-wide mb-1">Produkty</p>
                {openOrder.items.map((it, i) => (
                  <div key={i} className="flex justify-between text-white/70 text-sm">
                    <span>{it.quantity}× {it.name}</span>
                    <span>{formatPrice(it.amount, openOrder.currency)}</span>
                  </div>
                ))}
              </div>
              <div className="border-b border-white/[0.06] pb-2">
                <p className="text-white/40 text-xs uppercase tracking-wide mb-1">Klient</p>
                <p className="text-white">{openOrder.customer.name}</p>
                <p className="text-white/60">{openOrder.customer.email}</p>
                {openOrder.customer.phone && <p className="text-white/60">{openOrder.customer.phone}</p>}
              </div>
              {openOrder.shippingAddress && (
                <div className="border-b border-white/[0.06] pb-2">
                  <p className="text-white/40 text-xs uppercase tracking-wide mb-1">Adres dostawy</p>
                  <p className="text-white/70">{openOrder.shippingName || openOrder.customer.name}</p>
                  <p className="text-white/60">{formatAddress(openOrder.shippingAddress)}</p>
                </div>
              )}

              <div className="border-b border-white/[0.06] pb-3">
                <p className="text-white/40 text-xs uppercase tracking-wide mb-2">Numer paczki (InPost)</p>
                <input
                  type="text"
                  defaultValue={openOrder.trackingNumber || ''}
                  placeholder="np. 612345678901234567890123"
                  onBlur={async e => {
                    const value = e.target.value.trim();
                    if (value !== (openOrder.trackingNumber || '')) {
                      await updateOrder(openOrder.stripeSessionId, {
                        trackingNumber: value || null,
                        carrier: value ? 'inpost' : null,
                        status: value && openOrder.status === 'paid' ? 'shipped' : openOrder.status,
                      });
                    }
                  }}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-white text-sm font-mono focus:border-amber-500/40 focus:outline-none"
                />
                <p className="text-white/30 text-xs mt-1">Wpisz numer + Tab — automatycznie zmieni status na &ldquo;Wysłane&rdquo;.</p>
              </div>

              <div>
                <p className="text-white/40 text-xs uppercase tracking-wide mb-2">Zmień status</p>
                <div className="flex gap-2 flex-wrap">
                  {(['paid', 'shipped', 'delivered', 'cancelled'] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => updateOrder(openOrder.stripeSessionId, { status: s })}
                      disabled={openOrder.status === s}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                        openOrder.status === s
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 cursor-default'
                          : 'bg-white/[0.04] border-white/[0.08] text-white/60 hover:text-white hover:border-white/20'
                      }`}
                    >
                      {statusConfig[s].label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setOpenOrder(null)}
              className="w-full mt-6 bg-white/[0.04] hover:bg-white/[0.08] text-white/70 py-2.5 rounded-lg text-sm transition-colors"
            >
              Zamknij
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
