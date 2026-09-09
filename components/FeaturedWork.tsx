'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { clients } from '@/data/client';

export default function FeaturedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // Select the top two featured clients (e.g. Vasu & Simar, Karan & Bani)
  const featuredClients = clients.slice(0, 2);

  useGSAP(
    () => {
      gsap.fromTo(
        cardsRef.current,
        { y: 50, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="w-full px-6 py-16 md:px-12 md:py-28 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 pb-6 border-b border-brand-accent/40 gap-4">
        <div>
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-brand-text/60 block mb-2">
            Selected Portfolio
          </span>
          <h2 className="font-serif text-3xl md:text-5xl uppercase tracking-tight text-brand-text">
            Featured Stories
          </h2>
        </div>
        <Link
          href="/photography"
          className="font-sans text-xs uppercase tracking-[0.2em] text-brand-text hover:italic border-b border-brand-text w-fit py-1 transition-all"
        >
          View All Archives ({clients.length})
        </Link>
      </div>

      {/* Asymmetric 2-Column Work Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
        {featuredClients.map((client, idx) => {
          // Asymmetric editorial balance: 7-column primary hero, 5-column companion
          const colSpan = idx === 0 ? 'md:col-span-7' : 'md:col-span-5';
          const aspect = idx === 0 ? 'aspect-[4/5]' : 'aspect-[3/4]';
          const year = client.date ? new Date(client.date).getFullYear() : '2026';

          return (
            <div
              key={client.slug}
              ref={(el) => {
                if (el) cardsRef.current[idx] = el;
              }}
              className={`${colSpan} group cursor-pointer`}
            >
              <Link href={`/portfolio/${client.slug}`} className="block">
                {/* Image Frame */}
                <div
                  className={`relative w-full ${aspect} overflow-hidden bg-brand-accent/20 mb-4 border border-brand-accent/40`}
                >
                  <Image
                    src={client.featuredCover}
                    alt={client.coupleNames}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    priority={idx === 0}
                  />
                  <div className="absolute top-4 left-4 z-10 bg-brand-bg/85 backdrop-blur-sm px-3 py-1 font-sans text-[10px] uppercase tracking-widest text-brand-text border border-brand-accent/30">
                    0{idx + 1}
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-baseline justify-between pt-2">
                  <h3 className="font-serif text-xl md:text-2xl uppercase tracking-wide text-brand-text group-hover:italic transition-all">
                    {client.coupleNames}
                  </h3>
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-brand-text/60">
                    {client.location}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-1">
                  <p className="font-sans text-xs text-brand-text/50 uppercase tracking-widest">
                    {client.events.map((e) => e.name).join(' • ')}
                  </p>
                  <span className="font-sans text-[10px] text-brand-text/40 tracking-wider">
                    {year}
                  </span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}