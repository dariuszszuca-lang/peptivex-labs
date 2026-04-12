import { Link } from 'react-router-dom';
import { ArrowRight, FlaskConical, Shield, Truck, Zap, Award, Beaker, ChevronDown, ChevronUp, Heart, Hourglass, Flame, Dumbbell, Brain, type LucideIcon} from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import DnaHelix from '../components/home/DnaHelix';
import ParticleField from '../components/home/ParticleField';
import HexPattern from '../components/home/HexPattern';
import LabBackground from '../components/home/LabBackground';

export default function HomePage() {
  const { lang, t } = useLanguage();
  const pl = lang === 'pl';
  const featured = PRODUCTS.filter(p => p.featured).slice(0, 4);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: pl ? 'Czym są peptydy badawcze?' : 'What are research peptides?',
      a: pl ? 'Peptydy badawcze to syntetyczne łańcuchy aminokwasów przeznaczone do zastosowań laboratoryjnych i naukowych. Każdy peptyd jest testowany pod kątem czystości metodą HPLC.' : 'Research peptides are synthetic amino acid chains intended for laboratory and scientific use. Each peptide is HPLC-tested for purity.',
    },
    {
      q: pl ? 'Jak szybko dostarczacie?' : 'How fast do you deliver?',
      a: pl ? 'Polska: 1-2 dni robocze (InPost Paczkomaty). UK: 2-3 dni robocze (InPost Lockers). Zamówienia realizujemy w ciągu 24h.' : 'Poland: 1-2 business days (InPost Paczkomaty). UK: 2-3 business days (InPost Lockers). Orders processed within 24h.',
    },
    {
      q: pl ? 'Jakie metody płatności akceptujecie?' : 'What payment methods do you accept?',
      a: pl ? 'Karty płatnicze (Visa, Mastercard), BLIK i Przelewy24 (PL). Płatności obsługuje Stripe z pełnym szyfrowaniem.' : 'Credit/debit cards (Visa, Mastercard), BLIK and Przelewy24 (PL). Payments processed by Stripe with full encryption.',
    },
    {
      q: pl ? 'Jak przechowywać peptydy?' : 'How to store peptides?',
      a: pl ? 'Liofilizowane peptydy: -20°C (zamrażarka). Po rekonstytucji: 2-8°C (lodówka), zużyć w 30 dni. Chronić przed światłem.' : 'Lyophilized peptides: -20°C (freezer). After reconstitution: 2-8°C (fridge), use within 30 days. Protect from light.',
    },
  ];

  const stats = [
    { value: '>98%', label: pl ? 'Czystość HPLC' : 'HPLC Purity' },
    { value: '24h', label: pl ? 'Czas realizacji' : 'Processing Time' },
    { value: '2', label: pl ? 'Regiony wysyłki' : 'Shipping Regions' },
    { value: '19', label: pl ? 'Produktów' : 'Products' },
  ];

  const features = [
    { icon: FlaskConical, title: pl ? 'Najwyższa czystość' : 'Highest Purity', desc: pl ? 'Każda partia testowana HPLC. Certyfikat analizy na życzenie.' : 'Every batch HPLC tested. Certificate of Analysis on request.' },
    { icon: Truck, title: pl ? 'Szybka dostawa' : 'Fast Delivery', desc: pl ? 'InPost Paczkomaty (PL) i Lockers (UK). Dyskretna paczka.' : 'InPost Paczkomaty (PL) & Lockers (UK). Discreet packaging.' },
    { icon: Shield, title: pl ? 'Bezpieczne płatności' : 'Secure Payments', desc: pl ? 'Stripe — karty, BLIK, P24. Pełne szyfrowanie PCI DSS.' : 'Stripe — cards, BLIK, P24. Full PCI DSS encryption.' },
    { icon: Zap, title: pl ? 'Kontrola temperatury' : 'Temperature Control', desc: pl ? 'Przechowywanie i wysyłka w kontrolowanych warunkach.' : 'Storage and shipping under controlled conditions.' },
    { icon: Award, title: pl ? 'Dokumentacja naukowa' : 'Scientific Documentation', desc: pl ? 'Szczegółowe opisy z odniesieniami do literatury naukowej.' : 'Detailed descriptions with scientific literature references.' },
    { icon: Beaker, title: pl ? 'Szeroki wybór' : 'Wide Selection', desc: pl ? 'Peptydy regeneracyjne, metaboliczne, anti-aging i więcej.' : 'Regenerative, metabolic, anti-aging peptides and more.' },
  ];

  const categories: { key: string; icon: LucideIcon; color: string; count: number }[] = [
    { key: 'healing', icon: Heart, color: 'text-rose-400', count: PRODUCTS.filter(p => p.category === 'healing').length },
    { key: 'anti-aging', icon: Hourglass, color: 'text-violet-400', count: PRODUCTS.filter(p => p.category === 'anti-aging').length },
    { key: 'metabolic', icon: Flame, color: 'text-orange-400', count: PRODUCTS.filter(p => p.category === 'metabolic').length },
    { key: 'growth-hormone', icon: Dumbbell, color: 'text-emerald-400', count: PRODUCTS.filter(p => p.category === 'growth-hormone').length },
    { key: 'weight-loss', icon: Zap, color: 'text-amber-400', count: PRODUCTS.filter(p => p.category === 'weight-loss').length },
    { key: 'cognitive', icon: Brain, color: 'text-sky-400', count: PRODUCTS.filter(p => p.category === 'cognitive').length },
  ];

  return (
    <div>
      {/* =================== HERO =================== */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center hero-section">
        <div className="absolute inset-0">
          <div className="hero-gradient" />
          <ParticleField />
          <HexPattern className="text-amber-500/[0.03]" />
          <div className="hero-glow" />
          <div className="hero-glow-teal" />
          {/* Noise texture */}
          <div className="absolute inset-0 noise-overlay" />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-20 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              <span className="text-amber-400 text-xs font-medium tracking-wide">
                {pl ? 'Peptydy badawcze premium' : 'Premium Research Peptides'}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
              {pl ? (
                <>Nauka spotyka<br /><span className="text-gradient">najwyższą jakość</span></>
              ) : (
                <>Science meets<br /><span className="text-gradient">premium quality</span></>
              )}
            </h1>

            <p className="text-white/50 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
              {pl
                ? 'Peptydy badawcze o czystości >98% z certyfikatem HPLC. Szybka dostawa InPost. Bezpieczne płatności Stripe.'
                : 'Research peptides with >98% purity, HPLC certified. Fast InPost delivery. Secure Stripe payments.'
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to={`/${lang}/products`}
                className="cta-primary inline-flex items-center justify-center gap-2 bg-amber-500 text-black font-bold px-7 py-3.5 rounded-xl hover:bg-amber-400 transition-all text-sm"
              >
                {pl ? 'Zobacz produkty' : 'Browse Products'}
                <ArrowRight size={16} />
              </Link>
              <Link
                to={`/${lang}/about`}
                className="inline-flex items-center justify-center gap-2 bg-white/[0.06] border border-white/[0.1] text-white font-medium px-7 py-3.5 rounded-xl hover:bg-white/[0.1] transition-all text-sm"
              >
                {pl ? 'Dowiedz się więcej' : 'Learn More'}
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <DnaHelix />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={20} className="text-white/20" />
        </div>
      </section>

      {/* =================== STATS BAR =================== */}
      <section className="relative z-10 -mt-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="stats-bar bg-[#13110f]/80 backdrop-blur-xl border border-amber-500/10 rounded-2xl p-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-amber-400 text-3xl font-extrabold mb-1">{stat.value}</p>
                <p className="text-white/40 text-xs uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================== FEATURED PRODUCTS =================== */}
      <section className="relative overflow-hidden section-warm">
        <LabBackground />
        <div className="max-w-6xl mx-auto px-4 py-20 relative z-10">
          <div className="text-center mb-12">
            <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-3">
              {pl ? 'Bestsellery' : 'Bestsellers'}
            </p>
            <h2 className="text-white text-3xl font-extrabold mb-4">
              {pl ? 'Wyróżnione produkty' : 'Featured Products'}
            </h2>
            <p className="text-white/40 text-sm max-w-md mx-auto">
              {pl
                ? 'Najczęściej wybierane peptydy badawcze. Czystość >98%, certyfikat HPLC.'
                : 'Most popular research peptides. Purity >98%, HPLC certified.'
              }
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="text-center mt-10">
            <Link
              to={`/${lang}/products`}
              className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 text-sm font-medium border border-amber-500/20 px-6 py-2.5 rounded-xl hover:bg-amber-500/5 transition-all"
            >
              {pl ? 'Wszystkie produkty' : 'All Products'} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* =================== CATEGORIES =================== */}
      <section className="relative overflow-hidden section-dark py-20">
        <HexPattern className="text-amber-500/[0.03]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/[0.04] blur-[120px]" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-3">{pl ? 'Eksploruj' : 'Explore'}</p>
            <h2 className="text-white text-3xl font-extrabold mb-4">
              {pl ? 'Kategorie peptydów' : 'Peptide Categories'}
            </h2>
            <p className="text-white/40 text-sm max-w-md mx-auto">
              {pl ? 'Znajdź peptyd dopasowany do Twojego obszaru badań.' : 'Find the peptide matching your research area.'}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <Link
                key={cat.key}
                to={`/${lang}/products?category=${cat.key}`}
                className="group cat-card relative rounded-2xl p-6 text-center transition-all duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Glow border on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ padding: '1px' }}>
                  <div className="w-full h-full rounded-2xl bg-[#0e0c09]" />
                </div>
                <div className="relative z-10">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/[0.08] flex items-center justify-center group-hover:border-amber-500/30 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] transition-all duration-300">
                    <cat.icon size={24} className={`${cat.color} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <span className="text-white/80 text-sm font-semibold group-hover:text-white transition-colors block mb-1">
                    {t(`categories.${cat.key}`)}
                  </span>
                  <span className="text-white/25 text-xs">{cat.count} {pl ? 'prod.' : 'items'}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =================== WHY PEPTIVEX =================== */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/[0.12] via-[#0c0a08] to-teal-900/[0.06]" />
        <HexPattern className="text-amber-500/[0.03]" />
        <div className="absolute inset-0 noise-overlay" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-3">
              {pl ? 'Dlaczego my' : 'Why Us'}
            </p>
            <h2 className="text-white text-3xl sm:text-4xl font-extrabold mb-4">
              {pl ? 'Dlaczego PEPTIVEX LABS?' : 'Why PEPTIVEX LABS?'}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-teal-500 rounded-full mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="group why-card relative rounded-2xl overflow-hidden transition-all duration-300">
                {/* Animated border gradient */}
                <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-b from-amber-500/20 via-transparent to-teal-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" >
                  <div className="w-full h-full rounded-2xl bg-[#0e0c09]" />
                </div>
                <div className="relative z-10 p-7">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500/15 to-amber-500/5 border border-amber-500/20 rounded-xl flex items-center justify-center mb-5 group-hover:shadow-[0_0_25px_rgba(249,115,22,0.2)] group-hover:scale-110 transition-all duration-300">
                    <f.icon size={22} className="text-amber-400" />
                  </div>
                  <h3 className="text-white text-lg font-bold mb-2">{f.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================== HOW IT WORKS =================== */}
      <section className="relative section-dark py-20">
        <HexPattern className="text-amber-500/[0.02]" />
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-3">{pl ? 'Proces' : 'Process'}</p>
            <h2 className="text-white text-3xl font-extrabold mb-4">
              {pl ? 'Jak to działa?' : 'How It Works'}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
            {[
              { step: '01', title: pl ? 'Wybierz peptydy' : 'Choose Peptides', desc: pl ? 'Przejrzyj katalog, porównaj produkty i dodaj do koszyka.' : 'Browse the catalog, compare products and add to cart.', icon: FlaskConical },
              { step: '02', title: pl ? 'Zapłać bezpiecznie' : 'Pay Securely', desc: pl ? 'Stripe obsługuje karty, BLIK i Przelewy24. Pełne szyfrowanie.' : 'Stripe handles cards, BLIK and Przelewy24. Full encryption.', icon: Shield },
              { step: '03', title: pl ? 'Odbierz z InPost' : 'Collect from InPost', desc: pl ? 'Paczkomat w Polsce lub Locker w UK. Dyskretna paczka, 1-3 dni.' : 'Paczkomat in Poland or Locker in UK. Discreet package, 1-3 days.', icon: Truck },
            ].map((s, i) => (
              <div key={i} className="relative text-center px-8 py-10 group">
                {/* Connector line */}
                {i < 2 && (
                  <div className="hidden sm:block absolute top-1/3 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent translate-x-1/2 z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-amber-500/15 to-amber-500/5 border border-amber-500/15 flex items-center justify-center group-hover:shadow-[0_0_30px_rgba(249,115,22,0.2)] group-hover:scale-110 transition-all duration-300">
                    <s.icon size={24} className="text-amber-400" />
                  </div>
                  <div className="text-amber-500/40 text-xs font-bold mb-2 tracking-widest">{s.step}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================== FAQ =================== */}
      <section className="relative section-warm">
        <div className="absolute inset-0 noise-overlay" />
        <div className="max-w-3xl mx-auto px-4 py-20 relative z-10">
          <div className="text-center mb-12">
            <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-3">FAQ</p>
            <h2 className="text-white text-2xl font-bold mb-3">
              {pl ? 'Najczęściej zadawane pytania' : 'Frequently Asked Questions'}
            </h2>
          </div>
          <div className="flex flex-col gap-2">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/[0.04] border border-white/[0.08] rounded-xl overflow-hidden hover:border-white/[0.12] transition-colors">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="text-white text-sm font-medium pr-4">{faq.q}</span>
                  {openFaq === i ? <ChevronUp size={16} className="text-amber-500 shrink-0" /> : <ChevronDown size={16} className="text-white/30 shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4">
                    <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to={`/${lang}/faq`} className="text-amber-500/60 hover:text-amber-400 text-sm">
              {pl ? 'Wszystkie pytania →' : 'All questions →'}
            </Link>
          </div>
        </div>
      </section>

      {/* =================== CTA BANNER =================== */}
      <section className="relative overflow-hidden cta-section">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 via-[#1a1008] to-teal-900/15" />
        <HexPattern className="text-amber-500/[0.04]" />
        <ParticleField />
        <div className="absolute inset-0 noise-overlay" />
        <div className="max-w-4xl mx-auto px-4 py-24 text-center relative z-10">
          <h2 className="text-white text-3xl sm:text-4xl font-extrabold mb-4">
            {pl ? 'Gotowy na badania?' : 'Ready for Research?'}
          </h2>
          <p className="text-white/50 mb-8 max-w-md mx-auto">
            {pl
              ? 'Zamów peptydy badawcze najwyższej jakości z szybką dostawą InPost.'
              : 'Order highest quality research peptides with fast InPost delivery.'
            }
          </p>
          <Link
            to={`/${lang}/products`}
            className="cta-primary inline-flex items-center gap-2 bg-amber-500 text-black font-bold px-8 py-4 rounded-xl hover:bg-amber-400 transition-all text-sm"
          >
            {pl ? 'Przeglądaj produkty' : 'Browse Products'}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
