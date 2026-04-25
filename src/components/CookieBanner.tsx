import { useState, useEffect } from 'react';
import { Cookie, X, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function updateConsent(analytics: boolean, functional: boolean) {
  if (typeof window === 'undefined' || !window.dataLayer) return;
  // Use dataLayer directly to ensure it works even if gtag is not exposed globally
  window.dataLayer.push(['consent', 'update', {
    analytics_storage: analytics ? 'granted' : 'denied',
    functionality_storage: functional ? 'granted' : 'denied',
    personalization_storage: functional ? 'granted' : 'denied',
  }]);
}

export default function CookieBanner() {
  const { lang } = useLanguage();
  const pl = lang === 'pl';
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: true,
    analytics: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('px-cookie-consent');
    if (!consent) {
      // Small delay so it doesn't flash on load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('px-cookie-consent', JSON.stringify({ necessary: true, functional: true, analytics: true, date: new Date().toISOString() }));
    updateConsent(true, true);
    setVisible(false);
  };

  const acceptSelected = () => {
    localStorage.setItem('px-cookie-consent', JSON.stringify({ ...preferences, date: new Date().toISOString() }));
    updateConsent(preferences.analytics, preferences.functional);
    setVisible(false);
  };

  const rejectOptional = () => {
    localStorage.setItem('px-cookie-consent', JSON.stringify({ necessary: true, functional: false, analytics: false, date: new Date().toISOString() }));
    updateConsent(false, false);
    setVisible(false);
  };

  const reopenBanner = () => {
    setVisible(true);
  };

  // Floating cookie icon (when banner is closed)
  if (!visible) {
    return (
      <button
        onClick={reopenBanner}
        className="fixed bottom-4 left-4 z-50 w-10 h-10 bg-[#13110f]/90 backdrop-blur-xl border border-amber-500/20 rounded-full flex items-center justify-center hover:border-amber-500/40 hover:scale-110 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.4)] group"
        title={pl ? 'Ustawienia cookies' : 'Cookie settings'}
      >
        <Cookie size={16} className="text-amber-500/60 group-hover:text-amber-400 transition-colors" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="cookie-banner bg-[#13110f]/95 backdrop-blur-xl border border-amber-500/15 rounded-2xl shadow-[0_-10px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(249,115,22,0.05)] overflow-hidden">
          {/* Header */}
          <div className="p-5 pb-3 flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                <Cookie size={16} className="text-amber-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">
                  {pl ? 'Szanujemy Twoją prywatność' : 'We Respect Your Privacy'}
                </h3>
                <p className="text-white/30 text-xs flex items-center gap-1 mt-0.5">
                  <Shield size={10} /> GDPR / RODO
                </p>
              </div>
            </div>
            <button onClick={rejectOptional} className="text-white/20 hover:text-white/40 transition-colors shrink-0 mt-1">
              <X size={16} />
            </button>
          </div>

          {/* Description */}
          <div className="px-5 pb-3">
            <p className="text-white/45 text-[13px] leading-relaxed">
              {pl
                ? 'Używamy plików cookies, aby zapewnić prawidłowe działanie sklepu (koszyk, wybór języka). Opcjonalnie wykorzystujemy cookies funkcjonalne i analityczne, aby poprawić Twoje doświadczenie na stronie.'
                : 'We use cookies to ensure proper store operation (cart, language selection). Optionally, we use functional and analytics cookies to improve your experience on the site.'
              }
            </p>
          </div>

          {/* Details toggle */}
          <div className="px-5">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-amber-500/60 hover:text-amber-400 text-xs flex items-center gap-1 transition-colors mb-3"
            >
              {pl ? 'Szczegóły cookies' : 'Cookie details'}
              {showDetails ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          </div>

          {/* Cookie categories (expandable) */}
          {showDetails && (
            <div className="px-5 pb-4 flex flex-col gap-2">
              {/* Necessary */}
              <div className="flex items-center justify-between p-3 bg-white/[0.03] rounded-lg border border-white/[0.06]">
                <div>
                  <p className="text-white text-xs font-medium">{pl ? 'Niezbędne' : 'Necessary'}</p>
                  <p className="text-white/30 text-[11px]">{pl ? 'Koszyk, język, sesja. Zawsze aktywne.' : 'Cart, language, session. Always active.'}</p>
                </div>
                <div className="w-9 h-5 bg-emerald-500/20 rounded-full flex items-center justify-end px-0.5">
                  <div className="w-4 h-4 bg-emerald-400 rounded-full" />
                </div>
              </div>

              {/* Functional */}
              <label className="flex items-center justify-between p-3 bg-white/[0.03] rounded-lg border border-white/[0.06] cursor-pointer hover:border-white/[0.1] transition-colors">
                <div>
                  <p className="text-white text-xs font-medium">{pl ? 'Funkcjonalne' : 'Functional'}</p>
                  <p className="text-white/30 text-[11px]">{pl ? 'Zapamiętywanie preferencji, ostatnio oglądane.' : 'Remembering preferences, recently viewed.'}</p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.functional}
                  onChange={e => setPreferences({ ...preferences, functional: e.target.checked })}
                  className="accent-amber-500 w-4 h-4"
                />
              </label>

              {/* Analytics */}
              <label className="flex items-center justify-between p-3 bg-white/[0.03] rounded-lg border border-white/[0.06] cursor-pointer hover:border-white/[0.1] transition-colors">
                <div>
                  <p className="text-white text-xs font-medium">{pl ? 'Analityczne' : 'Analytics'}</p>
                  <p className="text-white/30 text-[11px]">{pl ? 'Anonimowe statystyki odwiedzin i zachowań.' : 'Anonymous visit and behavior statistics.'}</p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={e => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="accent-amber-500 w-4 h-4"
                />
              </label>
            </div>
          )}

          {/* Buttons */}
          <div className="p-5 pt-2 flex flex-col sm:flex-row gap-2">
            <button
              onClick={acceptAll}
              className="flex-1 bg-amber-500 text-black font-bold py-2.5 rounded-xl hover:bg-amber-400 transition-all text-sm"
            >
              {pl ? 'Akceptuję wszystkie' : 'Accept All'}
            </button>
            {showDetails ? (
              <button
                onClick={acceptSelected}
                className="flex-1 bg-white/[0.06] border border-white/[0.1] text-white font-medium py-2.5 rounded-xl hover:bg-white/[0.1] transition-all text-sm"
              >
                {pl ? 'Zapisz wybrane' : 'Save Selected'}
              </button>
            ) : (
              <button
                onClick={rejectOptional}
                className="flex-1 bg-white/[0.06] border border-white/[0.1] text-white/60 font-medium py-2.5 rounded-xl hover:bg-white/[0.1] transition-all text-sm"
              >
                {pl ? 'Tylko niezbędne' : 'Necessary Only'}
              </button>
            )}
          </div>

          {/* Legal links */}
          <div className="px-5 pb-4 flex items-center justify-center gap-4">
            <a href={`/${lang}/privacy`} className="text-white/20 hover:text-white/40 text-[11px] transition-colors">
              {pl ? 'Polityka prywatności' : 'Privacy Policy'}
            </a>
            <span className="text-white/10">|</span>
            <a href={`/${lang}/terms`} className="text-white/20 hover:text-white/40 text-[11px] transition-colors">
              {pl ? 'Regulamin' : 'Terms'}
            </a>
            <span className="text-white/10">|</span>
            <a href={`/${lang}/legal`} className="text-white/20 hover:text-white/40 text-[11px] transition-colors">
              {pl ? 'Nota prawna' : 'Legal Notice'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
