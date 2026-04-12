import { CreditCard, Key, ExternalLink } from 'lucide-react';

export default function AdminPayments() {
  return (
    <div className="p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold mb-1">Stripe — Płatności</h1>
        <p className="text-white/40 text-sm">Konfiguracja płatności i kluczy API</p>
      </div>

      {/* Stripe connection */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-500/10 rounded-lg flex items-center justify-center">
              <CreditCard size={20} className="text-violet-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Stripe</h3>
              <p className="text-white/30 text-xs">Płatności kartą, BLIK, Przelewy24</p>
            </div>
          </div>
          <span className="text-xs px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Wymaga konfiguracji
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-white/30 text-xs uppercase tracking-wide mb-1.5 block">
              <Key size={12} className="inline mr-1" />
              Publishable Key
            </label>
            <input
              placeholder="pk_live_..."
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm font-mono focus:border-amber-500/40 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-white/30 text-xs uppercase tracking-wide mb-1.5 block">
              <Key size={12} className="inline mr-1" />
              Secret Key
            </label>
            <input
              type="password"
              placeholder="sk_live_..."
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm font-mono focus:border-amber-500/40 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-white/30 text-xs uppercase tracking-wide mb-1.5 block">
              Webhook Secret
            </label>
            <input
              type="password"
              placeholder="whsec_..."
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm font-mono focus:border-amber-500/40 focus:outline-none"
            />
          </div>

          <div className="flex gap-3">
            <button className="bg-amber-500 text-black font-semibold px-5 py-2.5 rounded-lg hover:bg-amber-400 transition-colors text-sm">
              Zapisz i połącz
            </button>
            <a href="https://dashboard.stripe.com/apikeys" target="_blank" className="flex items-center gap-1.5 text-white/30 hover:text-white/50 text-sm px-4 py-2.5 transition-colors">
              Stripe Dashboard <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* Payment methods */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">Metody płatności</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { name: 'Karty (Visa, MC)', status: true, region: 'PL + UK' },
            { name: 'BLIK', status: true, region: 'PL' },
            { name: 'Przelewy24', status: true, region: 'PL' },
            { name: 'Apple Pay / Google Pay', status: false, region: 'PL + UK' },
          ].map((method, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-white/[0.02] rounded-lg border border-white/[0.04]">
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${method.status ? 'bg-emerald-400' : 'bg-white/20'}`} />
                <div>
                  <p className="text-white text-sm">{method.name}</p>
                  <p className="text-white/20 text-xs">{method.region}</p>
                </div>
              </div>
              <span className={`text-xs ${method.status ? 'text-emerald-400' : 'text-white/20'}`}>
                {method.status ? 'Aktywna' : 'Wyłączona'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
