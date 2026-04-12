import { useLanguage } from '../../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/[0.06] bg-[#060606]">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Logo + Disclaimer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-extrabold">
                <span className="text-teal-400">P</span>
                <span className="text-amber-500">X</span>
              </span>
              <span className="text-sm font-bold text-white tracking-widest">PEPTIVEX LABS</span>
            </div>
            <p className="text-amber-500/60 text-[10px] tracking-[0.2em] uppercase">Research Peptides</p>
          </div>
          <div className="bg-amber-500/[0.08] border border-amber-500/20 rounded-lg px-4 py-2.5 max-w-md">
            <p className="text-amber-500 text-[11px] font-semibold uppercase tracking-wide mb-1">⚠ {t('product.researchOnly')}</p>
            <p className="text-white/40 text-[11px] leading-relaxed">{t('footer.disclaimer')}</p>
          </div>
        </div>

        <div className="border-t border-white/[0.04] pt-6 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-white/20 text-xs">© 2026 PEPTIVEX LABS. {t('footer.rights')}</p>
          <p className="text-white/20 text-xs">{t('footer.research')}</p>
        </div>
      </div>
    </footer>
  );
}
