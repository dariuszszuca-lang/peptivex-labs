import { useState, useEffect } from 'react';
import { Mail, X, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const STORAGE_KEY = 'px-payment-notice-dismissed';
const ORDERS_EMAIL = 'orders@peptivexlabs.com';

export default function PaymentNotice() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    setVisible(false);
  };

  if (!visible) return null;

  const pl = lang === 'pl';
  const es = lang === 'es';

  const subject = pl ? 'Zamówienie Peptivex Labs' : es ? 'Solicitud de pedido de Peptivex Labs' : 'Peptivex Labs order request';
  const body = pl
    ? `Witam,\n\nChciałbym zamówić poniższe produkty:\n\n- (uzupełnij produkty z koszyka, ilości, dawki)\n\nProszę o link do płatności.\n\nDzięki!\n`
    : `Hi,\n\nI'd like to place an order for:\n\n- (please list the products you'd like, with quantities and dosages)\n\nKindly send me a payment link.\n\nThanks!\n`;
  const mailto = `mailto:${ORDERS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <div className="bg-[#fff7ed] border-b border-[#fed7aa]">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <AlertCircle size={16} className="text-[#ea580c] shrink-0" />
          <p className="text-[#7c2d12] text-[13px] leading-snug truncate sm:whitespace-normal">
            <span className="font-semibold mr-1">
              {pl ? 'Płatności online czasowo niedostępne.' : es ? 'Pagos en línea temporalmente no disponibles.' : 'Online payments temporarily unavailable.'}
            </span>
            <span className="text-[#9a3412] hidden sm:inline">
              {pl
                ? 'Złóż zamówienie mailowo, wyślemy link do płatności w 24h.'
                : "Place your order via email, we'll send a payment link within 24h."}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={mailto}
            className="inline-flex items-center gap-1.5 bg-[#ea580c] text-white text-[12px] font-semibold px-3 py-1.5 rounded-md hover:bg-[#c2410c] transition-colors whitespace-nowrap"
          >
            <Mail size={13} />
            {pl ? 'Zamów mailem' : es ? 'Pedido por correo electrónico' : 'Order by email'}
          </a>
          <button
            onClick={dismiss}
            className="text-[#c2410c]/60 hover:text-[#c2410c] p-1 transition-colors"
            aria-label={pl ? 'Zamknij' : es ? 'Cerrar' : 'Close'}
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
