// src/app/layout.tsx
import type { Metadata } from 'next';
import { Cormorant_Garamond, Montserrat } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';

// Primary Editorial Font (Naman Verma style serif)
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
});

// Secondary Minimal Sans-Serif Font
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Frames and Fera | Cinematic Wedding Stories',
  description: 'Fine art wedding photography and films.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="antialiased bg-[#f3d0bc] text-[#211102] selection:bg-[#211102] selection:text-[#f3d0bc]">
        <Header />
        {children}
      </body>
    </html>
  );
}