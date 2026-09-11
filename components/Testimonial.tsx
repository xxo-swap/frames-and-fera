// components/Testimonials.tsx
'use client';

import { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { clients } from '@/data/client';

export default function Testimonials() {
  const testimonials = useMemo(() => {
    return clients.filter((c) => c.testimonial);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  const current = testimonials[currentIndex];

  useGSAP(
    () => {
      if (!quoteRef.current) return;
      gsap.fromTo(
        quoteRef.current,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    },
    { dependencies: [currentIndex], scope: containerRef }
  );

  if (!testimonials.length || !current) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      ref={containerRef}
      className="w-full bg-brand-bg text-brand-text px-6 py-16 sm:px-10 sm:py-20 md:px-16 md:py-28 border-t border-brand-accent/40 font-sans"
    >
      <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-brand-accent/30 pb-6 gap-4">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-text/60 block mb-2">
              Words From Our Couples
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight">
              Client <span className="italic font-light">Reflections</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-text/60 tabular-nums">
              {String(currentIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="w-10 h-10 border border-brand-accent/50 flex items-center justify-center text-xs hover:border-brand-text hover:bg-brand-text hover:text-brand-bg transition-colors cursor-pointer"
              >
                ←
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="w-10 h-10 border border-brand-accent/50 flex items-center justify-center text-xs hover:border-brand-text hover:bg-brand-text hover:text-brand-bg transition-colors cursor-pointer"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Editorial Layout */}
        <div ref={quoteRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-8 space-y-6">
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-[1.15] tracking-tight">
              “{current.testimonial?.quote}”
            </p>
            <p className="text-sm md:text-base leading-relaxed text-brand-text/80 max-w-2xl font-light pt-2">
              {current.testimonial?.narrative}
            </p>
          </div>

          <div className="lg:col-span-4 border-l border-brand-accent/30 pl-6 lg:pl-10 space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] uppercase tracking-[0.25em] text-brand-text/50">
                  Couple
                </span>
                <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-brand-accent/50 bg-brand-accent/15 text-brand-text/80">
                  <span className="text-[10px]">✓</span> Verified Story
                </span>
              </div>
              <Link
                href={`/portfolio/${current.slug}`}
                className="group inline-flex items-center gap-1.5 font-serif text-2xl md:text-3xl font-light hover:text-brand-accent transition-colors"
              >
                <span>{current.coupleNames}</span>
                <span className="text-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </Link>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-text/50 block">
                Venue &amp; Location
              </span>
              <p className="text-xs tracking-wider uppercase text-brand-text/80 mt-1">
                {current.venue}
              </p>
              <p className="text-xs text-brand-text/60 mt-0.5">
                {current.location}
              </p>
            </div>

            <div className="pt-1 flex flex-wrap gap-2">
              {current.services.map((service) => (
                <span
                  key={service}
                  className="inline-block px-3 py-1 text-[10px] uppercase tracking-[0.15em] border border-brand-accent/50 bg-brand-accent/10 rounded-full text-brand-text/90"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}