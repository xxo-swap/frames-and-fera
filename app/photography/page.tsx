'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { clients } from '@/data/client';

export default function PhotographyPage() {
  const photoClients = useMemo(
    () =>
      clients.filter(
        (c) =>
          (c.services?.includes('Photography') || c.hasPhotoGallery) &&
          c.events &&
          c.events.length > 0
      ),
    []
  );

  return (
    <div className="my-16 w-full min-h-screen bg-brand-bg text-brand-text px-6 py-12 md:px-12 md:py-20 max-w-7xl mx-auto space-y-12">
      <header className="border-b border-brand-accent/40 pb-8 space-y-4">
        <span className="font-sans text-xs uppercase tracking-[0.3em] text-brand-text/60">
          Visual Archives
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal uppercase tracking-tight">
          Photography and <span className="italic font-light">&amp; More</span>
        </h1>
      </header>

      <div className="flex flex-col divide-y divide-brand-accent/30">
        {photoClients.map((client, idx) => {
          const year = client.date ? new Date(client.date).getFullYear() : '2026';
          const isReversed = idx % 2 !== 0;
          const serviceLabel = client.services?.includes('Wedding Film')
            ? 'Film & Photo'
            : 'Photography';

          return (
            <div
              key={client.slug}
              className="group py-12 md:py-20 first:pt-0 last:pb-0"
            >
              <Link
                href={`/portfolio/${client.slug}`}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center cursor-pointer"
              >
                {/* 1. Dynamic Natural-Aspect Image Frame */}
                <div
                  className={`w-full lg:col-span-7 flex ${
                    isReversed ? 'lg:order-2 justify-end' : 'lg:order-1 justify-start'
                  }`}
                >
                  <div className="relative w-fit max-w-full overflow-hidden bg-brand-accent/10 border border-brand-accent/30 transition-colors duration-500 group-hover:border-brand-accent">
                    <Image
                      src={client.featuredCover}
                      alt={`${client.coupleNames} Wedding at ${client.venue}`}
                      width={0}
                      height={0}
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority={idx === 0}
                      className="w-auto h-auto max-w-full max-h-[75vh] object-contain block transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />

                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] bg-brand-bg/90 backdrop-blur-sm border border-brand-accent/30 text-brand-text">
                        {serviceLabel}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 z-10 px-2.5 py-1 text-[10px] uppercase tracking-widest text-brand-text bg-brand-bg/90 backdrop-blur-sm border border-brand-accent/30">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                  </div>
                </div>

                {/* 2. Editorial Metadata & Context */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-between self-center py-2 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between font-sans text-xs uppercase tracking-[0.25em] text-brand-text/60">
                      <span>{client.location}</span>
                      <span>{year}</span>
                    </div>

                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight text-brand-text group-hover:italic transition-all leading-[1.05]">
                      {client.coupleNames}
                    </h2>

                    <p className="font-sans text-xs text-brand-text/50 uppercase tracking-widest leading-relaxed">
                      {client.events?.map((e) => e.name).join(' • ') || client.venue}
                    </p>
                  </div>

                  <div className="pt-8 lg:pt-14">
                    <span className="inline-flex items-center gap-3 font-sans text-xs uppercase tracking-[0.25em] text-brand-text border-b border-brand-text/80 pb-1 group-hover:border-brand-accent transition-colors">
                      View Story Framing
                      <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {photoClients.length === 0 && (
        <div className="py-20 text-center">
          <p className="font-serif text-2xl italic text-brand-text/60">
            No photography archives found.
          </p>
        </div>
      )}
    </div>
  );
}