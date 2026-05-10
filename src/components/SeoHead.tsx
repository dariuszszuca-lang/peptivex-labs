import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';

interface SeoHeadProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  schema?: object;
  noIndex?: boolean;
}

export default function SeoHead({ title, description, path, image, schema, noIndex }: SeoHeadProps) {
  const { lang } = useLanguage();
  const allLangs: Array<'pl' | 'en' | 'es'> = ['pl', 'en', 'es'];
  const fullUrl = `https://peptivexlabs.com${path}`;
  const altUrls = allLangs
    .filter((l) => l !== lang)
    .map((l) => ({
      lang: l,
      url: `https://peptivexlabs.com${path.replace(`/${lang}`, `/${l}`)}`,
    }));
  const ogImage = image || 'https://peptivexlabs.com/images/products/retatrutide-box-front.jpg';
  const ogLocale = lang === 'pl' ? 'pl_PL' : lang === 'es' ? 'es_ES' : 'en_GB';

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title} | PEPTIVEX LABS</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {!noIndex && <link rel="canonical" href={fullUrl} />}
      {!noIndex && <link rel="alternate" hrefLang={lang} href={fullUrl} />}
      {!noIndex && altUrls.map((alt) => (
        <link key={alt.lang} rel="alternate" hrefLang={alt.lang} href={alt.url} />
      ))}
      {!noIndex && <link rel="alternate" hrefLang="x-default" href={`https://peptivexlabs.com${path.replace(`/${lang}`, '/en')}`} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={ogLocale} />
      {altUrls.map((alt) => (
        <meta key={`og-alt-${alt.lang}`} property="og:locale:alternate" content={alt.lang === 'pl' ? 'pl_PL' : alt.lang === 'es' ? 'es_ES' : 'en_GB'} />
      ))}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
}
