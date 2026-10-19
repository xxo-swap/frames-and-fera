// components/Hero.tsx
"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
    src: "/clients/vasu-simar/wed/068.webp",
    coupleNames: "Simar & Vasu",
    location: "Jim Corbett, Uttarakhand",
    venue: "Zana Luxury Resort",
    slug: "vasu-simar",
    alt: "Simar & Vasu Wedding Ceremony at Jim Corbett",
  },
  {
    src: "/clients/rishabh-aishwarya/wed/026.webp",
    coupleNames: "Rishabh & Aishwarya",
    location: "Bareilly, Uttar Pradesh",
    venue: "The Grand Nirvana",
    slug: "rishabh-aishwarya",
    alt: "Rishabh & Aishwarya Vows at Bareilly",
  },
  {
    src: "/clients/karan-bani/wed/001.webp",
    coupleNames: "Karan & Bani",
    location: "Chhatarpur, New Delhi",
    venue: "Amarai Farms",
    slug: "karan-bani",
    alt: "Karan & Bani Evening Celebrations in New Delhi",
  },
  {
    src: "/clients/manpreet-simran/wed/050.webp",
    coupleNames: "Manpreet & Simran",
    location: "Jim Corbett, Uttarakhand",
    venue: "Zana Luxury Resort",
    slug: "manpreet-simran",
    alt: "Manpreet & Simran Sunset Moments",
  },
  {
    src: "/clients/nitin-parika/wed/002.webp",
    coupleNames: "Nitin & Parika",
    location: "Jim Corbett, Uttarakhand",
    venue: "Zana Luxury Resort",
    slug: "nitin-parika",
    alt: "Nitin & Parika Wedding Moments",
  },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Entrance animation for content
  useGSAP(
    () => {
      gsap.fromTo(
        bottomBarRef.current ? Array.from(bottomBarRef.current.children) : [],
        { y: 15, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.08, ease: "power2.out" }
      );
    },
    { scope: heroRef }
  );

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Slide autoplay timer
  useEffect(() => {
    if (HERO_SLIDES.length <= 1) return;
    const interval = setInterval(nextSlide, 6500);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const currentItem = HERO_SLIDES[currentIndex];

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[calc(100svh-5rem)] mt-20 flex flex-col justify-end p-6 sm:p-10 md:p-14 overflow-hidden bg-[#211102] text-brand-text select-none"
    >
      {/* Visual Canvas Layer */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentIndex;
          const isNext = index === (currentIndex + 1) % HERO_SLIDES.length;

          // Mount only active and next slides to keep memory and bandwidth minimal
          if (!isActive && !isNext) return null;

          return (
            <div
              key={slide.src}
              className={`absolute inset-0 w-full h-full will-change-[opacity] transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt || slide.coupleNames}
                fill
                priority={index === 0}
                fetchPriority={index === 0 ? "high" : "auto"}
                loading={index === 0 ? "eager" : "lazy"}
                quality={75}
                sizes="(max-width: 768px) 100vw, (max-width: 1440px) 95vw, 1920px"
                className="object-cover object-center"
              />
            </div>
          );
        })}

        {/* Ambient Dark Gradient Scrim */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#211102]/90 via-[#211102]/35 to-[#211102]/15 pointer-events-none" />
      </div>

      {/* Bottom Editorial HUD & Navigation */}
      <div
        ref={bottomBarRef}
        className="relative z-30 w-full flex flex-row items-end justify-between gap-4 border-t border-brand-accent/40 pt-6 pb-2"
      >
        <div className="space-y-1">
          <span className="block font-sans text-[10px] sm:text-xs uppercase tracking-[0.25em] text-brand-accent">
            {currentItem.location}
          </span>
          <h2>
            <Link
              href={`/portfolio/${currentItem.slug}`}
              className="font-serif text-3xl sm:text-5xl md:text-6xl text-brand-bg font-light tracking-tight hover:text-brand-accent transition-colors block leading-none"
            >
              {currentItem.coupleNames}
            </Link>
          </h2>
          <p className="font-sans text-[10px] sm:text-xs text-brand-bg/60 tracking-wider">
            {currentItem.venue}
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="w-10 h-10 border border-brand-accent/40 text-brand-bg hover:bg-brand-bg hover:text-brand-text hover:border-brand-bg flex items-center justify-center transition-colors duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="w-10 h-10 border border-brand-accent/40 text-brand-bg hover:bg-brand-bg hover:text-brand-text hover:border-brand-bg flex items-center justify-center transition-colors duration-200 cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </section>
  );
}