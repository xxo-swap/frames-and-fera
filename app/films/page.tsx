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
  ytThumbnail: string;
  year: string;
  categoryPriority: number; // Order inside its category filter
  allPriority: number;      // Exact order inside the 'All' tab
  rawDate: number;
}

const CATEGORIES: FilmCategory[] = [
  'All',
  'Wedding Teaser',
  'Wedding Film',
  'Wedding Full Film',
  'Pre Wedding',
];

function parseYouTubeUrl(url: string) {
  if (!url) return { embedUrl: '', fallbackThumbnail: '' };
  
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = match && match[2].length === 11 ? match[2] : null;

  if (!videoId) return { embedUrl: url, fallbackThumbnail: '' };

  return {
    embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`,
    fallbackThumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
  };
}

export default function FilmsPage() {
  const [selectedCategory, setSelectedCategory] = useState<FilmCategory>('All');
  const [playingFilmId, setPlayingFilmId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const allFilms = useMemo(() => {
    const list: FlatFilmItem[] = [];

    clients.forEach((client: ClientPortfolio) => {
      const rawDate = client.date ? new Date(client.date).getTime() : 0;
      const year = client.date ? new Date(client.date).getFullYear().toString() : '2026';
      const existingPhotoThumbnail = client.hasPhotoGallery ? client.featuredCover : '';

      // 1. Wedding Teaser
      if (client.films?.teaserUrl) {
        const parsed = parseYouTubeUrl(client.films.teaserUrl);
        const ytThumb = client.films.teaserThumbnail || parsed.fallbackThumbnail;

        list.push({
          id: `${client.slug}-teaser`,
          clientSlug: client.slug,
          coupleNames: client.coupleNames,
          venue: client.venue,
          location: client.location,
          category: 'Wedding Teaser',
          videoUrl: client.films.teaserUrl,
          embedUrl: parsed.embedUrl,
          thumbnail: existingPhotoThumbnail || ytThumb,
          ytThumbnail: ytThumb,
          year,
          categoryPriority: client.films.teaserPriority ?? 999,
          allPriority: client.films.teaserAllPriority ?? client.films.teaserPriority ?? 999,
          rawDate,
        });
      }

      // 2. Wedding Film (Highlight / 4-8 min)
      if (client.films?.weddingFilmUrl) {
        const parsed = parseYouTubeUrl(client.films.weddingFilmUrl);
        const ytThumb = client.films.weddingFilmThumbnail || parsed.fallbackThumbnail;

        list.push({
          id: `${client.slug}-wedding`,
          clientSlug: client.slug,
          coupleNames: client.coupleNames,
          venue: client.venue,
          location: client.location,
          category: 'Wedding Film',
          videoUrl: client.films.weddingFilmUrl,
          embedUrl: parsed.embedUrl,
          thumbnail: existingPhotoThumbnail || ytThumb,
          ytThumbnail: ytThumb,
          year,
          categoryPriority: client.films.weddingFilmPriority ?? 999,
          allPriority: client.films.weddingFilmAllPriority ?? client.films.weddingFilmPriority ?? 999,
          rawDate,
        });
      }

      // 3. Wedding Full Film (Documentary / Feature)
      if (client.films?.fullWeddingFilmUrl) {
        const parsed = parseYouTubeUrl(client.films.fullWeddingFilmUrl);
        const ytThumb = client.films.fullWeddingFilmThumbnail || parsed.fallbackThumbnail;

        list.push({
          id: `${client.slug}-full`,
          clientSlug: client.slug,
          coupleNames: client.coupleNames,
          venue: client.venue,
          location: client.location,
          category: 'Wedding Full Film',
          videoUrl: client.films.fullWeddingFilmUrl,
          embedUrl: parsed.embedUrl,
          thumbnail: existingPhotoThumbnail || ytThumb,
          ytThumbnail: ytThumb,
          year,
          categoryPriority: client.films.fullWeddingFilmPriority ?? 999,
          allPriority: client.films.fullWeddingFilmAllPriority ?? client.films.fullWeddingFilmPriority ?? 999,
          rawDate,
        });
      }

      // 4. Pre Wedding
      if (client.films?.preWeddingFilmUrl) {
        const parsed = parseYouTubeUrl(client.films.preWeddingFilmUrl);
        const ytThumb = client.films.preWeddingFilmThumbnail || parsed.fallbackThumbnail;

        list.push({
          id: `${client.slug}-prewed`,
          clientSlug: client.slug,
          coupleNames: client.coupleNames,
          venue: client.venue,
          location: client.location,
          category: 'Pre Wedding',
          videoUrl: client.films.preWeddingFilmUrl,
          embedUrl: parsed.embedUrl,
          thumbnail: existingPhotoThumbnail || ytThumb,
          ytThumbnail: ytThumb,
          year,
          categoryPriority: client.films.preWeddingPriority ?? 999,
          allPriority: client.films.preWeddingAllPriority ?? client.films.preWeddingPriority ?? 999,
          rawDate,
        });
      }
    });

    return list;
  }, []);

  // Dual-mode Sorting Logic
  const filteredFilms = useMemo(() => {
    if (selectedCategory === 'All') {
      return [...allFilms].sort((a, b) => {
        if (a.allPriority !== b.allPriority) {
          return a.allPriority - b.allPriority;
        }
        return b.rawDate - a.rawDate;
      });
    }

    return allFilms
      .filter((item) => item.category === selectedCategory)
      .sort((a, b) => {
        if (a.categoryPriority !== b.categoryPriority) {
          return a.categoryPriority - b.categoryPriority;
        }
        return b.rawDate - a.rawDate;
      });
  }, [allFilms, selectedCategory]);

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
    <div ref={containerRef} className="my-28 w-full min-h-screen bg-brand-bg text-brand-text py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 md:mb-16">
        <header className="border-b border-brand-accent/30 pb-6 md:pb-10 space-y-3">
          {/* Reduced ~20%: text-xs (12px) -> text-[10px] */}
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-text/60">
            Cinematography Archive
          </span>
          {/* Reduced ~20%: text-4xl/6xl/8xl (36/60/96px) -> text-[29px]/text-5xl/text-[64px], removed italic */}
          <h1 className="font-serif text-[29px] sm:text-5xl md:text-[64px] font-normal uppercase tracking-tight">
            Wedding Films <span className="font-light">&amp; More</span>
          </h1>
        </header>

        {/* Category Filter Bar */}
        <nav className="flex flex-wrap items-center gap-2.5 md:gap-3 mt-6 md:mt-8">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setPlayingFilmId(null);
                }}
                /* Reduced ~20%: text-xs (12px) -> text-[10px] */
                className={`font-sans text-[10px] uppercase tracking-[0.2em] px-4 py-2 border transition-all duration-300 cursor-pointer select-none ${
                  isActive
                    ? 'bg-brand-text text-brand-bg border-brand-text shadow-lg'
                    : 'bg-transparent text-brand-text/70 border-brand-accent/40 hover:border-brand-text hover:text-brand-text'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Stacked Showcase Container */}
      <div
        ref={gridRef}
        className="w-full flex flex-col gap-10 sm:gap-14 md:gap-20 px-4 sm:px-6 md:px-12 max-w-[1600px] mx-auto"
      >
        {filteredFilms.map((film) => {
          const isPlaying = playingFilmId === film.id;
          const activeThumbnail = film.thumbnail || film.ytThumbnail;
          const isRemote = activeThumbnail?.startsWith('http');

          return (
            <article key={film.id} className="flex flex-col w-full group">
              <div
                className={`relative w-full overflow-hidden bg-black border border-brand-accent/40 shadow-2xl transition-all duration-500 ${
                  isPlaying
                    ? 'aspect-[16/9]'
                    : 'aspect-[16/9] sm:aspect-[16/7] lg:aspect-[21/9]'
                }`}
              >
                {isPlaying ? (
                  <div className="relative w-full h-full bg-black">
                    <iframe
                      src={film.embedUrl}
                      title={`${film.coupleNames} - ${film.category}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />

                    {/* Reduced ~20%: text-[11px] -> text-[9px] */}
                    <button
                      type="button"
                      onClick={() => setPlayingFilmId(null)}
                      className="absolute top-4 right-4 z-20 bg-black/80 hover:bg-black text-white text-[9px] uppercase tracking-[0.2em] px-3.5 py-1.5 border border-white/30 backdrop-blur-md transition-all cursor-pointer"
                    >
                      Close Film [✕]
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => setPlayingFilmId(film.id)}
                    className="relative w-full h-full cursor-pointer"
                  >
                    {activeThumbnail ? (
                      <Image
                        src={activeThumbnail}
                        alt={`${film.coupleNames} - ${film.category}`}
                        fill
                        unoptimized={isRemote}
                        sizes="100vw"
                        className="object-cover group-hover:scale-105 transition-all duration-1000 ease-out"
                      />
                    ) : (
                      /* Reduced ~20%: text-xs (12px) -> text-[10px] */
                      <div className="w-full h-full bg-brand-text/10 flex items-center justify-center text-[10px] uppercase tracking-widest text-brand-text/40">
                        Cinema Frame
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#211102]/85 via-[#211102]/25 to-transparent group-hover:via-[#211102]/10 transition-colors duration-500" />

                    {/* Category pill on card - Reduced ~20%: text-[10px]/text-xs -> text-[8px]/text-[10px] */}
                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 bg-brand-bg/90 backdrop-blur-md px-3 py-1 font-sans text-[8px] sm:text-[10px] uppercase tracking-widest text-brand-text border border-brand-accent/40">
                      {film.category}
                    </div>

                    {/* Play button icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full border border-brand-bg/70 bg-brand-text/40 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-text transition-all duration-500 shadow-2xl">
                        <svg
                          className="w-5 h-5 sm:w-7 sm:h-7 text-brand-bg translate-x-0.5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>

                    {/* Bottom Left Desktop/Tablet overlay */}
                    <div className="absolute bottom-4 left-4 sm:bottom-7 sm:left-7 z-10 hidden sm:block">
                      {/* Reduced ~20%: text-[11px]/text-xs -> text-[9px]/text-[10px] */}
                      <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-brand-bg/80 drop-shadow">
                        {film.venue ? `${film.venue} • ` : ''}{film.location}
                      </span>
                      {/* Reduced ~20%: text-3xl/5xl/6xl (30/48/60px) -> text-2xl/text-[38px]/text-5xl */}
                      <h2 className="font-serif text-2xl sm:text-[38px] lg:text-5xl uppercase tracking-wide text-brand-bg font-normal drop-shadow-md group-hover:translate-x-2 transition-transform duration-500">
                        {film.coupleNames}
                      </h2>
                    </div>

                    {/* Bottom Right Desktop/Tablet year pill */}
                    <div className="absolute bottom-4 right-4 sm:bottom-7 sm:right-7 z-10 hidden sm:block">
                      {/* Reduced ~20%: text-xs (12px) -> text-[10px] */}
                      <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-bg/80 border border-brand-bg/30 px-2.5 py-0.5 backdrop-blur-sm">
                        {film.year}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile text block */}
              <div className="sm:hidden flex flex-col pt-3 px-1">
                <div className="flex items-baseline justify-between">
                  {/* Reduced ~20%: text-2xl (24px) -> text-[19px] */}
                  <h2 className="font-serif text-[19px] uppercase tracking-wide text-brand-text">
                    {film.coupleNames}
                  </h2>
                  {/* Reduced ~20%: text-[10px] -> text-[8px] */}
                  <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-brand-text/60">
                    {film.year}
                  </span>
                </div>
                {/* Reduced ~20%: text-xs (12px) -> text-[10px] */}
                <p className="font-sans text-[10px] text-brand-text/60 mt-1 uppercase tracking-wider">
                  {film.venue ? `${film.venue}, ` : ''}{film.location}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      {/* Empty Fallback */}
      {filteredFilms.length === 0 && (
        <div className="py-20 text-center border-t border-brand-accent/30 max-w-7xl mx-auto px-6">
          {/* Reduced ~20%: text-2xl (24px) -> text-[19px], removed italic */}
          <p className="font-serif text-[19px] text-brand-text/60">
            No films found in this category.
          </p>
        </div>
      )}
    </div>
  );
}