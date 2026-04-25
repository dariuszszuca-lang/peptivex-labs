import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import HexPattern from '../components/home/HexPattern';
import SeoHead from '../components/SeoHead';

export default function SuccessPage() {
  const { lang } = useLanguage();
  const { clearCart } = useCart();
  const [params] = useSearchParams();
  const sessionId = params.get('session_id');
  const pl = lang === 'pl';

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="relative overflow-hidden min-h-[70vh]">
      <SeoHead
        title={pl ? 'Dziękujemy za zamówienie' : 'Thank you for your order'}
        description=""
        path={`/${lang}/success`}
        noIndex
      />
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/[0.15] via-[#0c0a08] to-[#0c0a08]" />
      <HexPattern className="text-emerald-500/[0.03]" />

      <div className="max-w-2xl mx-auto px-4 py-20 relative z-10 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
          <CheckCircle2 size={40} className="text-emerald-400" />
        </div>

        <h1 className="text-white text-3xl sm:text-4xl font-extrabold mb-4">
          {pl ? 'Dziękujemy za zamówienie' : 'Thank you for your order'}
        </h1>

        <p className="text-white/50 text-base mb-8 max-w-md mx-auto leading-relaxed">
          {pl
            ? 'Płatność została zarejestrowana. Wysłaliśmy potwierdzenie na Twój adres e-mail. Status przesyłki otrzymasz w ciągu 24 godzin.'
            : 'Your payment has been registered. We sent a confirmation to your email. Shipping status follows within 24 hours.'
          }
        </p>

        {sessionId && (
          <div className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-full px-4 py-1.5 mb-8">
            <span className="text-white/40 text-xs uppercase tracking-wide">
              {pl ? 'ID zamówienia' : 'Order ID'}:
            </span>
            <span className="text-amber-400 text-xs font-mono">{sessionId.slice(-12)}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to={`/${lang}/products`}
            className="bg-amber-500 text-black font-bold px-6 py-3 rounded-xl hover:bg-amber-400 transition-colors inline-flex items-center justify-center gap-2 text-sm"
          >
            {pl ? 'Wróć do sklepu' : 'Continue shopping'}
            <ArrowRight size={14} />
          </Link>
          <a
            href="mailto:info@peptivexlabs.com"
            className="bg-white/[0.04] border border-white/[0.08] text-white/70 font-medium px-6 py-3 rounded-xl hover:bg-white/[0.07] transition-colors inline-flex items-center justify-center gap-2 text-sm"
          >
            <Mail size={14} />
            {pl ? 'Skontaktuj się' : 'Contact us'}
          </a>
        </div>
      </div>
    </div>
  );
}
