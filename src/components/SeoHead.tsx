import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';

interface SeoHeadProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  schema?: object;
}

export default function SeoHead({ title, description, path, image, schema }: SeoHeadProps) {
  const { lang } = useLanguage();
  const altLang = lang === 'pl' ? 'en' : 'pl';
  const altPath = path.replace(`/${lang}`, `/${altLang}`);
  const fullUrl = `https://peptivexlabs.com${path}`;
  const altUrl = `https://peptivexlabs.com${altPath}`;
  const ogImage = image || 'https://peptivexlabs.com/images/products/retatrutide-box-front.jpg';

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title} | PEPTIVEX LABS</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      <link rel="alternate" hrefLang={lang} href={fullUrl} />
      <link rel="alternate" hrefLang={altLang} href={altUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
}
