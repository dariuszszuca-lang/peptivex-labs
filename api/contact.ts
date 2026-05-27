import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

const FROM_EMAIL = 'PEPTIVEX LABS <orders@peptivexlabs.com>';
const ADMIN_EMAIL = 'info@peptivexlabs.com';

type Lang = 'pl' | 'en' | 'es';

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  lang?: Lang;
}

const SUBJECT_LABELS: Record<string, Record<Lang, string>> = {
  order: { pl: 'Pytanie o zamówienie', en: 'Order inquiry', es: 'Consulta de pedido' },
  product: { pl: 'Pytanie o produkt', en: 'Product question', es: 'Pregunta sobre un producto' },
  shipping: { pl: 'Wysyłka i dostawa', en: 'Shipping & delivery', es: 'Envío y entrega' },
  wholesale: { pl: 'Współpraca / hurt', en: 'Wholesale / partnership', es: 'Venta al por mayor / asociación' },
  other: { pl: 'Inne', en: 'Other', es: 'Otro' },
};

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[c] || c));
}

function buildAdminEmail(data: ContactPayload): { subject: string; html: string; text: string } {
  const lang = data.lang || 'pl';
  const subjectLabel = data.subject
    ? (SUBJECT_LABELS[data.subject]?.[lang] || data.subject)
    : '—';
  const message = escapeHtml(data.message).replace(/\n/g, '<br>');

  const subject = `Kontakt: ${subjectLabel} — ${data.name}`;

  const html = `<!doctype html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0c0a08;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#fff;">
  <div style="max-width:560px;margin:0 auto;padding:32px 16px;">
    <div style="background:#141210;border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:32px;">
      <div style="font-size:24px;font-weight:800;letter-spacing:0.05em;margin-bottom:24px;">
        <span style="color:#2dd4bf;">P</span><span style="color:#f59e0b;">X</span> PEPTIVEX LABS
      </div>
      <h1 style="font-size:22px;font-weight:800;color:#fff;margin:0 0 12px 0;">Nowa wiadomość ze strony</h1>
      <p style="color:rgba(255,255,255,0.6);font-size:14px;line-height:1.6;margin:0 0 24px 0;">
        Klient wysłał wiadomość przez formularz kontaktowy. Aby odpowiedzieć, użyj przycisku „Odpowiedz" — Reply-To jest ustawione na adres klienta.
      </p>

      <div style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
        <div style="color:rgba(255,255,255,0.4);font-size:12px;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">Imię</div>
        <div style="color:#fff;font-size:15px;font-weight:600;">${escapeHtml(data.name)}</div>
      </div>
      <div style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
        <div style="color:rgba(255,255,255,0.4);font-size:12px;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">Email</div>
        <div style="color:#fff;font-size:15px;font-weight:600;"><a href="mailto:${escapeHtml(data.email)}" style="color:#f59e0b;text-decoration:none;">${escapeHtml(data.email)}</a></div>
      </div>
      <div style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
        <div style="color:rgba(255,255,255,0.4);font-size:12px;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">Temat</div>
        <div style="color:#fff;font-size:15px;font-weight:600;">${escapeHtml(subjectLabel)}</div>
      </div>
      <div style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
        <div style="color:rgba(255,255,255,0.4);font-size:12px;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">Język</div>
        <div style="color:#fff;font-size:15px;font-weight:600;">${lang.toUpperCase()}</div>
      </div>

      <div style="margin-top:20px;padding:16px;background:rgba(255,255,255,0.03);border-radius:8px;border-left:3px solid #f59e0b;">
        <div style="color:rgba(255,255,255,0.4);font-size:12px;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px;">Wiadomość</div>
        <div style="color:#fff;font-size:14px;line-height:1.65;">${message}</div>
      </div>
    </div>
    <p style="color:rgba(255,255,255,0.3);font-size:12px;text-align:center;margin-top:24px;">
      PEPTIVEXLABS LTD · Company number 17178009 · 66 Paul Street, London, EC2A 4NA, UK
    </p>
  </div>
</body></html>`;

  const text = `Nowa wiadomość ze strony PEPTIVEX LABS

Imię: ${data.name}
Email: ${data.email}
Temat: ${subjectLabel}
Język: ${lang.toUpperCase()}

Wiadomość:
${data.message}

---
Aby odpowiedzieć, użyj przycisku "Odpowiedz" (Reply-To = ${data.email})
PEPTIVEXLABS LTD · Company number 17178009`;

  return { subject, html, text };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('[contact] RESEND_API_KEY not set');
    return res.status(500).json({ error: 'email_not_configured' });
  }

  const body = req.body as Partial<ContactPayload>;

  // Basic validation
  if (!body.name || typeof body.name !== 'string' || body.name.trim().length < 2) {
    return res.status(400).json({ error: 'invalid_name' });
  }
  if (!body.email || typeof body.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return res.status(400).json({ error: 'invalid_email' });
  }
  if (!body.message || typeof body.message !== 'string' || body.message.trim().length < 5) {
    return res.status(400).json({ error: 'invalid_message' });
  }
  if (body.message.length > 5000) {
    return res.status(400).json({ error: 'message_too_long' });
  }

  const payload: ContactPayload = {
    name: body.name.trim().slice(0, 120),
    email: body.email.trim().toLowerCase(),
    subject: (body.subject || '').trim().slice(0, 40),
    message: body.message.trim(),
    lang: (body.lang === 'en' || body.lang === 'es') ? body.lang : 'pl',
  };

  const mail = buildAdminEmail(payload);

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      replyTo: payload.email,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
    });

    if (error) {
      console.error('[contact] resend error:', error);
      return res.status(502).json({ error: 'send_failed', detail: error.message });
    }

    return res.status(200).json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'unknown';
    console.error('[contact] handler error:', message);
    return res.status(500).json({ error: 'internal_error' });
  }
}
