import { useLanguage } from '../../contexts/LanguageContext';
import { AlertTriangle } from 'lucide-react';

export function DisclaimerBadge() {
  const { lang } = useLanguage();
  return (
    <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
      <AlertTriangle size={10} />
      {lang === 'pl' ? 'ODCZYNNIK LABORATORYJNY' : 'RESEARCH USE ONLY'}
    </span>
  );
}

export function DisclaimerFull() {
  const { t } = useLanguage();
  return (
    <div className="bg-amber-500/[0.06] border border-amber-500/20 rounded-xl p-5">
      <div className="flex items-start gap-3">
        <AlertTriangle size={18} className="text-amber-500 mt-0.5 shrink-0" />
        <div>
          <h4 className="text-amber-500 text-xs font-bold uppercase tracking-wide mb-1.5">⚠ {t('product.researchOnly')}</h4>
          <p className="text-white/50 text-sm leading-relaxed">{t('product.researchSub')}</p>
        </div>
      </div>
    </div>
  );
}
