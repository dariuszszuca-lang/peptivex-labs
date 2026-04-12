import { useLanguage } from '../contexts/LanguageContext';
import HexPattern from '../components/home/HexPattern';

export default function PrivacyPage() {
  const { lang } = useLanguage();
  const pl = lang === 'pl';

  const sections = pl ? [
    { title: '1. Administrator danych', text: 'Administratorem danych osobowych jest PEPTIVEX LABS. Kontakt: info@peptivexlabs.com.' },
    { title: '2. Jakie dane zbieramy', text: 'Zbieramy tylko dane niezbędne do realizacji zamówienia: imię i nazwisko, adres email, numer telefonu (opcjonalnie), wybrany Paczkomat/Locker. Nie zbieramy danych wrażliwych ani danych dotyczących zdrowia.' },
    { title: '3. Cel przetwarzania', text: 'Dane osobowe przetwarzamy w celu: realizacji zamówienia, wysyłki produktów, komunikacji dotyczącej zamówienia, obsługi zwrotów i reklamacji, wystawienia dokumentów sprzedaży.' },
    { title: '4. Udostępnianie danych', text: 'Dane osobowe udostępniamy wyłącznie podmiotom niezbędnym do realizacji zamówienia: Stripe (przetwarzanie płatności), InPost (dostawa przesyłek). Nie sprzedajemy danych osobowych podmiotom trzecim.' },
    { title: '5. Okres przechowywania', text: 'Dane osobowe przechowujemy przez okres niezbędny do realizacji zamówienia i obsługi ewentualnych reklamacji, nie dłużej niż 5 lat od daty ostatniego zamówienia.' },
    { title: '6. Twoje prawa', text: 'Zgodnie z RODO masz prawo do: dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia danych, wniesienia sprzeciwu. Kontakt: info@peptivexlabs.com.' },
    { title: '7. Pliki cookies', text: 'Strona wykorzystuje pliki cookies niezbędne do działania sklepu (koszyk, wybór języka). Nie używamy cookies marketingowych ani śledzących bez Twojej zgody.' },
    { title: '8. Bezpieczeństwo', text: 'Stosujemy szyfrowanie SSL/TLS oraz bezpieczne przetwarzanie płatności przez Stripe (certyfikat PCI DSS Level 1).' },
  ] : [
    { title: '1. Data Controller', text: 'The data controller is PEPTIVEX LABS. Contact: info@peptivexlabs.com.' },
    { title: '2. What Data We Collect', text: 'We only collect data necessary for order fulfillment: full name, email address, phone number (optional), selected Locker location. We do not collect sensitive data or health-related information.' },
    { title: '3. Purpose of Processing', text: 'We process personal data for: order fulfillment, product shipping, order-related communication, returns and complaints handling, issuing sales documents.' },
    { title: '4. Data Sharing', text: 'We share personal data only with entities necessary for order fulfillment: Stripe (payment processing), InPost (parcel delivery). We do not sell personal data to third parties.' },
    { title: '5. Data Retention', text: 'We retain personal data for the period necessary for order fulfillment and complaint handling, no longer than 5 years from the last order date.' },
    { title: '6. Your Rights', text: 'Under GDPR you have the right to: access your data, rectification, erasure, restriction of processing, data portability, and objection. Contact: info@peptivexlabs.com.' },
    { title: '7. Cookies', text: 'The website uses cookies essential for store operation (cart, language selection). We do not use marketing or tracking cookies without your consent.' },
    { title: '8. Security', text: 'We implement SSL/TLS encryption and secure payment processing via Stripe (PCI DSS Level 1 certified).' },
  ];

  return (
    <div>
      <div className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/[0.08] to-transparent" />
        <HexPattern className="text-amber-500/[0.02]" />
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-3">{pl ? 'Prawne' : 'Legal'}</p>
          <h1 className="text-white text-3xl font-extrabold">{pl ? 'Polityka prywatności' : 'Privacy Policy'}</h1>
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
