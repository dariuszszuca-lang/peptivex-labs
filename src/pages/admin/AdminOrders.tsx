import { Search, Eye, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useState } from 'react';
import type { OrderStatus } from '../../types';

interface OrderRow {
  id: string;
  date: string;
  customer: string;
  email: string;
  items: string;
  total: string;
  currency: string;
  status: OrderStatus;
  region: 'pl' | 'uk';
  tracking?: string;
}

// Placeholder orders — will come from Firestore
const SAMPLE_ORDERS: OrderRow[] = [];

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: typeof Clock }> = {
  new: { label: 'Nowe', color: 'text-sky-400 bg-sky-500/10', icon: Clock },
  paid: { label: 'Opłacone', color: 'text-amber-400 bg-amber-500/10', icon: CheckCircle },
  shipped: { label: 'Wysłane', color: 'text-violet-400 bg-violet-500/10', icon: Truck },
  delivered: { label: 'Dostarczone', color: 'text-emerald-400 bg-emerald-500/10', icon: CheckCircle },
  cancelled: { label: 'Anulowane', color: 'text-red-400 bg-red-500/10', icon: XCircle },
};

export default function AdminOrders() {
  const [orders] = useState<OrderRow[]>(SAMPLE_ORDERS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');

  const filtered = orders.filter(o => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (search && !o.customer.toLowerCase().includes(search.toLowerCase()) && !o.id.includes(search)) return false;
    return true;
  });

  return (
    <div className="p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold mb-1">Zamówienia</h1>
        <p className="text-white/40 text-sm">{orders.length} zamówień łącznie</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Szukaj po kliencie lub ID..."
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-10 pr-4 py-2.5 text-white text-sm focus:border-amber-500/40 focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'new', 'paid', 'shipped', 'delivered', 'cancelled'] as const).map(s => (
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

      {/* Orders */}
      {filtered.length === 0 ? (
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-16 text-center">
          <div className="text-4xl mb-4 opacity-20">📦</div>
          <h2 className="text-white text-lg font-semibold mb-2">Brak zamówień</h2>
          <p className="text-white/30 text-sm max-w-sm mx-auto">
            Zamówienia pojawią się tutaj po integracji z Stripe. Każda płatność automatycznie utworzy nowe zamówienie.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-lg px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-amber-400 text-xs font-medium">Stripe — wymaga konfiguracji</span>
          </div>
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
                <th className="text-left text-white/40 text-xs uppercase tracking-wide px-4 py-3">Region</th>
                <th className="text-left text-white/40 text-xs uppercase tracking-wide px-4 py-3">Status</th>
                <th className="text-right text-white/40 text-xs uppercase tracking-wide px-4 py-3">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(order => {
                const sc = statusConfig[order.status];
                return (
                  <tr key={order.id} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                    <td className="px-4 py-3 text-white/50 text-sm font-mono">{order.id}</td>
                    <td className="px-4 py-3 text-white/40 text-sm">{order.date}</td>
                    <td className="px-4 py-3">
                      <p className="text-white text-sm">{order.customer}</p>
                      <p className="text-white/20 text-xs">{order.email}</p>
                    </td>
                    <td className="px-4 py-3 text-white/50 text-sm">{order.items}</td>
                    <td className="px-4 py-3 text-white font-medium text-sm">{order.total}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs">{order.region === 'pl' ? '🇵🇱' : '🇬🇧'}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${sc.color}`}>
                        {sc.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="p-1.5 rounded hover:bg-white/[0.06] text-white/30 hover:text-white transition-colors">
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
    </div>
  );
}
