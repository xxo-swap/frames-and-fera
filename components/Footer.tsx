// components/Footer.tsx
'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { label: 'Instagram', href: 'https://instagram.com/' },
    { label: 'YouTube', href: 'https://youtube.com/' },
    { label: 'WhatsApp', href: 'https://wa.me/919876543210' },
  ];

  return (
    <footer className="w-full bg-brand-bg text-brand-text border-t border-brand-accent/40 font-sans antialiased">
      {/* Editorial Navigation & Coordinates */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 py-16">
        {/* Social Coordinates */}
        <div className="md:col-span-3 space-y-4">
          <ul className="flex sm:flex-row flex-col items-center justify-center gap-6 sm:gap-20">
            {socialLinks.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-brand-text/80 hover:text-brand-text hover:italic transition-all"
                >
                  {item.label}
                  <span className="text-[10px]">↗</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Legal & Copyright */}
      <div className="border-t border-brand-accent/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] uppercase tracking-[0.2em] text-brand-text/50">
          <p>© {currentYear} Frames &amp; Fera. All rights reserved.</p>
          <p className="font-serif italic capitalize tracking-normal text-xs text-brand-text/70">
            Real Moments. Real Emotions.
          </p>
        </div>
      </div>
    </footer>
  );
}