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
  const es = lang === 'es';

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="relative overflow-hidden min-h-[70vh]">
      <SeoHead
        title={pl ? 'Dziękujemy za zamówienie' : es ? 'Gracias por su pedido.' : 'Thank you for your order'}
        description=""
        path={`/${lang}/success`}
        noIndex
      />
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/[0.15] via-[#f5ebd9] to-[#f5ebd9]" />
      <HexPattern className="text-emerald-500/[0.03]" />

      <div className="max-w-2xl mx-auto px-4 py-20 relative z-10 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
          <CheckCircle2 size={40} className="text-emerald-400" />
        </div>

        <h1 className="text-[#0a0a0a] text-3xl sm:text-4xl font-extrabold mb-4">
          {pl ? 'Dziękujemy za zamówienie' : es ? 'Gracias por su pedido.' : 'Thank you for your order'}
        </h1>

        <p className="text-[#525252] text-base mb-8 max-w-md mx-auto leading-relaxed">
          {pl ? 'Płatność została zarejestrowana. Wysłaliśmy potwierdzenie na Twój adres e-mail. Status przesyłki otrzymasz w ciągu 24 godzin.' : es ? 'Su pago ha sido registrado. Hemos enviado una confirmación a su correo electrónico. El estado del envío se comunicará en las próximas 24 horas.' : 'Your payment has been registered. We sent a confirmation to your email. Shipping status follows within 24 hours.'
          }
        </p>

        {sessionId && (
          <div className="inline-flex items-center gap-2 bg-[#fafaf7] border border-[#ececec] rounded-full px-4 py-1.5 mb-8">
            <span className="text-[#737373] text-xs uppercase tracking-wide">
              {pl ? 'ID zamówienia' : es ? 'ID de pedido' : 'Order ID'}:
            </span>
            <span className="text-[#ea580c] text-xs font-mono">{sessionId.slice(-12)}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to={`/${lang}/products`}
            className="bg-[#ea580c] text-[#0a0a0a] font-bold px-6 py-3 rounded-xl hover:bg-[#c2410c] transition-colors inline-flex items-center justify-center gap-2 text-sm"
          >
            {pl ? 'Wróć do sklepu' : es ? 'Continuar comprando' : 'Continue shopping'}
            <ArrowRight size={14} />
          </Link>
          <a
            href="mailto:info@peptivexlabs.com"
            className="bg-[#fafaf7] border border-[#ececec] text-[#525252] font-medium px-6 py-3 rounded-xl hover:bg-white/[0.07] transition-colors inline-flex items-center justify-center gap-2 text-sm"
          >
            <Mail size={14} />
            {pl ? 'Skontaktuj się' : es ? 'Contáctenos' : 'Contact us'}
          </a>
        </div>
      </div>
    </div>
  );
}
