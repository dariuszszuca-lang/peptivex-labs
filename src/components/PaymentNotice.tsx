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

  const subject = pl
    ? 'Zamówienie Peptivex Labs'
    : 'Peptivex Labs order request';
  const body = pl
    ? `Witam,\n\nChciałbym zamówić poniższe produkty:\n\n- (uzupełnij produkty z koszyka, ilości, dawki)\n\nProszę o link do płatności.\n\nDzięki!\n`
    : `Hi,\n\nI'd like to place an order for:\n\n- (please list the products you'd like, with quantities and dosages)\n\nKindly send me a payment link.\n\nThanks!\n`;
  const mailto = `mailto:${ORDERS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <div className="bg-amber-500/[0.08] border-b border-amber-500/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <AlertCircle size={16} className="text-amber-400 shrink-0" />
          <p className="text-amber-100/90 text-[13px] leading-snug truncate sm:whitespace-normal">
            <span className="font-semibold mr-1">
              {pl ? 'Płatności online czasowo niedostępne.' : 'Online payments temporarily unavailable.'}
            </span>
            <span className="text-amber-100/70 hidden sm:inline">
              {pl
                ? 'Złóż zamówienie mailowo, wyślemy link do płatności w 24h.'
                : "Place your order via email, we'll send a payment link within 24h."}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={mailto}
            className="inline-flex items-center gap-1.5 bg-amber-500 text-black text-[12px] font-semibold px-3 py-1.5 rounded-md hover:bg-amber-400 transition-colors whitespace-nowrap"
          >
            <Mail size={13} />
            {pl ? 'Zamów mailem' : 'Order by email'}
          </a>
          <button
            onClick={dismiss}
            className="text-amber-100/40 hover:text-amber-100/80 p-1 transition-colors"
            aria-label={pl ? 'Zamknij' : 'Close'}
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
