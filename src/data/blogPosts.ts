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
        heading: 'Dawkowanie w badaniach przedklinicznych',
        paragraphs: [
          'W badaniach na modelach zwierzęcych BPC-157 stosowano w dawkach od 6 do 50 mcg/kg masy ciała, podawanych raz lub dwa razy dziennie. Drogi podania obejmowały iniekcje podskórne, dootrzewnowe oraz podawanie doustne — co jest nietypowe dla peptydów, które zazwyczaj są rozkładane w przewodzie pokarmowym.',
          'Stabilność BPC-157 w kwaśnym środowisku żołądka (pochodzenie z białka soku żołądkowego) sprawia, że jest jednym z nielicznych peptydów wykazujących aktywność po podaniu doustnym w modelach zwierzęcych. Ta cecha jest przedmiotem intensywnych badań.',
          'Ekwiwalent ludzki dawek stosowanych w badaniach zwierzęcych szacowany jest na 200-500 mcg dziennie, jednak brak jest jeszcze ustalonych protokołów klinicznych. Pilotażowe badanie z 2025 roku testowało dawki dożylne do 20 mg u ludzi.',
        ],
      },
      {
        heading: 'Synergia z innymi peptydami',
        paragraphs: [
          'W literaturze przedklinicznej BPC-157 jest często badany w połączeniu z TB-500 (Thymosin Beta-4). Hipoteza synergii opiera się na komplementarnych mechanizmach: BPC-157 stymuluje angiogenezę i ochronę tkanek, podczas gdy TB-500 mobilizuje komórki macierzyste i wspiera remodelowanie cytoszkieletu.',
          'Połączenie BPC-157 z peptydami uwalniającymi hormon wzrostu (CJC-1295, Ipamorelin) jest również przedmiotem badań — hormon wzrostu odgrywa kluczową rolę w regeneracji tkanek, co teoretycznie może wzmacniać efekty regeneracyjne BPC-157.',
        ],
      },
      {
        heading: 'Bezpieczeństwo i status regulacyjny',
        paragraphs: [
          'Pilotażowe badanie z 2025 roku z udziałem ludzi, w którym BPC-157 podawano dożylnie w dawkach do 20 mg, nie wykazało istotnych działań niepożądanych na serce, wątrobę ani nerki. Jest to jedno z pierwszych kontrolowanych badań bezpieczeństwa BPC-157 u ludzi.',
          'BPC-157 jest sklasyfikowany przez FDA jako substancja kategorii 2 (Category 2 bulk substance) — nie może być legalnie stosowany w recepturze aptecznej w USA. Nie jest zatwierdzony przez EMA w Europie. Znajduje się na liście substancji zabronionych USADA w sporcie wyczynowym.',
          'Jednym z teoretycznych ryzyk jest promowanie angiogenezy, co w kontekście istniejących nowotworów wymaga ostrożności. Jednak w dotychczasowych badaniach przedklinicznych nie zaobserwowano efektów prokarcinogennych.',
          'Należy podkreślić, że zdecydowana większość danych pochodzi z badań na modelach zwierzęcych. Mimo obiecujących wyników, pełne randomizowane badania kliniczne z udziałem ludzi są nadal konieczne do potwierdzenia bezpieczeństwa i skuteczności.',
        ],
      },
      {
        heading: 'Przechowywanie BPC-157',
        paragraphs: [
          'BPC-157 w formie liofilizowanej (proszek) należy przechowywać w temperaturze -20°C, chroniony przed światłem i wilgocią. W tych warunkach peptyd zachowuje stabilność przez wiele miesięcy.',
          'Po rekonstytucji wodą bakteriostatyczną roztwór należy przechowywać w lodówce (2-8°C) i zużyć w ciągu 30 dni. Nie zamrażać ponownie roztworu — wielokrotne cykle zamrażania-rozmrażania degradują peptyd i obniżają jego aktywność.',
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
        heading: 'Dosing in preclinical studies',
        paragraphs: [
          'In animal model studies, BPC-157 was administered at doses of 6 to 50 mcg/kg body weight, given once or twice daily. Routes of administration included subcutaneous, intraperitoneal injections, and oral administration — unusual for peptides typically degraded in the gastrointestinal tract.',
          'BPC-157\'s stability in the acidic stomach environment (due to its origin from gastric juice protein) makes it one of the few peptides showing activity after oral administration in animal models. This characteristic is the subject of intensive research.',
          'The human equivalent of doses used in animal studies is estimated at 200-500 mcg daily, though established clinical protocols do not yet exist. The 2025 pilot study tested intravenous doses up to 20 mg in humans.',
        ],
      },
      {
        heading: 'Synergy with other peptides',
        paragraphs: [
          'In preclinical literature, BPC-157 is frequently studied in combination with TB-500 (Thymosin Beta-4). The synergy hypothesis is based on complementary mechanisms: BPC-157 stimulates angiogenesis and tissue protection, while TB-500 mobilizes stem cells and supports cytoskeleton remodeling.',
          'The combination of BPC-157 with growth hormone releasing peptides (CJC-1295, Ipamorelin) is also under investigation — growth hormone plays a critical role in tissue regeneration, which could theoretically enhance the regenerative effects of BPC-157.',
        ],
      },
      {
        heading: 'Safety and regulatory status',
        paragraphs: [
          'A 2025 pilot human study, where BPC-157 was administered intravenously at doses up to 20 mg, showed no significant adverse effects on the heart, liver, or kidneys. This is one of the first controlled safety studies of BPC-157 in humans.',
          'BPC-157 is classified by the FDA as a Category 2 bulk substance — it cannot legally be used in pharmacy compounding in the USA. It is not approved by the EMA in Europe. It appears on the USADA prohibited substance list in competitive sports.',
          'One theoretical risk is angiogenesis promotion, which requires caution in the context of existing tumors. However, procarcinogenic effects have not been observed in preclinical studies to date.',
          'It should be emphasized that the vast majority of data comes from animal model studies. Despite promising results, full randomized clinical trials in humans are still necessary to confirm safety and efficacy.',
        ],
      },
      {
        heading: 'Storing BPC-157',
        paragraphs: [
          'Lyophilized BPC-157 (powder) should be stored at -20°C, protected from light and moisture. Under these conditions, the peptide maintains stability for many months.',
          'After reconstitution with bacteriostatic water, the solution should be refrigerated (2-8°C) and used within 30 days. Do not re-freeze the solution — repeated freeze-thaw cycles degrade the peptide and reduce its activity.',
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
      {
        heading: 'Woda bakteriostatyczna — co to jest?',
        paragraphs: [
          'Woda bakteriostatyczna (BAC water) to sterylna woda z dodatkiem 0.9% alkoholu benzylowego. Alkohol benzylowy działa jako konserwant, zapobiegając rozwojowi bakterii w roztworze. Dzięki temu roztwór peptydu pozostaje bezpieczny do użycia przez dłuższy czas.',
          'Nie używaj zwykłej wody destylowanej, wody do iniekcji ani soli fizjologicznej bez konserwantu — w tych roztworach bakterie mogą się rozmnażać, co kontaminuje peptyd i czyni go bezużytecznym (a potencjalnie niebezpiecznym).',
          'Woda bakteriostatyczna jest dostępna w fiolkach 10ml lub 30ml. Jedna fiolka 10ml wystarczy do rekonstytucji kilku peptydów. Przechowuj ją w lodówce po otwarciu.',
        ],
      },
      {
        heading: 'Ile wody dodać? Obliczanie stężenia',
        paragraphs: [
          'Ilość wody dodawanej do fiolki peptydu zależy od pożądanego stężenia roztworu. Ogólna zasada: im mniej wody, tym wyższe stężenie — ale zbyt stężony roztwór może być trudny do precyzyjnego dawkowania.',
          'Przykład: dla fiolki BPC-157 5mg — dodanie 2ml wody bakteriostatycznej daje stężenie 2.5mg/ml (2500mcg/ml). Jeśli badawcza dawka to 250mcg, odpowiada to 0.1ml (10 jednostek na strzykawce insulinowej U-100). Dostępne są kalkulatory online ułatwiające te obliczenia.',
          'Ważne: zapisz ilość dodanej wody na fiolce markerem lub etykietą. Po kilku dniach łatwo zapomnieć jakie stężenie przygotowałeś.',
        ],
      },
      {
        heading: 'Transport peptydów',
        paragraphs: [
          'Przy zamawianiu peptydów online kluczowe jest, aby dostawca stosował odpowiednie metody pakowania. Liofilizowane peptydy są relatywnie odporne na krótkotrwałe wahania temperatury podczas transportu — kilka dni w temperaturze pokojowej nie powinno znacząco wpłynąć na ich jakość.',
          'Jednak po otrzymaniu przesyłki należy niezwłocznie umieścić peptydy w zamrażarce (-20°C). Nie pozostawiaj ich na parapecie, w samochodzie ani w innym miejscu narażonym na ciepło i światło.',
          'W PEPTIVEX LABS wysyłamy peptydy w dyskretnym opakowaniu przez InPost Paczkomaty (Polska) i InPost Lockers (UK), z zachowaniem odpowiednich warunków transportu.',
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
      {
        heading: 'Bacteriostatic water — what is it?',
        paragraphs: [
          'Bacteriostatic water (BAC water) is sterile water with 0.9% benzyl alcohol added. Benzyl alcohol acts as a preservative, preventing bacterial growth in the solution. This keeps the peptide solution safe for use over an extended period.',
          'Do not use regular distilled water, water for injection, or saline without preservative — bacteria can multiply in these solutions, contaminating the peptide and rendering it useless (and potentially dangerous).',
          'Bacteriostatic water is available in 10ml or 30ml vials. One 10ml vial is sufficient for reconstituting several peptides. Store it in the refrigerator after opening.',
        ],
      },
      {
        heading: 'How much water to add? Calculating concentration',
        paragraphs: [
          'The amount of water added to a peptide vial depends on the desired solution concentration. General rule: less water means higher concentration — but too concentrated a solution can be difficult to dose precisely.',
          'Example: for a BPC-157 5mg vial — adding 2ml of bacteriostatic water gives a concentration of 2.5mg/ml (2500mcg/ml). If the research dose is 250mcg, that corresponds to 0.1ml (10 units on a U-100 insulin syringe). Online calculators are available to simplify these calculations.',
          'Important: write the amount of water added on the vial with a marker or label. After a few days, it is easy to forget what concentration you prepared.',
        ],
      },
      {
        heading: 'Transporting peptides',
        paragraphs: [
          'When ordering peptides online, it is crucial that the supplier uses appropriate packaging methods. Lyophilized peptides are relatively resistant to short-term temperature fluctuations during transport — a few days at room temperature should not significantly affect their quality.',
          'However, upon receiving the shipment, peptides should be immediately placed in the freezer (-20°C). Do not leave them on a windowsill, in a car, or in any other location exposed to heat and light.',
          'At PEPTIVEX LABS, we ship peptides in discreet packaging via InPost Paczkomaty (Poland) and InPost Lockers (UK), maintaining appropriate transport conditions.',
        ],
      },
    ],
  },
  {
    slug: 'longevity-peptide-framework',
    title_pl: 'Framework longevity: jak peptydy wpisują się w strategię zdrowia',
    title_en: 'The Longevity Framework: How Peptides Fit Into a Health Strategy',
    excerpt_pl: 'Peptydy to nie magiczne rozwiązanie — to precyzyjne narzędzia, które działają najlepiej na solidnym fundamencie zdrowia. Poznaj framework 3 poziomów.',
    excerpt_en: 'Peptides are not a magic solution — they are precision tools that work best on a solid health foundation. Learn the 3-level framework.',
    date: '2026-04-12',
    category: 'Strategy',
    readTime: 10,
    heroImage: '/images/brand/types-of-peptides.png',
    sections_pl: [
      {
        heading: 'Peptydy to narzędzia, nie skróty',
        paragraphs: [
          'W ostatnich latach peptydy stały się jednym z najgorętszych tematów w świecie longevity i optymalizacji zdrowia. Słyszysz o peptydach na odchudzanie, regenerację, odmładzanie skóry, wydajność kognitywną. Ale rozmowy online bywają chaotyczne — protokoły się różnią, informacje są niepełne, a łatwo się pogubić w ilości opcji.',
          'Peptydy to krótkie łańcuchy aminokwasów, które działają jako celowane molekuły sygnałowe. Wpływają na konkretne szlaki biologiczne związane z metabolizmem, naprawą tkanek, stanem zapalnym i starzeniem. Wiele peptydów występuje naturalnie w ludzkiej fizjologii — insulina, GLP-1, oksytocyna to wszystko peptydy.',
          'Ale peptydy nie są magicznym rozwiązaniem. To narzędzia wpływające na sygnalizację biologiczną — nie skróty zastępujące fundamentalne nawyki zdrowotne. Działają najlepiej gdy są nakładane na solidny fundament stylu życia, odżywiania i równowagi hormonalnej.',
        ],
      },
      {
        heading: 'Framework 3 poziomów',
        image: '/images/brand/hero-brand.png',
        paragraphs: [
          'Zanim omówimy peptydy, ważne jest zrozumienie gdzie wpisują się w szerszą strategię zdrowia. Optymalizację można podzielić na trzy poziomy:',
        ],
        list: [
          'Poziom 1: Fundament zdrowia — jakość snu, trening siłowy i ruch, odpowiednie spożycie białka, stabilny poziom cukru we krwi, zarządzanie stresem. Jeśli te filary nie są na miejscu, peptydy nie przyniosą znaczących długoterminowych rezultatów.',
          'Poziom 2: Optymalizacja hormonalna — hormony wpływają na metabolizm, energię, nastrój i skład ciała. Optymalizacja estrogenów, progesteronu, testosteronu i hormonów tarczycy może diametralnie poprawić ogólne zdrowie.',
          'Poziom 3: Precyzyjne narzędzia — gdy fundament i hormony są zaadresowane, celowane interwencje mogą doprecyzować konkretne szlaki biologiczne. Tu właśnie wchodzą peptydy. Wspierają zdrowie metaboliczne, naprawę tkanek, funkcje kognitywne, regenerację skóry i odporność komórkową.',
        ],
      },
      {
        heading: 'Kategorie peptydów badawczych',
        paragraphs: [
          'Zamiast stosować wiele peptydów naraz, skuteczniejsze jest podejście warstwowe, które zmienia się w czasie w zależności od celów i fizjologii. Peptydy można podzielić na trzy grupy strategiczne:',
        ],
        list: [
          'Peptydy fundamentalne — stosowane długoterminowo jako baza (NAD+, GHK-Cu)',
          'Peptydy sezonowe — stosowane cyklicznie w określonych okresach (BPC-157, TB-500 na regenerację; CJC-1295 + Ipamorelin na GH)',
          'Peptydy sytuacyjne — stosowane doraźnie w odpowiedzi na konkretne potrzeby (Selank na stres, Melanotan 2 na fotoprotekcję)',
        ],
      },
      {
        heading: 'Odchudzanie i metabolizm',
        image: '/images/products/retatrutide-pens-20mg.jpg',
        paragraphs: [
          'Kategoria Fat Loss / Metabolic to najszybciej rosnący segment peptydów badawczych. Kluczowe molekuły to:',
          'Retatrutide (GLP-3) — potrójny agonista receptorów GLP-1, GIP i glukagonu. Najnowsza generacja, faza 3 badań klinicznych Eli Lilly. Format pen (wstrzykiwacz), dawkowanie 0.5-2mg tygodniowo z powolną titracją.',
          'MOTS-c — unikalny peptyd kodowany przez mitochondrialne DNA. Działa przez szlak AMPK, poprawiając wrażliwość na insulinę i metabolizm glukozy. Dawkowanie: 0.5-1mg, 3-5x/tydzień, unikać jedzenia 30 min po dawce.',
          '5-Amino-1MQ — inhibitor NNMT, który zwiększa poziom NAD+ 1.2-1.6x w komórkach. Redukcja tkanki tłuszczowej bez wpływu na apetyt — unikalny mechanizm.',
        ],
      },
      {
        heading: 'Regeneracja i gojenie',
        image: '/images/products/bpc-157-vial.png',
        paragraphs: [
          'BPC-157 i TB-500 to dwa najczęściej badane peptydy regeneracyjne. Ich połączenie jest popularne w protokołach badawczych ze względu na komplementarne mechanizmy:',
          'BPC-157 (250-500mcg dziennie, 4-12 tygodni) — stymuluje angiogenezę przez VEGFR2, chroni błonę śluzową przewodu pokarmowego, wykazuje właściwości neuroprotekcyjne. Unikalny wśród peptydów — stabilny w kwaśnym środowisku żołądka.',
          'TB-500 (500mcg dziennie, 6-12 tygodni) — mobilizuje komórki macierzyste, promuje angiogenezę i remodelowanie cytoszkieletu. Badany w kontekście gojenia ran, naprawy serca i regeneracji ścięgien.',
          'GHK-Cu (1.7-2mg dziennie, 4-8 tygodni) — peptyd miedziowy modulujący ekspresję ponad 4000 genów. Stymuluje syntezę kolagenu, elastyny i glikozaminoglikanów. Stosowany w badaniach nad regeneracją skóry i stymulacją mieszków włosowych.',
        ],
      },
      {
        heading: 'Longevity i mitochondria',
        paragraphs: [
          'Starzenie komórkowe jest ściśle związane ze spadkiem funkcji mitochondriów i poziomu NAD+. Kluczowe peptydy w tej kategorii:',
          'NAD+ (20-100mg na iniekcję, 2-3x/tydzień, SubQ lub IM) — centralny koenzym dla sirtuiny, PARP i fosforylacji oksydacyjnej. Suplementacja NAD+ jest intensywnie badana w kontekście chorób neurodegeneracyjnych i starzenia.',
          'SS-31 / Elamipretide (0.5-1mg, 5 dni on/2 off, 6-8 tygodni) — selektywnie celuje w wewnętrzną błonę mitochondrialną. Stabilizuje kristy, redukuje stres oksydacyjny. Stosować rano lub po sesji sauny/red-light. Naprzemiennie z dniami NAD+.',
          'MOTS-c (0.5-1mg, 3-5x/tydzień) — peptyd mitochondrialny regulujący metabolizm przez szlak AMPK. Dobrze łączy się z NAD+ dla wsparcia mitochondrialnego.',
        ],
      },
      {
        heading: 'Hormon wzrostu — CJC-1295 + Ipamorelin',
        paragraphs: [
          'Połączenie CJC-1295 No DAC z Ipamorelin to jeden z najlepiej przebadanych stacków peptydowych. Oba peptydy stymulują wydzielanie hormonu wzrostu, ale przez różne mechanizmy — razem dają synergistyczny efekt pulsacyjnego uwalniania GH.',
          'CJC-1295 No DAC (200-250mcg per dawka) — analog GHRH, stymuluje przysadkę do uwalniania GH w naturalnym rytmie pulsacyjnym. Krótki okres półtrwania (~30 min) daje badaczom precyzyjną kontrolę nad dawkowaniem.',
          'Ipamorelin (200-300mcg per dawka) — najbardziej selektywny GHRP, nie wpływa na oś ACTH-kortyzol ani prolaktynę. Podawanie wieczorem na czczo (2-3h po posiłku), 5 dni on / 2 off, cykl 6-12 tygodni.',
          'Ten stack jest preferowany nad syntetycznym GH ze względu na fizjologiczny wzorzec pulsacyjnego uwalniania i mniejsze ryzyko efektów ubocznych.',
        ],
      },
      {
        heading: 'Funkcje kognitywne i nastrój',
        paragraphs: [
          'Selank (250mcg, donosowo lub SubQ, 2-3 dni/tydzień, 4-6 tygodni) — heptapeptyd opracowany przez Rosyjską Akademię Nauk. Moduluje neurotransmisję GABAergiczną z efektem anksjolitycznym porównywalnym z benzodiazepinami — bez tolerancji, uzależnienia i sedacji. Wpływa na noradrenalinę, serotoninę i dopaminę.',
          'To jedna z niewielu substancji łączących efekt anksjolityczny z psychostymulującym/antiastenicznym — redukuje lęk bez powodowania senności.',
        ],
      },
      {
        heading: 'Badania na ludziach vs badania na zwierzętach',
        paragraphs: [
          'Ważne rozróżnienie: poziom dowodów naukowych różni się znacząco między peptydami. Niektóre (jak tirzepatid czy tesamorelin) przeszły badania kliniczne u ludzi lub zostały zatwierdzone jako leki. Inne są nadal we wczesnych fazach badań — głównie na modelach zwierzęcych.',
          'Na przykład MOTS-c i BPC-157 wzbudzają duże zainteresowanie na podstawie obiecujących wyników w badaniach na zwierzętach — metabolizm, naprawa tkanek, sygnalizacja komórkowa. Jednak duże badania kliniczne oceniające ich bezpieczeństwo i długoterminowe efekty u ludzi są nadal ograniczone.',
          'Badania na zwierzętach dostarczają cennych informacji o mechanizmach biologicznych, ale wyniki obserwowane u zwierząt nie zawsze przekładają się bezpośrednio na ludzi. Dlatego peptydy oparte głównie na badaniach przedklinicznych należy traktować z dodatkową ostrożnością.',
        ],
      },
    ],
    sections_en: [
      {
        heading: 'Peptides are tools, not shortcuts',
        paragraphs: [
          'Over the past few years, peptides have become one of the most talked-about tools in the world of longevity and health optimization. You hear about peptides for fat loss, recovery, skin rejuvenation, cognitive performance. But online conversations can be chaotic — protocols vary widely, information is often incomplete, and it\'s easy to feel overwhelmed.',
          'Peptides are short chains of amino acids that act as targeted signaling molecules. They influence specific biological pathways involved in metabolism, repair, inflammation, and aging. Many peptides exist naturally in human physiology — insulin, GLP-1, oxytocin are all peptides.',
          'But peptides are not a magic solution. They are tools that influence biological signaling — not shortcuts that replace foundational health habits. They work best when layered on top of a strong foundation of lifestyle habits, nutrition, and hormone balance.',
        ],
      },
      {
        heading: 'The 3-Level Framework',
        image: '/images/brand/hero-brand.png',
        paragraphs: [
          'Before discussing peptides, it\'s important to understand where they fit within a larger health strategy. Optimization can be divided into three levels:',
        ],
        list: [
          'Level 1: Foundational Health — sleep quality, strength training and movement, adequate protein intake, stable blood sugar, stress management. If these pillars are not in place, peptides will not produce meaningful long-term results.',
          'Level 2: Hormone Optimization — hormones influence metabolism, energy, mood, and body composition. Optimizing estrogen, progesterone, testosterone, and thyroid hormones can dramatically improve overall health.',
          'Level 3: Precision Tools — once the foundation and hormones are addressed, targeted interventions can refine specific biological pathways. This is where peptides come in. They support metabolic health, tissue repair, cognitive function, skin regeneration, and cellular resilience.',
        ],
      },
      {
        heading: 'Research peptide categories',
        paragraphs: [
          'Rather than stacking numerous peptides simultaneously, a more effective approach is a layered strategy that changes over time depending on goals and physiology. Peptides fall into three strategic groups:',
        ],
        list: [
          'Foundational peptides — used long-term as a base (NAD+, GHK-Cu)',
          'Seasonal peptides — used cyclically in specific periods (BPC-157, TB-500 for healing; CJC-1295 + Ipamorelin for GH)',
          'Situational peptides — used as needed in response to specific requirements (Selank for stress, Melanotan 2 for photoprotection)',
        ],
      },
      {
        heading: 'Weight loss and metabolism',
        image: '/images/products/retatrutide-pens-20mg.jpg',
        paragraphs: [
          'The Fat Loss / Metabolic category is the fastest-growing segment of research peptides. Key molecules include:',
          'Retatrutide (GLP-3) — triple agonist targeting GLP-1, GIP, and glucagon receptors. Latest generation, phase 3 clinical trials by Eli Lilly. Pen format (injector), dosing 0.5-2mg weekly with slow titration.',
          'MOTS-c — unique peptide encoded by mitochondrial DNA. Acts through the AMPK pathway, improving insulin sensitivity and glucose metabolism. Dosing: 0.5-1mg, 3-5x/week, avoid eating 30 min post-dose.',
          '5-Amino-1MQ — NNMT inhibitor that increases NAD+ levels 1.2-1.6x in cells. Fat tissue reduction without appetite suppression — unique mechanism.',
        ],
      },
      {
        heading: 'Regeneration and healing',
        image: '/images/products/bpc-157-vial.png',
        paragraphs: [
          'BPC-157 and TB-500 are the two most studied regenerative peptides. Their combination is popular in research protocols due to complementary mechanisms:',
          'BPC-157 (250-500mcg daily, 4-12 weeks) — stimulates angiogenesis via VEGFR2, protects GI tract mucosa, exhibits neuroprotective properties. Unique among peptides — stable in acidic stomach environment.',
          'TB-500 (500mcg daily, 6-12 weeks) — mobilizes stem cells, promotes angiogenesis and cytoskeleton remodeling. Studied for wound healing, cardiac repair, and tendon regeneration.',
          'GHK-Cu (1.7-2mg daily, 4-8 weeks) — copper peptide modulating expression of over 4,000 genes. Stimulates collagen, elastin, and glycosaminoglycan synthesis. Used in skin regeneration and hair follicle stimulation research.',
        ],
      },
      {
        heading: 'Longevity and mitochondria',
        paragraphs: [
          'Cellular aging is closely linked to declining mitochondrial function and NAD+ levels. Key peptides in this category:',
          'NAD+ (20-100mg per injection, 2-3x/week, SubQ or IM) — central coenzyme for sirtuins, PARPs, and oxidative phosphorylation. NAD+ supplementation is intensively studied in the context of neurodegenerative diseases and aging.',
          'SS-31 / Elamipretide (0.5-1mg, 5 days on/2 off, 6-8 weeks) — selectively targets the inner mitochondrial membrane. Stabilizes cristae, reduces oxidative stress. Use morning or after sauna/red-light sessions. Alternate with NAD+ days.',
          'MOTS-c (0.5-1mg, 3-5x/week) — mitochondrial peptide regulating metabolism through the AMPK pathway. Pairs well with NAD+ for mitochondrial support.',
        ],
      },
      {
        heading: 'Growth hormone — CJC-1295 + Ipamorelin',
        paragraphs: [
          'The CJC-1295 No DAC + Ipamorelin combination is one of the best-studied peptide stacks. Both peptides stimulate growth hormone secretion through different mechanisms — together they produce a synergistic pulsatile GH release effect.',
          'CJC-1295 No DAC (200-250mcg per dose) — GHRH analog, stimulates the pituitary to release GH in a natural pulsatile rhythm. Short half-life (~30 min) gives researchers precise dosing control.',
          'Ipamorelin (200-300mcg per dose) — the most selective GHRP, does not affect the ACTH-cortisol axis or prolactin. Administered in the evening fasted (2-3h after meal), 5 days on / 2 off, 6-12 week cycles.',
          'This stack is preferred over synthetic GH due to the physiological pulsatile release pattern and lower side effect risk.',
        ],
      },
      {
        heading: 'Cognitive function and mood',
        paragraphs: [
          'Selank (250mcg, intranasal or SubQ, 2-3 days/week, 4-6 weeks) — a heptapeptide developed at the Russian Academy of Sciences. Modulates GABAergic neurotransmission with anxiolytic effects comparable to benzodiazepines — without tolerance, dependence, or sedation. Influences noradrenaline, serotonin, and dopamine.',
          'It is one of the few substances combining anxiolytic with psychostimulant/antiasthenic effects — reduces anxiety without causing drowsiness.',
        ],
      },
      {
        heading: 'Human vs animal research',
        paragraphs: [
          'An important distinction: the level of scientific evidence varies significantly across peptides. Some (like tirzepatide or tesamorelin) have been studied in human clinical trials or developed into approved medications. Others are still in earlier stages — primarily studied in animal models.',
          'For example, MOTS-c and BPC-157 have generated significant interest based on promising findings in animal studies — metabolism, tissue repair, cellular signaling. However, large-scale human clinical trials evaluating their safety and long-term effects are still limited.',
          'Animal studies provide valuable insights into biological mechanisms, but results observed in animals do not always translate directly to humans. For this reason, peptides primarily supported by preclinical research should be approached with an additional level of caution.',
        ],
      },
    ],
  },
];
