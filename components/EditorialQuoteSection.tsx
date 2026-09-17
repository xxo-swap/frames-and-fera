'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function EditorialQuoteSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const quoteRef = useRef<HTMLHeadingElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Split child words for staggered cinematic reveal
      const words = quoteRef.current?.querySelectorAll('.reveal-word');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%', // Fires once as user scrolls down without scrubbing
          toggleActions: 'play none none none',
          once: true,
        },
        defaults: { ease: 'power3.out' },
      });

      tl.fromTo(
        badgeRef.current,
        { autoAlpha: 0, y: 15 },
        { autoAlpha: 1, y: 0, duration: 0.8 }
      )
        .fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: 'center' },
          { scaleX: 1, duration: 1, ease: 'power2.inOut' },
          '-=0.4'
        )
        .fromTo(
          words || [],
          { autoAlpha: 0, y: 28, rotateX: -15 },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.045,
            ease: 'power3.out',
          },
          '-=0.6'
        )
        .fromTo(
          authorRef.current,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          '-=0.3'
        )
        .fromTo(
          signatureRef.current,
          { autoAlpha: 0, scale: 0.92, rotate: -2 },
          { autoAlpha: 1, scale: 1, rotate: 0, duration: 1.1, ease: 'power2.out' },
          '-=0.5'
        );
    },
    { scope: sectionRef }
  );

  const quoteText =
    '“We do not remember days, we remember moments. In photography, the heart and the eye become one to capture what time will eventually steal.”';

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-brand-bg text-brand-text py-28 sm:py-36 md:py-44 px-6 sm:px-12 md:px-24 overflow-hidden border-b border-brand-accent/20 flex flex-col items-center justify-center text-center select-none"
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.04)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Subtle Category Kicker */}
        <span
          ref={badgeRef}
          className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-brand-text/60 mb-6 block font-sans"
        >
          Fine Art Philosophy
        </span>

        {/* Accent Divider Line */}
        <div
          ref={lineRef}
          className="w-16 h-[1px] bg-brand-accent/50 mb-3 sm:mb-14"
        />

        {/* Main Quote */}
        <h2
          ref={quoteRef}
          className="font-quote font-light text-2xl sm:text-3xl md:text-5xl leading-[1.35] sm:leading-[1.3] text-brand-text tracking-tight "
          style={{ perspective: '800px' }}
        >
          {quoteText.split(' ').map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="reveal-word inline-block mr-[0.28em] will-change-transform font-quote"
            >
              {word}
            </span>
          ))}
        </h2>

        {/* Real Quote Attribution & Signature */}
        <div className="mt-8 sm:mt-16 flex flex-col items-center gap-3">
          <div ref={authorRef} className="space-y-1">
            <p className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.25em] text-brand-text/80 font-medium">
              Cesare Pavese
            </p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-brand-text/50">
              Italian Poet &amp; Novelist
            </p>
          </div>

          {/* Editorial Calligraphic Signature Accent */}
          <p
            ref={signatureRef}
            className="font-serif italic text-3xl sm:text-4xl text-brand-accent/80 pt-3 select-none will-change-transform"
            style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
          >
            Frames and Fera
          </p>
        </div>
      </div>
    </section>
  );
}