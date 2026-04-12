import { useLanguage } from '../contexts/LanguageContext';

export default function TermsPage() {
  const { lang } = useLanguage();
  const pl = lang === 'pl';

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-white text-3xl font-extrabold mb-8">
        {pl ? 'Regulamin' : 'Terms & Conditions'}
      </h1>

      <div className="prose-custom flex flex-col gap-8">
        <section>
          <h2>{pl ? '1. Postanowienia ogólne' : '1. General Provisions'}</h2>
          <p>{pl
            ? 'Niniejszy regulamin określa zasady korzystania ze sklepu internetowego PEPTIVEX LABS oraz warunki sprzedaży produktów oferowanych za pośrednictwem strony.'
            : 'These terms and conditions govern the use of the PEPTIVEX LABS online store and the conditions of sale of products offered through the website.'
          }</p>
        </section>

        <section>
          <h2>{pl ? '2. Charakter produktów' : '2. Nature of Products'}</h2>
          <p>{pl
            ? 'Wszystkie produkty oferowane w sklepie PEPTIVEX LABS są odczynnikami laboratoryjnymi przeznaczonymi wyłącznie do zastosowań badawczych i laboratoryjnych. Produkty nie są zarejestrowanymi lekami, suplementami diety ani kosmetykami. Składając zamówienie, Kupujący potwierdza, że nabywa produkty wyłącznie do celów badawczych.'
            : 'All products offered by PEPTIVEX LABS are laboratory reagents intended exclusively for research and laboratory use. Products are not registered drugs, dietary supplements, or cosmetics. By placing an order, the Buyer confirms that the products are purchased solely for research purposes.'
          }</p>
        </section>

        <section>
          <h2>{pl ? '3. Zamówienia i płatności' : '3. Orders and Payments'}</h2>
          <p>{pl
            ? 'Zamówienia można składać przez stronę internetową 24/7. Płatności realizowane są za pośrednictwem platformy Stripe. Akceptujemy karty płatnicze (Visa, Mastercard), BLIK oraz Przelewy24 (dla zamówień w PLN). Zamówienie zostaje przyjęte do realizacji po zaksięgowaniu płatności.'
            : 'Orders can be placed through the website 24/7. Payments are processed via the Stripe platform. We accept credit/debit cards (Visa, Mastercard), BLIK, and Przelewy24 (for PLN orders). Orders are processed after payment confirmation.'
          }</p>
        </section>

        <section>
          <h2>{pl ? '4. Dostawa' : '4. Delivery'}</h2>
          <p>{pl
            ? 'Wysyłka realizowana jest przez InPost Paczkomaty (Polska) oraz InPost Lockers (Wielka Brytania). Czas realizacji: 1-2 dni robocze (PL), 2-3 dni robocze (UK). Koszty wysyłki: 12,99 zł (PL, darmowa od 500 zł), £7.66 (UK, free over £100). Produkty wysyłane są w dyskretnym opakowaniu z zachowaniem odpowiednich warunków temperaturowych.'
            : 'Shipping is provided via InPost Paczkomaty (Poland) and InPost Lockers (United Kingdom). Processing time: 1-2 business days (PL), 2-3 business days (UK). Shipping costs: 12.99 PLN (PL, free over 500 PLN), £7.66 (UK, free over £100). Products are shipped in discreet packaging with appropriate temperature conditions.'
          }</p>
        </section>

        <section>
          <h2>{pl ? '5. Zwroty i reklamacje' : '5. Returns and Complaints'}</h2>
          <p>{pl
            ? 'Ze względu na charakter produktów (odczynniki laboratoryjne), zwroty akceptowane są wyłącznie dla nieotwartych i nieuszkodzonych produktów w ciągu 14 dni od daty dostawy. Przed wysłaniem zwrotu należy skontaktować się z nami na info@peptivexlabs.com. Reklamacje dotyczące uszkodzeń w transporcie należy zgłosić w ciągu 48h od odbioru przesyłki.'
            : 'Due to the nature of our products (laboratory reagents), returns are accepted only for unopened and undamaged products within 14 days of delivery date. Please contact us at info@peptivexlabs.com before sending a return. Complaints regarding shipping damage must be reported within 48 hours of receiving the package.'
          }</p>
        </section>

        <section>
          <h2>{pl ? '6. Odpowiedzialność' : '6. Liability'}</h2>
          <p>{pl
            ? 'PEPTIVEX LABS nie ponosi odpowiedzialności za użycie produktów niezgodne z ich przeznaczeniem. Produkty są przeznaczone wyłącznie do zastosowań badawczych i laboratoryjnych. Kupujący ponosi pełną odpowiedzialność za sposób wykorzystania zakupionych produktów.'
            : 'PEPTIVEX LABS is not liable for any use of products inconsistent with their intended purpose. Products are intended exclusively for research and laboratory use. The Buyer bears full responsibility for the use of purchased products.'
          }</p>
        </section>

        <section>
          <h2>{pl ? '7. Kontakt' : '7. Contact'}</h2>
          <p>{pl
            ? 'W sprawach związanych z regulaminem, zamówieniami i reklamacjami prosimy o kontakt: info@peptivexlabs.com.'
            : 'For matters related to terms, orders, and complaints, please contact: info@peptivexlabs.com.'
          }</p>
        </section>
      </div>
    </div>
  );
}
