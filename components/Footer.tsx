// components/Footer.tsx
'use client';

import Link from 'next/link';
import { FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa6';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/frames_and_fera/',
      icon: <FaInstagram className="w-5 h-5" />,
    },
    {
      label: 'YouTube',
      href: 'https://youtube.com/',
      icon: <FaYoutube className="w-5 h-5" />,
    },
    {
      label: 'WhatsApp',
      href: 'https://wa.me/919876543210',
      icon: <FaWhatsapp className="w-5 h-5" />,
    },
  ];

  return (
    <footer className="w-full bg-brand-bg text-brand-text border-t border-brand-accent/40 font-sans antialiased">
      {/* Social Coordinates */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 py-6">
        <ul className="flex items-center justify-center gap-8 sm:gap-12">
          {socialLinks.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="inline-flex items-center justify-center p-2 rounded-full text-brand-text/75 hover:text-brand-text hover:scale-110 transition-all duration-200"
              >
                {item.icon}
                <span className="sr-only">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Legal & Copyright */}
      <div className="border-t border-brand-accent/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] uppercase tracking-[0.2em] text-brand-text/50">
          <p>© {currentYear} Frames and Fera. All rights reserved.</p>
          <p className="font-serif italic capitalize tracking-normal text-xs text-brand-text/70">
            Real Moments. Real Emotions.
          </p>
        </div>
      </div>
    </footer>
  );
}