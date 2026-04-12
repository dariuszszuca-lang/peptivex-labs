import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface BlogPost {
  slug: string;
  title_pl: string;
  title_en: string;
  excerpt_pl: string;
  excerpt_en: string;
  date: string;
  category: string;
  readTime: number;
}

const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'what-are-peptides',
    title_pl: 'Czym są peptydy? Kompletny przewodnik',
    title_en: 'What Are Peptides? A Complete Guide',
    excerpt_pl: 'Peptydy to krótkie łańcuchy aminokwasów, które pełnią kluczowe funkcje w organizmie. Dowiedz się, czym różnią się od białek, jak działają i jakie mają zastosowania w nauce.',
    excerpt_en: 'Peptides are short chains of amino acids that play crucial roles in the body. Learn how they differ from proteins, how they work, and their applications in science.',
    date: '2026-04-12',
    category: 'Education',
    readTime: 8,
  },
  {
    slug: 'bpc-157-research-overview',
    title_pl: 'BPC-157 — przegląd badań naukowych',
    title_en: 'BPC-157 — Research Overview',
    excerpt_pl: 'BPC-157 to jeden z najszerzej badanych peptydów regeneracyjnych. Omawiamy aktualne wyniki badań przedklinicznych, mechanizm działania i potencjalne zastosowania.',
    excerpt_en: 'BPC-157 is one of the most widely studied regenerative peptides. We review current preclinical findings, mechanism of action, and potential applications.',
    date: '2026-04-10',
    category: 'Research',
    readTime: 12,
  },
  {
    slug: 'peptide-storage-guide',
    title_pl: 'Jak prawidłowo przechowywać peptydy?',
    title_en: 'How to Properly Store Peptides',
    excerpt_pl: 'Prawidłowe przechowywanie peptydów jest kluczowe dla zachowania ich stabilności i aktywności. Temperatura, światło, wilgotność — co musisz wiedzieć.',
    excerpt_en: 'Proper peptide storage is critical for maintaining stability and activity. Temperature, light, humidity — what you need to know.',
    date: '2026-04-08',
    category: 'Guide',
    readTime: 5,
  },
];

export default function BlogPage() {
  const { lang } = useLanguage();
  const pl = lang === 'pl';

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-white text-3xl font-extrabold mb-4">Blog</h1>
      <p className="text-white/50 mb-12">
        {pl
          ? 'Artykuły naukowe, przewodniki i aktualności ze świata peptydów badawczych.'
          : 'Scientific articles, guides, and news from the world of research peptides.'
        }
      </p>

      <div className="flex flex-col gap-6">
        {BLOG_POSTS.map(post => (
          <Link
            key={post.slug}
            to={`/${lang}/blog/${post.slug}`}
            className="group bg-white/[0.03] border border-white/[0.08] rounded-xl p-6 hover:border-amber-500/30 transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 uppercase tracking-wide font-semibold">
                {post.category}
              </span>
              <span className="text-white/30 text-xs flex items-center gap-1">
                <Calendar size={11} /> {post.date}
              </span>
              <span className="text-white/30 text-xs">
                {post.readTime} min {pl ? 'czytania' : 'read'}
              </span>
            </div>
            <h2 className="text-white text-lg font-bold mb-2 group-hover:text-amber-400 transition-colors">
              {pl ? post.title_pl : post.title_en}
            </h2>
            <p className="text-white/40 text-sm leading-relaxed mb-3">
              {pl ? post.excerpt_pl : post.excerpt_en}
            </p>
            <span className="text-amber-500 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              {pl ? 'Czytaj więcej' : 'Read more'} <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>

      {/* Coming soon note */}
      <div className="text-center mt-12 text-white/20 text-sm">
        {pl ? 'Więcej artykułów wkrótce.' : 'More articles coming soon.'}
      </div>
    </div>
  );
}
