import { useCallback, useEffect, useState } from 'react';
import { CreditCard, ExternalLink, RefreshCw, CheckCircle2 } from 'lucide-react';

interface StripeBalance {
  amount: number;
  currency: string;
}

interface StripePayment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  description: string | null;
  receiptEmail: string | null;
  created: number;
}

interface StripeResponse {
  mode: 'live' | 'test';
  balance: { available: StripeBalance[]; pending: StripeBalance[] };
  payments: StripePayment[];
}

const formatPrice = (amount: number, currency: string): string => {
  const major = (amount / 100).toFixed(2);
  if (currency === 'pln') return `${major} zł`;
  if (currency === 'gbp') return `£${major}`;
  if (currency === 'eur') return `€${major}`;
  return `${major} ${currency.toUpperCase()}`;
};

const formatDate = (epochSec: number): string => {
  return new Date(epochSec * 1000).toLocaleString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

export default function AdminPayments() {
  const [data, setData] = useState<StripeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const password = localStorage.getItem('px-admin-password') || '';
      const res = await fetch('/api/admin-stripe', { headers: { 'X-Admin-Password': password } });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`);
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <div className="p-6 max-w-6xl">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold mb-1">Stripe — Płatności</h1>
          <p className="text-white/40 text-sm">Saldo, ostatnie płatności, status integracji</p>
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

      {/* Status card */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-500/10 rounded-lg flex items-center justify-center">
              <CreditCard size={20} className="text-violet-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold flex items-center gap-2">
                Stripe
                <CheckCircle2 size={14} className="text-emerald-400" />
              </h3>
              <p className="text-white/30 text-xs">Karta · BLIK · Przelewy24 · Apple Pay</p>
            </div>
          </div>
          {data && (
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${
              data.mode === 'live'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
            }`}>
              {data.mode === 'live' ? '● LIVE' : '○ TEST'}
            </span>
          )}
        </div>

        {/* Balance */}
        {data && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-4">
              <p className="text-white/40 text-xs uppercase tracking-wide mb-2">Saldo dostępne</p>
              {data.balance.available.length === 0 ? (
                <p className="text-white text-lg font-bold">0,00</p>
              ) : (
                <div className="flex flex-col gap-0.5">
                  {data.balance.available.map(b => (
                    <p key={b.currency} className="text-white text-lg font-bold">{formatPrice(b.amount, b.currency)}</p>
                  ))}
                </div>
              )}
            </div>
            <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-4">
              <p className="text-white/40 text-xs uppercase tracking-wide mb-2">Saldo oczekujące</p>
              {data.balance.pending.length === 0 ? (
                <p className="text-white/60 text-lg font-bold">0,00</p>
              ) : (
                <div className="flex flex-col gap-0.5">
                  {data.balance.pending.map(b => (
                    <p key={b.currency} className="text-white/60 text-lg font-bold">{formatPrice(b.amount, b.currency)}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-4">
          <a
            href={data?.mode === 'live' ? 'https://dashboard.stripe.com' : 'https://dashboard.stripe.com/test'}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 text-sm transition-colors"
          >
            Stripe Dashboard <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Recent payments */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">Ostatnie płatności (Stripe)</h3>
        {!data || data.payments.length === 0 ? (
          <p className="text-white/30 text-sm py-8 text-center">Brak płatności</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left text-white/40 text-xs uppercase tracking-wide px-2 py-2">Data</th>
                  <th className="text-left text-white/40 text-xs uppercase tracking-wide px-2 py-2">ID</th>
                  <th className="text-left text-white/40 text-xs uppercase tracking-wide px-2 py-2">Email</th>
                  <th className="text-left text-white/40 text-xs uppercase tracking-wide px-2 py-2">Status</th>
                  <th className="text-right text-white/40 text-xs uppercase tracking-wide px-2 py-2">Kwota</th>
                </tr>
              </thead>
              <tbody>
                {data.payments.map(p => (
                  <tr key={p.id} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                    <td className="px-2 py-2 text-white/40 text-xs whitespace-nowrap">{formatDate(p.created)}</td>
                    <td className="px-2 py-2 text-white/60 text-xs font-mono">
                      <a
                        href={`https://dashboard.stripe.com/${data.mode === 'test' ? 'test/' : ''}payments/${p.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-amber-400"
                      >
                        {p.id.slice(-12)}
                      </a>
                    </td>
                    <td className="px-2 py-2 text-white/60 text-xs">{p.receiptEmail || '—'}</td>
                    <td className="px-2 py-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        p.status === 'succeeded'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : p.status === 'requires_payment_method'
                          ? 'bg-red-500/10 text-red-400'
                          : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-2 py-2 text-right text-white text-sm font-semibold whitespace-nowrap">
                      {formatPrice(p.amount, p.currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
