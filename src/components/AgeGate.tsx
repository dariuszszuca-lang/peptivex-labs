import { useState, useEffect, type ReactNode } from 'react';
import { ShieldAlert } from 'lucide-react';

const STORAGE_KEY = 'px-age-confirmed';

function detectLang(): 'pl' | 'en' {
  if (typeof window === 'undefined') return 'en';
  const path = window.location.pathname;
  if (path.startsWith('/pl')) return 'pl';
  if (path.startsWith('/en')) return 'en';
  const nav = navigator.language?.toLowerCase() ?? '';
  return nav.startsWith('pl') ? 'pl' : 'en';
}

interface Props {
  children: ReactNode;
}

export default function AgeGate({ children }: Props) {
  const [confirmed, setConfirmed] = useState<boolean | null>(null);
  const [lang, setLang] = useState<'pl' | 'en'>('en');

  useEffect(() => {
    setLang(detectLang());
    const saved = localStorage.getItem(STORAGE_KEY);
    setConfirmed(saved === '1');
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, '1');
    setConfirmed(true);
  };

  const decline = () => {
    window.location.href = 'https://www.google.com';
  };

  if (confirmed === null) return null;
  if (confirmed) return <>{children}</>;

  const pl = lang === 'pl';

  return (
    <>
      <div className="fixed inset-0 z-[100] bg-[#060606]/95 backdrop-blur-md flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#13110f] border border-amber-500/20 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(249,115,22,0.08)] overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center shrink-0">
                <ShieldAlert size={20} className="text-amber-400" />
              </div>
              <div>
                <p className="text-amber-500 text-[10px] font-bold tracking-[0.25em] uppercase mb-0.5">
                  {pl ? 'Weryfikacja wieku' : 'Age Verification'}
                </p>
                <h2 className="text-white text-lg font-extrabold leading-tight">
                  {pl ? 'Tylko 18+ i wykwalifikowani badacze' : '18+ and qualified researchers only'}
                </h2>
              </div>
            </div>

            <p className="text-white/55 text-sm leading-relaxed mb-3">
              {pl
                ? 'PEPTIVEX LABS sprzedaje peptydy badawcze przeznaczone wyłącznie do badań laboratoryjnych in vitro. Produkty NIE są przeznaczone do spożycia przez ludzi ani zwierzęta, ani do zastosowań klinicznych.'
                : 'PEPTIVEX LABS sells research peptides intended exclusively for in vitro laboratory research. Products are NOT intended for human or animal consumption, or any clinical use.'}
            </p>
            <p className="text-white/55 text-sm leading-relaxed mb-6">
              {pl
                ? 'Wchodząc na stronę potwierdzasz, że masz ukończone 18 lat oraz że jesteś wykwalifikowanym badaczem lub profesjonalistą laboratoryjnym w jurysdykcji, w której taki zakup jest legalny.'
                : 'By entering the site you confirm that you are 18 or older, and a qualified researcher or laboratory professional in a jurisdiction where such purchase is legal.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={accept}
                className="flex-1 bg-amber-500 text-black font-bold py-3 rounded-xl hover:bg-amber-400 transition-all text-sm"
              >
                {pl ? 'Mam 18+ — wejdź na stronę' : 'I am 18+ — enter site'}
              </button>
              <button
                onClick={decline}
                className="flex-1 bg-white/[0.04] border border-white/[0.1] text-white/60 font-medium py-3 rounded-xl hover:bg-white/[0.08] transition-all text-sm"
              >
                {pl ? 'Wyjdź' : 'Exit'}
              </button>
            </div>

            <p className="text-white/25 text-[10px] text-center mt-5 leading-relaxed">
              {pl
                ? 'Produkty nie są zatwierdzone przez FDA, MHRA ani EMA. Sprzedaż wyłącznie do badań naukowych.'
                : 'Products are not approved by the FDA, MHRA or EMA. Sold for scientific research only.'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
