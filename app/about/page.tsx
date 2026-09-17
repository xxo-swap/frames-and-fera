'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
  {
    name: 'Aarav Sharma',
    role: 'Lead Cinematographer & Director',
    image: '/aarav.webp', // Replace with your image path
    instagram: '@aarav.frames',
    instagramUrl: 'https://instagram.com',
    journey:
      'Trained in documentary motion and analog film archives. Aarav started capturing unscripted street stories before bringing 16mm motion, Super 8 grain, and deliberate, quiet pacing to weddings worldwide.',
  },
  {
    name: 'Meera Sen',
    role: 'Principal Photographer',
    image: '/meera.webp', // Replace with your image path
    instagram: '@meera.analog',
    instagramUrl: 'https://instagram.com',
    journey:
      'With a background in editorial portraiture and fine art, Meera works with medium format analog cameras and organic light, prioritizing the subtle, fleeting in-between moments over stiff poses.',
  },
];

export default function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Narrative fade up
      if (narrativeRef.current) {
        gsap.fromTo(
          narrativeRef.current,
          { y: 25, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: narrativeRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      // Member profiles stagger
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { y: 35, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // CTA bottom reveal
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { y: 20, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 90%',
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
      className="relative w-full bg-brand-bg text-brand-text py-24 sm:py-64 border-t border-brand-accent/30 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14">
        {/* Header & Shared Ethos */}
        <div
          ref={narrativeRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-brand-accent/20 pb-16 mb-16"
        >
          <div className="lg:col-span-5">
            <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-brand-text/60 block mb-3">
              The Duo &bull; Frames &amp; Fera
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl uppercase tracking-tight font-normal">
              Meet The Visionaries
            </h2>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-end space-y-4">
            <p className="font-serif italic text-lg sm:text-xl text-brand-text/90 leading-relaxed">
              &ldquo;We don&apos;t curate manufactured poses. We document the natural tempo, raw warmth, and quiet glances that outlast the day itself.&rdquo;
            </p>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-brand-text/60 leading-loose max-w-xl">
              From Delhi NCR to destination vows across the globe, our craft is grounded in analog sensitivity, 35mm film grain, and non-intrusive storytelling.
            </p>
          </div>
        </div>

        {/* Member Profiles Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16"
        >
          {TEAM.map((member, idx) => (
            <div key={idx} className="group space-y-6">
              {/* Member Portrait */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-brand-accent/10 border border-brand-accent/20">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center filter grayscale contrast-[1.05] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                />
                <div className="absolute top-4 right-4 bg-brand-bg/85 backdrop-blur-sm px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-brand-text/80 border border-brand-accent/20">
                  0{idx + 1}
                </div>
              </div>

              {/* Title & Instagram */}
              <div className="space-y-3 pt-2">
                <div className="flex items-baseline justify-between border-b border-brand-accent/20 pb-3">
                  <div>
                    <h3 className="font-serif text-2xl uppercase tracking-tight">
                      {member.name}
                    </h3>
                    <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-text/60 mt-0.5">
                      {member.role}
                    </p>
                  </div>

                  {/* Instagram Link */}
                  {/* <a
                    href={member.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-sans text-[10px] tracking-wider text-brand-text/70 hover:text-brand-accent transition-colors"
                  >
                    <span>{member.instagram}</span>
                    <svg
                      className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  </a> */}
                </div>

                {/* Journey & Practice */}
                <p className="font-sans text-xs text-brand-text/70 leading-relaxed font-light">
                  {member.journey}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Global CTA Banner to Inquiry */}
        <div
          ref={ctaRef}
          className="mt-20 sm:mt-28 pt-12 border-t border-brand-accent/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div>
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-brand-text/50 block mb-1">
              Limited Commissions
            </span>
            <p className="font-serif text-xl sm:text-2xl italic tracking-wide">
              Accepting celebrations for the upcoming seasons
            </p>
          </div>

          <Link
            href="/inquiry"
            className="px-8 py-4 border border-brand-text text-[11px] uppercase tracking-[0.25em] hover:bg-brand-text hover:text-brand-bg transition-all duration-300 whitespace-nowrap"
          >
            Inquire With The Team &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}