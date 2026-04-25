import { useCallback, useEffect, useState } from 'react';
import { Search, Mail, Phone, Package, RefreshCw } from 'lucide-react';

interface ApiOrder {
  stripeSessionId: string;
  status: 'paid' | 'shipped' | 'delivered' | 'cancelled' | 'new';
  amountTotal: number;
  currency: string;
  customer: { name: string; email: string; phone: string | null };
  createdAt: string | null;
}

interface CustomerRow {
  email: string;
  name: string;
  phone: string | null;
  orderCount: number;
  totalSpent: Record<string, number>; // currency → minor units
  firstOrder: string | null;
  lastOrder: string | null;
}

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
    return new Date(iso).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch {
    return '—';
  }
};

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<CustomerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

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

      const orders: ApiOrder[] = data.orders || [];
      const map = new Map<string, CustomerRow>();

      for (const o of orders) {
        if (o.status === 'cancelled') continue;
        const email = o.customer.email?.trim().toLowerCase();
        if (!email) continue;

        const existing = map.get(email);
        if (existing) {
          existing.orderCount += 1;
          existing.totalSpent[o.currency] = (existing.totalSpent[o.currency] || 0) + o.amountTotal;
          if (o.createdAt && (!existing.lastOrder || o.createdAt > existing.lastOrder)) {
            existing.lastOrder = o.createdAt;
          }
          if (o.createdAt && (!existing.firstOrder || o.createdAt < existing.firstOrder)) {
            existing.firstOrder = o.createdAt;
          }
          if (!existing.name && o.customer.name) existing.name = o.customer.name;
          if (!existing.phone && o.customer.phone) existing.phone = o.customer.phone;
        } else {
          map.set(email, {
            email,
            name: o.customer.name || '',
            phone: o.customer.phone || null,
            orderCount: 1,
            totalSpent: { [o.currency]: o.amountTotal },
            firstOrder: o.createdAt,
            lastOrder: o.createdAt,
          });
        }
      }

      const list = Array.from(map.values()).sort((a, b) => {
        if (a.lastOrder && b.lastOrder) return b.lastOrder.localeCompare(a.lastOrder);
        return b.orderCount - a.orderCount;
      });
      setCustomers(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = customers.filter(c => {
    if (!search) return true;
    const s = search.toLowerCase();
    return c.email.includes(s) || c.name.toLowerCase().includes(s) || (c.phone || '').includes(s);
  });

  return (
    <div className="p-6 max-w-6xl">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold mb-1">Klienci</h1>
          <p className="text-white/40 text-sm">{customers.length} unikalnych klientów</p>
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

      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Szukaj po emailu, imieniu lub telefonie..."
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-10 pr-4 py-2.5 text-white text-sm focus:border-amber-500/40 focus:outline-none"
        />
      </div>

      {!loading && filtered.length === 0 && !error ? (
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-16 text-center">
          <div className="text-4xl mb-4 opacity-20">👥</div>
          <h2 className="text-white text-lg font-semibold mb-2">{customers.length === 0 ? 'Brak klientów' : 'Brak wyników'}</h2>
          <p className="text-white/30 text-sm max-w-sm mx-auto">
            {customers.length === 0
              ? 'Klienci pojawią się po pierwszym zamówieniu.'
              : 'Zmień wyszukiwanie.'}
          </p>
        </div>
      ) : (
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left text-white/40 text-xs uppercase tracking-wide px-4 py-3">Klient</th>
                <th className="text-left text-white/40 text-xs uppercase tracking-wide px-4 py-3">Kontakt</th>
                <th className="text-left text-white/40 text-xs uppercase tracking-wide px-4 py-3">Zamówienia</th>
                <th className="text-left text-white/40 text-xs uppercase tracking-wide px-4 py-3">Łącznie</th>
                <th className="text-left text-white/40 text-xs uppercase tracking-wide px-4 py-3">Pierwsze</th>
                <th className="text-left text-white/40 text-xs uppercase tracking-wide px-4 py-3">Ostatnie</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.email} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <p className="text-white text-sm font-medium">{c.name || '—'}</p>
                  </td>
                  <td className="px-4 py-3">
                    <a href={`mailto:${c.email}`} className="text-white/60 hover:text-amber-400 text-xs flex items-center gap-1.5">
                      <Mail size={12} /> {c.email}
                    </a>
                    {c.phone && (
                      <a href={`tel:${c.phone}`} className="text-white/40 hover:text-amber-400 text-xs flex items-center gap-1.5 mt-1">
                        <Phone size={12} /> {c.phone}
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-400 text-xs px-2 py-1 rounded-full font-medium">
                      <Package size={12} /> {c.orderCount}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      {Object.entries(c.totalSpent).map(([curr, amount]) => (
                        <span key={curr} className="text-white text-sm font-medium">{formatPrice(amount, curr)}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white/40 text-xs whitespace-nowrap">{formatDate(c.firstOrder)}</td>
                  <td className="px-4 py-3 text-white/40 text-xs whitespace-nowrap">{formatDate(c.lastOrder)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
