import { useState, useEffect, useCallback } from 'react';
import { Mail, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const CONTACT_EMAIL = 'info@peptivexlabs.com';

const PAGES = [
  {
    src: '/images/catalog/catalog-page-1.jpg',
    alt_pl: 'Katalog Peptivex Labs strona 1: peny sygnaturowe, stacki i peptydy regeneracyjne',
    alt_en: 'Peptivex Labs product range page 1: signature pens, signature stacks and core recovery peptides',
    alt_es: 'Catálogo Peptivex Labs página 1: plumas, stacks y péptidos de recuperación',
  },
  {
    src: '/images/catalog/catalog-page-2.jpg',
    alt_pl: 'Katalog Peptivex Labs strona 2: peptydy metaboliczne, wzrostu i wydolności',
    alt_en: 'Peptivex Labs product range page 2: metabolic, wellness, growth and performance peptides',
    alt_es: 'Catálogo Peptivex Labs página 2: péptidos metabólicos, de crecimiento y rendimiento',
  },
  {
    src: '/images/catalog/catalog-page-3.jpg',
    alt_pl: 'Katalog Peptivex Labs strona 3: peptydy nootropowe, estetyczne i specjalistyczne',
    alt_en: 'Peptivex Labs product range page 3: nootropic, aesthetic and specialty peptides',
    alt_es: 'Catálogo Peptivex Labs página 3: péptidos nootrópicos, estéticos y especializados',
  },
];

export default function ProductRangeCatalog() {
  const { lang } = useLanguage();
  const pl = lang === 'pl';
  const es = lang === 'es';
  const [active, setActive] = useState<number | null>(null);

  const alt = (p: typeof PAGES[number]) => (pl ? p.alt_pl : es ? p.alt_es : p.alt_en);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(() => setActive(i => (i === null ? i : (i + PAGES.length - 1) % PAGES.length)), []);
  const next = useCallback(() => setActive(i => (i === null ? i : (i + 1) % PAGES.length)), []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active, close, prev, next]);

  return (
    <section id="catalog" className="relative overflow-hidden section-warm py-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#ea580c]/[0.06] blur-[120px]" />
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <p className="text-[#ea580c] text-xs tracking-[0.3em] uppercase mb-3 font-semibold">
            {pl ? 'Katalog' : es ? 'Catálogo' : 'Catalog'}
          </p>
          <h2 className="text-[#0a0a0a] text-3xl font-extrabold mb-4">
            {pl ? 'Pełny zakres produktów' : es ? 'Gama completa de productos' : 'Full product range'}
          </h2>
          <p className="text-[#737373] text-sm max-w-lg mx-auto">
            {pl
              ? 'Pełna oferta peptydów badawczych Peptivex Labs w trzech kategoriach. Kliknij stronę, aby powiększyć.'
              : es
              ? 'La gama completa de péptidos de investigación de Peptivex Labs en tres categorías. Haga clic en una página para ampliarla.'
              : 'The complete Peptivex Labs research peptide range across three categories. Click a page to enlarge.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {PAGES.map((p, i) => (
            <button
              key={p.src}
              onClick={() => setActive(i)}
              className="group relative rounded-2xl p-[2px] bg-gradient-to-br from-[#e6c074] via-[#b8860b] to-[#e6c074] shadow-[0_10px_40px_rgba(0,0,0,0.18)] transition-transform duration-300 hover:-translate-y-1"
              aria-label={alt(p)}
            >
              <div className="relative rounded-[14px] overflow-hidden bg-[#0a0a0a]">
                <img
                  src={p.src}
                  alt={alt(p)}
                  loading="lazy"
                  width={1055}
                  height={1491}
                  className="w-full h-auto block"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors duration-300">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 inline-flex items-center gap-2 bg-white/90 text-[#0a0a0a] text-xs font-semibold px-3 py-1.5 rounded-full">
                    <ZoomIn size={14} />
                    {pl ? 'Powiększ' : es ? 'Ampliar' : 'Enlarge'}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[#525252] text-sm mb-4">
            {pl
              ? 'Po więcej informacji prosimy o kontakt mailowy:'
              : es
              ? 'Para más información, escríbanos:'
              : 'For more information, please email us:'}
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="cta-primary inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#ea580c] to-[#f59e0b] text-white font-semibold px-6 py-3 rounded-full hover:from-[#c2410c] hover:to-[#ea580c] transition-all text-sm shadow-[0_4px_14px_rgba(234,88,12,0.30)]"
          >
            <Mail size={15} />
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label={pl ? 'Zamknij' : es ? 'Cerrar' : 'Close'}
          >
            <X size={22} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label={pl ? 'Poprzednia' : es ? 'Anterior' : 'Previous'}
          >
            <ChevronLeft size={24} />
          </button>

          <img
            src={PAGES[active].src}
            alt={alt(PAGES[active])}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-auto max-w-full rounded-xl shadow-2xl"
          />

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label={pl ? 'Następna' : es ? 'Siguiente' : 'Next'}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </section>
  );
}
