import { useLanguage } from '../contexts/LanguageContext';
import HexPattern from '../components/home/HexPattern';
import SeoHead from '../components/SeoHead';

export default function TermsPage() {
  const { lang } = useLanguage();
  const pl = lang === 'pl';

  const sections = pl ? [
    { title: '1. Postanowienia ogólne', text: 'Niniejszy regulamin określa zasady korzystania ze sklepu internetowego PEPTIVEX LABS oraz warunki sprzedaży produktów oferowanych za pośrednictwem strony.' },
    { title: '2. Charakter produktów', text: 'Wszystkie produkty oferowane w sklepie PEPTIVEX LABS są odczynnikami laboratoryjnymi przeznaczonymi wyłącznie do zastosowań badawczych i laboratoryjnych. Produkty nie są zarejestrowanymi lekami, suplementami diety ani kosmetykami. Składając zamówienie, Kupujący potwierdza, że nabywa produkty wyłącznie do celów badawczych.' },
    { title: '3. Zamówienia i płatności', text: 'Zamówienia można składać przez stronę internetową 24/7. Płatności realizowane są za pośrednictwem platformy Stripe. Akceptujemy karty płatnicze (Visa, Mastercard), BLIK oraz Przelewy24 (dla zamówień w PLN). Zamówienie zostaje przyjęte do realizacji po zaksięgowaniu płatności.' },
    { title: '4. Dostawa', text: 'Wysyłka realizowana jest przez InPost Paczkomaty (Polska) oraz InPost Lockers (Wielka Brytania). Czas realizacji: 1-2 dni robocze (PL), 2-3 dni robocze (UK). Koszty wysyłki: 12,99 zł (PL, darmowa od 500 zł), £7.66 (UK, free over £100). Produkty wysyłane są w dyskretnym opakowaniu.' },
    { title: '5. Zwroty i reklamacje', text: 'Ze względu na charakter produktów (odczynniki laboratoryjne), zwroty akceptowane są wyłącznie dla nieotwartych i nieuszkodzonych produktów w ciągu 14 dni od daty dostawy. Przed wysłaniem zwrotu należy skontaktować się z nami na info@peptivexlabs.com.' },
    { title: '6. Odpowiedzialność', text: 'PEPTIVEX LABS nie ponosi odpowiedzialności za użycie produktów niezgodne z ich przeznaczeniem. Produkty są przeznaczone wyłącznie do zastosowań badawczych i laboratoryjnych.' },
    { title: '7. Kontakt', text: 'W sprawach związanych z regulaminem, zamówieniami i reklamacjami prosimy o kontakt: info@peptivexlabs.com.' },
  ] : [
    { title: '1. General Provisions', text: 'These terms and conditions govern the use of the PEPTIVEX LABS online store and the conditions of sale of products offered through the website.' },
    { title: '2. Nature of Products', text: 'All products offered by PEPTIVEX LABS are laboratory reagents intended exclusively for research and laboratory use. Products are not registered drugs, dietary supplements, or cosmetics. By placing an order, the Buyer confirms that the products are purchased solely for research purposes.' },
    { title: '3. Orders and Payments', text: 'Orders can be placed through the website 24/7. Payments are processed via the Stripe platform. We accept credit/debit cards (Visa, Mastercard), BLIK, and Przelewy24 (for PLN orders). Orders are processed after payment confirmation.' },
    { title: '4. Delivery', text: 'Shipping is provided via InPost Paczkomaty (Poland) and InPost Lockers (United Kingdom). Processing time: 1-2 business days (PL), 2-3 business days (UK). Shipping costs: 12.99 PLN (PL, free over 500 PLN), £7.66 (UK, free over £100). Products are shipped in discreet packaging.' },
    { title: '5. Returns and Complaints', text: 'Due to the nature of our products (laboratory reagents), returns are accepted only for unopened and undamaged products within 14 days of delivery date. Please contact us at info@peptivexlabs.com before sending a return.' },
    { title: '6. Liability', text: 'PEPTIVEX LABS is not liable for any use of products inconsistent with their intended purpose. Products are intended exclusively for research and laboratory use.' },
    { title: '7. Contact', text: 'For matters related to terms, orders, and complaints, please contact: info@peptivexlabs.com.' },
  ];

  return (
    <div>
      <SeoHead
        title={pl ? 'Regulamin' : 'Terms & Conditions'}
        description={pl
          ? 'Regulamin sklepu PEPTIVEX LABS — warunki sprzedaży, charakter produktów (odczynniki badawcze), płatności, dostawa, zwroty.'
          : 'PEPTIVEX LABS terms — sale conditions, research-only product nature, payments, shipping, returns.'
        }
        path={`/${lang}/terms`}
      />
      <div className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/[0.08] to-transparent" />
        <HexPattern className="text-amber-500/[0.02]" />
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-3">{pl ? 'Prawne' : 'Legal'}</p>
          <h1 className="text-white text-3xl font-extrabold">{pl ? 'Regulamin' : 'Terms & Conditions'}</h1>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-12 flex flex-col gap-6">
        {sections.map((s, i) => (
          <div key={i} className="group why-card relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-b from-white/[0.06] to-transparent opacity-50">
              <div className="w-full h-full rounded-2xl bg-[#0e0c09]" />
            </div>
            <div className="relative z-10 p-6">
              <h2 className="text-white text-lg font-bold mb-3">{s.title}</h2>
              <p className="text-white/45 text-sm leading-[1.8]">{s.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
