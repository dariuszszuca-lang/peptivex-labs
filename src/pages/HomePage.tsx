import { Link } from 'react-router-dom';
import { ArrowRight, FlaskConical, Shield, Truck, Zap, Award, Beaker, ChevronDown, Heart, Hourglass, Flame, Dumbbell, Brain, type LucideIcon} from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import DnaHelix from '../components/home/DnaHelix';
import ParticleField from '../components/home/ParticleField';
import HexPattern from '../components/home/HexPattern';
import LabBackground from '../components/home/LabBackground';
import SeoHead from '../components/SeoHead';

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
      a: pl ? 'Pay by Bank (przelew bankowy), BLIK, karty Visa/Mastercard, Apple Pay i Google Pay. Wszystkie płatności objęte szyfrowaniem PCI DSS.' : 'Pay by Bank (instant bank transfer), BLIK, Visa/Mastercard, Apple Pay and Google Pay. All payments PCI DSS encrypted.',
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
    { icon: Shield, title: pl ? 'Bezpieczne płatności' : 'Secure Payments', desc: pl ? 'Pay by Bank, BLIK, karty. Pełne szyfrowanie PCI DSS.' : 'Pay by Bank, BLIK, cards. Full PCI DSS encryption.' },
    { icon: Zap, title: pl ? 'Kontrola temperatury' : 'Temperature Control', desc: pl ? 'Przechowywanie i wysyłka w kontrolowanych warunkach.' : 'Storage and shipping under controlled conditions.' },
    { icon: Award, title: pl ? 'Dokumentacja naukowa' : 'Scientific Documentation', desc: pl ? 'Szczegółowe opisy z odniesieniami do literatury naukowej.' : 'Detailed descriptions with scientific literature references.' },
    { icon: Beaker, title: pl ? 'Szeroki wybór' : 'Wide Selection', desc: pl ? 'Peptydy regeneracyjne, metaboliczne, długowieczność komórkowa i więcej.' : 'Regenerative, metabolic, cellular longevity peptides and more.' },
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
      <SeoHead
        title={pl ? 'Peptydy badawcze premium' : 'Premium Research Peptides'}
        description={pl ? 'PEPTIVEX LABS — peptydy badawcze o czystości >98% HPLC. BPC-157, Retatrutide, NAD+, GHK-Cu. Szybka dostawa InPost. Pay by Bank, BLIK, karty.' : 'PEPTIVEX LABS — research peptides with >98% HPLC purity. BPC-157, Retatrutide, NAD+, GHK-Cu. Fast InPost delivery. Pay by Bank, BLIK and cards.'}
        path={`/${lang}`}
      />
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
                ? 'Peptydy badawcze o czystości >98% z certyfikatem HPLC. Szybka dostawa InPost. Pay by Bank, BLIK, karty.'
                : 'Research peptides with >98% purity, HPLC certified. Fast InPost delivery. Pay by Bank, BLIK and cards.'
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

      {/* =================== PROBLEM → PEPTIDE =================== */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a08] via-amber-900/[0.06] to-[#0c0a08]" />
        <HexPattern className="text-amber-500/[0.03]" />
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] rounded-full bg-amber-500/[0.05] blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full bg-teal-500/[0.04] blur-[80px]" />
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-3">{pl ? 'Rozwiązania' : 'Solutions'}</p>
            <h2 className="text-white text-3xl sm:text-4xl font-extrabold mb-4">
              {pl ? (
                <>Jaki masz <span className="text-gradient">problem badawczy</span>?</>
              ) : (
                <>What's your <span className="text-gradient">research focus</span>?</>
              )}
            </h2>
            <p className="text-white/40 text-sm max-w-lg mx-auto">
              {pl ? 'Każdy peptyd celuje w konkretny szlak biologiczny. Znajdź ten dopasowany do Twojego obszaru badań.' : 'Each peptide targets a specific biological pathway. Find the one matching your research area.'}
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-teal-500 rounded-full mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {([
              { problem: pl ? 'Szlaki regeneracji tkanek' : 'Tissue repair pathways', solution: 'BPC-157 + TB-500', icon: '🧬', color: 'from-rose-500/15 to-rose-500/5', border: 'hover:border-rose-500/30', slug: 'bpc-157-5mg' },
              { problem: pl ? 'Energia komórkowa i NAD+' : 'Cellular energy & NAD+', solution: 'NAD+', icon: '⚡', color: 'from-amber-500/15 to-amber-500/5', border: 'hover:border-amber-500/30', slug: 'nad-500mg' },
              { problem: pl ? 'Szlaki GHRH/GHRP' : 'GHRH / GHRP signaling', solution: 'CJC-1295 + Ipamorelin', icon: '💪', color: 'from-emerald-500/15 to-emerald-500/5', border: 'hover:border-emerald-500/30', slug: 'cjc-1295-no-dac-5mg' },
              { problem: pl ? 'Receptory GLP-1 / GIP / Glukagon' : 'GLP-1 / GIP / Glucagon receptors', solution: 'Retatrutide', icon: '🔥', color: 'from-orange-500/15 to-orange-500/5', border: 'hover:border-orange-500/30', slug: 'retatrutide-40mg' },
              { problem: pl ? 'Neurotransmisja GABA' : 'GABAergic neurotransmission', solution: 'Selank', icon: '🧠', color: 'from-sky-500/15 to-sky-500/5', border: 'hover:border-sky-500/30', slug: 'selank-5mg' },
              { problem: pl ? 'Biologia skóry i modulacja genów' : 'Skin biology & gene modulation', solution: 'GHK-Cu + SNAP-8', icon: '✨', color: 'from-violet-500/15 to-violet-500/5', border: 'hover:border-violet-500/30', slug: 'ghk-cu-50mg' },
              { problem: pl ? 'Bioenergetyka mitochondrialna' : 'Mitochondrial bioenergetics', solution: 'SS-31 + MOTS-c', icon: '🔋', color: 'from-teal-500/15 to-teal-500/5', border: 'hover:border-teal-500/30', slug: 'ss-31-10mg' },
              { problem: pl ? 'Inhibicja enzymu NNMT' : 'NNMT enzyme inhibition', solution: '5-Amino-1MQ', icon: '📉', color: 'from-pink-500/15 to-pink-500/5', border: 'hover:border-pink-500/30', slug: '5-amino-1mq-10mg' },
            ]).map((item, i) => (
              <Link
                key={i}
                to={`/${lang}/product/${item.slug}`}
                className={`group relative rounded-2xl overflow-hidden transition-all duration-300 border border-white/[0.06] ${item.border}`}
              >
                {/* Gradient border on hover */}
                <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-b from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-full h-full rounded-2xl bg-[#0e0c09]" />
                </div>
                <div className="relative z-10 p-5">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} border border-white/[0.06] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.1)] transition-all duration-300`}>
                    <span className="text-xl">{item.icon}</span>
                  </div>
                  <p className="text-white/50 text-xs uppercase tracking-wide mb-1.5">{pl ? 'Szlak' : 'Pathway'}</p>
                  <h3 className="text-white font-bold text-sm mb-3 leading-snug">{item.problem}</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <p className="text-amber-400 text-sm font-semibold">{item.solution}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to={`/${lang}/guide`}
              className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 text-sm font-medium border border-amber-500/20 px-6 py-2.5 rounded-xl hover:bg-amber-500/5 transition-all"
            >
              {pl ? 'Pełny przewodnik po peptydach' : 'Full peptide guide'} <ArrowRight size={14} />
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
              { step: '02', title: pl ? 'Zapłać bezpiecznie' : 'Pay Securely', desc: pl ? 'Pay by Bank, BLIK i karty. Pełne szyfrowanie PCI DSS.' : 'Pay by Bank, BLIK and cards. Full PCI DSS encryption.', icon: Shield },
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
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/[0.06] via-[#0c0a08] to-amber-900/[0.08]" />
        <HexPattern className="text-amber-500/[0.02]" />
        <div className="absolute inset-0 noise-overlay" />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Left — heading + image */}
            <div className="lg:col-span-2">
              <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-3">FAQ</p>
              <h2 className="text-white text-3xl font-extrabold mb-4">
                {pl ? 'Masz pytania?' : 'Got Questions?'}
              </h2>
              <p className="text-white/40 text-sm leading-relaxed mb-6">
                {pl
                  ? 'Zebraliśmy odpowiedzi na najczęściej zadawane pytania. Nie znalazłeś odpowiedzi? Napisz do nas.'
                  : 'We\'ve gathered answers to the most common questions. Can\'t find your answer? Contact us.'
                }
              </p>
              <div className="rounded-2xl overflow-hidden border border-white/[0.06] hidden lg:block">
                <img src="/images/products/retatrutide-pens-20mg.jpg" alt="PEPTIVEX LABS Retatrutide research peptide pens" className="w-full h-48 object-cover opacity-70" />
              </div>
              <Link to={`/${lang}/faq`} className="mt-6 inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 text-sm font-medium border border-amber-500/20 px-5 py-2 rounded-xl hover:bg-amber-500/5 transition-all">
                {pl ? 'Wszystkie pytania' : 'All questions'} <ArrowRight size={14} />
              </Link>
            </div>

            {/* Right — FAQ items */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`faq-card rounded-2xl overflow-hidden transition-all duration-300 ${
                    openFaq === i
                      ? 'bg-gradient-to-r from-amber-500/[0.06] to-transparent border border-amber-500/20 shadow-[0_0_30px_rgba(249,115,22,0.06)]'
                      : 'bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.1]'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center gap-4 px-6 py-5 text-left"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                      openFaq === i
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-white/[0.04] text-white/20'
                    }`}>
                      <span className="text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <span className={`font-medium pr-4 transition-colors ${openFaq === i ? 'text-white' : 'text-white/70'}`}>{faq.q}</span>
                    <div className={`shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}>
                      <ChevronDown size={16} className={openFaq === i ? 'text-amber-500' : 'text-white/20'} />
                    </div>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 pl-[4.5rem]">
                      <p className="text-white/50 text-sm leading-[1.8]">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =================== CTA BANNER =================== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 via-[#1a1008] to-amber-900/10" />
        <HexPattern className="text-amber-500/[0.05]" />
        <ParticleField />
        <div className="absolute inset-0 noise-overlay" />
        {/* Glow orbs */}
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-amber-500/[0.08] blur-[80px]" />
        <div className="absolute top-1/2 right-1/4 w-[200px] h-[200px] rounded-full bg-teal-500/[0.05] blur-[60px]" />

        <div className="max-w-4xl mx-auto px-4 py-28 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <span className="text-amber-400 text-xs font-medium">{pl ? 'Wysyłka w 24h' : '24h dispatch'}</span>
          </div>
          <h2 className="text-white text-4xl sm:text-5xl font-extrabold mb-5 leading-tight">
            {pl ? (
              <>Gotowy na<br /><span className="text-gradient">badania?</span></>
            ) : (
              <>Ready for<br /><span className="text-gradient">research?</span></>
            )}
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-lg mx-auto">
            {pl
              ? 'Peptydy o czystości >98% z certyfikatem HPLC. Szybka dostawa InPost. Pay by Bank, BLIK, karty.'
              : 'Peptides with >98% purity, HPLC certified. Fast InPost delivery. Pay by Bank, BLIK and cards.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to={`/${lang}/products`}
              className="cta-primary inline-flex items-center justify-center gap-2 bg-amber-500 text-black font-bold px-8 py-4 rounded-xl hover:bg-amber-400 transition-all text-sm"
            >
              {pl ? 'Przeglądaj produkty' : 'Browse Products'}
              <ArrowRight size={16} />
            </Link>
            <Link
              to={`/${lang}/contact`}
              className="inline-flex items-center justify-center gap-2 bg-white/[0.06] border border-white/[0.1] text-white font-medium px-8 py-4 rounded-xl hover:bg-white/[0.1] transition-all text-sm"
            >
              {pl ? 'Skontaktuj się' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
