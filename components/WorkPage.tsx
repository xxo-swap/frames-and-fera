'use client';

import { useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { clients, ClientPortfolio } from '@/data/client';

// Filter categories
const categories = ['All', 'Weddings', 'Engagements'];

// Layout rhythms to preserve the asymmetrical editorial grid
const layoutStyles = [
  { aspect: 'aspect-[4/5]', colSpan: 'md:col-span-7' },
  { aspect: 'aspect-[3/4]', colSpan: 'md:col-span-5' },
  { aspect: 'aspect-[16/10]', colSpan: 'md:col-span-12' },
  { aspect: 'aspect-[3/4]', colSpan: 'md:col-span-5' },
  { aspect: 'aspect-[4/5]', colSpan: 'md:col-span-7' },
];

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Map clients to gallery items with layout styles & category inference
  const galleryItems = useMemo(() => {
    return clients.map((client, index) => {
      const style = layoutStyles[index % layoutStyles.length];
      const hasWed = client.events.some((e) => e.id === 'wed');
      const category = hasWed ? 'Weddings' : 'Engagements';
      const year = client.date ? new Date(client.date).getFullYear() : '2026';

      return {
        ...client,
        id: String(index + 1).padStart(2, '0'),
        category,
        year,
        aspect: style.aspect,
        colSpan: style.colSpan,
      };
    });
  }, []);

  // Filter projects based on active pill
  const filteredProjects = useMemo(() => {
    return selectedCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);
  }, [galleryItems, selectedCategory]);

  // Re-run GSAP reveal animation on category filter change
  useGSAP(
    () => {
      if (!gridRef.current?.children.length) return;

      gsap.fromTo(
        Array.from(gridRef.current.children),
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        }
      );
    },
    { scope: containerRef, dependencies: [selectedCategory] }
  );

  return (
    <div ref={containerRef} className="w-full px-6 py-12 md:px-12 md:py-20 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-12 md:mb-16 border-b border-brand-accent/40 pb-8 space-y-4">
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-brand-text/60">
          Archive 2025 — 2026
        </p>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-brand-text uppercase tracking-tight">
          Selected <span className="italic font-light">Stories</span>
        </h1>
      </div>

      {/* Category Filter Controls */}
      <div className="flex flex-wrap items-center gap-3 md:gap-6 mb-12">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`font-sans text-xs uppercase tracking-[0.2em] px-4 py-2 border transition-all duration-300 cursor-pointer select-none ${
                isActive
                  ? 'bg-brand-text text-brand-bg border-brand-text'
                  : 'bg-transparent text-brand-text/70 border-brand-accent/40 hover:border-brand-text hover:text-brand-text'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Portfolio Gallery Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start"
      >
        {filteredProjects.map((project) => (
          <div
            key={project.slug}
            className={`${project.colSpan} group cursor-pointer`}
          >
            <Link href={`/clients/${project.slug}`} className="block">
              {/* Image Frame */}
              <div
                className={`relative w-full ${project.aspect} overflow-hidden bg-brand-accent/20 mb-4 border border-brand-accent/40`}
              >
                <Image
                  src={project.featuredCover}
                  alt={project.coupleNames}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 z-10 bg-brand-bg/85 backdrop-blur-sm px-3 py-1 font-sans text-[10px] uppercase tracking-widest text-brand-text border border-brand-accent/30">
                  {project.id}
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="flex items-baseline justify-between pt-2">
                <h2 className="font-serif text-xl md:text-2xl uppercase tracking-wide text-brand-text group-hover:italic transition-all">
                  {project.coupleNames}
                </h2>
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-brand-text/60">
                  {project.location}
                </span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <p className="font-sans text-xs text-brand-text/50 uppercase tracking-widest">
                  {project.category}
                </p>
                <span className="font-sans text-[10px] text-brand-text/40 tracking-wider">
                  {project.year}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}