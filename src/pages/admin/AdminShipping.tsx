import { Truck } from 'lucide-react';

export default function AdminShipping() {
  return (
    <div className="p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-[#0a0a0a] text-2xl font-bold mb-1">InPost — Wysyłka</h1>
        <p className="text-[#737373] text-sm">Zarządzanie przesyłkami PL i UK</p>
      </div>

      {/* Connection status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-[#fafaf7] border border-[#ececec] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#0a0a0a] font-semibold flex items-center gap-2">
              <span>🇵🇱</span> InPost Polska
            </h3>
            <span className="text-xs px-2 py-1 rounded-full bg-[#fff7ed] text-[#ea580c] border border-[#fed7aa]">
              Wymaga konfiguracji
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <label className="text-[#737373] text-xs uppercase tracking-wide mb-1 block">Organization ID</label>
              <input placeholder="Z panelu manager.paczkomaty.pl" className="w-full bg-[#fafaf7] border border-[#ececec] rounded-lg px-3 py-2 text-[#0a0a0a] text-sm focus:border-amber-500/40 focus:outline-none" />
            </div>
            <div>
              <label className="text-[#737373] text-xs uppercase tracking-wide mb-1 block">API Token</label>
              <input type="password" placeholder="Token z InPost API" className="w-full bg-[#fafaf7] border border-[#ececec] rounded-lg px-3 py-2 text-[#0a0a0a] text-sm focus:border-amber-500/40 focus:outline-none" />
            </div>
            <button className="bg-[#fff7ed] text-[#ea580c] border border-[#fed7aa] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#fff7ed] transition-colors">
              Połącz
            </button>
          </div>
        </div>

        <div className="bg-[#fafaf7] border border-[#ececec] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#0a0a0a] font-semibold flex items-center gap-2">
              <span>🇬🇧</span> InPost UK
            </h3>
            <span className="text-xs px-2 py-1 rounded-full bg-[#fff7ed] text-[#ea580c] border border-[#fed7aa]">
              Wymaga konfiguracji
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <label className="text-[#737373] text-xs uppercase tracking-wide mb-1 block">API Key</label>
              <input type="password" placeholder="Token z developers.inpost.co.uk" className="w-full bg-[#fafaf7] border border-[#ececec] rounded-lg px-3 py-2 text-[#0a0a0a] text-sm focus:border-amber-500/40 focus:outline-none" />
            </div>
            <button className="bg-[#fff7ed] text-[#ea580c] border border-[#fed7aa] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#fff7ed] transition-colors">
              Połącz
            </button>
          </div>
        </div>
      </div>

      {/* Shipping info */}
      <div className="bg-[#fafaf7] border border-[#ececec] rounded-xl p-5">
        <h3 className="text-[#0a0a0a] font-semibold mb-4 flex items-center gap-2">
          <Truck size={16} className="text-[#ea580c]" />
          Konfiguracja wysyłki
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-[#fafaf7] rounded-lg border border-[#ececec]">
            <p className="text-[#0a0a0a] text-sm font-medium mb-1">Polska</p>
            <p className="text-[#737373] text-xs">Koszt: 12.99 zł | Free od: 500 zł</p>
            <p className="text-[#737373] text-xs">Czas: 1-2 dni robocze</p>
          </div>
          <div className="p-4 bg-[#fafaf7] rounded-lg border border-[#ececec]">
            <p className="text-[#0a0a0a] text-sm font-medium mb-1">Wielka Brytania</p>
            <p className="text-[#737373] text-xs">Koszt: £7.66 | Free od: £100</p>
            <p className="text-[#737373] text-xs">Czas: 2-3 dni robocze</p>
          </div>
        </div>
      </div>
    </div>
  );
}
