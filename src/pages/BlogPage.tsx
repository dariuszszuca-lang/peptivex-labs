import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { BLOG_POSTS } from '../data/blogPosts';
import HexPattern from '../components/home/HexPattern';
import SeoHead from '../components/SeoHead';

export default function BlogPage() {
  const { lang } = useLanguage();
  const pl = lang === 'pl';

  return (
    <div>
      <SeoHead
        title={pl ? 'Blog — Wiedza o peptydach' : 'Blog — Peptide Knowledge'}
        description={pl
          ? 'Artykuły, protokoły badawcze i przewodniki o peptydach badawczych: BPC-157, Retatrutide, NAD+, GHK-Cu i innych.'
          : 'Articles, research protocols and guides about research peptides: BPC-157, Retatrutide, NAD+, GHK-Cu and more.'
        }
        path={`/${lang}/blog`}
      />
      {/* Header with background */}
      <div className="relative overflow-hidden section-warm py-16">
        <HexPattern className="text-amber-500/[0.02]" />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-3">Blog</p>
          <h1 className="text-white text-3xl font-extrabold mb-4">
            {pl ? 'Wiedza o peptydach' : 'Peptide Knowledge'}
          </h1>
          <p className="text-white/50 max-w-lg">
            {pl
              ? 'Artykuły naukowe, przewodniki i aktualności ze świata peptydów badawczych.'
              : 'Scientific articles, guides, and news from the world of research peptides.'
            }
          </p>
        </div>
      </div>

      {/* Articles */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex flex-col gap-6">
          {BLOG_POSTS.map(post => (
            <Link
              key={post.slug}
              to={`/${lang}/blog/${post.slug}`}
              className="group bg-white/[0.03] border border-white/[0.08] rounded-xl overflow-hidden hover:border-amber-500/20 transition-all flex flex-col sm:flex-row"
            >
              {/* Thumbnail */}
              <div className="sm:w-60 h-48 sm:h-auto shrink-0 overflow-hidden">
                <img
                  src={post.heroImage}
                  alt={pl ? post.title_pl : post.title_en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 uppercase tracking-wide font-semibold">
                      {post.category}
                    </span>
                    <span className="text-white/30 text-xs flex items-center gap-1">
                      <Calendar size={11} /> {post.date}
                    </span>
                    <span className="text-white/30 text-xs flex items-center gap-1">
                      <Clock size={11} /> {post.readTime} min
                    </span>
                  </div>
                  <h2 className="text-white text-lg font-bold mb-2 group-hover:text-amber-400 transition-colors">
                    {pl ? post.title_pl : post.title_en}
                  </h2>
                  <p className="text-white/40 text-sm leading-relaxed line-clamp-2">
                    {pl ? post.excerpt_pl : post.excerpt_en}
                  </p>
                </div>
                <span className="text-amber-500 text-sm flex items-center gap-1 mt-4 group-hover:gap-2 transition-all">
                  {pl ? 'Czytaj więcej' : 'Read more'} <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
