import { FlaskConical, Shield, Thermometer, Award, Truck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function AboutPage() {
  const { lang } = useLanguage();
  const pl = lang === 'pl';

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Hero */}
      <div className="mb-16">
        <p className="text-amber-500/80 text-xs tracking-[0.3em] uppercase mb-4">PEPTIVEX LABS</p>
        <h1 className="text-white text-3xl sm:text-4xl font-extrabold mb-6">
          {pl ? 'O nas' : 'About Us'}
        </h1>
        <p className="text-white/50 text-lg leading-relaxed max-w-2xl">
          {pl
            ? 'PEPTIVEX LABS to marka dedykowana dostarczaniu peptydów badawczych najwyższej jakości. Współpracujemy z certyfikowanymi laboratoriami, aby zapewnić czystość i precyzję każdego produktu.'
            : 'PEPTIVEX LABS is a brand dedicated to providing the highest quality research peptides. We work with certified laboratories to ensure purity and precision of every product.'
          }
        </p>
      </div>

      {/* Mission */}
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 mb-12">
        <h2 className="text-white text-xl font-bold mb-4">
          {pl ? 'Nasza misja' : 'Our Mission'}
        </h2>
        <p className="text-white/50 leading-relaxed">
          {pl
            ? 'Wierzymy, że dostęp do wysokiej jakości odczynników badawczych powinien być prosty i przystępny. Naszym celem jest wspieranie społeczności naukowej i badawczej poprzez dostarczanie peptydów o potwierdzonej czystości, w przystępnych cenach i z szybką dostawą.'
            : 'We believe that access to high-quality research reagents should be simple and affordable. Our goal is to support the scientific and research community by providing peptides of verified purity, at competitive prices, with fast delivery.'
          }
        </p>
      </div>

      {/* Values */}
      <h2 className="text-white text-xl font-bold mb-8">
        {pl ? 'Dlaczego PEPTIVEX LABS?' : 'Why PEPTIVEX LABS?'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
        {[
          {
            icon: FlaskConical,
            title: pl ? 'Czystość >98%' : 'Purity >98%',
            desc: pl
              ? 'Każda partia jest testowana metodą HPLC. Dostarczamy certyfikaty analizy na życzenie.'
              : 'Every batch is HPLC tested. We provide certificates of analysis upon request.',
          },
          {
            icon: Thermometer,
            title: pl ? 'Kontrola temperatury' : 'Temperature Control',
            desc: pl
              ? 'Produkty przechowywane i wysyłane w kontrolowanych warunkach, aby zachować stabilność.'
              : 'Products stored and shipped under controlled conditions to maintain stability.',
          },
          {
            icon: Truck,
            title: pl ? 'Szybka dostawa' : 'Fast Delivery',
            desc: pl
              ? 'Wysyłka InPost Paczkomaty w Polsce i InPost Lockers w UK. Dyskretna paczka, szybka realizacja.'
              : 'InPost Lockers delivery in UK and InPost Paczkomaty in Poland. Discreet packaging, fast processing.',
          },
          {
            icon: Shield,
            title: pl ? 'Bezpieczne płatności' : 'Secure Payments',
            desc: pl
              ? 'Płatności obsługiwane przez Stripe — karty, BLIK, Przelewy24. Pełne szyfrowanie danych.'
              : 'Payments processed by Stripe — cards and secure payment methods. Full data encryption.',
          },
          {
            icon: Award,
            title: pl ? 'Dokumentacja' : 'Documentation',
            desc: pl
              ? 'Każdy produkt posiada szczegółowy opis, specyfikację i odniesienia do literatury naukowej.'
              : 'Every product comes with a detailed description, specification, and references to scientific literature.',
          },
          {
            icon: FlaskConical,
            title: pl ? 'Szeroki wybór' : 'Wide Selection',
            desc: pl
              ? 'Peptydy regeneracyjne, metaboliczne, anti-aging, kognitywne i wiele innych — wszystko w jednym miejscu.'
              : 'Regenerative, metabolic, anti-aging, cognitive peptides and more — all in one place.',
          },
        ].map((item, i) => (
          <div key={i} className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-6 hover:border-amber-500/20 transition-colors">
            <item.icon size={20} className="text-amber-500 mb-3" />
            <h3 className="text-white font-semibold text-sm mb-2">{item.title}</h3>
            <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-500/[0.06] border border-amber-500/20 rounded-xl p-6 text-center">
        <p className="text-amber-500 text-xs font-bold uppercase tracking-wide mb-2">
          {pl ? '⚠ ODCZYNNIK LABORATORYJNY' : '⚠ RESEARCH USE ONLY'}
        </p>
        <p className="text-white/40 text-sm">
          {pl
            ? 'Wszystkie produkty PEPTIVEX LABS są przeznaczone wyłącznie do zastosowań badawczych i laboratoryjnych. Produkt nie jest zarejestrowanym lekiem ani suplementem diety.'
            : 'All PEPTIVEX LABS products are for research and laboratory use only. Products are not registered drugs or dietary supplements.'
          }
        </p>
      </div>
    </div>
  );
}
