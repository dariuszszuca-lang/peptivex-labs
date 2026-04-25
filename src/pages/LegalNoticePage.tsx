import { useLanguage } from '../contexts/LanguageContext';
import HexPattern from '../components/home/HexPattern';
import SeoHead from '../components/SeoHead';
import { AlertTriangle } from 'lucide-react';

export default function LegalNoticePage() {
  const { lang } = useLanguage();
  const pl = lang === 'pl';

  const sections = pl ? [
    {
      title: '1. Wyłącznie do celów badawczych',
      text: 'Wszystkie produkty są sprzedawane wyłącznie do nieklinicznych, niekomercyjnych zastosowań laboratoryjnych. Nie mogą być stosowane w żywności, kosmetykach, produktach farmaceutycznych ani w jakichkolwiek zastosowaniach obejmujących żywe organizmy.',
    },
    {
      title: '2. Nie do użytku na ludziach ani zwierzętach',
      text: 'Nasze produkty nie są zatwierdzone do podawania ludziom ani zwierzętom i nie mogą być przyjmowane doustnie, wstrzykiwane, stosowane miejscowo ani w żaden inny sposób używane na ciele lub w ciele.',
    },
    {
      title: '3. Odpowiedzialność kupującego',
      text: 'Kupujący ponosi wyłączną odpowiedzialność za zapewnienie, że obchodzenie się z materiałami, ich przechowywanie i wykorzystywanie jest zgodne ze wszystkimi obowiązującymi przepisami prawa w jego jurysdykcji. PEPTIVEX LABS nie udziela porad prawnych ani wytycznych dotyczących zgodności wykraczających poza niniejsze zastrzeżenie.',
    },
    {
      title: '4. Ograniczenie odpowiedzialności',
      text: 'PEPTIVEX LABS nie ponosi odpowiedzialności za niewłaściwe użycie, nieprawidłowe obchodzenie się ani pozaetykietowe stosowanie naszych produktów, ani za jakiekolwiek konsekwencje wynikające z takiego użycia. Zakupy i użytkowanie odbywają się na wyłączne ryzyko kupującego.',
    },
    {
      title: '5. Przeznaczeni klienci',
      text: 'Nasze produkty są oferowane wyłącznie osobom fizycznym lub instytucjom, które posiadają jasne zrozumienie prawidłowych praktyk badawczych. Nie składamy żadnych oświadczeń dotyczących przydatności produktów do jakiegokolwiek konkretnego zastosowania badawczego ani wyniku.',
    },
  ] : [
    {
      title: '1. Research Use Only',
      text: 'All products are sold solely for non-clinical, non-commercial laboratory use. They must not be used in food, cosmetics, pharmaceuticals, or any application involving living organisms.',
    },
    {
      title: '2. Not for Human or Animal Use',
      text: 'Our products are not approved for administration to humans or animals and must never be ingested, injected, applied topically, or otherwise used on or in the body.',
    },
    {
      title: '3. Buyer Responsibility',
      text: 'You are solely responsible for ensuring that the handling, storage, and use of these materials comply with all applicable laws and regulations in your jurisdiction. PEPTIVEX LABS does not provide legal advice or guidance regarding compliance beyond this disclaimer.',
    },
    {
      title: '4. Limitation of Liability',
      text: 'PEPTIVEX LABS accepts no liability for any misuse, mishandling, or off-label use of our products, or for any consequences arising from such use. Purchases and use are entirely at your own risk.',
    },
    {
      title: '5. Intended Customers',
      text: 'Our products are offered exclusively to individuals or institutions with a clear understanding of proper research practices. We do not make any claims regarding the suitability of products for any specific research application or outcome.',
    },
  ];

  return (
    <div>
      <SeoHead
        title={pl ? 'Informacja prawna' : 'Legal Notice'}
        description={pl
          ? 'Zastrzeżenia prawne PEPTIVEX LABS — odczynniki laboratoryjne wyłącznie do badań, nie do użytku na ludziach ani zwierzętach.'
          : 'PEPTIVEX LABS legal notice — laboratory reagents for research only, not for human or animal use.'
        }
        path={`/${lang}/legal`}
      />
      {/* Hero */}
      <div className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/[0.1] via-[#0c0a08] to-[#0c0a08]" />
        <HexPattern className="text-amber-500/[0.02]" />
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 mb-4">
            <AlertTriangle size={12} className="text-red-400" />
            <span className="text-red-400 text-xs font-medium uppercase tracking-wide">{pl ? 'Ważne' : 'Important'}</span>
          </div>
          <h1 className="text-white text-3xl sm:text-4xl font-extrabold mb-4">
            {pl ? 'Informacja prawna' : 'Legal Notice'}
          </h1>
          <p className="text-white/40 max-w-lg">{pl ? 'Zastrzeżenie dotyczące użytkowania produktów' : 'Product Use Disclaimer'}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Intro */}
        <div className="relative rounded-2xl overflow-hidden mb-8">
          <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-b from-amber-500/20 to-transparent">
            <div className="w-full h-full rounded-2xl bg-[#0e0c09]" />
          </div>
          <div className="relative z-10 p-6">
            <p className="text-white/60 text-[15px] leading-[1.8]">
              {pl
                ? 'Produkty sprzedawane przez PEPTIVEX LABS są przeznaczone wyłącznie do badań laboratoryjnych, analiz chemicznych i celów edukacyjnych. Nie są przeznaczone do użytku na ludziach ani zwierzętach, ani do stosowania w jakichkolwiek procedurach medycznych, diagnostycznych lub terapeutycznych.'
                : 'The products sold by PEPTIVEX LABS are intended strictly for laboratory research, chemical analysis, and educational purposes. They are not intended for human or animal consumption, nor for use in any medical, diagnostic, or therapeutic procedures.'
              }
            </p>
            <p className="text-white/50 text-[15px] leading-[1.8] mt-4">
              {pl
                ? 'Dokonując zakupu w PEPTIVEX LABS, przyjmujesz do wiadomości i zgadzasz się z następującymi warunkami:'
                : 'By purchasing from PEPTIVEX LABS, you acknowledge and agree to the following terms:'
              }
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-4">
          {sections.map((s, i) => (
            <div key={i} className="group why-card relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-b from-white/[0.06] to-transparent opacity-50 group-hover:opacity-100 group-hover:from-amber-500/20 transition-all duration-300">
                <div className="w-full h-full rounded-2xl bg-[#0e0c09]" />
              </div>
              <div className="relative z-10 p-6">
                <h2 className="text-white text-lg font-bold mb-3">{s.title}</h2>
                <p className="text-white/45 text-sm leading-[1.8]">{s.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom disclaimer */}
        <div className="mt-10 bg-amber-500/[0.06] border border-amber-500/20 rounded-2xl p-6 text-center">
          <AlertTriangle size={20} className="text-amber-500 mx-auto mb-3" />
          <p className="text-amber-400 text-xs font-bold uppercase tracking-wide mb-2">
            {pl ? 'ODCZYNNIK LABORATORYJNY. DO CELÓW BADAWCZYCH' : 'LABORATORY REAGENT. FOR RESEARCH USE ONLY'}
          </p>
          <p className="text-white/40 text-sm">
            {pl
              ? 'Składając zamówienie w PEPTIVEX LABS, potwierdzasz, że przeczytałeś i akceptujesz powyższe warunki.'
              : 'By placing an order with PEPTIVEX LABS, you confirm that you have read and accept the above terms.'
            }
          </p>
        </div>

        {/* Company details */}
        <div className="mt-10 relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-b from-white/[0.08] to-transparent">
            <div className="w-full h-full rounded-2xl bg-[#0e0c09]" />
          </div>
          <div className="relative z-10 p-6">
            <h2 className="text-white text-lg font-bold mb-4">
              {pl ? 'Dane firmy' : 'Company details'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wide mb-2">
                  {pl ? 'Spółka' : 'Company'}
                </p>
                <p className="text-white font-semibold mb-1">PEPTIVEXLABS LTD</p>
                <p className="text-white/50 mb-1">
                  {pl ? 'Numer firmy' : 'Company number'}: 17178009
                </p>
                <p className="text-white/50 mb-1">
                  {pl ? 'Forma prawna' : 'Company type'}: Private Limited Company
                </p>
                <p className="text-white/50">
                  {pl ? 'Jurysdykcja' : 'Jurisdiction'}: England &amp; Wales
                </p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wide mb-2">
                  {pl ? 'Siedziba rejestrowa' : 'Registered office'}
                </p>
                <p className="text-white/60 leading-relaxed mb-4">
                  66 Paul Street<br />
                  London, EC2A 4NA<br />
                  United Kingdom
                </p>
                <p className="text-white/40 text-xs uppercase tracking-wide mb-2">
                  {pl ? 'Adres korespondencyjny' : 'Operational address'}
                </p>
                <p className="text-white/60 leading-relaxed">
                  4th Floor, The Featherstone Building<br />
                  66 City Road, London, EC1Y 2AL<br />
                  United Kingdom
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs text-white/40">
              <p>
                {pl
                  ? 'Spółka zarejestrowana w Companies House (Wielka Brytania). Pełne dane dostępne na find-and-update.company-information.service.gov.uk.'
                  : 'Company registered with Companies House (United Kingdom). Full records available at find-and-update.company-information.service.gov.uk.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
