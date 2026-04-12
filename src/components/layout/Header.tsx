import { Link } from 'react-router-dom';
import { ShoppingCart, FlaskConical } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCart } from '../../contexts/CartContext';

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to={`/${lang}`} className="flex items-center gap-2.5">
          <span className="text-xl font-extrabold tracking-tight">
            <span className="text-teal-400">P</span>
            <span className="text-amber-500">X</span>
          </span>
          <span className="text-sm font-bold text-white tracking-widest hidden sm:block">PEPTIVEX LABS</span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-6">
          <Link to={`/${lang}`} className="text-white/50 hover:text-white text-sm transition-colors">
            {t('nav.home')}
          </Link>
          <Link to={`/${lang}/products`} className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-1.5">
            <FlaskConical size={14} />
            {t('nav.products')}
          </Link>

          {/* Lang Toggle */}
          <button
            onClick={() => setLang(lang === 'pl' ? 'en' : 'pl')}
            className="text-xs px-2 py-1 rounded bg-white/[0.06] text-white/50 hover:text-white border border-white/10 hover:border-amber-500/30 transition-all"
          >
            {lang === 'pl' ? '🇬🇧 EN' : '🇵🇱 PL'}
          </button>

          {/* Cart */}
          <Link to={`/${lang}/cart`} className="relative text-white/50 hover:text-white transition-colors">
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
