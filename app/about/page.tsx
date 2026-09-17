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
    role: 'Lead Cinematographer & Director',
    focus: 'Super 8, 35mm motion, and unscripted documentary pacing.',
  },
  {
    role: 'Principal Photographer',
    focus: 'Medium format analog, quiet portraits, and natural light frames.',
  },
];

export default function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (teamRef.current) {
        gsap.fromTo(
          teamRef.current.children,
          { y: 20, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: teamRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { y: 15, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
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
      className="relative w-full bg-brand-bg text-brand-text pt-24 pb-16 sm:pt-32 sm:pb-24 border-t border-brand-accent/40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14">
        {/* 1. Top Header */}
        <div className="border-b border-brand-accent/30 pb-6 mb-8 sm:mb-12">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-text/60 block mb-2">
            Frames &amp; Fera
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight font-normal">
            Meet The Team
          </h2>
        </div>

        {/* 2. Full Device-Width High-Resolution Image (No Cropping) */}
        <div className="space-y-2.5">
          <div className="relative w-full overflow-hidden bg-brand-accent/10 border border-brand-accent/30">
            <Image
              src="/duo.webp"
              alt="Frames & Fera Founders and Crew"
              width={2400}
              height={1600}
              quality={95}
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="w-full h-auto object-contain block"
            />
          </div>

          <div className="flex items-center justify-between font-sans text-[9px] uppercase tracking-[0.25em] text-brand-text/60 px-1">
            <span>On Location</span>
            <span>Analog &amp; Cinema Digital</span>
          </div>
        </div>

        {/* 3. About Them Breakdown */}
        <div
          ref={teamRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 border-t border-brand-accent/30 mt-12 sm:mt-16 pt-10"
        >
          {TEAM.map((member, idx) => (
            <div key={idx} className="space-y-2">
              <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-brand-text/40 block">
                0{idx + 1}
              </span>
              <h3 className="font-serif text-lg sm:text-xl uppercase tracking-tight text-brand-text">
                {member.role}
              </h3>
              <p className="font-sans text-[11px] uppercase tracking-wider text-brand-text/60 leading-relaxed max-w-md">
                {member.focus}
              </p>
            </div>
          ))}
        </div>

        {/* 4. Availability -> Route to Inquiry */}
        <div
          ref={ctaRef}
          className="border-t border-brand-accent/30 mt-12 sm:mt-16 pt-8 flex justify-end"
        >
          <Link
            href="/inquiry"
            className="inline-flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.25em] text-brand-text border-b border-brand-text/60 pb-1 hover:border-brand-accent hover:text-brand-accent transition-all"
          >
            Check Availability &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}