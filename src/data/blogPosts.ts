interface BlogSection {
  heading?: string;
  image?: string;
  paragraphs: string[];
  list?: string[];
}

export interface BlogPost {
  slug: string;
  title_pl: string;
  title_en: string;
  excerpt_pl: string;
  excerpt_en: string;
  date: string;
  category: string;
  readTime: number;
  heroImage: string;
  sections_pl: BlogSection[];
  sections_en: BlogSection[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'what-are-peptides',
    title_pl: 'Czym są peptydy? Kompletny przewodnik dla początkujących',
    title_en: 'What Are Peptides? A Complete Beginner\'s Guide',
    excerpt_pl: 'Peptydy to krótkie łańcuchy aminokwasów pełniące kluczowe funkcje w organizmie. Dowiedz się czym się różnią od białek i jakie mają zastosowania.',
    excerpt_en: 'Peptides are short amino acid chains playing crucial roles in the body. Learn how they differ from proteins and their applications.',
    date: '2026-04-12',
    category: 'Education',
    readTime: 8,
    heroImage: '/images/brand/what-are-peptides.png',
    sections_pl: [
      {
        heading: 'Czym dokładnie są peptydy?',
        paragraphs: [
          'Peptydy to krótkie łańcuchy aminokwasów — od 2 do około 50 aminokwasów połączonych wiązaniami peptydowymi. Są mniejsze od białek (które mają powyżej 50 aminokwasów), ale pełnią równie istotne funkcje biologiczne.',
          'Organizm ludzki naturalnie produkuje setki różnych peptydów. Pełnią one funkcje hormonów, neuroprzekaźników, czynników wzrostu i sygnałów komórkowych. Insulina, oksytocyna czy endorfiny — to wszystko peptydy.',
        ],
        image: '/images/brand/types-of-peptides.png',
      },
      {
        heading: 'Rodzaje peptydów badawczych',
        paragraphs: [
          'Peptydy badawcze to syntetyczne odpowiedniki naturalnych peptydów, produkowane w laboratorium do celów naukowych. Dzielą się na kilka głównych kategorii:',
        ],
        list: [
          'Peptydy regeneracyjne (BPC-157, TB-500) — badane pod kątem gojenia tkanek, ścięgien i mięśni',
          'Peptydy metaboliczne (MOTS-c, 5-Amino-1MQ) — badane w kontekście metabolizmu, insulinowrażliwości i energii komórkowej',
          'Peptydy anti-aging (NAD+, GHK-Cu) — badane pod kątem naprawy DNA, regeneracji skóry i spowolnienia starzenia',
          'Peptydy uwalniające hormon wzrostu (CJC-1295, Ipamorelin) — stymulują naturalne wydzielanie GH',
          'Peptydy kognitywne (Selank) — badane pod kątem funkcji poznawczych i redukcji lęku',
          'Peptydy kosmeceutyczne (SNAP-8) — stosowane w badaniach nad redukcją zmarszczek',
        ],
      },
      {
        heading: 'Jak produkuje się peptydy?',
        image: '/images/brand/peptivex-box.png',
        paragraphs: [
          'Peptydy badawcze produkowane są metodą syntezy w fazie stałej (SPPS — Solid Phase Peptide Synthesis). Proces polega na sekwencyjnym dołączaniu aminokwasów do rosnącego łańcucha, który jest zakotwiczony na stałym nośniku.',
          'Po syntezie peptyd jest oczyszczany metodą HPLC (High Performance Liquid Chromatography), co pozwala osiągnąć czystość powyżej 98%. Końcowy produkt jest liofilizowany — zamrażany i suszony próżniowo, co daje stabilny proszek nadający się do długotrwałego przechowywania.',
        ],
      },
      {
        heading: 'Przechowywanie peptydów',
        paragraphs: [
          'Prawidłowe przechowywanie jest kluczowe dla zachowania aktywności peptydów:',
        ],
        list: [
          'Liofilizowane (proszek): -20°C (zamrażarka), chronić przed światłem i wilgocią',
          'Po rekonstytucji (roztwór): 2-8°C (lodówka), zużyć w ciągu 30 dni',
          'Do rekonstytucji używa się wody bakteriostatycznej',
          'Unikać wielokrotnego zamrażania i rozmrażania',
        ],
      },
      {
        heading: 'Najczęściej badane peptydy',
        image: '/images/products/bpc-157-vial.png',
        paragraphs: [
          'BPC-157 to jeden z najszerzej badanych peptydów regeneracyjnych. Jest to 15-aminokwasowy peptyd pochodzący z białka ludzkiego soku żołądkowego, badany w kontekście gojenia tkanek, ochrony jelit i neuroprotekcji. Sekwencja aminokwasowa: Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val. Działanie obejmuje aktywację receptora VEGFR2, kompleksów FAK-paksylina oraz szlaku JAK-2.',
          'TB-500 (analog Tymozyny Beta-4) to 43-aminokwasowy peptyd badany jako jedna z najbardziej aktywnych molekuł gojenia ran w literaturze naukowej. Mobilizuje komórki macierzyste i progenitorowe do miejsca urazu, promuje angiogenezę i redukuje apoptozę. Często badany w połączeniu z BPC-157 dla efektu synergistycznego.',
          'NAD+ (Dinukleotyd nikotynamidoadeninowy) to koenzym centralny dla ponad 500 reakcji enzymatycznych w organizmie. Jego poziom spada drastycznie z wiekiem, co łączy się ze starzeniem komórkowym i chorobami neurodegeneracyjnymi. Badania z 2026 roku wskazują na potencjał w modelach choroby Alzheimera i Parkinsona.',
          'Retatrutide — potrójny agonista receptorów GLP-1, GIP i glukagonu (tzw. "GLP-3") — jest obecnie w fazie 3 badań klinicznych prowadzonych przez Eli Lilly. Wzbudza ogromne zainteresowanie w dziedzinie metabolizmu jako jeden z najbardziej obiecujących peptydów metabolicznych nowej generacji.',
        ],
      },
      {
        heading: 'Peptydy a białka — czym się różnią?',
        paragraphs: [
          'Granica między peptydami a białkami jest umowna i opiera się głównie na długości łańcucha aminokwasowego. Peptydy to łańcuchy do około 50 aminokwasów, białka — powyżej 50. Jednak kluczowa różnica leży w funkcji: peptydy działają głównie jako sygnały i regulatory, podczas gdy białka pełnią funkcje strukturalne i enzymatyczne.',
          'Peptydy badawcze są syntetyzowane chemicznie (metoda SPPS), co pozwala na precyzyjną kontrolę sekwencji i czystości. Białka natomiast są zazwyczaj produkowane metodami biotechnologicznymi — rekombinantnie w komórkach bakteryjnych lub drożdżowych. Ta różnica w produkcji wpływa na koszt, skalę i czystość końcowego produktu.',
          'W kontekście badawczym peptydy mają przewagę nad białkami pod względem stabilności, kosztu produkcji i łatwości modyfikacji. Można łatwo wprowadzać zmianyw sekwencji, dodawać grupy ochronne czy tworzyć analogi o zmodyfikowanych właściwościach farmakologicznych.',
        ],
      },
      {
        heading: 'Zastosowania peptydów w nauce — obszary badań',
        paragraphs: [
          'Peptydy badawcze znajdują zastosowanie w szerokim spektrum dziedzin naukowych. Medycyna regeneracyjna wykorzystuje peptydy takie jak BPC-157 i TB-500 do badania mechanizmów gojenia tkanek. Endokrynologia bada peptydy uwalniające hormon wzrostu (CJC-1295, Ipamorelin) w kontekście fizjologii osi somatotropowej.',
          'Neurobiologia korzysta z peptydów kognitywnych jak Selank do badania mechanizmów lękowych i neuroplastyczności. Dermatologia badawcza eksploruje GHK-Cu i SNAP-8 jako potencjalne narzędzia w badaniach nad regeneracją skóry. Metabolizm i otyłość to obszar, w którym Retatrutide, MOTS-c i 5-Amino-1MQ otwierają nowe kierunki badawcze.',
          'Warto podkreślić, że większość dostępnych danych pochodzi z badań przedklinicznych (in vitro i modele zwierzęce). Pełne badania kliniczne z udziałem ludzi są prowadzone tylko dla nielicznych peptydów, takich jak Retatrutide (faza 3, Eli Lilly). Dlatego peptydy badawcze są sprzedawane wyłącznie do celów laboratoryjnych i naukowych.',
        ],
      },
    ],
    sections_en: [
      {
        heading: 'What exactly are peptides?',
        paragraphs: [
          'Peptides are short chains of amino acids — from 2 to approximately 50 amino acids linked by peptide bonds. They are smaller than proteins (which have over 50 amino acids) but play equally important biological functions.',
          'The human body naturally produces hundreds of different peptides. They serve as hormones, neurotransmitters, growth factors, and cellular signals. Insulin, oxytocin, and endorphins — these are all peptides.',
        ],
        image: '/images/brand/types-of-peptides.png',
      },
      {
        heading: 'Types of research peptides',
        paragraphs: [
          'Research peptides are synthetic equivalents of natural peptides, manufactured in laboratories for scientific purposes. They fall into several main categories:',
        ],
        list: [
          'Regenerative peptides (BPC-157, TB-500) — studied for tissue, tendon, and muscle healing',
          'Metabolic peptides (MOTS-c, 5-Amino-1MQ) — studied for metabolism, insulin sensitivity, and cellular energy',
          'Anti-aging peptides (NAD+, GHK-Cu) — studied for DNA repair, skin regeneration, and aging slowdown',
          'Growth hormone releasing peptides (CJC-1295, Ipamorelin) — stimulate natural GH secretion',
          'Cognitive peptides (Selank) — studied for cognitive function and anxiety reduction',
          'Cosmeceutical peptides (SNAP-8) — used in wrinkle reduction research',
        ],
      },
      {
        heading: 'How are peptides manufactured?',
        image: '/images/brand/peptivex-box.png',
        paragraphs: [
          'Research peptides are manufactured using Solid Phase Peptide Synthesis (SPPS). The process involves sequentially adding amino acids to a growing chain anchored on a solid support.',
          'After synthesis, the peptide is purified using HPLC (High Performance Liquid Chromatography), achieving purity above 98%. The final product is lyophilized — frozen and vacuum-dried, producing a stable powder suitable for long-term storage.',
        ],
      },
      {
        heading: 'Storing peptides',
        paragraphs: [
          'Proper storage is critical for maintaining peptide activity:',
        ],
        list: [
          'Lyophilized (powder): -20°C (freezer), protect from light and moisture',
          'After reconstitution (solution): 2-8°C (fridge), use within 30 days',
          'Use bacteriostatic water for reconstitution',
          'Avoid repeated freeze-thaw cycles',
        ],
      },
      {
        heading: 'Most researched peptides',
        image: '/images/products/bpc-157-vial.png',
        paragraphs: [
          'BPC-157 is one of the most widely studied regenerative peptides. It is a 15-amino acid peptide derived from human gastric juice protein (sequence: Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val). Its mechanism involves VEGFR2 receptor activation, FAK-paxillin complexes, and JAK-2 signaling. Studied for tissue healing, gut protection, and neuroprotection.',
          'TB-500 (Thymosin Beta-4 analog) is a 43-amino acid peptide studied as one of the most active wound-healing molecules in scientific literature. It mobilizes stem and progenitor cells to injury sites, promotes angiogenesis, and reduces apoptosis. Frequently studied in combination with BPC-157 for synergistic effects.',
          'NAD+ (Nicotinamide Adenine Dinucleotide) is a coenzyme central to over 500 enzymatic reactions. Its levels decline sharply with age, linked to cellular aging and neurodegenerative diseases. 2026 research points to potential in Alzheimer\'s and Parkinson\'s disease models.',
          'Retatrutide — a triple agonist targeting GLP-1, GIP, and glucagon receptors (nicknamed "GLP-3") — is currently in phase 3 clinical trials conducted by Eli Lilly. It generates enormous interest in metabolic science as one of the most promising next-generation metabolic peptides.',
        ],
      },
      {
        heading: 'Peptides vs. proteins — what\'s the difference?',
        paragraphs: [
          'The boundary between peptides and proteins is conventional, based mainly on amino acid chain length. Peptides are chains of up to approximately 50 amino acids, proteins — above 50. However, the key difference lies in function: peptides primarily act as signals and regulators, while proteins serve structural and enzymatic roles.',
          'Research peptides are chemically synthesized (SPPS method), allowing precise control over sequence and purity. Proteins are typically produced biotechnologically — recombinantly in bacterial or yeast cells. This production difference affects cost, scale, and final product purity.',
          'In the research context, peptides have advantages over proteins in terms of stability, production cost, and ease of modification. Sequence changes, protective groups, and analogs with modified pharmacological properties can be easily introduced.',
        ],
      },
      {
        heading: 'Applications of peptides in science — research areas',
        paragraphs: [
          'Research peptides find applications across a wide spectrum of scientific fields. Regenerative medicine uses peptides like BPC-157 and TB-500 to study tissue healing mechanisms. Endocrinology studies growth hormone releasing peptides (CJC-1295, Ipamorelin) in the context of somatotropic axis physiology.',
          'Neurobiology uses cognitive peptides like Selank to study anxiety mechanisms and neuroplasticity. Research dermatology explores GHK-Cu and SNAP-8 as potential tools in skin regeneration studies. Metabolism and obesity is an area where Retatrutide, MOTS-c, and 5-Amino-1MQ open new research directions.',
          'It is worth noting that most available data comes from preclinical studies (in vitro and animal models). Full human clinical trials are being conducted for only a few peptides, such as Retatrutide (phase 3, Eli Lilly). This is why research peptides are sold exclusively for laboratory and scientific purposes.',
        ],
      },
    ],
  },
  {
    slug: 'bpc-157-research-overview',
    title_pl: 'BPC-157 — co mówią badania naukowe?',
    title_en: 'BPC-157 — What Does the Research Say?',
    excerpt_pl: 'BPC-157 to jeden z najszerzej badanych peptydów regeneracyjnych. Przegląd aktualnych wyników badań przedklinicznych.',
    excerpt_en: 'BPC-157 is one of the most widely studied regenerative peptides. Review of current preclinical research findings.',
    date: '2026-04-10',
    category: 'Research',
    readTime: 12,
    heroImage: '/images/products/bpc-157-vial.png',
    sections_pl: [
      {
        heading: 'Czym jest BPC-157?',
        paragraphs: [
          'BPC-157 (Body Protection Compound-157) to syntetyczny pentadekapeptyd — łańcuch 15 aminokwasów. Pochodzi z białka obecnego w ludzkim soku żołądkowym, co czyni go unikalnym wśród peptydów badawczych — jest fragmentem naturalnie występującej w organizmie substancji.',
          'Sekwencja aminokwasowa BPC-157 to Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val. Peptyd jest stabilny w roztworze o pH zbliżonym do soku żołądkowego, co odróżnia go od większości peptydów, które są wrażliwe na kwasowe środowisko.',
        ],
        image: '/images/products/bpc-157-vial.png',
      },
      {
        heading: 'Mechanizm działania',
        paragraphs: [
          'Badania przedkliniczne wskazują na kilka szlaków molekularnych, przez które BPC-157 może wywierać swoje efekty:',
        ],
        list: [
          'Aktywacja receptora VEGFR2 — stymulacja angiogenezy (tworzenie nowych naczyń krwionośnych)',
          'Aktywacja kompleksów FAK-paksylina — wspomaganie migracji i adhezji komórek',
          'Stymulacja sygnalizacji JAK-2 — przeżywalność komórek, wzrost, odpowiedź immunologiczna',
          'Modulacja produkcji tlenku azotu (NO) — działanie przeciwzapalne',
        ],
      },
      {
        heading: 'Obszary badań',
        image: '/images/brand/peptivex-pouch.png',
        paragraphs: [
          'BPC-157 jest jednym z najszerzej badanych peptydów w nauce przedklinicznej. Główne obszary badań obejmują:',
          'Układ mięśniowo-szkieletowy — badania na modelach zwierzęcych wskazują na przyspieszenie gojenia ścięgien, więzadeł, mięśni i złamań kości. Jest to najlepiej udokumentowany obszar działania BPC-157.',
          'Układ pokarmowy — peptyd wykazuje właściwości ochronne wobec błony śluzowej przewodu pokarmowego. Badania obejmują modele choroby zapalnej jelit i uszkodzeń śluzówki.',
          'Neuroprotekcja — badania wskazują na potencjał w modelach urazów mózgu (TBI), ucisku rdzenia kręgowego i regeneracji nerwów obwodowych.',
        ],
      },
      {
        heading: 'Bezpieczeństwo i status regulacyjny',
        paragraphs: [
          'Pilotażowe badanie z 2025 roku z udziałem ludzi, w którym BPC-157 podawano dożylnie w dawkach do 20 mg, nie wykazało istotnych działań niepożądanych na serce, wątrobę ani nerki.',
          'BPC-157 nie jest zatwierdzony przez FDA ani EMA do stosowania terapeutycznego u ludzi. Jest klasyfikowany jako odczynnik badawczy. Znajduje się na liście substancji zabronionych USADA w sporcie wyczynowym.',
          'Należy zauważyć, że zdecydowana większość dostępnych danych pochodzi z badań na zwierzętach. Pełne badania kliniczne z udziałem ludzi są nadal potrzebne.',
        ],
      },
    ],
    sections_en: [
      {
        heading: 'What is BPC-157?',
        paragraphs: [
          'BPC-157 (Body Protection Compound-157) is a synthetic pentadecapeptide — a chain of 15 amino acids. It derives from a protein found in human gastric juice, making it unique among research peptides — it is a fragment of a naturally occurring substance.',
          'The amino acid sequence of BPC-157 is Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val. The peptide is stable in solutions with pH close to gastric juice, which distinguishes it from most peptides that are sensitive to acidic environments.',
        ],
        image: '/images/products/bpc-157-vial.png',
      },
      {
        heading: 'Mechanism of action',
        paragraphs: [
          'Preclinical studies point to several molecular pathways through which BPC-157 may exert its effects:',
        ],
        list: [
          'VEGFR2 receptor activation — stimulation of angiogenesis (new blood vessel formation)',
          'FAK-paxillin complex activation — supporting cell migration and adhesion',
          'JAK-2 signaling stimulation — cell survival, growth, immune response',
          'Nitric oxide (NO) production modulation — anti-inflammatory effects',
        ],
      },
      {
        heading: 'Research areas',
        image: '/images/brand/peptivex-pouch.png',
        paragraphs: [
          'BPC-157 is one of the most widely studied peptides in preclinical science. Main research areas include:',
          'Musculoskeletal system — animal model studies indicate accelerated healing of tendons, ligaments, muscles, and bone fractures. This is the best-documented area of BPC-157 action.',
          'Gastrointestinal system — the peptide exhibits protective properties for the GI tract mucosa. Studies include inflammatory bowel disease models and mucosal injury.',
          'Neuroprotection — studies indicate potential in traumatic brain injury (TBI) models, spinal cord compression, and peripheral nerve regeneration.',
        ],
      },
      {
        heading: 'Safety and regulatory status',
        paragraphs: [
          'A 2025 pilot human study, where BPC-157 was administered intravenously at doses up to 20 mg, showed no significant adverse effects on the heart, liver, or kidneys.',
          'BPC-157 is not approved by the FDA or EMA for human therapeutic use. It is classified as a research reagent. It appears on the USADA prohibited substance list in competitive sports.',
          'It should be noted that the vast majority of available data comes from animal studies. Full human clinical trials are still needed.',
        ],
      },
    ],
  },
  {
    slug: 'peptide-storage-guide',
    title_pl: 'Jak prawidłowo przechowywać peptydy? Praktyczny poradnik',
    title_en: 'How to Properly Store Peptides: A Practical Guide',
    excerpt_pl: 'Przechowywanie peptydów wpływa na ich stabilność i aktywność. Temperatura, światło, wilgotność — co musisz wiedzieć.',
    excerpt_en: 'Peptide storage affects stability and activity. Temperature, light, humidity — what you need to know.',
    date: '2026-04-08',
    category: 'Guide',
    readTime: 5,
    heroImage: '/images/brand/peptivex-pouch.png',
    sections_pl: [
      {
        heading: 'Dlaczego przechowywanie jest tak ważne?',
        paragraphs: [
          'Peptydy to delikatne molekuły. Nieprawidłowe przechowywanie prowadzi do degradacji — rozpadu wiązań peptydowych, utleniania aminokwasów i utraty aktywności biologicznej. Peptyd, który stracił strukturę, jest bezużyteczny w badaniach.',
          'Główne czynniki degradacji to: temperatura, światło (szczególnie UV), wilgoć i kontakt z powietrzem. Dobra wiadomość — prawidłowe przechowywanie jest proste, gdy znasz zasady.',
        ],
      },
      {
        heading: 'Forma liofilizowana (proszek)',
        image: '/images/products/retatrutide-box-front.jpg',
        paragraphs: [
          'Liofilizacja (suszenie sublimacyjne) to proces, w którym peptyd w roztworze jest zamrażany, a następnie woda jest usuwana próżniowo. Efektem jest suchy, stabilny proszek — najbardziej trwała forma peptydów.',
        ],
        list: [
          'Temperatura: -20°C (zamrażarka) — optymalna do długotrwałego przechowywania',
          'Akceptowalna: 2-8°C (lodówka) — do kilku tygodni',
          'Chronić przed światłem — najlepiej w oryginalnym opakowaniu lub owinięte folią aluminiową',
          'Chronić przed wilgocią — fiolki powinny być szczelnie zamknięte',
          'W tych warunkach peptydy zachowują aktywność przez miesiące, a nawet lata',
        ],
      },
      {
        heading: 'Rekonstytucja (przygotowanie roztworu)',
        paragraphs: [
          'Przed użyciem w badaniach peptyd w proszku musi zostać rozpuszczony (zrekonstytuowany). Do tego celu używa się wody bakteriostatycznej — sterylnej wody z dodatkiem 0.9% alkoholu benzylowego, który zapobiega rozwojowi bakterii.',
        ],
        list: [
          'Użyj wody bakteriostatycznej (nie zwykłej wody!)',
          'Dodawaj wodę powoli, po ściance fiolki — nie wstrzykuj bezpośrednio w proszek',
          'Nie wstrząsaj — delikatnie obracaj fiolkę, aż proszek się rozpuści',
          'Roztwór przechowuj w lodówce (2-8°C)',
          'Zużyj w ciągu 30 dni od rekonstytucji',
        ],
      },
      {
        heading: 'Czego unikać',
        image: '/images/products/retatrutide-pens.jpg',
        paragraphs: [
          'Kilka rzeczy, które mogą zniszczyć Twoje peptydy:',
        ],
        list: [
          'Wielokrotne zamrażanie i rozmrażanie — każdy cykl degraduje peptyd',
          'Pozostawianie w temperaturze pokojowej — szczególnie po rekonstytucji',
          'Bezpośrednie światło słoneczne — UV rozkłada wiązania peptydowe',
          'Zanieczyszczenia — zawsze używaj sterylnych igieł i strzykawek',
          'Zbyt energiczne mieszanie — może zniszczyć strukturę peptydu',
        ],
      },
    ],
    sections_en: [
      {
        heading: 'Why is storage so important?',
        paragraphs: [
          'Peptides are delicate molecules. Improper storage leads to degradation — breakdown of peptide bonds, amino acid oxidation, and loss of biological activity. A peptide that has lost its structure is useless for research.',
          'Main degradation factors are: temperature, light (especially UV), moisture, and air exposure. The good news — proper storage is simple once you know the rules.',
        ],
      },
      {
        heading: 'Lyophilized form (powder)',
        image: '/images/products/retatrutide-box-front.jpg',
        paragraphs: [
          'Lyophilization (freeze-drying) is a process where the peptide solution is frozen, then water is removed under vacuum. The result is a dry, stable powder — the most durable form of peptides.',
        ],
        list: [
          'Temperature: -20°C (freezer) — optimal for long-term storage',
          'Acceptable: 2-8°C (fridge) — for up to several weeks',
          'Protect from light — ideally in original packaging or wrapped in aluminum foil',
          'Protect from moisture — vials should be tightly sealed',
          'Under these conditions, peptides maintain activity for months or even years',
        ],
      },
      {
        heading: 'Reconstitution (preparing the solution)',
        paragraphs: [
          'Before use in research, the powdered peptide must be dissolved (reconstituted). Bacteriostatic water is used for this purpose — sterile water with 0.9% benzyl alcohol added to prevent bacterial growth.',
        ],
        list: [
          'Use bacteriostatic water (not regular water!)',
          'Add water slowly, along the vial wall — do not inject directly into the powder',
          'Do not shake — gently rotate the vial until the powder dissolves',
          'Store the solution in the fridge (2-8°C)',
          'Use within 30 days of reconstitution',
        ],
      },
      {
        heading: 'What to avoid',
        image: '/images/products/retatrutide-pens.jpg',
        paragraphs: [
          'Several things that can destroy your peptides:',
        ],
        list: [
          'Repeated freeze-thaw cycles — each cycle degrades the peptide',
          'Leaving at room temperature — especially after reconstitution',
          'Direct sunlight — UV breaks down peptide bonds',
          'Contamination — always use sterile needles and syringes',
          'Too vigorous mixing — can destroy the peptide structure',
        ],
      },
    ],
  },
];
