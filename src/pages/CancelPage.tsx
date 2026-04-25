import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import HexPattern from '../components/home/HexPattern';
import SeoHead from '../components/SeoHead';

export default function CancelPage() {
  const { lang } = useLanguage();
  const pl = lang === 'pl';

  return (
    <div className="relative overflow-hidden min-h-[70vh]">
      <SeoHead
        title={pl ? 'Płatność anulowana' : 'Payment cancelled'}
        description=""
        path={`/${lang}/cancel`}
        noIndex
      />
      <div className="absolute inset-0 bg-gradient-to-b from-red-900/[0.1] via-[#0c0a08] to-[#0c0a08]" />
      <HexPattern className="text-red-500/[0.02]" />

      <div className="max-w-2xl mx-auto px-4 py-20 relative z-10 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
          <XCircle size={40} className="text-red-400" />
        </div>

        <h1 className="text-white text-3xl sm:text-4xl font-extrabold mb-4">
          {pl ? 'Płatność anulowana' : 'Payment cancelled'}
        </h1>

        <p className="text-white/50 text-base mb-8 max-w-md mx-auto leading-relaxed">
          {pl
            ? 'Twoje zamówienie nie zostało zrealizowane. Produkty pozostały w koszyku, możesz dokończyć zakup w dowolnym momencie.'
            : 'Your order was not completed. Items remain in your cart and you can complete the purchase anytime.'
          }
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to={`/${lang}/cart`}
            className="bg-amber-500 text-black font-bold px-6 py-3 rounded-xl hover:bg-amber-400 transition-colors inline-flex items-center justify-center gap-2 text-sm"
          >
            <ArrowLeft size={14} />
            {pl ? 'Wróć do koszyka' : 'Back to cart'}
          </Link>
          <Link
            to={`/${lang}/products`}
            className="bg-white/[0.04] border border-white/[0.08] text-white/70 font-medium px-6 py-3 rounded-xl hover:bg-white/[0.07] transition-colors inline-flex items-center justify-center gap-2 text-sm"
          >
            {pl ? 'Kontynuuj zakupy' : 'Continue shopping'}
          </Link>
        </div>
      </div>
    </div>
  );
}
