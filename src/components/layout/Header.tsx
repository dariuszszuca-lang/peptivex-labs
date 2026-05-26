import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCart } from '../../contexts/CartContext';

export default function Header() {
  const { lang, t } = useLanguage();
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const switchLang = (newLang: 'en' | 'pl' | 'es') => {
    const newPath = location.pathname.replace(/^\/(pl|en|es)/, `/${newLang}`);
    navigate(newPath + location.search);
  };

  const navItems = [
    { to: `/${lang}`, label: t('nav.home') },
    { to: `/${lang}/products`, label: t('nav.products') },
    { to: `/${lang}/blog`, label: 'Blog' },
    { to: `/${lang}/guide`, label: t('nav.guide') },
    { to: `/${lang}/about`, label: t('nav.about') },
    { to: `/${lang}/faq`, label: 'FAQ' },
    { to: `/${lang}/contact`, label: t('nav.contact') },
  ];

  const isActive = (path: string) => {
    if (path === `/${lang}`) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-[#ececec]">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to={`/${lang}`} className="flex items-center gap-2.5 shrink-0">
          <span className="text-xl font-extrabold tracking-tight text-[#1a1a1a]">
            PX
          </span>
          <span className="text-sm font-bold text-[#1a1a1a] tracking-widest hidden sm:block">PEPTIVEX LABS</span>
        </Link>

        {/* Pill Nav — desktop */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                isActive(item.to)
                  ? 'bg-[#1a1a1a] text-white font-semibold'
                  : 'text-[#525252] hover:text-[#1a1a1a] hover:bg-[#f5f5f0]'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Lang Toggle — UK / ES / PL */}
          <div className="flex items-center gap-0.5 bg-[#fafaf7] border border-[#ececec] rounded-full p-0.5">
            <button
              onClick={() => switchLang('en')}
              className={`text-xs px-2 py-1 rounded-full transition-all ${
                lang === 'en'
                  ? 'bg-[#1a1a1a] text-white font-semibold'
                  : 'text-[#737373] hover:text-[#1a1a1a]'
              }`}
              aria-label="English"
            >
              🇬🇧 EN
            </button>
            <button
              onClick={() => switchLang('es')}
              className={`text-xs px-2 py-1 rounded-full transition-all ${
                lang === 'es'
                  ? 'bg-[#1a1a1a] text-white font-semibold'
                  : 'text-[#737373] hover:text-[#1a1a1a]'
              }`}
              aria-label="Español"
            >
              🇪🇸 ES
            </button>
            <button
              onClick={() => switchLang('pl')}
              className={`text-xs px-2 py-1 rounded-full transition-all ${
                lang === 'pl'
                  ? 'bg-[#1a1a1a] text-white font-semibold'
                  : 'text-[#737373] hover:text-[#1a1a1a]'
              }`}
              aria-label="Polski"
            >
              🇵🇱 PL
            </button>
          </div>

          {/* Cart */}
          <Link
            to={`/${lang}/cart`}
            className="relative flex items-center gap-1.5 bg-[#ea580c] text-white px-3 py-1.5 rounded-full hover:bg-[#c2410c] transition-all text-sm font-semibold"
          >
            <ShoppingCart size={16} />
            {totalItems > 0 && (
              <span className="text-xs font-bold">{totalItems}</span>
            )}
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-[#525252] hover:text-[#1a1a1a] transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#ececec] bg-white px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-2">
            {navItems.map(item => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm transition-all ${
                  isActive(item.to)
                    ? 'bg-[#1a1a1a] text-white font-semibold'
                    : 'text-[#525252] hover:text-[#1a1a1a] hover:bg-[#f5f5f0]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
