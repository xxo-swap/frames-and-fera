'use client';

import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { clients } from '@/data/client';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const outgoingSlideRef = useRef<HTMLDivElement>(null);
  const incomingSlideRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  const carouselSlides = useMemo(() => {
    return clients
      .filter((c) => c.hasPhotoGallery && c.events && c.events.length > 0)
      .flatMap((client) => {
        const allClientImages = client.events.flatMap((evt) => evt.images);
        return allClientImages.slice(0, 2).map((src, index) => ({
          src,
          coupleNames: client.coupleNames,
          location: client.location,
          venue: client.venue,
          slug: client.slug,
          alt: `${client.coupleNames} — Frame ${index + 1}`,
        }));
      });
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        headlineRef.current,
        { y: 24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1.1, delay: 0.1 }
      )
        .fromTo(
          carouselWrapperRef.current,
          { scale: 1.03, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 1.2, ease: 'power2.out' },
          '-=0.8'
        )
        .fromTo(
          bottomBarRef.current ? Array.from(bottomBarRef.current.children) : [],
          { y: 16, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.08 },
          '-=0.5'
        );
    },
    { scope: heroRef }
  );

  useGSAP(
    () => {
      if (prevIndex === null) return;

      const tl = gsap.timeline();

      if (incomingSlideRef.current) {
        tl.fromTo(
          incomingSlideRef.current,
          { autoAlpha: 0, scale: 1.02 },
          { autoAlpha: 1, scale: 1, duration: 1.3, ease: 'power2.inOut' },
          0
        );
      }

      if (outgoingSlideRef.current) {
        tl.to(
          outgoingSlideRef.current,
          { autoAlpha: 0, duration: 1.3, ease: 'power2.inOut' },
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
    if (carouselSlides.length === 0) return;
    goToSlide((currentIndex + 1) % carouselSlides.length);
  }, [carouselSlides.length, currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    if (carouselSlides.length === 0) return;
    goToSlide((currentIndex - 1 + carouselSlides.length) % carouselSlides.length);
  }, [carouselSlides.length, currentIndex, goToSlide]);

  useEffect(() => {
    if (carouselSlides.length <= 1) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [carouselSlides.length, nextSlide]);

  const currentItem = carouselSlides[currentIndex];
  const previousItem = prevIndex !== null ? carouselSlides[prevIndex] : null;

  return (
    <section
      ref={heroRef}
      className="relative w-full h-[100dvh] flex flex-col justify-end p-6 sm:p-10 md:p-14 lg:p-16 pt-28 sm:pt-32 md:pt-36 overflow-hidden bg-brand-bg text-brand-text"
    >
      {/* 1. Fullscreen Background Underneath Everything */}
      <div
        ref={carouselWrapperRef}
        className="absolute inset-0 z-0 w-full h-full overflow-hidden select-none"
      >
        {previousItem && (
          <div
            ref={outgoingSlideRef}
            className="absolute inset-0 z-0 will-change-[opacity,transform]"
          >
            <Image
              src={previousItem.src}
              alt={previousItem.alt}
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        )}

        {currentItem && (
          <div
            key={currentItem.src}
            ref={incomingSlideRef}
            className="absolute inset-0 z-10 will-change-[opacity,transform]"
          >
            <Image
              src={currentItem.src}
              alt={currentItem.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        )}

        {/* Brand Scrim Overlay */}
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-[#211102]/65 via-[#211102]/30 to-[#211102]/80 pointer-events-none" />
      </div>

      {/* 2. Top Headline (Sits cleanly beneath the overlay header) */}
      <div className="relative z-30 w-full max-w-4xl ">
       
        <h1
          ref={headlineRef}
          className="font-serif text-4xl italic sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[0.95] text-brand-bg tracking-tight"
        >
          Capturing <br /> Real<span className="italic font-light text-brand-accent"> Moments</span> <br />Real <span className="italic font-light text-brand-accent"> Emotions.</span> 
        </h1>
      </div>

      {/* 3. Bottom HUD & Carousel Controls */}
      <div
        ref={bottomBarRef}
        className="relative z-30 w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-t border-brand-accent/40 pt-6"
      >
        {currentItem && (
          <div className="space-y-1">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-brand-accent">
              {currentItem.location}
            </span>
            <Link
              href={`/portfolio/${currentItem.slug}`}
              className="group flex items-center gap-2 font-serif text-2xl sm:text-3xl text-brand-bg font-light hover:text-brand-accent transition-colors"
            >
              <span>{currentItem.coupleNames}</span>
              <span className="text-base transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Link>
            <p className="font-sans text-xs text-brand-bg/60 tracking-wider">
              {currentItem.venue}
            </p>
          </div>
        )}

        <div className="flex items-center gap-6">
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-brand-bg/70 tabular-nums">
            {String(currentIndex + 1).padStart(2, '0')} / {String(carouselSlides.length).padStart(2, '0')}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-11 h-11 border border-brand-accent/50 text-brand-bg hover:bg-brand-bg hover:text-brand-text hover:border-brand-bg flex items-center justify-center transition-all duration-200 cursor-pointer rounded-none"
            >
              ←
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-11 h-11 border border-brand-accent/50 text-brand-bg hover:bg-brand-bg hover:text-brand-text hover:border-brand-bg flex items-center justify-center transition-all duration-200 cursor-pointer rounded-none"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}