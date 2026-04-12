import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function SplashPage() {
  const { setLang } = useLanguage();
  const navigate = useNavigate();

  const select = (lang: 'pl' | 'en') => {
    setLang(lang);
    navigate(`/${lang}`);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Logo */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-4xl font-extrabold tracking-tight">
              <span className="text-teal-400">P</span>
              <span className="text-amber-500">X</span>
            </span>
            <span className="text-2xl font-bold text-white tracking-widest">PEPTIVEX LABS</span>
          </div>
          <p className="text-amber-500/80 text-sm tracking-[0.3em] uppercase">Research Peptides</p>
        </div>

        {/* Region Selection */}
        <h1 className="text-white text-xl font-semibold mb-2">Select Your Region</h1>
        <p className="text-white/40 text-sm mb-10">Shipping and pricing depend on your selected region</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Poland */}
          <button
            onClick={() => select('pl')}
            className="group relative bg-white/[0.03] border border-white/10 rounded-xl p-8 hover:border-amber-500/50 hover:bg-white/[0.06] transition-all duration-300 cursor-pointer"
          >
            <div className="text-4xl mb-4">🇵🇱</div>
            <h2 className="text-white text-lg font-semibold mb-2">Polska</h2>
            <p className="text-white/40 text-sm">InPost Paczkomaty · PLN</p>
            <div className="absolute inset-0 rounded-xl border-2 border-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          {/* UK */}
          <button
            onClick={() => select('en')}
            className="group relative bg-white/[0.03] border border-white/10 rounded-xl p-8 hover:border-amber-500/50 hover:bg-white/[0.06] transition-all duration-300 cursor-pointer"
          >
            <div className="text-4xl mb-4">🇬🇧</div>
            <h2 className="text-white text-lg font-semibold mb-2">United Kingdom</h2>
            <p className="text-white/40 text-sm">InPost Lockers · GBP</p>
            <div className="absolute inset-0 rounded-xl border-2 border-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        <p className="text-white/20 text-xs mt-12">FOR RESEARCH USE ONLY</p>
      </div>
    </div>
  );
}
