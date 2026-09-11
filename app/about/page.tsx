'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  {
    num: '01',
    title: 'Unscripted Emotion',
    desc: 'Honoring raw, spontaneous cadence and intimate rituals over rigid, mechanical choreography.',
  },
  {
    num: '02',
    title: 'Medium Agnostic',
    desc: 'Weaving analog 35mm rolls, textured Super 8 reels, and modern high-fidelity cinema glass into one sensory tapestry.',
  },
  {
    num: '03',
    title: 'Considered Presence',
    desc: 'Limiting commissions across the subcontinent and destinations worldwide to preserve complete creative devotion.',
  },
];

export default function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Subtle parallax drift on the primary editorial image
      if (portraitRef.current) {
        gsap.to(portraitRef.current.querySelector('img'), {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: portraitRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Staggered text reveal
      if (narrativeRef.current) {
        gsap.fromTo(
          narrativeRef.current.children,
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: narrativeRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Tenets reveal
      if (valuesRef.current) {
        gsap.fromTo(
          valuesRef.current.children,
          { y: 24, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: valuesRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-brand-bg text-brand-text px-6 py-20 sm:px-10 sm:py-28 md:px-14 md:py-36 border-t border-brand-accent/40 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        {/* Top Section Metadata */}
        <div className="flex items-center justify-between border-b border-brand-accent pb-6">
          <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-brand-text/70">
            About the Atelier
          </span>
          <div className="flex items-center gap-4 text-[11px] font-sans uppercase tracking-[0.25em]">
            <a
              href="https://instagram.com/frames_and_fera"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-text/80 hover:text-brand-text transition-colors"
            >
              @frames_and_fera ↗
            </a>
            <span className="text-brand-accent hidden sm:inline">|</span>
            <span className="text-brand-text/50 hidden sm:inline">
              Est. 2026 — India &amp; Beyond
            </span>
          </div>
        </div>

        {/* Narrative & Visual Grid */}
        <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Editorial Visual */}
          <div className="lg:col-span-5 space-y-6">
            <div
              ref={portraitRef}
              className="relative aspect-[4/5] w-full overflow-hidden bg-brand-accent/20"
            >
              <Image
                src="/duo.webp"
                alt="Frames & Fera visual documentation"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover scale-105 will-change-transform"
              />
              <div className="absolute inset-0 bg-brand-text/10 mix-blend-multiply" />
            </div>

            <div className="flex items-center justify-between font-sans text-[10px] uppercase tracking-[0.25em] text-brand-text/60">
              <span>Directorial Vision</span>
              <span>35mm / Super 8 / Digital</span>
            </div>
          </div>

          {/* Narrative Content */}
          <div ref={narrativeRef} className="lg:col-span-7 space-y-8 lg:pl-6">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light leading-[1.05] tracking-tight">
              Honoring stillness, kinetic heritage, and the <span className="italic">poetry</span> of human union.
            </h2>

            <div className="space-y-6 font-sans text-sm md:text-base leading-relaxed text-brand-text/80 max-w-2xl">
              <p>
                Founded in India in 2026, Frames &amp; Fera emerged from an obsession with cinematic honesty. We view union not as an orchestrated production to direct, but as a rich convergence of architecture, generational depth, and spontaneous emotional tension.
              </p>
              <p>
                Rooted across the subcontinent and traveling worldwide, our collective documents celebrations from within the cadence of the room—quietly suspending unscripted moments between light, shadow, and movement.
              </p>
            </div>

            {/* Direct Links */}
            <div className="flex flex-wrap items-center gap-8 pt-4">
              
           
            </div>
          </div>
        </div>

        {/* Core Principles */}
        <div
          ref={valuesRef}
          className="mt-24 grid grid-cols-1 gap-8 border-t border-brand-accent pt-12 md:grid-cols-3"
        >
          {VALUES.map((item) => (
            <div key={item.num} className="space-y-3">
              <span className="font-serif text-2xl text-brand-text/40">{item.num}</span>
              <h3 className="font-serif text-2xl tracking-wide">{item.title}</h3>
              <p className="font-sans text-xs leading-relaxed text-brand-text/75">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}