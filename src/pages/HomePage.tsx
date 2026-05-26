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
  const es = lang === 'es';
  const featured = PRODUCTS.filter(p => p.featured).slice(0, 4);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: pl ? 'Czym są peptydy badawcze?' : es ? '¿Qué son los péptidos de investigación?' : 'What are research peptides?',
      a: pl ? 'Peptydy badawcze to syntetyczne łańcuchy aminokwasów przeznaczone do zastosowań laboratoryjnych i naukowych. Każdy peptyd jest testowany pod kątem czystości metodą HPLC.' : es ? 'Los péptidos de investigación son cadenas sintéticas de aminoácidos destinadas a uso de laboratorio y científico. Cada péptido es probado por HPLC para verificar su pureza.' : 'Research peptides are synthetic amino acid chains intended for laboratory and scientific use. Each peptide is HPLC-tested for purity.',
    },
    {
      q: pl ? 'Jak szybko dostarczacie?' : es ? '¿Con qué rapidez realizan las entregas?' : 'How fast do you deliver?',
      a: pl ? 'Polska: 1-2 dni robocze (InPost Paczkomaty). UK: 2-3 dni robocze (InPost Lockers). Zamówienia realizujemy w ciągu 24h.' : es ? 'Polonia: 1-2 días hábiles (InPost Paczkomaty). Reino Unido: 2-3 días hábiles (InPost Lockers). Pedidos procesados en 24h.' : 'Poland: 1-2 business days (InPost Paczkomaty). UK: 2-3 business days (InPost Lockers). Orders processed within 24h.',
    },
    {
      q: pl ? 'Jakie metody płatności akceptujecie?' : es ? '¿Qué métodos de pago aceptan?' : 'What payment methods do you accept?',
      a: pl ? 'Pay by Bank (przelew bankowy), BLIK, karty Visa/Mastercard, Apple Pay i Google Pay. Wszystkie płatności objęte szyfrowaniem PCI DSS.' : es ? 'Pago por Banco (transferencia bancaria instantánea), BLIK, Visa/Mastercard, Apple Pay y Google Pay. Todos los pagos están cifrados con PCI DSS.' : 'Pay by Bank (instant bank transfer), BLIK, Visa/Mastercard, Apple Pay and Google Pay. All payments PCI DSS encrypted.',
    },
    {
      q: pl ? 'Jak przechowywać peptydy?' : es ? '¿Cómo almacenar péptidos?' : 'How to store peptides?',
      a: pl ? 'Liofilizowane peptydy: -20°C (zamrażarka). Po rekonstytucji: 2-8°C (lodówka), zużyć w 30 dni. Chronić przed światłem.' : es ? 'Péptidos liofilizados: -20°C (congelador). Después de la reconstitución: 2-8°C (nevera), usar en 30 días. Proteger de la luz.' : 'Lyophilized peptides: -20°C (freezer). After reconstitution: 2-8°C (fridge), use within 30 days. Protect from light.',
    },
  ];

  const stats = [
    { value: '>98%', label: pl ? 'Czystość HPLC' : es ? 'Pureza HPLC' : 'HPLC Purity' },
    { value: '24h', label: pl ? 'Czas realizacji' : es ? 'Tiempo de Procesamiento' : 'Processing Time' },
    { value: '2', label: pl ? 'Regiony wysyłki' : es ? 'Regiones de Envío' : 'Shipping Regions' },
    { value: '19', label: pl ? 'Produktów' : es ? 'Productos' : 'Products' },
  ];

  const features = [
    { icon: FlaskConical, title: pl ? 'Najwyższa czystość' : es ? 'Máxima Pureza' : 'Highest Purity', desc: pl ? 'Każda partia testowana HPLC. Certyfikat analizy na życzenie.' : es ? 'Cada lote probado por HPLC. Certificado de Análisis bajo solicitud.' : 'Every batch HPLC tested. Certificate of Analysis on request.' },
    { icon: Truck, title: pl ? 'Szybka dostawa' : es ? 'Entrega Rápida' : 'Fast Delivery', desc: pl ? 'InPost Paczkomaty (PL) i Lockers (UK). Dyskretna paczka.' : es ? 'InPost Paczkomaty (PL) y Lockers (UK). Embalaje discreto.' : 'InPost Paczkomaty (PL) & Lockers (UK). Discreet packaging.' },
    { icon: Shield, title: pl ? 'Bezpieczne płatności' : es ? 'Pagos Seguros' : 'Secure Payments', desc: pl ? 'Pay by Bank, BLIK, karty. Pełne szyfrowanie PCI DSS.' : es ? 'Pago por Banco, BLIK, tarjetas. Cifrado completo PCI DSS.' : 'Pay by Bank, BLIK, cards. Full PCI DSS encryption.' },
    { icon: Zap, title: pl ? 'Kontrola temperatury' : es ? 'Control de Temperatura' : 'Temperature Control', desc: pl ? 'Przechowywanie i wysyłka w kontrolowanych warunkach.' : es ? 'Almacenamiento y envío bajo condiciones controladas.' : 'Storage and shipping under controlled conditions.' },
    { icon: Award, title: pl ? 'Dokumentacja naukowa' : es ? 'Documentación Científica' : 'Scientific Documentation', desc: pl ? 'Szczegółowe opisy z odniesieniami do literatury naukowej.' : es ? 'Descripciones detalladas con referencias de literatura científica.' : 'Detailed descriptions with scientific literature references.' },
    { icon: Beaker, title: pl ? 'Szeroki wybór' : es ? 'Amplia Selección' : 'Wide Selection', desc: pl ? 'Peptydy regeneracyjne, metaboliczne, długowieczność komórkowa i więcej.' : es ? 'Péptidos regenerativos, metabólicos, para la longevidad celular y más.' : 'Regenerative, metabolic, cellular longevity peptides and more.' },
  ];

  const categories: { key: string; icon: LucideIcon; count: number }[] = [
    { key: 'healing', icon: Heart, count: PRODUCTS.filter(p => p.category === 'healing').length },
    { key: 'anti-aging', icon: Hourglass, count: PRODUCTS.filter(p => p.category === 'anti-aging').length },
    { key: 'metabolic', icon: Flame, count: PRODUCTS.filter(p => p.category === 'metabolic').length },
    { key: 'growth-hormone', icon: Dumbbell, count: PRODUCTS.filter(p => p.category === 'growth-hormone').length },
    { key: 'weight-loss', icon: Zap, count: PRODUCTS.filter(p => p.category === 'weight-loss').length },
    { key: 'cognitive', icon: Brain, count: PRODUCTS.filter(p => p.category === 'cognitive').length },
  ];

  return (
    <div>
      <SeoHead
        title={pl ? 'Peptydy badawcze premium' : es ? 'Péptidos de Investigación Premium' : 'Premium Research Peptides'}
        description={pl ? 'PEPTIVEX LABS — peptydy badawcze o czystości >98% HPLC. BPC-157, Retatrutide, NAD+, GHK-Cu. Szybka dostawa InPost. Pay by Bank, BLIK, karty.' : es ? 'PEPTIVEX LABS — péptidos de investigación con >98% de pureza HPLC. BPC-157, Retatrutide, NAD+, GHK-Cu. Entrega rápida con InPost. Pago por Banco, BLIK y tarjetas.' : 'PEPTIVEX LABS — research peptides with >98% HPLC purity. BPC-157, Retatrutide, NAD+, GHK-Cu. Fast InPost delivery. Pay by Bank, BLIK and cards.'}
        path={`/${lang}`}
      />

      {/* =================== HERO =================== */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center hero-section">
        <div className="absolute inset-0">
          <div className="hero-gradient" />
          <ParticleField />
          <HexPattern className="text-[#ea580c]/[0.08]" />
          <div className="hero-glow" />
          <div className="hero-glow-teal" />
          <div className="absolute inset-0 noise-overlay" />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-20 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#fff7ed] border border-[#fed7aa] rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-[#ea580c] rounded-full" />
              <span className="text-[#c2410c] text-xs font-semibold tracking-wide">
                {pl ? 'Peptydy badawcze premium' : es ? 'Péptidos de Investigación Premium' : 'Premium Research Peptides'}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0a0a0a] leading-[1.1] mb-6">
              {pl ? (
                <>Nauka spotyka<br /><span className="text-[#ea580c]">najwyższą jakość</span></>
              ) : es ? (
                <>La ciencia se encuentra con<br /><span className="text-[#ea580c]">la calidad premium</span></>
              ) : (
                <>Science meets<br /><span className="text-[#ea580c]">premium quality</span></>
              )}
            </h1>

            <p className="text-[#525252] text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
              {pl ? 'Peptydy badawcze o czystości >98% z certyfikatem HPLC. Szybka dostawa InPost. Pay by Bank, BLIK, karty.' : es ? 'Péptidos de investigación con >98% de pureza, certificados por HPLC. Entrega rápida con InPost. Pago por Banco, BLIK y tarjetas.' : 'Research peptides with >98% purity, HPLC certified. Fast InPost delivery. Pay by Bank, BLIK and cards.'
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to={`/${lang}/products`}
                className="cta-primary inline-flex items-center justify-center gap-2 bg-[#ea580c] text-[#0a0a0a] font-bold px-7 py-3.5 rounded-xl hover:bg-[#c2410c] transition-all text-sm"
              >
                {pl ? 'Zobacz produkty' : es ? 'Explorar Productos' : 'Browse Products'}
                <ArrowRight size={16} />
              </Link>
              <Link
                to={`/${lang}/about`}
                className="inline-flex items-center justify-center gap-2 bg-white border border-[#ececec] text-[#1a1a1a] font-medium px-7 py-3.5 rounded-xl hover:border-[#d4d4d4] transition-all text-sm"
              >
                {pl ? 'Dowiedz się więcej' : es ? 'Saber Más' : 'Learn More'}
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <DnaHelix />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={20} className="text-[#a3a3a3]" />
        </div>
      </section>

      {/* =================== STATS BAR =================== */}
      <section className="relative z-10 -mt-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="stats-bar bg-white border border-[#ececec] rounded-2xl p-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-[#ea580c] text-3xl font-extrabold mb-1">{stat.value}</p>
                <p className="text-[#737373] text-xs uppercase tracking-wide">{stat.label}</p>
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
            <p className="text-[#ea580c] text-xs tracking-[0.3em] uppercase mb-3 font-semibold">
              {pl ? 'Bestsellery' : es ? 'Los más vendidos' : 'Bestsellers'}
            </p>
            <h2 className="text-[#0a0a0a] text-3xl font-extrabold mb-4">
              {pl ? 'Wyróżnione produkty' : es ? 'Productos Destacados' : 'Featured Products'}
            </h2>
            <p className="text-[#737373] text-sm max-w-md mx-auto">
              {pl ? 'Najczęściej wybierane peptydy badawcze. Czystość >98%, certyfikat HPLC.' : es ? 'Los péptidos de investigación más populares. Pureza >98%, certificados por HPLC.' : 'Most popular research peptides. Purity >98%, HPLC certified.'
              }
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="text-center mt-10">
            <Link
              to={`/${lang}/products`}
              className="inline-flex items-center gap-2 text-[#ea580c] hover:text-[#c2410c] text-sm font-semibold border border-[#fed7aa] px-6 py-2.5 rounded-xl hover:bg-[#fff7ed] transition-all"
            >
              {pl ? 'Wszystkie produkty' : es ? 'Todos los Productos' : 'All Products'} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* =================== PROBLEM → PEPTIDE =================== */}
      <section className="relative overflow-hidden section-dark py-24">
        <HexPattern className="text-[#ea580c]/[0.06]" />
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] rounded-full bg-[#ea580c]/[0.10] blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full bg-[#f59e0b]/[0.08] blur-[80px]" />
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <p className="text-[#ea580c] text-xs tracking-[0.3em] uppercase mb-3 font-semibold">{pl ? 'Rozwiązania' : es ? 'Soluciones' : 'Solutions'}</p>
            <h2 className="text-[#0a0a0a] text-3xl sm:text-4xl font-extrabold mb-4">
              {pl ? (
                <>Jaki masz <span className="text-[#ea580c]">problem badawczy</span>?</>
              ) : es ? (
                <>¿Cuál es su <span className="text-[#ea580c]">enfoque de investigación</span>?</>
              ) : (
                <>What's your <span className="text-[#ea580c]">research focus</span>?</>
              )}
            </h2>
            <p className="text-[#737373] text-sm max-w-lg mx-auto">
              {pl ? 'Każdy peptyd celuje w konkretny szlak biologiczny. Znajdź ten dopasowany do Twojego obszaru badań.' : es ? 'Cada péptido se dirige a una vía biológica específica. Encuentre el que coincida con su área de investigación.' : 'Each peptide targets a specific biological pathway. Find the one matching your research area.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {([
              { problem: pl ? 'Szlaki regeneracji tkanek' : es ? 'Vías de reparación tisular' : 'Tissue repair pathways', solution: 'BPC-157 + TB-500', icon: '🧬', slug: 'bpc-157-5mg' },
              { problem: pl ? 'Energia komórkowa i NAD+' : es ? 'Energía celular y NAD+' : 'Cellular energy & NAD+', solution: 'NAD+', icon: '⚡', slug: 'nad-500mg' },
              { problem: pl ? 'Szlaki GHRH/GHRP' : es ? 'Señalización GHRH / GHRP' : 'GHRH / GHRP signaling', solution: 'CJC-1295 + Ipamorelin', icon: '💪', slug: 'cjc-1295-no-dac-5mg' },
              { problem: pl ? 'Receptory GLP-1 / GIP / Glukagon' : es ? 'Receptores GLP-1 / GIP / Glucagón' : 'GLP-1 / GIP / Glucagon receptors', solution: 'Retatrutide', icon: '🔥', slug: 'retatrutide-40mg' },
              { problem: pl ? 'Neurotransmisja GABA' : es ? 'Neurotransmisión GABAérgica' : 'GABAergic neurotransmission', solution: 'Selank', icon: '🧠', slug: 'selank-5mg' },
              { problem: pl ? 'Biologia skóry i modulacja genów' : es ? 'Biología de la piel y modulación génica' : 'Skin biology & gene modulation', solution: 'GHK-Cu + SNAP-8', icon: '✨', slug: 'ghk-cu-50mg' },
              { problem: pl ? 'Bioenergetyka mitochondrialna' : es ? 'Bioenergética mitocondrial' : 'Mitochondrial bioenergetics', solution: 'SS-31 + MOTS-c', icon: '🔋', slug: 'ss-31-10mg' },
              { problem: pl ? 'Inhibicja enzymu NNMT' : es ? 'Inhibición de la enzima NNMT' : 'NNMT enzyme inhibition', solution: '5-Amino-1MQ', icon: '📉', slug: '5-amino-1mq-10mg' },
            ]).map((item, i) => (
              <Link
                key={i}
                to={`/${lang}/product/${item.slug}`}
                className="group cat-card rounded-2xl p-5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#fff7ed] border border-[#fed7aa] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">{item.icon}</span>
                </div>
                <p className="text-[#737373] text-xs uppercase tracking-wide mb-1.5 font-semibold">{pl ? 'Szlak' : es ? 'Vía' : 'Pathway'}</p>
                <h3 className="text-[#0a0a0a] font-bold text-sm mb-3 leading-snug">{item.problem}</h3>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ea580c]" />
                  <p className="text-[#ea580c] text-sm font-semibold">{item.solution}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to={`/${lang}/guide`}
              className="inline-flex items-center gap-2 text-[#ea580c] hover:text-[#c2410c] text-sm font-semibold border border-[#fed7aa] px-6 py-2.5 rounded-xl hover:bg-[#fff7ed] transition-all"
            >
              {pl ? 'Pełny przewodnik po peptydach' : es ? 'Guía completa de péptidos' : 'Full peptide guide'} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* =================== CATEGORIES =================== */}
      <section className="relative overflow-hidden section-warm py-20">
        <HexPattern className="text-[#ea580c]/[0.05]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#ea580c]/[0.08] blur-[120px]" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <p className="text-[#ea580c] text-xs tracking-[0.3em] uppercase mb-3 font-semibold">{pl ? 'Eksploruj' : es ? 'Explorar' : 'Explore'}</p>
            <h2 className="text-[#0a0a0a] text-3xl font-extrabold mb-4">
              {pl ? 'Kategorie peptydów' : es ? 'Categorías de Péptidos' : 'Peptide Categories'}
            </h2>
            <p className="text-[#737373] text-sm max-w-md mx-auto">
              {pl ? 'Znajdź peptyd dopasowany do Twojego obszaru badań.' : es ? 'Encuentre el péptido que coincida con su área de investigación.' : 'Find the peptide matching your research area.'}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.key}
                to={`/${lang}/products?category=${cat.key}`}
                className="group cat-card rounded-2xl p-6 text-center transition-all duration-300"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#fff7ed] border border-[#fed7aa] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <cat.icon size={24} className="text-[#ea580c]" />
                </div>
                <span className="text-[#0a0a0a] text-sm font-semibold block mb-1">
                  {t(`categories.${cat.key}`)}
                </span>
                <span className="text-[#a3a3a3] text-xs">{cat.count} {pl ? 'prod.' : es ? 'artículos' : 'items'}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =================== WHY PEPTIVEX =================== */}
      <section className="relative overflow-hidden section-dark py-24">
        <HexPattern className="text-[#ea580c]/[0.06]" />
        <div className="absolute inset-0 noise-overlay" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <p className="text-[#ea580c] text-xs tracking-[0.3em] uppercase mb-3 font-semibold">
              {pl ? 'Dlaczego my' : es ? '¿Por qué nosotros?' : 'Why Us'}
            </p>
            <h2 className="text-[#0a0a0a] text-3xl sm:text-4xl font-extrabold mb-4">
              {pl ? 'Dlaczego PEPTIVEX LABS?' : es ? '¿Por qué PEPTIVEX LABS?' : 'Why PEPTIVEX LABS?'}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="why-card rounded-2xl p-7">
                <div className="w-12 h-12 bg-[#fff7ed] border border-[#fed7aa] rounded-xl flex items-center justify-center mb-5">
                  <f.icon size={22} className="text-[#ea580c]" />
                </div>
                <h3 className="text-[#0a0a0a] text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-[#525252] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================== HOW IT WORKS =================== */}
      <section className="section-warm py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-[#ea580c] text-xs tracking-[0.3em] uppercase mb-3 font-semibold">{pl ? 'Proces' : es ? 'Proceso' : 'Process'}</p>
            <h2 className="text-[#0a0a0a] text-3xl font-extrabold mb-4">
              {pl ? 'Jak to działa?' : es ? 'Cómo Funciona' : 'How It Works'}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
            {[
              { step: '01', title: pl ? 'Wybierz peptydy' : es ? 'Seleccione Péptidos' : 'Choose Peptides', desc: pl ? 'Przejrzyj katalog, porównaj produkty i dodaj do koszyka.' : es ? 'Explore el catálogo, compare productos y añada al carrito.' : 'Browse the catalog, compare products and add to cart.', icon: FlaskConical },
              { step: '02', title: pl ? 'Zapłać bezpiecznie' : es ? 'Pago Seguro' : 'Pay Securely', desc: pl ? 'Pay by Bank, BLIK i karty. Pełne szyfrowanie PCI DSS.' : es ? 'Pague mediante transferencia bancaria, BLIK y tarjetas. Cifrado completo PCI DSS.' : 'Pay by Bank, BLIK and cards. Full PCI DSS encryption.', icon: Shield },
              { step: '03', title: pl ? 'Odbierz z InPost' : es ? 'Recogida en InPost' : 'Collect from InPost', desc: pl ? 'Paczkomat w Polsce lub Locker w UK. Dyskretna paczka, 1-3 dni.' : es ? 'Paczkomat en Polonia o Locker en el Reino Unido. Paquete discreto, 1-3 días.' : 'Paczkomat in Poland or Locker in UK. Discreet package, 1-3 days.', icon: Truck },
            ].map((s, i) => (
              <div key={i} className="relative text-center px-8 py-10">
                {i < 2 && (
                  <div className="hidden sm:block absolute top-1/3 right-0 w-full h-[1px] bg-[#ececec] translate-x-1/2" />
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-[#fff7ed] border border-[#fed7aa] flex items-center justify-center">
                    <s.icon size={24} className="text-[#ea580c]" />
                  </div>
                  <div className="text-[#a3a3a3] text-xs font-bold mb-2 tracking-widest">{s.step}</div>
                  <h3 className="text-[#0a0a0a] font-bold text-lg mb-2">{s.title}</h3>
                  <p className="text-[#525252] text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================== FAQ =================== */}
      <section className="section-dark py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Left — heading + image */}
            <div className="lg:col-span-2">
              <p className="text-[#ea580c] text-xs tracking-[0.3em] uppercase mb-3 font-semibold">FAQ</p>
              <h2 className="text-[#0a0a0a] text-3xl font-extrabold mb-4">
                {pl ? 'Masz pytania?' : es ? '¿Tiene Preguntas?' : 'Got Questions?'}
              </h2>
              <p className="text-[#525252] text-sm leading-relaxed mb-6">
                {pl ? 'Zebraliśmy odpowiedzi na najczęściej zadawane pytania. Nie znalazłeś odpowiedzi? Napisz do nas.' : es ? 'Hemos recopilado respuestas a las preguntas más frecuentes. ¿No encuentra su respuesta? Contáctenos.' : 'We\'ve gathered answers to the most common questions. Can\'t find your answer? Contact us.'
                }
              </p>
              <div className="rounded-2xl overflow-hidden border border-[#ececec] hidden lg:block">
                <img src="/images/products/retatrutide-pens-20mg.jpg" alt="PEPTIVEX LABS Retatrutide research peptide pens" className="w-full h-48 object-cover" />
              </div>
              <Link to={`/${lang}/faq`} className="mt-6 inline-flex items-center gap-2 text-[#ea580c] hover:text-[#c2410c] text-sm font-semibold border border-[#fed7aa] px-5 py-2 rounded-xl hover:bg-[#fff7ed] transition-all">
                {pl ? 'Wszystkie pytania' : es ? 'Todas las preguntas' : 'All questions'} <ArrowRight size={14} />
              </Link>
            </div>

            {/* Right — FAQ items */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`rounded-2xl overflow-hidden transition-all duration-300 bg-white border ${
                    openFaq === i ? 'border-[#fed7aa]' : 'border-[#ececec]'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center gap-4 px-6 py-5 text-left"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                      openFaq === i ? 'bg-[#ea580c] text-white' : 'bg-[#fafaf7] text-[#a3a3a3]'
                    }`}>
                      <span className="text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <span className={`font-semibold pr-4 transition-colors ${openFaq === i ? 'text-[#0a0a0a]' : 'text-[#525252]'}`}>{faq.q}</span>
                    <div className={`shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}>
                      <ChevronDown size={16} className={openFaq === i ? 'text-[#ea580c]' : 'text-[#a3a3a3]'} />
                    </div>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 pl-[4.5rem]">
                      <p className="text-[#525252] text-sm leading-[1.8]">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =================== CTA BANNER =================== */}
      <section className="relative overflow-hidden cta-section">
        <HexPattern className="text-[#ea580c]/[0.08]" />
        <ParticleField />
        <div className="absolute inset-0 noise-overlay" />
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-[#ea580c]/[0.12] blur-[80px]" />
        <div className="absolute top-1/2 right-1/4 w-[200px] h-[200px] rounded-full bg-[#f59e0b]/[0.10] blur-[60px]" />
        <div className="max-w-4xl mx-auto px-4 py-28 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#fff7ed] border border-[#fed7aa] rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-[#ea580c] rounded-full" />
            <span className="text-[#c2410c] text-xs font-semibold">{pl ? 'Wysyłka w 24h' : es ? 'Envío en 24h' : '24h dispatch'}</span>
          </div>
          <h2 className="text-[#0a0a0a] text-4xl sm:text-5xl font-extrabold mb-5 leading-tight">
            {pl ? (
              <>Gotowy na<br /><span className="text-[#ea580c]">badania?</span></>
            ) : es ? (
              <>¿Listo para<br /><span className="text-[#ea580c]">la investigación?</span></>
            ) : (
              <>Ready for<br /><span className="text-[#ea580c]">research?</span></>
            )}
          </h2>
          <p className="text-[#525252] text-lg mb-10 max-w-lg mx-auto">
            {pl ? 'Peptydy o czystości >98% z certyfikatem HPLC. Szybka dostawa InPost. Pay by Bank, BLIK, karty.' : es ? 'Péptidos con >98% de pureza, certificados por HPLC. Entrega rápida con InPost. Pague mediante transferencia bancaria, BLIK y tarjetas.' : 'Peptides with >98% purity, HPLC certified. Fast InPost delivery. Pay by Bank, BLIK and cards.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to={`/${lang}/products`}
              className="cta-primary inline-flex items-center justify-center gap-2 bg-[#ea580c] text-[#0a0a0a] font-bold px-8 py-4 rounded-xl hover:bg-[#c2410c] transition-all text-sm"
            >
              {pl ? 'Przeglądaj produkty' : es ? 'Explorar Productos' : 'Browse Products'}
              <ArrowRight size={16} />
            </Link>
            <Link
              to={`/${lang}/contact`}
              className="inline-flex items-center justify-center gap-2 bg-white border border-[#ececec] text-[#1a1a1a] font-medium px-8 py-4 rounded-xl hover:border-[#d4d4d4] transition-all text-sm"
            >
              {pl ? 'Skontaktuj się' : es ? 'Contáctenos' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
