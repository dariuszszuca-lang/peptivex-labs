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
  const es = lang === 'es';
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
        className="fixed bottom-4 left-4 z-50 w-10 h-10 bg-white border border-[#ececec] rounded-full flex items-center justify-center hover:border-[#fed7aa] hover:scale-110 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.08)] group"
        title={pl ? 'Ustawienia cookies' : es ? 'Configuración de cookies' : 'Cookie settings'}
      >
        <Cookie size={16} className="text-[#737373] group-hover:text-[#ea580c] transition-colors" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="cookie-banner bg-white border border-[#ececec] rounded-2xl shadow-[0_-10px_50px_rgba(0,0,0,0.08)] overflow-hidden">
          {/* Header */}
          <div className="p-5 pb-3 flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#fff7ed] border border-[#fed7aa] flex items-center justify-center shrink-0">
                <Cookie size={16} className="text-[#ea580c]" />
              </div>
              <div>
                <h3 className="text-[#0a0a0a] font-bold text-sm">
                  {pl ? 'Szanujemy Twoją prywatność' : es ? 'Respetamos su privacidad' : 'We Respect Your Privacy'}
                </h3>
                <p className="text-[#737373] text-xs flex items-center gap-1 mt-0.5">
                  <Shield size={10} /> GDPR / RODO
                </p>
              </div>
            </div>
            <button onClick={rejectOptional} className="text-[#a3a3a3] hover:text-[#525252] transition-colors shrink-0 mt-1">
              <X size={16} />
            </button>
          </div>

          {/* Description */}
          <div className="px-5 pb-3">
            <p className="text-[#525252] text-[13px] leading-relaxed">
              {pl ? 'Używamy plików cookies, aby zapewnić prawidłowe działanie sklepu (koszyk, wybór języka). Opcjonalnie wykorzystujemy cookies funkcjonalne i analityczne, aby poprawić Twoje doświadczenie na stronie.' : es ? 'Utilizamos cookies para asegurar el correcto funcionamiento de la tienda (carrito, selección de idioma). Opcionalmente, utilizamos cookies funcionales y analíticas para mejorar su experiencia en el sitio.' : 'We use cookies to ensure proper store operation (cart, language selection). Optionally, we use functional and analytics cookies to improve your experience on the site.'
              }
            </p>
          </div>

          {/* Details toggle */}
          <div className="px-5">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-[#ea580c] hover:text-[#c2410c] text-xs font-semibold flex items-center gap-1 transition-colors mb-3"
            >
              {pl ? 'Szczegóły cookies' : es ? 'Detalles de las cookies' : 'Cookie details'}
              {showDetails ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          </div>

          {/* Cookie categories (expandable) */}
          {showDetails && (
            <div className="px-5 pb-4 flex flex-col gap-2">
              {/* Necessary */}
              <div className="flex items-center justify-between p-3 bg-[#fafaf7] rounded-lg border border-[#ececec]">
                <div>
                  <p className="text-[#0a0a0a] text-xs font-semibold">{pl ? 'Niezbędne' : es ? 'Necesarias' : 'Necessary'}</p>
                  <p className="text-[#737373] text-[11px]">{pl ? 'Koszyk, język, sesja. Zawsze aktywne.' : es ? 'Carrito, idioma, sesión. Siempre activas.' : 'Cart, language, session. Always active.'}</p>
                </div>
                <div className="w-9 h-5 bg-[#fff7ed] border border-[#fed7aa] rounded-full flex items-center justify-end px-0.5">
                  <div className="w-3.5 h-3.5 bg-[#ea580c] rounded-full" />
                </div>
              </div>

              {/* Functional */}
              <label className="flex items-center justify-between p-3 bg-[#fafaf7] rounded-lg border border-[#ececec] cursor-pointer hover:border-[#d4d4d4] transition-colors">
                <div>
                  <p className="text-[#0a0a0a] text-xs font-semibold">{pl ? 'Funkcjonalne' : es ? 'Funcionales' : 'Functional'}</p>
                  <p className="text-[#737373] text-[11px]">{pl ? 'Zapamiętywanie preferencji, ostatnio oglądane.' : es ? 'Recordar preferencias, productos vistos recientemente.' : 'Remembering preferences, recently viewed.'}</p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.functional}
                  onChange={e => setPreferences({ ...preferences, functional: e.target.checked })}
                  className="accent-[#ea580c] w-4 h-4"
                />
              </label>

              {/* Analytics */}
              <label className="flex items-center justify-between p-3 bg-[#fafaf7] rounded-lg border border-[#ececec] cursor-pointer hover:border-[#d4d4d4] transition-colors">
                <div>
                  <p className="text-[#0a0a0a] text-xs font-semibold">{pl ? 'Analityczne' : es ? 'Analíticas' : 'Analytics'}</p>
                  <p className="text-[#737373] text-[11px]">{pl ? 'Anonimowe statystyki odwiedzin i zachowań.' : es ? 'Estadísticas anónimas de visita y comportamiento.' : 'Anonymous visit and behavior statistics.'}</p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={e => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="accent-[#ea580c] w-4 h-4"
                />
              </label>
            </div>
          )}

          {/* Buttons */}
          <div className="p-5 pt-2 flex flex-col sm:flex-row gap-2">
            <button
              onClick={acceptAll}
              className="flex-1 bg-[#ea580c] text-white font-bold py-2.5 rounded-xl hover:bg-[#c2410c] transition-all text-sm"
            >
              {pl ? 'Akceptuję wszystkie' : es ? 'Aceptar todas' : 'Accept All'}
            </button>
            {showDetails ? (
              <button
                onClick={acceptSelected}
                className="flex-1 bg-white border border-[#ececec] text-[#1a1a1a] font-medium py-2.5 rounded-xl hover:border-[#d4d4d4] transition-all text-sm"
              >
                {pl ? 'Zapisz wybrane' : es ? 'Guardar seleccionadas' : 'Save Selected'}
              </button>
            ) : (
              <button
                onClick={rejectOptional}
                className="flex-1 bg-white border border-[#ececec] text-[#525252] font-medium py-2.5 rounded-xl hover:border-[#d4d4d4] transition-all text-sm"
              >
                {pl ? 'Tylko niezbędne' : es ? 'Solo necesarias' : 'Necessary Only'}
              </button>
            )}
          </div>

          {/* Legal links */}
          <div className="px-5 pb-4 flex items-center justify-center gap-4">
            <a href={`/${lang}/privacy`} className="text-[#737373] hover:text-[#1a1a1a] text-[11px] transition-colors">
              {pl ? 'Polityka prywatności' : es ? 'Política de privacidad' : 'Privacy Policy'}
            </a>
            <span className="text-[#d4d4d4]">|</span>
            <a href={`/${lang}/terms`} className="text-[#737373] hover:text-[#1a1a1a] text-[11px] transition-colors">
              {pl ? 'Regulamin' : es ? 'Términos' : 'Terms'}
            </a>
            <span className="text-[#d4d4d4]">|</span>
            <a href={`/${lang}/legal`} className="text-[#737373] hover:text-[#1a1a1a] text-[11px] transition-colors">
              {pl ? 'Nota prawna' : es ? 'Aviso legal' : 'Legal Notice'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
