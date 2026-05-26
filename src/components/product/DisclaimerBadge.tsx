import { useLanguage } from '../../contexts/LanguageContext';
import { AlertTriangle } from 'lucide-react';

export function DisclaimerBadge() {
  const { lang } = useLanguage();
  const es = lang === 'es';
  return (
    <span className="inline-flex items-center gap-1 bg-[#fff7ed] text-[#ea580c] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
      <AlertTriangle size={10} />
      {lang === 'pl' ? 'ODCZYNNIK LABORATORYJNY' : es ? 'SOLO PARA USO EN INVESTIGACIÓN' : 'RESEARCH USE ONLY'}
    </span>
  );
}

export function DisclaimerFull() {
  const { t } = useLanguage();
  return (
    <div className="bg-[#fff7ed] border border-[#fed7aa] rounded-xl p-5">
      <div className="flex items-start gap-3">
        <AlertTriangle size={18} className="text-[#ea580c] mt-0.5 shrink-0" />
        <div>
          <h4 className="text-[#ea580c] text-xs font-bold uppercase tracking-wide mb-1.5">⚠ {t('product.researchOnly')}</h4>
          <p className="text-[#525252] text-sm leading-relaxed">{t('product.researchSub')}</p>
        </div>
      </div>
    </div>
  );
}
