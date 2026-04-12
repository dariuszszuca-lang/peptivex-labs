import { useState } from 'react';
import { ChevronDown, ArrowRight, Search, FlaskConical, Truck, CreditCard, Package, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import HexPattern from '../components/home/HexPattern';
import SeoHead from '../components/SeoHead';
import type { LucideIcon } from 'lucide-react';

interface FaqItem {
  q_pl: string;
  q_en: string;
  a_pl: string;
  a_en: string;
}

interface FaqCategory {
  key: string;
  label_pl: string;
  label_en: string;
  icon: LucideIcon;
  color: string;
  items: FaqItem[];
}

const FAQ_DATA: FaqCategory[] = [
  {
    key: 'general',
    label_pl: 'Ogólne',
    label_en: 'General',
    icon: FlaskConical,
    color: 'text-amber-400',
    items: [
      { q_pl: 'Czym są peptydy badawcze?', q_en: 'What are research peptides?', a_pl: 'Peptydy badawcze to syntetyczne łańcuchy aminokwasów przeznaczone wyłącznie do zastosowań laboratoryjnych i naukowych. Nie są zarejestrowanymi lekami ani suplementami diety. Każdy peptyd w naszej ofercie jest testowany pod kątem czystości metodą HPLC i spełnia normy powyżej 98%.', a_en: 'Research peptides are synthetic amino acid chains intended exclusively for laboratory and scientific use. They are not registered drugs or dietary supplements. Every peptide in our catalog is HPLC-tested for purity and meets standards above 98%.' },
      { q_pl: 'Czy potrzebuję kwalifikacji, żeby kupić?', q_en: 'Do I need qualifications to purchase?', a_pl: 'Nasze produkty są przeznaczone do zastosowań badawczych. Przy składaniu zamówienia potwierdzasz, że zakup jest do celów badawczych i laboratoryjnych. Nie wymagamy formalnych certyfikatów.', a_en: 'Our products are intended for research use. When placing an order, you confirm that the purchase is for research and laboratory purposes. We do not require formal certificates.' },
      { q_pl: 'Czy macie certyfikaty analizy (CoA)?', q_en: 'Do you provide Certificates of Analysis?', a_pl: 'Tak. Każda partia jest testowana metodą HPLC. Certyfikat analizy dostępny na życzenie — napisz do nas na info@peptivexlabs.com, podając nazwę produktu i numer partii.', a_en: 'Yes. Every batch is HPLC tested. Certificate of Analysis available upon request — email us at info@peptivexlabs.com with the product name and batch number.' },
    ],
  },
  {
    key: 'product',
    label_pl: 'Produkty',
    label_en: 'Products',
    icon: Package,
    color: 'text-violet-400',
    items: [
      { q_pl: 'Jak przechowywać peptydy?', q_en: 'How should I store peptides?', a_pl: 'Liofilizowane peptydy przechowuj w temperaturze -20°C (zamrażarka). Po rekonstytucji wodą bakteriostatyczną — w lodówce (2-8°C), zużyj w ciągu 30 dni. Chronić przed światłem i wilgocią. Unikać wielokrotnego zamrażania i rozmrażania.', a_en: 'Store lyophilized peptides at -20°C (freezer). After reconstitution with bacteriostatic water — refrigerate (2-8°C), use within 30 days. Protect from light and moisture. Avoid repeated freeze-thaw cycles.' },
      { q_pl: 'Czym się różni forma "vial" od "pen"?', q_en: 'What\'s the difference between "vial" and "pen"?', a_pl: 'Vial (fiolka) zawiera liofilizowany proszek, który wymaga rekonstytucji wodą bakteriostatyczną. Pen (wstrzykiwacz) to gotowy do użycia format z odmierzoną dawką — nie wymaga przygotowania.', a_en: 'A vial contains lyophilized powder that requires reconstitution with bacteriostatic water. A pen (injector) is a ready-to-use format with a measured dose — no preparation needed.' },
      { q_pl: 'Jaka jest czystość Waszych peptydów?', q_en: 'What is the purity of your peptides?', a_pl: 'Wszystkie nasze peptydy mają czystość powyżej 98%, potwierdzoną metodą HPLC (High Performance Liquid Chromatography). To standard premium w branży peptydów badawczych.', a_en: 'All our peptides have purity above 98%, confirmed by HPLC (High Performance Liquid Chromatography). This is the premium standard in the research peptide industry.' },
    ],
  },
  {
    key: 'shipping',
    label_pl: 'Wysyłka',
    label_en: 'Shipping',
    icon: Truck,
    color: 'text-emerald-400',
    items: [
      { q_pl: 'Jak długo trwa dostawa?', q_en: 'How long does delivery take?', a_pl: 'Polska: 1-2 dni robocze przez InPost Paczkomaty. Wielka Brytania: 2-3 dni robocze przez InPost Lockers. Zamówienia realizujemy w ciągu 24h od momentu zaksięgowania płatności.', a_en: 'Poland: 1-2 business days via InPost Paczkomaty. United Kingdom: 2-3 business days via InPost Lockers. Orders are processed within 24h of payment confirmation.' },
      { q_pl: 'Ile kosztuje wysyłka?', q_en: 'How much does shipping cost?', a_pl: 'Polska: 12,99 zł (darmowa od 500 zł). Wielka Brytania: £7.66 (free over £100). Wszystkie przesyłki w dyskretnym opakowaniu z kontrolą temperatury.', a_en: 'Poland: 12.99 PLN (free over 500 PLN). United Kingdom: £7.66 (free over £100). All shipments in discreet packaging with temperature control.' },
      { q_pl: 'Czy wysyłacie do innych krajów?', q_en: 'Do you ship to other countries?', a_pl: 'Obecnie realizujemy wysyłki do Polski i Wielkiej Brytanii. Planujemy rozszerzenie na kolejne kraje UE w najbliższej przyszłości. Zapisz się na newsletter, żeby nie przegapić.', a_en: 'We currently ship to Poland and the United Kingdom. We plan to expand to more EU countries in the near future. Subscribe to our newsletter to stay updated.' },
    ],
  },
  {
    key: 'payment',
    label_pl: 'Płatności',
    label_en: 'Payments',
    icon: CreditCard,
    color: 'text-sky-400',
    items: [
      { q_pl: 'Jakie metody płatności akceptujecie?', q_en: 'What payment methods do you accept?', a_pl: 'Karty płatnicze (Visa, Mastercard), BLIK i Przelewy24 (dla zamówień w PLN). Wszystkie płatności obsługuje Stripe z pełnym szyfrowaniem danych (certyfikat PCI DSS Level 1).', a_en: 'Credit/debit cards (Visa, Mastercard), BLIK and Przelewy24 (for PLN orders). All payments processed by Stripe with full data encryption (PCI DSS Level 1 certified).' },
      { q_pl: 'Czy mogę zapłacić przelewem bankowym?', q_en: 'Can I pay by bank transfer?', a_pl: 'Tak, Przelewy24 obsługuje przelewy z większości polskich banków. Wybierz tę opcję przy checkout. Płatność jest potwierdzana automatycznie.', a_en: 'Yes, Przelewy24 supports transfers from most Polish banks. Select this option at checkout. Payment is confirmed automatically.' },
    ],
  },
  {
    key: 'returns',
    label_pl: 'Zwroty',
    label_en: 'Returns',
    icon: RotateCcw,
    color: 'text-rose-400',
    items: [
      { q_pl: 'Czy mogę zwrócić produkt?', q_en: 'Can I return a product?', a_pl: 'Ze względu na charakter produktów (odczynniki laboratoryjne) akceptujemy zwroty tylko nieotwartych, nieuszkodzonych produktów w ciągu 14 dni od dostawy. Skontaktuj się z nami przed wysłaniem zwrotu na info@peptivexlabs.com.', a_en: 'Due to the nature of our products (laboratory reagents), we only accept returns of unopened, undamaged products within 14 days of delivery. Contact us before sending a return at info@peptivexlabs.com.' },
      { q_pl: 'Co jeśli produkt jest uszkodzony?', q_en: 'What if the product is damaged?', a_pl: 'Reklamacje dotyczące uszkodzeń w transporcie zgłoś w ciągu 48h od odbioru przesyłki na info@peptivexlabs.com. Dołącz zdjęcia uszkodzonego produktu i opakowania. Wymienimy produkt lub zwrócimy pieniądze.', a_en: 'Report shipping damage complaints within 48h of receiving the package at info@peptivexlabs.com. Include photos of the damaged product and packaging. We will replace the product or issue a refund.' },
    ],
  },
];

export default function FaqPage() {
  const { lang } = useLanguage();
  const pl = lang === 'pl';
  const [open, setOpen] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('general');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFaq = (id: string) => setOpen(open === id ? null : id);

  const currentCategory = FAQ_DATA.find(c => c.key === activeCategory)!;

  const allItems = FAQ_DATA.flatMap(cat =>
    cat.items.map((item, i) => ({ ...item, catKey: cat.key, id: `${cat.key}-${i}`, icon: cat.icon, color: cat.color }))
  );

  const searchResults = searchQuery.trim()
    ? allItems.filter(item => {
        const q = searchQuery.toLowerCase();
        return (pl ? item.q_pl : item.q_en).toLowerCase().includes(q) || (pl ? item.a_pl : item.a_en).toLowerCase().includes(q);
      })
    : null;

  return (
    <div>
      <SeoHead
        title={pl ? 'FAQ — Najczęściej zadawane pytania' : 'FAQ — Frequently Asked Questions'}
        description={pl ? 'Odpowiedzi na pytania o peptydy badawcze, wysyłkę InPost, płatności Stripe, przechowywanie i zwroty. PEPTIVEX LABS.' : 'Answers about research peptides, InPost shipping, Stripe payments, storage and returns. PEPTIVEX LABS.'}
        path={`/${lang}/faq`}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQ_DATA.flatMap(cat => cat.items.map(item => ({
            '@type': 'Question',
            name: pl ? item.q_pl : item.q_en,
            acceptedAnswer: { '@type': 'Answer', text: pl ? item.a_pl : item.a_en },
          }))),
        }}
      />
      {/* Hero */}
      <div className="relative overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/[0.1] via-[#0c0a08] to-[#0c0a08]" />
        <HexPattern className="text-amber-500/[0.03]" />
        <div className="absolute top-0 right-1/3 w-[300px] h-[300px] rounded-full bg-amber-500/[0.06] blur-[100px]" />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-3">FAQ</p>
          <h1 className="text-white text-3xl sm:text-4xl font-extrabold mb-4">
            {pl ? (
              <>Najczęściej zadawane <span className="text-gradient">pytania</span></>
            ) : (
              <>Frequently asked <span className="text-gradient">questions</span></>
            )}
          </h1>
          <p className="text-white/40 max-w-lg mb-8">
            {pl ? 'Nie znalazłeś odpowiedzi? Napisz do nas — odpowiadamy w ciągu 24h.' : "Can't find your answer? Contact us — we respond within 24h."}
          </p>

          {/* Search */}
          <div className="relative max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={pl ? 'Szukaj w FAQ...' : 'Search FAQ...'}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-white text-sm placeholder:text-white/25 focus:border-amber-500/40 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {searchResults ? (
          /* Search results */
          <div>
            <p className="text-white/40 text-sm mb-6">{searchResults.length} {pl ? 'wyników' : 'results'}</p>
            <div className="flex flex-col gap-3">
              {searchResults.map(item => (
                <div key={item.id} className={`rounded-2xl overflow-hidden transition-all duration-300 ${open === item.id ? 'bg-gradient-to-r from-amber-500/[0.06] to-transparent border border-amber-500/20' : 'bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.1]'}`}>
                  <button onClick={() => toggleFaq(item.id)} className="w-full flex items-center gap-4 px-6 py-5 text-left">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${open === item.id ? 'bg-amber-500/20' : 'bg-white/[0.04]'}`}>
                      <item.icon size={14} className={item.color} />
                    </div>
                    <span className={`font-medium flex-1 ${open === item.id ? 'text-white' : 'text-white/70'}`}>{pl ? item.q_pl : item.q_en}</span>
                    <div className={`shrink-0 transition-transform duration-300 ${open === item.id ? 'rotate-180' : ''}`}>
                      <ChevronDown size={16} className={open === item.id ? 'text-amber-500' : 'text-white/20'} />
                    </div>
                  </button>
                  {open === item.id && (
                    <div className="px-6 pb-5 pl-[4.5rem]">
                      <p className="text-white/50 text-sm leading-[1.8]">{pl ? item.a_pl : item.a_en}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Category view */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Category tabs — left */}
            <div className="lg:col-span-1 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {FAQ_DATA.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => { setActiveCategory(cat.key); setOpen(null); }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left whitespace-nowrap transition-all ${
                    activeCategory === cat.key
                      ? 'bg-amber-500/10 border border-amber-500/20 text-white shadow-[0_0_20px_rgba(249,115,22,0.06)]'
                      : 'bg-white/[0.02] border border-white/[0.04] text-white/40 hover:text-white/60 hover:border-white/[0.08]'
                  }`}
                >
                  <cat.icon size={16} className={activeCategory === cat.key ? 'text-amber-400' : cat.color} />
                  <span className="text-sm font-medium">{pl ? cat.label_pl : cat.label_en}</span>
                  <span className="text-xs text-white/20 ml-auto">{cat.items.length}</span>
                </button>
              ))}
            </div>

            {/* Questions — right */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              {currentCategory.items.map((faq, i) => {
                const id = `${currentCategory.key}-${i}`;
                const isOpen = open === id;
                return (
                  <div key={id} className={`rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-gradient-to-r from-amber-500/[0.06] to-transparent border border-amber-500/20 shadow-[0_0_30px_rgba(249,115,22,0.06)]' : 'bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.1]'}`}>
                    <button onClick={() => toggleFaq(id)} className="w-full flex items-center gap-4 px-6 py-5 text-left">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-amber-500/20 text-amber-400' : 'bg-white/[0.04] text-white/20'}`}>
                        <span className="text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <span className={`font-medium flex-1 pr-4 transition-colors ${isOpen ? 'text-white' : 'text-white/70'}`}>{pl ? faq.q_pl : faq.q_en}</span>
                      <div className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                        <ChevronDown size={16} className={isOpen ? 'text-amber-500' : 'text-white/20'} />
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 pl-[4.5rem]">
                        <p className="text-white/50 text-sm leading-[1.8]">{pl ? faq.a_pl : faq.a_en}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/[0.08] to-transparent" />
          <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-amber-500/20 to-transparent">
            <div className="w-full h-full rounded-2xl bg-[#0e0c09]" />
          </div>
          <div className="relative z-10 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white text-xl font-bold mb-2">{pl ? 'Nie znalazłeś odpowiedzi?' : "Didn't find your answer?"}</h3>
              <p className="text-white/40 text-sm">{pl ? 'Napisz do nas — odpowiadamy w ciągu 24 godzin.' : 'Contact us — we respond within 24 hours.'}</p>
            </div>
            <Link to={`/${lang}/contact`} className="cta-primary bg-amber-500 text-black font-bold px-6 py-3 rounded-xl hover:bg-amber-400 transition-all text-sm flex items-center gap-2 shrink-0">
              {pl ? 'Kontakt' : 'Contact Us'} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
