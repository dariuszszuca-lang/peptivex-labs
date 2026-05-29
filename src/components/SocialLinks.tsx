const INSTAGRAM_URL = 'https://www.instagram.com/peptivexlabs/';
const TIKTOK_URL = 'https://www.tiktok.com/@pepers337';

/** Instagram glyph (lucide dropped brand icons) */
function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

/** Official TikTok glyph (lucide has no TikTok icon) */
function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V8.65a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.08z" />
    </svg>
  );
}

interface SocialLinksProps {
  variant?: 'header' | 'footer';
}

export default function SocialLinks({ variant = 'header' }: SocialLinksProps) {
  if (variant === 'footer') {
    const items = [
      { label: 'Instagram', href: INSTAGRAM_URL, Icon: () => <InstagramIcon size={18} /> },
      { label: 'TikTok', href: TIKTOK_URL, Icon: () => <TikTokIcon size={18} /> },
    ];
    return (
      <div className="flex items-center gap-3">
        {items.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#ea580c] to-[#f59e0b] text-white shadow-[0_2px_8px_rgba(234,88,12,0.25)] hover:shadow-[0_4px_14px_rgba(234,88,12,0.45)] hover:scale-110 hover:rotate-3 transition-all duration-200"
          >
            <Icon />
          </a>
        ))}
      </div>
    );
  }

  // header variant — okrągłe przyciski spójne z lang switcherem
  const items = [
    { label: 'Instagram', href: INSTAGRAM_URL, Icon: () => <InstagramIcon size={17} /> },
    { label: 'TikTok', href: TIKTOK_URL, Icon: () => <TikTokIcon size={16} /> },
  ];
  return (
    <div className="flex items-center gap-1.5">
      {items.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className="relative w-9 h-9 rounded-full flex items-center justify-center text-[#525252] bg-white/60 border border-[#ececec] hover:text-white hover:bg-gradient-to-br hover:from-[#ea580c] hover:to-[#f59e0b] hover:border-transparent hover:shadow-[0_2px_8px_rgba(234,88,12,0.30)] hover:scale-110 transition-all duration-200"
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}
