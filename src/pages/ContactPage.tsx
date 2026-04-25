import { useState } from 'react';
import { Mail, Send, Clock, MessageCircle, Building2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import HexPattern from '../components/home/HexPattern';
import SeoHead from '../components/SeoHead';

export default function ContactPage() {
  const { lang } = useLanguage();
  const pl = lang === 'pl';
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div>
      <SeoHead
        title={pl ? 'Kontakt' : 'Contact'}
        description={pl
          ? 'Skontaktuj się z PEPTIVEX LABS — pytania o produkty, zamówienia, współpracę. Odpowiadamy w ciągu 24h w dni robocze.'
          : 'Contact PEPTIVEX LABS — questions about products, orders, partnerships. We respond within 24h on business days.'
        }
        path={`/${lang}/contact`}
      />
      {/* Hero */}
      <div className="relative overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/[0.1] via-[#0c0a08] to-[#0c0a08]" />
        <HexPattern className="text-amber-500/[0.03]" />
        <div className="absolute top-0 left-1/3 w-[250px] h-[250px] rounded-full bg-amber-500/[0.06] blur-[80px]" />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-3">{pl ? 'Kontakt' : 'Contact'}</p>
          <h1 className="text-white text-3xl sm:text-4xl font-extrabold mb-4">
            {pl ? <><span className="text-gradient">Napisz</span> do nas</> : <><span className="text-gradient">Get</span> in Touch</>}
          </h1>
          <p className="text-white/40 max-w-lg">
            {pl ? 'Masz pytanie o produkt, zamówienie lub współpracę? Odpowiadamy w ciągu 24h.' : 'Have a question about a product, order, or partnership? We respond within 24h.'}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact cards */}
          <div className="flex flex-col gap-4">
            {[
              { icon: Mail, title: 'Email', value: 'info@peptivexlabs.com', color: 'text-amber-400' },
              { icon: Clock, title: pl ? 'Czas odpowiedzi' : 'Response Time', value: pl ? 'Do 24h w dni robocze' : 'Within 24h on business days', color: 'text-emerald-400' },
              { icon: MessageCircle, title: 'Social', value: 'TikTok: @peptivexlabs', color: 'text-sky-400' },
              { icon: Building2, title: pl ? 'Adres' : 'Address', value: '4th Floor, The Featherstone Building, 66 City Road, London, EC1Y 2AL, UK', color: 'text-violet-400' },
            ].map((item, i) => (
              <div key={i} className="group why-card relative rounded-2xl overflow-hidden transition-all duration-300">
                <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-b from-amber-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-full h-full rounded-2xl bg-[#0e0c09]" />
                </div>
                <div className="relative z-10 p-5">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-3 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.1)] transition-all">
                    <item.icon size={18} className={item.color} />
                  </div>
                  <h3 className="text-white text-sm font-semibold mb-1">{item.title}</h3>
                  <p className="text-white/40 text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {sent ? (
              <div className="bg-gradient-to-r from-emerald-500/[0.08] to-transparent border border-emerald-500/20 rounded-2xl p-10 text-center shadow-[0_0_40px_rgba(34,197,94,0.06)]">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <span className="text-3xl">✓</span>
                </div>
                <h2 className="text-white text-xl font-bold mb-2">{pl ? 'Wiadomość wysłana!' : 'Message sent!'}</h2>
                <p className="text-white/50 text-sm">{pl ? 'Odpowiemy w ciągu 24 godzin.' : 'We\'ll respond within 24 hours.'}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative rounded-2xl overflow-hidden">
                <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-b from-amber-500/15 to-transparent">
                  <div className="w-full h-full rounded-2xl bg-[#0e0c09]" />
                </div>
                <div className="relative z-10 p-6 flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/30 text-xs uppercase tracking-wide mb-1.5 block">{pl ? 'Imię' : 'Name'}</label>
                      <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm focus:border-amber-500/40 focus:outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="text-white/30 text-xs uppercase tracking-wide mb-1.5 block">Email</label>
                      <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm focus:border-amber-500/40 focus:outline-none transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="text-white/30 text-xs uppercase tracking-wide mb-1.5 block">{pl ? 'Temat' : 'Subject'}</label>
                    <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm focus:border-amber-500/40 focus:outline-none transition-colors">
                      <option value="">{pl ? 'Wybierz temat' : 'Select subject'}</option>
                      <option value="order">{pl ? 'Pytanie o zamówienie' : 'Order inquiry'}</option>
                      <option value="product">{pl ? 'Pytanie o produkt' : 'Product question'}</option>
                      <option value="shipping">{pl ? 'Wysyłka i dostawa' : 'Shipping & delivery'}</option>
                      <option value="wholesale">{pl ? 'Współpraca / hurt' : 'Wholesale / partnership'}</option>
                      <option value="other">{pl ? 'Inne' : 'Other'}</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-white/30 text-xs uppercase tracking-wide mb-1.5 block">{pl ? 'Wiadomość' : 'Message'}</label>
                    <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm focus:border-amber-500/40 focus:outline-none transition-colors resize-none" />
                  </div>
                  <button type="submit" className="cta-primary bg-amber-500 text-black font-bold py-3.5 rounded-xl hover:bg-amber-400 transition-all flex items-center justify-center gap-2 text-sm">
                    <Send size={16} />
                    {pl ? 'Wyślij wiadomość' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
