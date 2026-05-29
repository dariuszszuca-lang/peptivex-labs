import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCart } from '../../contexts/CartContext';
import SocialLinks from '../SocialLinks';

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
    <header className="sticky top-0 z-50 bg-[#f5ebd9]/85 backdrop-blur-xl border-b border-[#ececec]/60">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-6">
        {/* Logo — monogram + wordmark */}
        <Link to={`/${lang}`} className="flex items-center gap-2.5 shrink-0 group">
          <span className="relative inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-[#ea580c] to-[#f59e0b] text-white font-extrabold text-sm tracking-tight shadow-[0_2px_8px_rgba(234,88,12,0.30)] group-hover:shadow-[0_4px_14px_rgba(234,88,12,0.45)] transition-shadow">
            PX
          </span>
          <span className="hidden sm:flex flex-col leading-none">
            <span className="text-[#0a0a0a] text-[13px] font-bold tracking-[0.15em]">PEPTIVEX</span>
            <span className="text-[#a3a3a3] text-[9px] font-medium tracking-[0.3em] mt-0.5">LABS</span>
          </span>
        </Link>

        {/* Premium underline nav — desktop */}
        <nav className="hidden lg:flex items-center gap-7 flex-1 justify-center">
          {navItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={`group/nav relative text-[13px] font-medium tracking-wide transition-colors py-1 ${
                isActive(item.to)
                  ? 'text-[#0a0a0a]'
                  : 'text-[#525252] hover:text-[#0a0a0a]'
              }`}
            >
              {item.label}
              <span
                className={`absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-[#ea580c] to-[#f59e0b] transition-transform origin-left ${
                  isActive(item.to) ? 'scale-x-100' : 'scale-x-0 group-hover/nav:scale-x-100'
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Social — IG + TikTok */}
          <div className="hidden sm:flex">
            <SocialLinks variant="header" />
          </div>

          {/* Lang switcher — flag circles */}
          <div className="hidden sm:flex items-center gap-1.5">
            {(['en', 'es', 'pl'] as const).map(code => {
              const flag = code === 'en' ? '🇬🇧' : code === 'es' ? '🇪🇸' : '🇵🇱';
              const active = lang === code;
              return (
                <button
                  key={code}
                  onClick={() => switchLang(code)}
                  className={`relative w-9 h-9 rounded-full flex items-center justify-center text-[16px] leading-none transition-all duration-200 ${
                    active
                      ? 'bg-white shadow-[0_2px_8px_rgba(234,88,12,0.30)] ring-2 ring-[#ea580c]'
                      : 'bg-white/60 border border-[#ececec] hover:bg-white hover:border-[#fed7aa] hover:ring-2 hover:ring-[#fed7aa] hover:scale-110'
                  }`}
                  aria-label={code.toUpperCase()}
                  title={code === 'en' ? 'English' : code === 'es' ? 'Español' : 'Polski'}
                >
                  <span className="block">{flag}</span>
                </button>
              );
            })}
          </div>

          {/* Cart — outline premium */}
          <Link
            to={`/${lang}/cart`}
            className="relative flex items-center gap-1.5 border border-[#0a0a0a] text-[#0a0a0a] px-3 py-1.5 rounded-full hover:bg-[#0a0a0a] hover:text-white transition-colors text-[12px] font-semibold"
          >
            <ShoppingCart size={14} strokeWidth={2.25} />
            {totalItems > 0 && (
              <span className="ml-0.5 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#ea580c] text-white text-[10px] font-bold">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-[#525252] hover:text-[#0a0a0a] transition-colors ml-1"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#ececec] bg-white/95 backdrop-blur-xl px-4 pb-4">
          <nav className="flex flex-col gap-0.5 pt-2">
            {navItems.map(item => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                  isActive(item.to)
                    ? 'text-[#ea580c] font-semibold'
                    : 'text-[#525252] hover:text-[#0a0a0a]'
                }`}
              >
                {isActive(item.to) && (
                  <span className="w-1 h-4 rounded-full bg-gradient-to-b from-[#ea580c] to-[#f59e0b]" />
                )}
                <span className={isActive(item.to) ? '' : 'ml-3'}>{item.label}</span>
              </Link>
            ))}
            <div className="flex items-center justify-between gap-3 px-3 pt-3 mt-2 border-t border-[#ececec]">
              <div className="flex items-center gap-3 text-[11px] font-semibold tracking-widest">
                {(['en', 'es', 'pl'] as const).map(code => (
                  <button
                    key={code}
                    onClick={() => { switchLang(code); setMobileOpen(false); }}
                    className={`uppercase transition-colors ${
                      lang === code ? 'text-[#ea580c]' : 'text-[#a3a3a3] hover:text-[#0a0a0a]'
                    }`}
                  >
                    {code}
                  </button>
                ))}
              </div>
              <SocialLinks variant="header" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
