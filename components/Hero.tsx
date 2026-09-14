'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

export interface HeroSlide {
  src: string;
  coupleNames: string;
  location: string;
  venue: string;
  slug: string;
  alt?: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    src: '/clients/vasu-simar/wed/068.webp',
    coupleNames: 'Simar & Vasu',
    location: 'Jim Corbett, Uttarakhand',
    venue: 'Zana Luxury Resort',
    slug: 'vasu-simar',
    alt: 'Simar & Vasu Wedding Ceremony at Jim Corbett',
  },
  {
    src: '/clients/rishabh-aishwarya/wed/026.webp',
    coupleNames: 'Rishabh & Aishwarya',
    location: 'Bareilly, Uttar Pradesh',
    venue: 'The Grand Nirvana',
    slug: 'rishabh-aishwarya',
    alt: 'Rishabh & Aishwarya Vows at Bareilly',
  },
  {
    src: '/clients/karan-bani/wed/001.webp',
    coupleNames: 'Karan & Bani',
    location: 'Chhatarpur, New Delhi',
    venue: 'Amarai Farms',
    slug: 'karan-bani',
    alt: 'Karan & Bani Evening Celebrations in New Delhi',
  },
  {
    src: '/clients/manpreet-simran/wed/050.webp',
    coupleNames: 'Manpreet & Simran',
    location: 'Jim Corbett, Uttarakhand',
    venue: 'Zana Luxury Resort',
    slug: 'manpreet-simran',
    alt: 'Manpreet & Simran Sunset Moments',
  },
  {
    src: '/clients/nitin-parika/wed/002.webp',
    coupleNames: 'Nitin & Parika',
    location: 'Jim Corbett, Uttarakhand',
    venue: 'Zana Luxury Resort',
    slug: 'nitin-parika',
    alt: 'Nitin & Parika Wedding Moments',
  },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const outgoingSlideRef = useRef<HTMLDivElement>(null);
  const incomingSlideRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  // Entrance animation
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        carouselWrapperRef.current,
        { scale: 1.02, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 1.2, ease: 'power2.out' }
      ).fromTo(
        bottomBarRef.current ? Array.from(bottomBarRef.current.children) : [],
        { y: 16, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.08 },
        '-=0.5'
      );
    },
    { scope: heroRef }
  );

  // Crossfade slide transition
  useGSAP(
    () => {
      if (prevIndex === null) return;

      const tl = gsap.timeline();

      if (incomingSlideRef.current) {
        tl.fromTo(
          incomingSlideRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 1.1, ease: 'power2.inOut' },
          0
        );
      }

      if (outgoingSlideRef.current) {
        tl.to(
          outgoingSlideRef.current,
          { autoAlpha: 0, duration: 1.1, ease: 'power2.inOut' },
          0
        );
      }
    },
    { dependencies: [currentIndex], scope: heroRef }
  );

  const goToSlide = useCallback(
    (nextIdx: number) => {
      setPrevIndex(currentIndex);
      setCurrentIndex(nextIdx);
    },
    [currentIndex]
  );

  const nextSlide = useCallback(() => {
    if (HERO_SLIDES.length === 0) return;
    goToSlide((currentIndex + 1) % HERO_SLIDES.length);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    if (HERO_SLIDES.length === 0) return;
    goToSlide((currentIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    if (HERO_SLIDES.length <= 1) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const currentItem = HERO_SLIDES[currentIndex];
  const previousItem = prevIndex !== null ? HERO_SLIDES[prevIndex] : null;

  return (
    <section
      ref={heroRef}
      className="relative w-full aspect-[3/2] flex flex-col justify-end p-4 sm:p-8 md:p-14 lg:p-16 overflow-hidden bg-[#211102] text-brand-text"
    >
      {/* 1. Carousel Viewport */}
      <div
        ref={carouselWrapperRef}
        className="absolute inset-0 z-0 w-full h-full overflow-hidden select-none"
      >
        {/* Outgoing Slide */}
        {previousItem && (
          <div
            ref={outgoingSlideRef}
            className="absolute inset-0 z-0 w-full h-full will-change-[opacity]"
          >
            <Image
              src={previousItem.src}
              alt={previousItem.alt || previousItem.coupleNames}
              fill
              sizes="100vw"
              className="object-contain md:object-cover object-center"
            />
          </div>
        )}

        {/* Incoming Slide */}
        {currentItem && (
          <div
            key={`slide-${currentIndex}`}
            ref={incomingSlideRef}
            className="absolute inset-0 z-10 w-full h-full will-change-[opacity]"
          >
            <Image
              src={currentItem.src}
              alt={currentItem.alt || currentItem.coupleNames}
              fill
              priority={currentIndex === 0}
              sizes="100vw"
              className="object-contain md:object-cover object-center"
            />
          </div>
        )}

        {/* Ambient Dark Scrim */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#211102]/85 via-transparent to-[#211102]/40 pointer-events-none" />
      </div>

      {/* 2. Bottom HUD & Controls */}
      <div
        ref={bottomBarRef}
        className="relative z-30 w-full flex flex-row items-end justify-between gap-4 sm:gap-6 border-t border-brand-accent/40 pt-4 sm:pt-6  md:backdrop-blur-none p-3 sm:p-4 md:p-0"
      >
        {currentItem && (
          <div className="space-y-0.5 sm:space-y-1">
            <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-brand-accent">
              {currentItem.location}
            </span>
            <Link
              href={`/portfolio/${currentItem.slug}`}
              className="group flex items-center gap-2 font-serif text-[18px] sm:text-2xl md:text-3xl text-brand-bg font-light hover:text-brand-accent transition-colors"
            >
              <span>{currentItem.coupleNames}</span>
              <ArrowUpRight className="w-4 h-4 text-brand-bg transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-accent" />
            </Link>
            <p className="font-sans text-[9px] sm:text-xs text-brand-bg/60 tracking-wider">
              {currentItem.venue}
            </p>
          </div>
        )}

        <div className="w-auto flex flex-col sm:flex-row items-end sm:items-center justify-end gap-3 sm:gap-6">
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-brand-bg/70 tabular-nums">
            {String(currentIndex + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-9 h-9 sm:w-11 sm:h-11 border border-brand-accent/50 text-brand-bg hover:bg-brand-bg hover:text-brand-text hover:border-brand-bg flex items-center justify-center transition-all duration-200 cursor-pointer rounded-none"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-9 h-9 sm:w-11 sm:h-11 border border-brand-accent/50 text-brand-bg hover:bg-brand-bg hover:text-brand-text hover:border-brand-bg flex items-center justify-center transition-all duration-200 cursor-pointer rounded-none"
            >
              <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}