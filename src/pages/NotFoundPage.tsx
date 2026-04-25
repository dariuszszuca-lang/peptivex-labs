import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Home } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import HexPattern from '../components/home/HexPattern';
import SeoHead from '../components/SeoHead';

export default function NotFoundPage() {
  const { lang } = useLanguage();
  const pl = lang === 'pl';

  return (
    <div className="relative overflow-hidden min-h-[80vh]">
      <SeoHead
        title="404 — Not found"
        description=""
        path={`/${lang}/404`}
        noIndex
      />
      <div className="absolute inset-0 bg-gradient-to-b from-amber-900/[0.08] via-[#0c0a08] to-[#0c0a08]" />
      <HexPattern className="text-amber-500/[0.02]" />

      <div className="max-w-2xl mx-auto px-4 py-24 relative z-10 text-center">
        <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-3">404</p>
        <h1 className="text-white text-4xl sm:text-5xl font-extrabold mb-4">
          {pl ? 'Strona nie istnieje' : 'Page not found'}
        </h1>
        <p className="text-white/50 text-base mb-10 max-w-md mx-auto leading-relaxed">
          {pl
            ? 'Adres, który próbujesz otworzyć, nie istnieje lub został przeniesiony. Wróć na stronę główną albo przejrzyj produkty.'
            : 'The page you are looking for does not exist or has been moved. Go back to the homepage or browse our products.'
          }
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Link
            to={`/${lang}`}
            className="bg-amber-500 text-black font-bold px-6 py-3 rounded-xl hover:bg-amber-400 transition-colors inline-flex items-center justify-center gap-2 text-sm"
          >
            <Home size={14} />
            {pl ? 'Strona główna' : 'Homepage'}
          </Link>
          <Link
            to={`/${lang}/products`}
            className="bg-white/[0.04] border border-white/[0.08] text-white/70 font-medium px-6 py-3 rounded-xl hover:bg-white/[0.07] transition-colors inline-flex items-center justify-center gap-2 text-sm"
          >
            <Search size={14} />
            {pl ? 'Przeglądaj produkty' : 'Browse products'}
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-md mx-auto">
          {[
            { to: `/${lang}/about`, label: pl ? 'O nas' : 'About' },
            { to: `/${lang}/blog`, label: 'Blog' },
            { to: `/${lang}/faq`, label: 'FAQ' },
            { to: `/${lang}/contact`, label: pl ? 'Kontakt' : 'Contact' },
          ].map(item => (
            <Link
              key={item.to}
              to={item.to}
              className="bg-white/[0.02] border border-white/[0.06] rounded-lg px-3 py-2 text-white/40 hover:text-white/80 hover:bg-white/[0.05] text-xs transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link to={`/${lang}`} className="text-white/30 hover:text-white/60 text-xs inline-flex items-center gap-1 mt-10 transition-colors">
          <ArrowLeft size={12} /> {pl ? 'Wróć' : 'Back'}
        </Link>
      </div>
    </div>
  );
}
