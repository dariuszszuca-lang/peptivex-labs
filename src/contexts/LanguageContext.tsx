import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('px-lang');
    return (saved === 'pl' || saved === 'en') ? saved : 'pl';
  });
  const [translations, setTranslations] = useState<Translations>({});

  const currency: Currency = lang === 'pl' ? 'PLN' : 'GBP';
  const region: ShippingRegion = lang === 'pl' ? 'pl' : 'uk';

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
