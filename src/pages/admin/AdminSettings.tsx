import { Save } from 'lucide-react';

export default function AdminSettings() {
  return (
    <div className="p-6 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-[#0a0a0a] text-2xl font-bold mb-1">Ustawienia</h1>
        <p className="text-[#737373] text-sm">Konfiguracja sklepu</p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Store info */}
        <div className="bg-[#fafaf7] border border-[#ececec] rounded-xl p-6">
          <h3 className="text-[#0a0a0a] font-semibold mb-4">Dane sklepu</h3>
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-[#737373] text-xs uppercase tracking-wide mb-1.5 block">Nazwa sklepu</label>
              <input defaultValue="PEPTIVEX LABS" className="w-full bg-[#fafaf7] border border-[#ececec] rounded-lg px-4 py-2.5 text-[#0a0a0a] text-sm focus:border-amber-500/40 focus:outline-none" />
            </div>
            <div>
              <label className="text-[#737373] text-xs uppercase tracking-wide mb-1.5 block">Email kontaktowy</label>
              <input defaultValue="info@peptivexlabs.com" className="w-full bg-[#fafaf7] border border-[#ececec] rounded-lg px-4 py-2.5 text-[#0a0a0a] text-sm focus:border-amber-500/40 focus:outline-none" />
            </div>
            <div>
              <label className="text-[#737373] text-xs uppercase tracking-wide mb-1.5 block">Domena</label>
              <input defaultValue="peptivexlabs.com" disabled className="w-full bg-[#fafaf7] border border-[#ececec] rounded-lg px-4 py-2.5 text-[#737373] text-sm" />
            </div>
          </div>
        </div>

        {/* Shipping config */}
        <div className="bg-[#fafaf7] border border-[#ececec] rounded-xl p-6">
          <h3 className="text-[#0a0a0a] font-semibold mb-4">Koszty wysyłki</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[#737373] text-xs uppercase tracking-wide mb-1.5 block">PL — koszt (grosze)</label>
              <input type="number" defaultValue={1299} className="w-full bg-[#fafaf7] border border-[#ececec] rounded-lg px-4 py-2.5 text-[#0a0a0a] text-sm focus:border-amber-500/40 focus:outline-none" />
            </div>
            <div>
              <label className="text-[#737373] text-xs uppercase tracking-wide mb-1.5 block">PL — free od (grosze)</label>
              <input type="number" defaultValue={50000} className="w-full bg-[#fafaf7] border border-[#ececec] rounded-lg px-4 py-2.5 text-[#0a0a0a] text-sm focus:border-amber-500/40 focus:outline-none" />
            </div>
            <div>
              <label className="text-[#737373] text-xs uppercase tracking-wide mb-1.5 block">UK — koszt (pence)</label>
              <input type="number" defaultValue={766} className="w-full bg-[#fafaf7] border border-[#ececec] rounded-lg px-4 py-2.5 text-[#0a0a0a] text-sm focus:border-amber-500/40 focus:outline-none" />
            </div>
            <div>
              <label className="text-[#737373] text-xs uppercase tracking-wide mb-1.5 block">UK — free od (pence)</label>
              <input type="number" defaultValue={10000} className="w-full bg-[#fafaf7] border border-[#ececec] rounded-lg px-4 py-2.5 text-[#0a0a0a] text-sm focus:border-amber-500/40 focus:outline-none" />
            </div>
          </div>
        </div>

        {/* Email config */}
        <div className="bg-[#fafaf7] border border-[#ececec] rounded-xl p-6">
          <h3 className="text-[#0a0a0a] font-semibold mb-4">Email (Resend)</h3>
          <div>
            <label className="text-[#737373] text-xs uppercase tracking-wide mb-1.5 block">Resend API Key</label>
            <input type="password" placeholder="re_..." className="w-full bg-[#fafaf7] border border-[#ececec] rounded-lg px-4 py-2.5 text-[#0a0a0a] text-sm font-mono focus:border-amber-500/40 focus:outline-none" />
          </div>
        </div>

        <button className="bg-[#ea580c] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#c2410c] transition-colors text-sm flex items-center gap-2 self-start">
          <Save size={16} />
          Zapisz ustawienia
        </button>
      </div>
    </div>
  );
}
