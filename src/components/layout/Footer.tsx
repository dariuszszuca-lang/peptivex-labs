import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Footer() {
  const { lang, t } = useLanguage();
  const pl = lang === 'pl';
  const es = lang === 'es';

  return (
    <footer className="border-t border-[#ececec] bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Top: Logo + Links + Disclaimer */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-extrabold text-[#1a1a1a]">
                PX
              </span>
              <span className="text-sm font-bold text-[#1a1a1a] tracking-widest">PEPTIVEX LABS</span>
            </div>
            <p className="text-[#ea580c] text-[10px] tracking-[0.2em] uppercase mb-4 font-semibold">Research Peptides</p>
            <p className="text-[#737373] text-xs leading-relaxed">
              {pl ? 'Peptydy badawcze najwyższej jakości. Wyłącznie do zastosowań laboratoryjnych.' : es ? 'Péptidos de investigación de la más alta calidad. Solo para uso en laboratorio.' : 'Highest quality research peptides. For laboratory use only.'
              }
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[#1a1a1a] text-xs font-semibold uppercase tracking-wide mb-4">
              {pl ? 'Nawigacja' : es ? 'Navegación' : 'Navigation'}
            </h4>
            <div className="flex flex-col gap-2">
              <Link to={`/${lang}/products`} className="text-[#525252] hover:text-[#ea580c] text-sm transition-colors">{t('nav.products')}</Link>
              <Link to={`/${lang}/blog`} className="text-[#525252] hover:text-[#ea580c] text-sm transition-colors">Blog</Link>
              <Link to={`/${lang}/about`} className="text-[#525252] hover:text-[#ea580c] text-sm transition-colors">{t('nav.about')}</Link>
              <Link to={`/${lang}/contact`} className="text-[#525252] hover:text-[#ea580c] text-sm transition-colors">{t('nav.contact')}</Link>
              <Link to={`/${lang}/guide`} className="text-[#525252] hover:text-[#ea580c] text-sm transition-colors">{pl ? 'Przewodnik' : es ? 'Guía' : 'Guide'}</Link>
              <Link to={`/${lang}/faq`} className="text-[#525252] hover:text-[#ea580c] text-sm transition-colors">FAQ</Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[#1a1a1a] text-xs font-semibold uppercase tracking-wide mb-4">
              {pl ? 'Prawne' : es ? 'Legal' : 'Legal'}
            </h4>
            <div className="flex flex-col gap-2 mb-5">
              <Link to={`/${lang}/terms`} className="text-[#525252] hover:text-[#ea580c] text-sm transition-colors">
                {pl ? 'Regulamin' : es ? 'Términos y Condiciones' : 'Terms & Conditions'}
              </Link>
              <Link to={`/${lang}/privacy`} className="text-[#525252] hover:text-[#ea580c] text-sm transition-colors">
                {pl ? 'Polityka prywatności' : es ? 'Política de Privacidad' : 'Privacy Policy'}
              </Link>
              <Link to={`/${lang}/legal`} className="text-[#525252] hover:text-[#ea580c] text-sm transition-colors">
                {pl ? 'Informacja prawna' : es ? 'Aviso Legal' : 'Legal Notice'}
              </Link>
            </div>
            <div className="bg-[#fff7ed] border border-[#fed7aa] rounded-lg px-3 py-2">
              <p className="text-[#c2410c] text-[10px] font-semibold uppercase tracking-wide mb-0.5">⚠ {t('product.researchOnly')}</p>
              <p className="text-[#737373] text-[10px] leading-relaxed">{t('footer.disclaimer')}</p>
            </div>
          </div>
        </div>

        {/* Company details */}
        <div className="border-t border-[#ececec] pt-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#737373] text-xs leading-relaxed">
            <div>
              <p className="text-[#1a1a1a] font-semibold mb-1">PEPTIVEXLABS LTD</p>
              <p>{pl ? 'Numer firmy' : es ? 'Número de empresa' : 'Company number'}: 17178009</p>
              <p>{pl ? 'Siedziba rejestrowa' : es ? 'Domicilio social' : 'Registered office'}:</p>
              <p>66 Paul Street, London, EC2A 4NA, United Kingdom</p>
            </div>
            <div>
              <p className="text-[#1a1a1a] font-semibold mb-1">{pl ? 'Adres korespondencyjny' : es ? 'Dirección operativa' : 'Operational address'}</p>
              <p>4th Floor, The Featherstone Building</p>
              <p>66 City Road, London, EC1Y 2AL</p>
              <p>United Kingdom</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#ececec] pt-6 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-[#a3a3a3] text-xs">© 2026 PEPTIVEXLABS LTD. {t('footer.rights')}</p>
          <p className="text-[#a3a3a3] text-xs">{t('footer.research')}</p>
        </div>
      </div>
    </footer>
  );
}
