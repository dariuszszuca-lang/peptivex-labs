import { FlaskConical, Shield, Thermometer, Award, Truck, Beaker } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import HexPattern from '../components/home/HexPattern';

export default function AboutPage() {
  const { lang } = useLanguage();
  const pl = lang === 'pl';

  const features = [
    { icon: FlaskConical, title: pl ? 'Czystość >98%' : 'Purity >98%', desc: pl ? 'Każda partia testowana HPLC. Certyfikat analizy na życzenie.' : 'Every batch HPLC tested. Certificate of Analysis on request.' },
    { icon: Thermometer, title: pl ? 'Kontrola temperatury' : 'Temperature Control', desc: pl ? 'Produkty przechowywane i wysyłane w kontrolowanych warunkach.' : 'Products stored and shipped under controlled conditions.' },
    { icon: Truck, title: pl ? 'Szybka dostawa' : 'Fast Delivery', desc: pl ? 'InPost Paczkomaty (PL) i Lockers (UK). Dyskretna paczka.' : 'InPost Lockers (UK) and Paczkomaty (PL). Discreet packaging.' },
    { icon: Shield, title: pl ? 'Bezpieczne płatności' : 'Secure Payments', desc: pl ? 'Stripe — karty, BLIK, P24. Pełne szyfrowanie.' : 'Stripe — cards and secure methods. Full encryption.' },
    { icon: Award, title: pl ? 'Dokumentacja' : 'Documentation', desc: pl ? 'Opisy z odniesieniami do literatury naukowej.' : 'Descriptions with scientific literature references.' },
    { icon: Beaker, title: pl ? 'Szeroki wybór' : 'Wide Selection', desc: pl ? 'Regeneracyjne, metaboliczne, anti-aging i więcej.' : 'Regenerative, metabolic, anti-aging and more.' },
  ];

  return (
    <div>
      {/* Hero with image */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/brand/hero-brand.png" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/80 to-[#0a0a0a]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 py-20 relative z-10">
          <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-4">PEPTIVEX LABS</p>
          <h1 className="text-white text-3xl sm:text-4xl font-extrabold mb-6">
            {pl ? 'O nas' : 'About Us'}
          </h1>
          <p className="text-white/50 text-lg leading-relaxed max-w-2xl">
            {pl
              ? 'Dostarczamy peptydy badawcze najwyższej jakości. Współpracujemy z certyfikowanymi laboratoriami, aby zapewnić czystość i precyzję każdego produktu.'
              : 'We deliver the highest quality research peptides. We work with certified laboratories to ensure purity and precision of every product.'
            }
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="relative section-warm">
        <HexPattern className="text-amber-500/[0.02]" />
        <div className="max-w-4xl mx-auto px-4 py-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-white text-2xl font-bold mb-4">{pl ? 'Nasza misja' : 'Our Mission'}</h2>
              <p className="text-white/50 leading-relaxed mb-4">
                {pl
                  ? 'Wierzymy, że dostęp do wysokiej jakości odczynników badawczych powinien być prosty i przystępny. Naszym celem jest wspieranie społeczności naukowej poprzez dostarczanie peptydów o potwierdzonej czystości, w przystępnych cenach i z szybką dostawą.'
                  : 'We believe that access to high-quality research reagents should be simple and affordable. Our goal is to support the scientific community by providing peptides of verified purity, at competitive prices, with fast delivery.'
                }
              </p>
              <p className="text-white/50 leading-relaxed">
                {pl
                  ? 'Każda partia jest testowana metodą HPLC i spełnia normy czystości powyżej 98%. Na życzenie dostarczamy certyfikat analizy.'
                  : 'Every batch is HPLC tested and meets purity standards above 98%. We provide certificates of analysis upon request.'
                }
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
              <img src="/images/brand/peptivex-box.png" alt="PEPTIVEX LABS" className="w-full h-64 object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="relative section-dark">
        <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
          <h2 className="text-white text-2xl font-bold mb-10 text-center">
            {pl ? 'Dlaczego PEPTIVEX LABS?' : 'Why PEPTIVEX LABS?'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={i} className="group feature-card bg-white/[0.04] border border-white/[0.08] rounded-xl p-6 hover:border-amber-500/20 transition-all">
                <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-center mb-4">
                  <f.icon size={18} className="text-amber-500" />
                </div>
                <h3 className="text-white font-semibold mb-2">{f.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-amber-500/[0.06] border border-amber-500/20 rounded-xl p-6 text-center">
          <p className="text-amber-500 text-xs font-bold uppercase tracking-wide mb-2">
            {pl ? '⚠ ODCZYNNIK LABORATORYJNY' : '⚠ RESEARCH USE ONLY'}
          </p>
          <p className="text-white/40 text-sm">
            {pl
              ? 'Wszystkie produkty PEPTIVEX LABS są przeznaczone wyłącznie do zastosowań badawczych i laboratoryjnych.'
              : 'All PEPTIVEX LABS products are for research and laboratory use only.'
            }
          </p>
        </div>
      </div>
    </div>
  );
}
