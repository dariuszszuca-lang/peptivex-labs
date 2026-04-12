import { Save } from 'lucide-react';

export default function AdminSettings() {
  return (
    <div className="p-6 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold mb-1">Ustawienia</h1>
        <p className="text-white/40 text-sm">Konfiguracja sklepu</p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Store info */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Dane sklepu</h3>
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-white/30 text-xs uppercase tracking-wide mb-1.5 block">Nazwa sklepu</label>
              <input defaultValue="PEPTIVEX LABS" className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm focus:border-amber-500/40 focus:outline-none" />
            </div>
            <div>
              <label className="text-white/30 text-xs uppercase tracking-wide mb-1.5 block">Email kontaktowy</label>
              <input defaultValue="info@peptivexlabs.com" className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm focus:border-amber-500/40 focus:outline-none" />
            </div>
            <div>
              <label className="text-white/30 text-xs uppercase tracking-wide mb-1.5 block">Domena</label>
              <input defaultValue="peptivexlabs.com" disabled className="w-full bg-white/[0.02] border border-white/[0.04] rounded-lg px-4 py-2.5 text-white/30 text-sm" />
            </div>
          </div>
        </div>

        {/* Shipping config */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Koszty wysyłki</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-white/30 text-xs uppercase tracking-wide mb-1.5 block">PL — koszt (grosze)</label>
              <input type="number" defaultValue={1299} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm focus:border-amber-500/40 focus:outline-none" />
            </div>
            <div>
              <label className="text-white/30 text-xs uppercase tracking-wide mb-1.5 block">PL — free od (grosze)</label>
              <input type="number" defaultValue={50000} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm focus:border-amber-500/40 focus:outline-none" />
            </div>
            <div>
              <label className="text-white/30 text-xs uppercase tracking-wide mb-1.5 block">UK — koszt (pence)</label>
              <input type="number" defaultValue={766} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm focus:border-amber-500/40 focus:outline-none" />
            </div>
            <div>
              <label className="text-white/30 text-xs uppercase tracking-wide mb-1.5 block">UK — free od (pence)</label>
              <input type="number" defaultValue={10000} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm focus:border-amber-500/40 focus:outline-none" />
            </div>
          </div>
        </div>

        {/* Email config */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Email (Resend)</h3>
          <div>
            <label className="text-white/30 text-xs uppercase tracking-wide mb-1.5 block">Resend API Key</label>
            <input type="password" placeholder="re_..." className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm font-mono focus:border-amber-500/40 focus:outline-none" />
          </div>
        </div>

        <button className="bg-amber-500 text-black font-semibold px-6 py-3 rounded-lg hover:bg-amber-400 transition-colors text-sm flex items-center gap-2 self-start">
          <Save size={16} />
          Zapisz ustawienia
        </button>
      </div>
    </div>
  );
}
