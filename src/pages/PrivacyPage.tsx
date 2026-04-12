import { useLanguage } from '../contexts/LanguageContext';

export default function PrivacyPage() {
  const { lang } = useLanguage();
  const pl = lang === 'pl';

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-white text-3xl font-extrabold mb-8">
        {pl ? 'Polityka prywatności' : 'Privacy Policy'}
      </h1>

      <div className="prose-custom flex flex-col gap-8">
        <section>
          <h2>{pl ? '1. Administrator danych' : '1. Data Controller'}</h2>
          <p>{pl
            ? 'Administratorem danych osobowych jest PEPTIVEX LABS. Kontakt: info@peptivexlabs.com.'
            : 'The data controller is PEPTIVEX LABS. Contact: info@peptivexlabs.com.'
          }</p>
        </section>

        <section>
          <h2>{pl ? '2. Jakie dane zbieramy' : '2. What Data We Collect'}</h2>
          <p>{pl
            ? 'Zbieramy tylko dane niezbędne do realizacji zamówienia: imię i nazwisko, adres email, numer telefonu (opcjonalnie), wybrany Paczkomat/Locker. Nie zbieramy danych wrażliwych ani danych dotyczących zdrowia.'
            : 'We only collect data necessary for order fulfillment: full name, email address, phone number (optional), selected Locker location. We do not collect sensitive data or health-related information.'
          }</p>
        </section>

        <section>
          <h2>{pl ? '3. Cel przetwarzania' : '3. Purpose of Processing'}</h2>
          <p>{pl
            ? 'Dane osobowe przetwarzamy w celu: realizacji zamówienia, wysyłki produktów, komunikacji dotyczącej zamówienia, obsługi zwrotów i reklamacji, wystawienia dokumentów sprzedaży.'
            : 'We process personal data for: order fulfillment, product shipping, order-related communication, returns and complaints handling, issuing sales documents.'
          }</p>
        </section>

        <section>
          <h2>{pl ? '4. Udostępnianie danych' : '4. Data Sharing'}</h2>
          <p>{pl
            ? 'Dane osobowe udostępniamy wyłącznie podmiotom niezbędnym do realizacji zamówienia: Stripe (przetwarzanie płatności), InPost (dostawa przesyłek). Nie sprzedajemy danych osobowych podmiotom trzecim.'
            : 'We share personal data only with entities necessary for order fulfillment: Stripe (payment processing), InPost (parcel delivery). We do not sell personal data to third parties.'
          }</p>
        </section>

        <section>
          <h2>{pl ? '5. Okres przechowywania' : '5. Data Retention'}</h2>
          <p>{pl
            ? 'Dane osobowe przechowujemy przez okres niezbędny do realizacji zamówienia i obsługi ewentualnych reklamacji, nie dłużej niż 5 lat od daty ostatniego zamówienia, chyba że dłuższy okres jest wymagany przepisami prawa.'
            : 'We retain personal data for the period necessary for order fulfillment and complaint handling, no longer than 5 years from the last order date, unless a longer period is required by law.'
          }</p>
        </section>

        <section>
          <h2>{pl ? '6. Twoje prawa' : '6. Your Rights'}</h2>
          <p>{pl
            ? 'Zgodnie z RODO masz prawo do: dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia danych, wniesienia sprzeciwu. W celu skorzystania z tych praw skontaktuj się z nami: info@peptivexlabs.com.'
            : 'Under GDPR you have the right to: access your data, rectification, erasure, restriction of processing, data portability, and objection. To exercise these rights, contact us: info@peptivexlabs.com.'
          }</p>
        </section>

        <section>
          <h2>{pl ? '7. Pliki cookies' : '7. Cookies'}</h2>
          <p>{pl
            ? 'Strona wykorzystuje pliki cookies niezbędne do działania sklepu (koszyk, wybór języka). Nie używamy cookies marketingowych ani śledzących bez Twojej zgody.'
            : 'The website uses cookies essential for store operation (cart, language selection). We do not use marketing or tracking cookies without your consent.'
          }</p>
        </section>

        <section>
          <h2>{pl ? '8. Bezpieczeństwo' : '8. Security'}</h2>
          <p>{pl
            ? 'Stosujemy odpowiednie środki techniczne i organizacyjne w celu ochrony danych osobowych, w tym szyfrowanie SSL/TLS oraz bezpieczne przetwarzanie płatności przez Stripe (certyfikat PCI DSS Level 1).'
            : 'We implement appropriate technical and organizational measures to protect personal data, including SSL/TLS encryption and secure payment processing via Stripe (PCI DSS Level 1 certified).'
          }</p>
        </section>
      </div>
    </div>
  );
}
