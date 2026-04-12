import { useState } from 'react';
import { Mail, Send, Clock, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import HexPattern from '../components/home/HexPattern';

export default function ContactPage() {
  const { lang } = useLanguage();
  const pl = lang === 'pl';

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate with Resend API via Firebase Function
    setSent(true);
  };

  return (
    <div>
      {/* Header */}
      <div className="relative overflow-hidden section-warm py-16">
        <HexPattern className="text-amber-500/[0.02]" />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-3">{pl ? 'Kontakt' : 'Contact'}</p>
          <h1 className="text-white text-3xl font-extrabold mb-4">
            {pl ? 'Napisz do nas' : 'Get in Touch'}
          </h1>
          <p className="text-white/50 max-w-xl">
            {pl
              ? 'Masz pytanie dotyczące produktu, zamówienia lub współpracy? Odpowiadamy w ciągu 24h.'
              : 'Have a question about a product, order, or partnership? We respond within 24h.'
            }
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="flex flex-col gap-4">
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-5">
            <Mail size={18} className="text-amber-500 mb-3" />
            <h3 className="text-white text-sm font-semibold mb-1">Email</h3>
            <p className="text-white/40 text-sm">info@peptivexlabs.com</p>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-5">
            <Clock size={18} className="text-amber-500 mb-3" />
            <h3 className="text-white text-sm font-semibold mb-1">
              {pl ? 'Czas odpowiedzi' : 'Response Time'}
            </h3>
            <p className="text-white/40 text-sm">
              {pl ? 'Do 24 godzin w dni robocze' : 'Within 24 hours on business days'}
            </p>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-5">
            <MessageCircle size={18} className="text-amber-500 mb-3" />
            <h3 className="text-white text-sm font-semibold mb-1">
              {pl ? 'Social media' : 'Social Media'}
            </h3>
            <p className="text-white/40 text-sm">TikTok: @peptivexlabs</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          {sent ? (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-8 text-center">
              <div className="text-4xl mb-4">✓</div>
              <h2 className="text-white text-xl font-bold mb-2">
                {pl ? 'Wiadomość wysłana!' : 'Message sent!'}
              </h2>
              <p className="text-white/50 text-sm">
                {pl ? 'Odpowiemy w ciągu 24 godzin.' : 'We\'ll respond within 24 hours.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-6 flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-wide mb-1.5 block">
                    {pl ? 'Imię' : 'Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm focus:border-amber-500/40 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-wide mb-1.5 block">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm focus:border-amber-500/40 focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="text-white/40 text-xs uppercase tracking-wide mb-1.5 block">
                  {pl ? 'Temat' : 'Subject'}
                </label>
                <select
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm focus:border-amber-500/40 focus:outline-none transition-colors"
                >
                  <option value="">{pl ? 'Wybierz temat' : 'Select subject'}</option>
                  <option value="order">{pl ? 'Pytanie o zamówienie' : 'Order inquiry'}</option>
                  <option value="product">{pl ? 'Pytanie o produkt' : 'Product question'}</option>
                  <option value="shipping">{pl ? 'Wysyłka i dostawa' : 'Shipping & delivery'}</option>
                  <option value="wholesale">{pl ? 'Współpraca / hurt' : 'Wholesale / partnership'}</option>
                  <option value="other">{pl ? 'Inne' : 'Other'}</option>
                </select>
              </div>
              <div>
                <label className="text-white/40 text-xs uppercase tracking-wide mb-1.5 block">
                  {pl ? 'Wiadomość' : 'Message'}
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm focus:border-amber-500/40 focus:outline-none transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="bg-amber-500 text-black font-semibold py-3 rounded-lg hover:bg-amber-400 transition-colors flex items-center justify-center gap-2"
              >
                <Send size={16} />
                {pl ? 'Wyślij wiadomość' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
