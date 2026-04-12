import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Footer() {
  const { lang, t } = useLanguage();
  const pl = lang === 'pl';

  return (
    <footer className="border-t border-white/[0.06] bg-[#060606]">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Top: Logo + Links + Disclaimer */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-extrabold">
                <span className="text-teal-400">P</span>
                <span className="text-amber-500">X</span>
              </span>
              <span className="text-sm font-bold text-white tracking-widest">PEPTIVEX LABS</span>
            </div>
            <p className="text-amber-500/60 text-[10px] tracking-[0.2em] uppercase mb-4">Research Peptides</p>
            <p className="text-white/30 text-xs leading-relaxed">
              {pl
                ? 'Peptydy badawcze najwyższej jakości. Wyłącznie do zastosowań laboratoryjnych.'
                : 'Highest quality research peptides. For laboratory use only.'
              }
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-wide mb-4">
              {pl ? 'Nawigacja' : 'Navigation'}
            </h4>
            <div className="flex flex-col gap-2">
              <Link to={`/${lang}/products`} className="text-white/30 hover:text-white/60 text-sm transition-colors">{t('nav.products')}</Link>
              <Link to={`/${lang}/blog`} className="text-white/30 hover:text-white/60 text-sm transition-colors">Blog</Link>
              <Link to={`/${lang}/about`} className="text-white/30 hover:text-white/60 text-sm transition-colors">{t('nav.about')}</Link>
              <Link to={`/${lang}/contact`} className="text-white/30 hover:text-white/60 text-sm transition-colors">{t('nav.contact')}</Link>
              <Link to={`/${lang}/faq`} className="text-white/30 hover:text-white/60 text-sm transition-colors">FAQ</Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-wide mb-4">
              {pl ? 'Prawne' : 'Legal'}
            </h4>
            <div className="flex flex-col gap-2 mb-5">
              <Link to={`/${lang}/terms`} className="text-white/30 hover:text-white/60 text-sm transition-colors">
                {pl ? 'Regulamin' : 'Terms & Conditions'}
              </Link>
              <Link to={`/${lang}/privacy`} className="text-white/30 hover:text-white/60 text-sm transition-colors">
                {pl ? 'Polityka prywatności' : 'Privacy Policy'}
              </Link>
              <Link to={`/${lang}/legal`} className="text-white/30 hover:text-white/60 text-sm transition-colors">
                {pl ? 'Informacja prawna' : 'Legal Notice'}
              </Link>
            </div>
            <div className="bg-amber-500/[0.08] border border-amber-500/20 rounded-lg px-3 py-2">
              <p className="text-amber-500 text-[10px] font-semibold uppercase tracking-wide mb-0.5">⚠ {t('product.researchOnly')}</p>
              <p className="text-white/30 text-[10px] leading-relaxed">{t('footer.disclaimer')}</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.04] pt-6 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-white/20 text-xs">© 2026 PEPTIVEX LABS. {t('footer.rights')}</p>
          <p className="text-white/20 text-xs">{t('footer.research')}</p>
        </div>
      </div>
    </footer>
  );
}
