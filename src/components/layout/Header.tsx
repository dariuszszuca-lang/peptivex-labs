import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCart } from '../../contexts/CartContext';

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const { totalItems } = useCart();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { to: `/${lang}`, label: t('nav.home') },
    { to: `/${lang}/products`, label: t('nav.products') },
    { to: `/${lang}/blog`, label: 'Blog' },
    { to: `/${lang}/about`, label: t('nav.about') },
    { to: `/${lang}/faq`, label: 'FAQ' },
    { to: `/${lang}/contact`, label: t('nav.contact') },
  ];

  const isActive = (path: string) => {
    if (path === `/${lang}`) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to={`/${lang}`} className="flex items-center gap-2.5 shrink-0">
          <span className="text-xl font-extrabold tracking-tight">
            <span className="text-teal-400">P</span>
            <span className="text-amber-500">X</span>
          </span>
          <span className="text-sm font-bold text-white tracking-widest hidden sm:block">PEPTIVEX LABS</span>
        </Link>

        {/* Pill Nav — desktop */}
        <nav className="hidden lg:flex items-center bg-white/[0.06] border border-white/[0.1] rounded-full px-2 py-1.5 gap-1">
          {navItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                isActive(item.to)
                  ? 'bg-amber-500 text-black font-semibold'
                  : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Lang Toggle */}
          <button
            onClick={() => setLang(lang === 'pl' ? 'en' : 'pl')}
            className="text-xs px-2.5 py-1.5 rounded-full bg-white/[0.06] text-white/50 hover:text-white border border-white/10 hover:border-amber-500/30 transition-all"
          >
            {lang === 'pl' ? '🇬🇧 EN' : '🇵🇱 PL'}
          </button>

          {/* Cart */}
          <Link
            to={`/${lang}/cart`}
            className="relative flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-1.5 rounded-full hover:bg-amber-500/20 transition-all text-sm"
          >
            <ShoppingCart size={16} />
            {totalItems > 0 && (
              <span className="text-xs font-bold">{totalItems}</span>
            )}
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white/50 hover:text-white transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/[0.06] bg-[#0a0a0a]/98 backdrop-blur-xl px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-2">
            {navItems.map(item => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm transition-all ${
                  isActive(item.to)
                    ? 'bg-amber-500/15 text-amber-400 font-semibold'
                    : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
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
