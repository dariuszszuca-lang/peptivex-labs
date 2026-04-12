import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface FaqItem {
  q_pl: string;
  q_en: string;
  a_pl: string;
  a_en: string;
  category: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'general',
    q_pl: 'Czym są peptydy badawcze?',
    q_en: 'What are research peptides?',
    a_pl: 'Peptydy badawcze to syntetyczne łańcuchy aminokwasów przeznaczone wyłącznie do zastosowań laboratoryjnych i naukowych. Nie są zarejestrowanymi lekami ani suplementami diety.',
    a_en: 'Research peptides are synthetic amino acid chains intended exclusively for laboratory and scientific use. They are not registered drugs or dietary supplements.',
  },
  {
    category: 'general',
    q_pl: 'Czy potrzebuję specjalnych kwalifikacji, żeby kupić?',
    q_en: 'Do I need special qualifications to purchase?',
    a_pl: 'Nasze produkty są przeznaczone do zastosowań badawczych. Przy składaniu zamówienia potwierdzasz, że zakup jest do celów badawczych i laboratoryjnych.',
    a_en: 'Our products are intended for research use. When placing an order, you confirm that the purchase is for research and laboratory purposes.',
  },
  {
    category: 'shipping',
    q_pl: 'Jak długo trwa dostawa?',
    q_en: 'How long does delivery take?',
    a_pl: 'Polska: 1-2 dni robocze przez InPost Paczkomaty. UK: 2-3 dni robocze przez InPost Lockers. Zamówienia realizujemy w ciągu 24h od płatności.',
    a_en: 'Poland: 1-2 business days via InPost Paczkomaty. UK: 2-3 business days via InPost Lockers. Orders are processed within 24h of payment.',
  },
  {
    category: 'shipping',
    q_pl: 'Ile kosztuje dostawa?',
    q_en: 'How much does shipping cost?',
    a_pl: 'Polska: 12,99 zł (darmowa od 500 zł). UK: £7.66 (free over £100). Wysyłka w dyskretnym opakowaniu.',
    a_en: 'Poland: 12.99 PLN (free over 500 PLN). UK: £7.66 (free over £100). Shipping in discreet packaging.',
  },
  {
    category: 'shipping',
    q_pl: 'Czy wysyłacie za granicę?',
    q_en: 'Do you ship internationally?',
    a_pl: 'Obecnie wysyłamy do Polski i Wielkiej Brytanii. Planujemy rozszerzenie na więcej krajów UE w przyszłości.',
    a_en: 'We currently ship to Poland and the United Kingdom. We plan to expand to more EU countries in the future.',
  },
  {
    category: 'payment',
    q_pl: 'Jakie metody płatności akceptujecie?',
    q_en: 'What payment methods do you accept?',
    a_pl: 'Akceptujemy karty płatnicze (Visa, Mastercard), BLIK i Przelewy24 (Polska). Płatności obsługuje Stripe — pełne szyfrowanie danych.',
    a_en: 'We accept credit/debit cards (Visa, Mastercard) and BLIK/Przelewy24 (Poland). Payments are processed by Stripe — full data encryption.',
  },
  {
    category: 'product',
    q_pl: 'Jak przechowywać peptydy?',
    q_en: 'How should I store peptides?',
    a_pl: 'Liofilizowane peptydy przechowuj w temperaturze -20°C (zamrażarka). Po rekonstytucji wodą bakteriostatyczną — w lodówce (2-8°C), zużyj w ciągu 30 dni. Chronić przed światłem.',
    a_en: 'Store lyophilized peptides at -20°C (freezer). After reconstitution with bacteriostatic water — refrigerate (2-8°C), use within 30 days. Protect from light.',
  },
  {
    category: 'product',
    q_pl: 'Czy macie certyfikaty analizy (CoA)?',
    q_en: 'Do you provide Certificates of Analysis (CoA)?',
    a_pl: 'Tak. Każda partia jest testowana metodą HPLC. Certyfikat analizy dostępny na życzenie — napisz do nas na info@peptivexlabs.com.',
    a_en: 'Yes. Every batch is HPLC tested. Certificate of Analysis available upon request — email us at info@peptivexlabs.com.',
  },
  {
    category: 'returns',
    q_pl: 'Czy mogę zwrócić produkt?',
    q_en: 'Can I return a product?',
    a_pl: 'Ze względu na charakter produktów (odczynniki laboratoryjne) akceptujemy zwroty tylko nieotwartych, nieuszkodzonych produktów w ciągu 14 dni od dostawy. Skontaktuj się z nami przed wysłaniem zwrotu.',
    a_en: 'Due to the nature of our products (laboratory reagents), we only accept returns of unopened, undamaged products within 14 days of delivery. Contact us before sending a return.',
  },
];

export default function FaqPage() {
  const { lang } = useLanguage();
  const pl = lang === 'pl';
  const [open, setOpen] = useState<Record<number, boolean>>({});

  const toggle = (i: number) => setOpen(prev => ({ ...prev, [i]: !prev[i] }));

  const categories = [
    { key: 'general', label: pl ? 'Ogólne' : 'General' },
    { key: 'product', label: pl ? 'Produkty' : 'Products' },
    { key: 'shipping', label: pl ? 'Wysyłka' : 'Shipping' },
    { key: 'payment', label: pl ? 'Płatności' : 'Payments' },
    { key: 'returns', label: pl ? 'Zwroty' : 'Returns' },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-white text-3xl font-extrabold mb-4">FAQ</h1>
      <p className="text-white/50 mb-12">
        {pl ? 'Najczęściej zadawane pytania.' : 'Frequently asked questions.'}
      </p>

      {categories.map(cat => {
        const items = FAQ_ITEMS.filter(f => f.category === cat.key);
        if (items.length === 0) return null;
        return (
          <div key={cat.key} className="mb-8">
            <h2 className="text-amber-500 text-xs font-bold uppercase tracking-wide mb-4">{cat.label}</h2>
            <div className="flex flex-col gap-2">
              {items.map((faq, idx) => {
                const globalIdx = FAQ_ITEMS.indexOf(faq);
                const isOpen = open[globalIdx] || false;
                return (
                  <div key={idx} className="bg-white/[0.03] border border-white/[0.08] rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggle(globalIdx)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left"
                    >
                      <span className="text-white text-sm font-medium pr-4">
                        {pl ? faq.q_pl : faq.q_en}
                      </span>
                      {isOpen ? <ChevronUp size={16} className="text-white/30 shrink-0" /> : <ChevronDown size={16} className="text-white/30 shrink-0" />}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4">
                        <p className="text-white/50 text-sm leading-relaxed">
                          {pl ? faq.a_pl : faq.a_en}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
