import { FlaskConical, Shield, Thermometer, Award, Truck, Beaker, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import HexPattern from '../components/home/HexPattern';
import ParticleField from '../components/home/ParticleField';

export default function AboutPage() {
  const { lang } = useLanguage();
  const pl = lang === 'pl';

  const features = [
    { icon: FlaskConical, title: pl ? 'Czystość >98%' : 'Purity >98%', desc: pl ? 'Każda partia testowana HPLC. Certyfikat analizy na życzenie.' : 'Every batch HPLC tested. Certificate of Analysis on request.', color: 'from-amber-500/20 to-amber-500/5' },
    { icon: Thermometer, title: pl ? 'Kontrola temperatury' : 'Temperature Control', desc: pl ? 'Produkty przechowywane i wysyłane w kontrolowanych warunkach temperaturowych.' : 'Products stored and shipped under controlled temperature conditions.', color: 'from-teal-500/20 to-teal-500/5' },
    { icon: Truck, title: pl ? 'Szybka dostawa' : 'Fast Delivery', desc: pl ? 'InPost Paczkomaty (PL) i Lockers (UK). Dyskretna paczka, wysyłka w 24h.' : 'InPost Lockers (UK) and Paczkomaty (PL). Discreet packaging, 24h dispatch.', color: 'from-violet-500/20 to-violet-500/5' },
    { icon: Shield, title: pl ? 'Bezpieczne płatności' : 'Secure Payments', desc: pl ? 'Stripe — karty, BLIK, Przelewy24. Pełne szyfrowanie PCI DSS Level 1.' : 'Stripe — cards, BLIK, P24. Full PCI DSS Level 1 encryption.', color: 'from-sky-500/20 to-sky-500/5' },
    { icon: Award, title: pl ? 'Dokumentacja naukowa' : 'Scientific Documentation', desc: pl ? 'Każdy produkt z opisem, specyfikacją i odniesieniami do publikacji naukowych.' : 'Every product with description, specification, and scientific publication references.', color: 'from-emerald-500/20 to-emerald-500/5' },
    { icon: Beaker, title: pl ? 'Szeroki wybór' : 'Wide Selection', desc: pl ? '19 peptydów w 9 kategoriach: regeneracyjne, metaboliczne, anti-aging, kognitywne i więcej.' : '19 peptides in 9 categories: regenerative, metabolic, anti-aging, cognitive and more.', color: 'from-rose-500/20 to-rose-500/5' },
  ];

  const timeline = [
    { year: pl ? 'Krok 1' : 'Step 1', title: pl ? 'Synteza SPPS' : 'SPPS Synthesis', desc: pl ? 'Peptydy syntetyzowane metodą Solid Phase Peptide Synthesis w certyfikowanym laboratorium.' : 'Peptides synthesized using Solid Phase Peptide Synthesis in a certified laboratory.' },
    { year: pl ? 'Krok 2' : 'Step 2', title: pl ? 'Oczyszczanie HPLC' : 'HPLC Purification', desc: pl ? 'Chromatografia cieczowa zapewnia czystość powyżej 98%. Certyfikat analizy dla każdej partii.' : 'Liquid chromatography ensures purity above 98%. Certificate of analysis for each batch.' },
    { year: pl ? 'Krok 3' : 'Step 3', title: pl ? 'Liofilizacja' : 'Lyophilization', desc: pl ? 'Suszenie sublimacyjne daje stabilny proszek gotowy do długotrwałego przechowywania.' : 'Freeze-drying produces a stable powder ready for long-term storage.' },
    { year: pl ? 'Krok 4' : 'Step 4', title: pl ? 'Wysyłka' : 'Shipping', desc: pl ? 'Dyskretne opakowanie, kontrola temperatury, InPost Paczkomaty / Lockers.' : 'Discreet packaging, temperature control, InPost Paczkomaty / Lockers.' },
  ];

  return (
    <div>
      {/* Hero — full width with product image */}
      <div className="relative overflow-hidden min-h-[50vh] flex items-center">
        <div className="absolute inset-0">
          <img src="/images/products/retatrutide-pens.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0a08] via-[#0c0a08]/90 to-[#0c0a08]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a08] via-transparent to-[#0c0a08]/40" />
        </div>
        <HexPattern className="text-amber-500/[0.03]" />
        <div className="max-w-6xl mx-auto px-4 py-24 relative z-10">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              <span className="text-amber-400 text-xs font-medium tracking-wide">PEPTIVEX LABS</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6">
              {pl ? (
                <><span className="text-gradient">Nauka</span> w służbie<br />jakości</>
              ) : (
                <><span className="text-gradient">Science</span> in service<br />of quality</>
              )}
            </h1>
            <p className="text-white/50 text-lg leading-relaxed">
              {pl
                ? 'Dostarczamy peptydy badawcze o potwierdzonej czystości >98%. Współpracujemy z certyfikowanymi laboratoriami, żebyś mógł skupić się na badaniach.'
                : 'We deliver research peptides with verified >98% purity. We work with certified laboratories so you can focus on your research.'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="relative z-10 -mt-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="stats-bar bg-[#13110f]/90 backdrop-blur-xl border border-amber-500/10 rounded-2xl p-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: '>98%', label: pl ? 'Czystość HPLC' : 'HPLC Purity' },
              { value: '19', label: pl ? 'Produktów' : 'Products' },
              { value: '2', label: pl ? 'Regiony' : 'Regions' },
              { value: '24h', label: pl ? 'Realizacja' : 'Dispatch' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-amber-400 text-3xl font-extrabold mb-1">{s.value}</p>
                <p className="text-white/40 text-xs uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission — 2 columns */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/[0.08] via-[#0c0a08] to-transparent" />
        <HexPattern className="text-amber-500/[0.02]" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-3">{pl ? 'Misja' : 'Mission'}</p>
              <h2 className="text-white text-3xl font-extrabold mb-6">
                {pl ? 'Dlaczego istniejemy?' : 'Why we exist'}
              </h2>
              <p className="text-white/50 text-[15px] leading-[1.9] mb-6">
                {pl
                  ? 'Wierzymy, że dostęp do wysokiej jakości odczynników badawczych powinien być prosty, szybki i przystępny cenowo. Zbyt wielu badaczy traci czas na szukanie wiarygodnych dostawców.'
                  : 'We believe that access to high-quality research reagents should be simple, fast, and affordable. Too many researchers waste time searching for reliable suppliers.'
                }
              </p>
              <p className="text-white/50 text-[15px] leading-[1.9] mb-8">
                {pl
                  ? 'PEPTIVEX LABS wypełnia tę lukę — każdy produkt jest testowany HPLC, starannie pakowany i dostarczany w ciągu 1-3 dni przez InPost. Bez kompromisów w jakości.'
                  : 'PEPTIVEX LABS fills this gap — every product is HPLC tested, carefully packaged, and delivered within 1-3 days via InPost. No compromises on quality.'
                }
              </p>
              <div className="flex flex-col gap-3">
                {(pl
                  ? ['Certyfikat analizy dla każdej partii', 'Dyskretne opakowanie z kontrolą temperatury', 'Bezpieczne płatności Stripe (PCI DSS Level 1)', 'Wysyłka InPost w Polsce i UK']
                  : ['Certificate of analysis for every batch', 'Discreet packaging with temperature control', 'Secure Stripe payments (PCI DSS Level 1)', 'InPost delivery in Poland and UK']
                ).map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-amber-500/15 flex items-center justify-center shrink-0">
                      <Check size={12} className="text-amber-400" />
                    </div>
                    <span className="text-white/60 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-white/[0.06] shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                <img src="/images/products/retatrutide-box-holo.jpg" alt="PEPTIVEX LABS" className="w-full aspect-[4/5] object-cover" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-[#0e0c09] border border-amber-500/20 rounded-xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <p className="text-amber-400 text-2xl font-extrabold">&gt;98%</p>
                <p className="text-white/40 text-xs">{pl ? 'Czystość HPLC' : 'HPLC Purity'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process / Timeline */}
      <section className="relative overflow-hidden py-20 section-dark">
        <HexPattern className="text-amber-500/[0.03]" />
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-3">{pl ? 'Proces' : 'Process'}</p>
            <h2 className="text-white text-3xl font-extrabold mb-4">
              {pl ? 'Od syntezy do dostawy' : 'From synthesis to delivery'}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-teal-500 rounded-full mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeline.map((step, i) => (
              <div key={i} className="relative group">
                {/* Connector */}
                {i < 3 && <div className="hidden lg:block absolute top-8 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent translate-x-1/2 z-0" />}
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/15 to-amber-500/5 border border-amber-500/15 flex items-center justify-center mb-5 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] group-hover:scale-110 transition-all duration-300">
                    <span className="text-amber-400 text-lg font-extrabold">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <p className="text-amber-500/50 text-xs font-semibold uppercase tracking-wider mb-1">{step.year}</p>
                  <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/[0.1] via-[#0c0a08] to-teal-900/[0.05]" />
        <HexPattern className="text-amber-500/[0.03]" />
        <div className="absolute inset-0 noise-overlay" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-3">{pl ? 'Przewagi' : 'Advantages'}</p>
            <h2 className="text-white text-3xl font-extrabold mb-4">
              {pl ? 'Dlaczego PEPTIVEX LABS?' : 'Why PEPTIVEX LABS?'}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-teal-500 rounded-full mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="group why-card relative rounded-2xl overflow-hidden transition-all duration-300">
                <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-b from-amber-500/20 via-transparent to-teal-500/10 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-full h-full rounded-2xl bg-[#0e0c09]" />
                </div>
                <div className="relative z-10 p-7">
                  <div className={`w-14 h-14 bg-gradient-to-br ${f.color} border border-white/[0.06] rounded-2xl flex items-center justify-center mb-5 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] group-hover:scale-110 transition-all duration-300`}>
                    <f.icon size={24} className="text-amber-400" />
                  </div>
                  <h3 className="text-white text-lg font-bold mb-3">{f.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/15 via-[#0c0a08] to-amber-900/10" />
        <HexPattern className="text-amber-500/[0.04]" />
        <ParticleField />
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full bg-amber-500/[0.06] blur-[80px]" />
        <div className="max-w-4xl mx-auto px-4 py-24 text-center relative z-10">
          <h2 className="text-white text-3xl sm:text-4xl font-extrabold mb-5">
            {pl ? (
              <><span className="text-gradient">Zamów</span> peptydy badawcze</>
            ) : (
              <><span className="text-gradient">Order</span> research peptides</>
            )}
          </h2>
          <p className="text-white/50 mb-8 max-w-md mx-auto">
            {pl ? 'Czystość >98%, certyfikat HPLC, szybka dostawa InPost.' : '>98% purity, HPLC certificate, fast InPost delivery.'}
          </p>
          <Link to={`/${lang}/products`} className="cta-primary inline-flex items-center gap-2 bg-amber-500 text-black font-bold px-8 py-4 rounded-xl hover:bg-amber-400 transition-all text-sm">
            {pl ? 'Zobacz produkty' : 'Browse Products'} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
