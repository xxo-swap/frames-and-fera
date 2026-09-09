'use client';

import { useState, useMemo, useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { clients, ClientPortfolio } from '@/data/client';

type FilmCategory = 'All' | 'Wedding Teaser' | 'Wedding Film' | 'Wedding Full Film' | 'Pre Wedding';

interface FlatFilmItem {
  id: string;
  clientSlug: string;
  coupleNames: string;
  venue: string;
  location: string;
  category: Exclude<FilmCategory, 'All'>;
  videoUrl: string;
  embedUrl: string;
  thumbnail: string;
  year: string;
}

const CATEGORIES: FilmCategory[] = [
  'All',
  'Wedding Teaser',
  'Wedding Film',
  'Wedding Full Film',
  'Pre Wedding',
];

// Helper to convert YouTube URL to embed format and retrieve thumbnail
function parseYouTubeUrl(url: string) {
  if (!url) return { embedUrl: '', thumbnail: '' };
  
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = match && match[2].length === 11 ? match[2] : null;

  if (!videoId) return { embedUrl: url, thumbnail: '' };

  return {
    embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`,
    thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
  };
}

export default function FilmsPage() {
  const [selectedCategory, setSelectedCategory] = useState<FilmCategory>('All');
  const [activeVideo, setActiveVideo] = useState<FlatFilmItem | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Flatten and extract only clients and films that have video data
  const filmItems = useMemo(() => {
    const list: FlatFilmItem[] = [];

    clients.forEach((client) => {
      const year = client.date ? new Date(client.date).getFullYear().toString() : '2026';

      // 1. Wedding Teaser
      if (client.films?.teaserUrl) {
        const parsed = parseYouTubeUrl(client.films.teaserUrl);
        list.push({
          id: `${client.slug}-teaser`,
          clientSlug: client.slug,
          coupleNames: client.coupleNames,
          venue: client.venue,
          location: client.location,
          category: 'Wedding Teaser',
          videoUrl: client.films.teaserUrl,
          embedUrl: parsed.embedUrl,
          // Use client photo cover if available; otherwise use YouTube thumbnail
          thumbnail: client.hasPhotoGallery ? client.featuredCover : parsed.thumbnail,
          year,
        });
      }

      // 2. Wedding Film (Highlight / 4-8 min)
      if (client.films?.highlightUrl) {
        const parsed = parseYouTubeUrl(client.films.highlightUrl);
        list.push({
          id: `${client.slug}-highlight`,
          clientSlug: client.slug,
          coupleNames: client.coupleNames,
          venue: client.venue,
          location: client.location,
          category: 'Wedding Film',
          videoUrl: client.films.highlightUrl,
          embedUrl: parsed.embedUrl,
          thumbnail: client.hasPhotoGallery ? client.featuredCover : parsed.thumbnail,
          year,
        });
      }

      // 3. Wedding Full Film (Documentary / Feature)
      if (client.films?.fullWeddingFilmUrl) {
        const parsed = parseYouTubeUrl(client.films.fullWeddingFilmUrl);
        list.push({
          id: `${client.slug}-full`,
          clientSlug: client.slug,
          coupleNames: client.coupleNames,
          venue: client.venue,
          location: client.location,
          category: 'Wedding Full Film',
          videoUrl: client.films.fullWeddingFilmUrl,
          embedUrl: parsed.embedUrl,
          thumbnail: client.hasPhotoGallery ? client.featuredCover : parsed.thumbnail,
          year,
        });
      }

      // 4. Pre Wedding
      if (client.films?.preWeddingFilmUrl) {
        const parsed = parseYouTubeUrl(client.films.preWeddingFilmUrl);
        list.push({
          id: `${client.slug}-prewed`,
          clientSlug: client.slug,
          coupleNames: client.coupleNames,
          venue: client.venue,
          location: client.location,
          category: 'Pre Wedding',
          videoUrl: client.films.preWeddingFilmUrl,
          embedUrl: parsed.embedUrl,
          thumbnail: client.hasPhotoGallery ? client.featuredCover : parsed.thumbnail,
          year,
        });
      }
    });

    return list;
  }, []);

  // Filter based on active category pill
  const filteredFilms = useMemo(() => {
    return selectedCategory === 'All'
      ? filmItems
      : filmItems.filter((item) => item.category === selectedCategory);
  }, [filmItems, selectedCategory]);

  // GSAP smooth reveal on filter change
  useGSAP(
    () => {
      if (!gridRef.current?.children.length) return;

      gsap.fromTo(
        Array.from(gridRef.current.children),
        { y: 35, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
        }
      );
    },
    { scope: containerRef, dependencies: [selectedCategory] }
  );

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-brand-bg text-brand-text px-6 py-12 md:px-12 md:py-20 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <header className="mb-12 md:mb-16 border-b border-brand-accent/40 pb-8 space-y-4">
        <span className="font-sans text-xs uppercase tracking-[0.3em] text-brand-text/60">
          Cinematography Archive
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal uppercase tracking-tight">
          Motion <span className="italic font-light">&amp; Films</span>
        </h1>
      </header>

      {/* 4-Category Filter Bar */}
      <nav className="flex flex-wrap items-center gap-3 md:gap-4 mb-12">
        {CATEGORIES.map((cat) => {
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
      </nav>

      {/* Film Showcase Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start"
      >
        {filteredFilms.map((film) => (
          <article
            key={film.id}
            onClick={() => setActiveVideo(film)}
            className="group cursor-pointer flex flex-col"
          >
            {/* 16:9 Cinema Frame with Play Trigger */}
            <div className="relative w-full aspect-[16/9] overflow-hidden bg-brand-accent/20 border border-brand-accent/40 mb-4">
              {film.thumbnail ? (
                <Image
                  src={film.thumbnail}
                  alt={`${film.coupleNames} - ${film.category}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
              ) : (
                <div className="w-full h-full bg-brand-text/10 flex items-center justify-center text-xs uppercase tracking-widest text-brand-text/40">
                  Cinema Frame
                </div>
              )}

              {/* Dark Ambient Hover Tint */}
              <div className="absolute inset-0 bg-[#211102]/25 group-hover:bg-[#211102]/10 transition-colors duration-500" />

              {/* Center Play Indicator */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full border border-brand-bg/80 bg-brand-text/40 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-text transition-all duration-300">
                  <svg
                    className="w-5 h-5 text-brand-bg translate-x-0.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Top Category Badge */}
              <div className="absolute top-4 left-4 z-10 bg-brand-bg/90 backdrop-blur-sm px-3 py-1 font-sans text-[10px] uppercase tracking-widest text-brand-text border border-brand-accent/40">
                {film.category}
              </div>
            </div>

            {/* Film Meta Information */}
            <div className="flex items-baseline justify-between pt-1">
              <h2 className="font-serif text-2xl uppercase tracking-wide text-brand-text group-hover:italic transition-all">
                {film.coupleNames}
              </h2>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-brand-text/60">
                {film.year}
              </span>
            </div>

            <p className="font-sans text-xs text-brand-text/60 mt-1 uppercase tracking-wider">
              {film.venue ? `${film.venue}, ` : ''}{film.location}
            </p>
          </article>
        ))}
      </div>

      {filteredFilms.length === 0 && (
        <div className="py-24 text-center border-t border-brand-accent/30">
          <p className="font-serif text-2xl italic text-brand-text/60">
            No films found in this category.
          </p>
        </div>
      )}

      {/* Cinema Theater Modal */}
      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveVideo(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 md:p-12 bg-[#211102]/90 backdrop-blur-md animate-in fade-in duration-300"
        >
          <div
            className="relative w-full max-w-5xl aspect-[16/9] bg-black shadow-2xl border border-brand-accent/30"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={activeVideo.embedUrl}
              title={`${activeVideo.coupleNames} - ${activeVideo.category}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
            
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              className="absolute -top-10 right-0 text-brand-bg text-xs uppercase tracking-[0.25em] hover:text-brand-accent transition-colors"
            >
              Close [✕]
            </button>
          </div>
        </div>
      )}
    </div>
  );
}