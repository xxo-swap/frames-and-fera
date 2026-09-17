// components/InstagramFeedStrip.tsx
import Image from 'next/image';
import Link from 'next/link';

interface FeedFrame {
  id: string;
  src: string;
  alt: string;
  coupleNames: string;
  href: string;
}

const feedFrames: FeedFrame[] = [
  {
    id: '1',
    src: '/clients/vasu-simar/eng/004.webp',
    alt: 'Simar & Vasu wedding',
    coupleNames: 'Simar & Vasu',
    href: '/portfolio/vasu-simar',
  },
  {
    id: '2',
    src: '/clients/vasu-simar/hal/009.webp',
    alt: 'Vasu & Simar haldi details',
    coupleNames: 'Simar & Vasu',
    href: '/portfolio/vasu-simar',
  },
  {
    id: '3',
    src: '/clients/rishabh-aishwarya/wed/011.webp',
    alt: 'Rishabh & Aishwarya mandap ceremony',
    coupleNames: 'Rishabh & Aishwarya',
    href: '/portfolio/rishabh-aishwarya',
  },
  {
    id: '4',
    src: '/clients/rishabh-aishwarya/hal/021.webp',
    alt: 'Rishabh & Aishwarya haldi details',
    coupleNames: 'Rishabh & Aishwarya',
    href: '/portfolio/rishabh-aishwarya',
  },
  {
    id: '5',
    src: '/clients/nitin-parika/hal/010.webp',
    alt: 'Nitin & Parika ceremony walk',
    coupleNames: 'Nitin & Parika',
    href: '/portfolio/nitin-parika',
  },
  {
    id: '6',
    src: '/clients/nitin-parika/hal/037.webp',
    alt: 'Nitin & Parika outdoor portraits',
    coupleNames: 'Nitin & Parika',
    href: '/portfolio/nitin-parika',
  },
];

export default function InstagramFeedStrip() {
  const instagramHandle = '@frames_and_fera';
  const instagramUrl = 'https://www.instagram.com/frames_and_fera/';

  return (
    <section className="w-full bg-brand-bg text-brand-text py-12 px-6 sm:px-10 antialiased selection:bg-brand-accent/20">
      {/* Top Editorial Bar */}
      <div className="max-w-7xl mx-auto flex  font-quote flex-col sm:flex-row gap-2 items-center justify-between pb-8 text-[16px] sm:text-xs uppercase tracking-[0.15em] text-brand-text/60">
        <span>Follow us on Instagram</span>
        <a
          href={instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="hover:text-brand-text text-xs  font-serif transition-colors duration-200 "
        >
          {instagramHandle}
        </a>
      </div>

      {/* Static 6-Image Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4">
        {feedFrames.map((frame) => (
          <Link
            key={frame.id}
            href={frame.href}
            className="group relative aspect-square overflow-hidden bg-brand-accent/5 block"
          >
            <Image
              src={frame.src}
              alt={frame.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Subtle Hover Overlay */}
            <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3 text-center">
              <span className="font-serif italic text-white text-xs sm:text-sm tracking-normal">
                {frame.coupleNames}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}