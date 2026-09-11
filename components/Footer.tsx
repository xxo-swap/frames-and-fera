// components/Footer.tsx
'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Photography', href: '/photography' },
    { label: 'Films', href: '/films' },
    { label: 'About', href: '/about' },
    { label: 'Inquire', href: '/inquiry' },
  ];

  const socialLinks = [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'YouTube', href: 'https://youtube.com' },
    { label: 'WhatsApp', href: 'https://wa.me/919876543210' },
  ];

  return (
    <footer className="w-full bg-brand-bg text-brand-text border-t border-brand-accent/40 font-sans antialiased">
      {/* Top CTA Band */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 pt-20 pb-16 border-b border-brand-accent/20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="space-y-4 max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-text/60 block">
              Commissions &amp; Bookings
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[0.95]">
              Let’s archive your <span className="italic font-light">story</span>.
            </h2>
            <p className="text-sm text-brand-text/70 leading-relaxed pt-2">
              Available across India &amp; worldwide destination celebrations. Now accepting inquiries for {currentYear} / {currentYear + 1}.
            </p>
          </div>

          <div>
            <Link
              href="/inquiry"
              className="inline-flex items-center gap-3 px-8 py-4 bg-brand-text text-brand-bg text-xs uppercase tracking-[0.25em] hover:bg-brand-text/85 transition-colors cursor-pointer"
            >
              Start an Inquiry
              <span className="text-sm">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Editorial Navigation & Coordinates */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Identity & Location */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl tracking-wider uppercase font-light">
                Frames &amp; Fera
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-brand-text/70 max-w-sm">
              Flat No-F6-G09, Centurion Park Terrace Home, Techzone-IV, Greater Noida West, Gautam Buddha Nagar, Uttar Pradesh 201306
            </p>
            <div className="pt-2">
              <a
                href="mailto:hello@framesandfera.in"
                className="font-serif text-base underline underline-offset-4 decoration-brand-accent/60 hover:decoration-brand-text transition-colors"
              >
                hello@framesandfera.in
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-text/50 block">
              Navigation
            </span>
            <ul className="space-y-3">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-xs uppercase tracking-[0.2em] text-brand-text/80 hover:text-brand-text hover:italic transition-all"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Coordinates */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-text/50 block">
              Social Archives
            </span>
            <ul className="space-y-3">
              {socialLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-brand-text/80 hover:text-brand-text hover:italic transition-all"
                  >
                    {item.label}
                    <span className="text-[10px]">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
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