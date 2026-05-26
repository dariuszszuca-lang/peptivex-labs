import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { BLOG_POSTS } from '../data/blogPosts';
import SeoHead from '../components/SeoHead';

export default function BlogPostPage() {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const pl = lang === 'pl';
  const es = lang === 'es';

  const post = BLOG_POSTS.find(p => p.slug === slug) as any;
  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center text-[#737373]">
        {pl ? 'Artykuł nie znaleziony.' : es ? 'Artículo no encontrado.' : 'Article not found.'}
      </div>
    );
  }

  const title = pl ? post.title_pl : es ? (post.title_es || post.title_en) : post.title_en;
  const sections = pl ? post.sections_pl : es ? (post.sections_es || post.sections_en) : post.sections_en;
  const excerpt = pl ? post.excerpt_pl : es ? (post.excerpt_es || post.excerpt_en) : post.excerpt_en;

  return (
    <div className="relative">
      <SeoHead
        title={title}
        description={excerpt}
        path={`/${lang}/blog/${post.slug}`}
        image={`https://peptivexlabs.com${post.heroImage}`}
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Article',
              headline: title,
              description: excerpt,
              image: `https://peptivexlabs.com${post.heroImage}`,
              datePublished: post.date,
              dateModified: post.date,
              author: { '@type': 'Organization', name: 'PEPTIVEX LABS', url: 'https://peptivexlabs.com' },
              publisher: { '@type': 'Organization', name: 'PEPTIVEX LABS', logo: { '@type': 'ImageObject', url: 'https://peptivexlabs.com/favicon.png' } },
              inLanguage: lang,
              articleSection: post.category,
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: pl ? 'Strona główna' : 'Home', item: `https://peptivexlabs.com/${lang}` },
                { '@type': 'ListItem', position: 2, name: 'Blog', item: `https://peptivexlabs.com/${lang}/blog` },
                { '@type': 'ListItem', position: 3, name: title, item: `https://peptivexlabs.com/${lang}/blog/${post.slug}` },
              ],
            },
          ],
        }}
      />
      {/* Hero banner */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img src={post.heroImage} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-3xl mx-auto px-4 pb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#fff7ed] text-[#ea580c] uppercase tracking-wide font-semibold">
              {post.category}
            </span>
            <span className="text-[#737373] text-xs flex items-center gap-1"><Calendar size={11} /> {post.date}</span>
            <span className="text-[#737373] text-xs flex items-center gap-1"><Clock size={11} /> {post.readTime} min</span>
          </div>
          <h1 className="text-white text-2xl sm:text-3xl font-extrabold">{title}</h1>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4 py-10">
        <Link to={`/${lang}/blog`} className="inline-flex items-center gap-1.5 text-[#737373] hover:text-[#525252] text-sm mb-8 transition-colors">
          <ArrowLeft size={14} /> {pl ? 'Wszystkie artykuły' : 'All articles'}
        </Link>

        <div className="flex flex-col gap-10">
          {sections.map((section: any, i: number) => (
            <section key={i}>
              {section.heading && (
                <h2 className="text-white text-xl font-bold mb-4">{section.heading}</h2>
              )}
              {section.image && (
                <div className="rounded-xl overflow-hidden border border-[#ececec] mb-5">
                  <img src={section.image} alt={section.heading || ''} className="w-full h-48 sm:h-64 object-cover" />
                </div>
              )}
              {section.paragraphs.map((p: string, j: number) => (
                <p key={j} className="text-[#525252] text-[15px] leading-[1.8] mb-4">{p}</p>
              ))}
              {section.list && (
                <ul className="flex flex-col gap-2 mb-4 ml-1">
                  {section.list.map((item: string, k: number) => (
                    <li key={k} className="text-[#525252] text-[15px] leading-[1.7] flex gap-2">
                      <span className="text-[#ea580c] mt-1 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-[#fafaf7] border border-[#ececec] rounded-xl p-6 text-center">
          <p className="text-white font-semibold mb-2">
            {pl ? 'Szukasz peptydów badawczych?' : 'Looking for research peptides?'}
          </p>
          <p className="text-[#737373] text-sm mb-4">
            {pl ? 'Sprawdź nasz katalog — czystość >98%, szybka dostawa InPost.' : 'Check our catalog — >98% purity, fast InPost delivery.'}
          </p>
          <Link to={`/${lang}/products`} className="inline-flex items-center gap-2 bg-[#ea580c] text-white font-bold px-6 py-2.5 rounded-xl hover:bg-[#c2410c] transition-all text-sm">
            {pl ? 'Zobacz produkty' : 'Browse Products'}
          </Link>
        </div>
      </article>
    </div>
  );
}
