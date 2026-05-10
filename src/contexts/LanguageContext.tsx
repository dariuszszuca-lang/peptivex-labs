import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import type { Lang, Currency, ShippingRegion } from '../types';

interface Translations {
  [key: string]: string | Translations;
}

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  currency: Currency;
  region: ShippingRegion;
  t: (key: string) => string;
  formatPrice: (priceInSmallest: number) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const SUPPORTED_LANGS: Lang[] = ['pl', 'en', 'es'];

function isLang(v: string): v is Lang {
  return (SUPPORTED_LANGS as string[]).includes(v);
}

function readUrlLang(): Lang | null {
  if (typeof window === 'undefined') return null;
  const seg = window.location.pathname.split('/')[1];
  return isLang(seg) ? seg : null;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [lang, setLangState] = useState<Lang>(() => {
    const fromUrl = readUrlLang();
    if (fromUrl) return fromUrl;
    const saved = localStorage.getItem('px-lang');
    return saved && isLang(saved) ? saved : 'en';
  });
  const [translations, setTranslations] = useState<Translations>({});

  // URL is the source of truth — sync lang state with URL prefix on every route change
  useEffect(() => {
    const seg = location.pathname.split('/')[1];
    if (isLang(seg) && seg !== lang) {
      setLangState(seg);
      localStorage.setItem('px-lang', seg);
    }
  }, [location.pathname, lang]);

  const currency: Currency = lang === 'pl' ? 'PLN' : lang === 'es' ? 'EUR' : 'GBP';
  const region: ShippingRegion = lang === 'pl' ? 'pl' : lang === 'es' ? 'es' : 'uk';

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem('px-lang', newLang);
  };

  useEffect(() => {
    fetch(`/locales/${lang}.json`)
      .then(r => r.json())
      .then(setTranslations)
      .catch(() => {});
  }, [lang]);

  const t = (key: string): string => {
    const parts = key.split('.');
    let val: string | Translations = translations;
    for (const p of parts) {
      if (typeof val === 'object' && val !== null && p in val) {
        val = val[p];
      } else {
        return key;
      }
    }
    return typeof val === 'string' ? val : key;
  };

  const formatPrice = (priceInSmallest: number): string => {
    if (currency === 'PLN') {
      return `${(priceInSmallest / 100).toFixed(2)} zł`;
    }
    if (currency === 'EUR') {
      return `€${(priceInSmallest / 100).toFixed(2)}`;
    }
    return `£${(priceInSmallest / 100).toFixed(2)}`;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, currency, region, t, formatPrice }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be inside LanguageProvider');
  return ctx;
}
