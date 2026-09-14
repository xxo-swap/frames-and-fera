// components/ClientPortfolioView.tsx
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { ClientPortfolio } from "@/data/client";

interface Props {
  client: ClientPortfolio;
}

const getYouTubeEmbedUrl = (url?: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}`
    : null;
};

export default function ClientPortfolioView({ client }: Props) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const teaserEmbed = getYouTubeEmbedUrl(client.films?.teaserUrl);
  const filmEmbed = getYouTubeEmbedUrl(
    client.films?.fullWeddingFilmUrl ||
      client.films?.highlightUrl ||
      client.films?.preWeddingFilmUrl
  );
  const hasFilms = Boolean(teaserEmbed || filmEmbed);
  const hasPhotos = Boolean(client.events && client.events.length > 0);

  const closeLightbox = useCallback(() => setSelectedImage(null), []);

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, closeLightbox]);

  const displayedEvents = useMemo(() => {
    if (!client.events) return [];
    if (activeTab === "all") return client.events;
    return client.events.filter((e) => e.id === activeTab);
  }, [client.events, activeTab]);

  return (
    <div className="my-16 min-h-screen bg-brand-bg text-brand-text font-sans antialiased selection:bg-brand-accent selection:text-brand-bg">
      <header className="relative w-full border-b border-brand-accent/40 pt-24 pb-16 px-6 sm:px-12 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-text/60">
              {client.location} — {client.date}
            </span>
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl tracking-tight leading-[0.95] font-light">
              {client.coupleNames}
            </h1>
            <p className="text-sm font-sans text-brand-text/50 tracking-wider">
              {client.venue}
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-text/50">
              Services Commissioned
            </span>
            <div className="flex flex-wrap gap-2">
              {client.services && client.services.length > 0 ? (
                client.services.map((service) => (
                  <span
                    key={service}
                    className="px-3.5 py-1.5 text-[11px] uppercase tracking-[0.15em] border border-brand-accent/50 bg-brand-accent/10 rounded-full font-light"
                  >
                    {service}
                  </span>
                ))
              ) : (
                <span className="px-3.5 py-1.5 text-[11px] uppercase tracking-[0.15em] border border-brand-accent/50 bg-brand-accent/10 rounded-full font-light">
                  {client.hasPhotoGallery ? "Photography" : "Cinematic Film"}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 py-12 space-y-16">
        <nav
          aria-label="Story sections"
          className="flex items-center space-x-6 sm:space-x-8 border-b border-brand-accent/40 pb-4 overflow-x-auto no-scrollbar"
        >
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`relative text-xs sm:text-sm tracking-[0.2em] uppercase transition-all pb-2 whitespace-nowrap cursor-pointer select-none ${
              activeTab === "all"
                ? "text-brand-text font-medium"
                : "text-brand-text/50 hover:text-brand-text"
            }`}
          >
            All Archives
            {activeTab === "all" && (
              <span className="absolute bottom-[-1px] left-0 right-0 h-[1.5px] bg-brand-text" />
            )}
          </button>

          {hasFilms && (
            <button
              type="button"
              onClick={() => setActiveTab("films")}
              className={`relative text-xs sm:text-sm tracking-[0.2em] uppercase transition-all pb-2 whitespace-nowrap cursor-pointer select-none ${
                activeTab === "films"
                  ? "text-brand-text font-medium"
                  : "text-brand-text/50 hover:text-brand-text"
              }`}
            >
              Films &amp; Teasers
              {activeTab === "films" && (
                <span className="absolute bottom-[-1px] left-0 right-0 h-[1.5px] bg-brand-text" />
              )}
            </button>
          )}

          {hasPhotos &&
            client.events.map((event) => {
              const isSelected = activeTab === event.id;
              return (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => setActiveTab(event.id)}
                  className={`relative text-xs sm:text-sm tracking-[0.2em] uppercase transition-all pb-2 whitespace-nowrap cursor-pointer select-none ${
                    isSelected
                      ? "text-brand-text font-medium"
                      : "text-brand-text/50 hover:text-brand-text"
                  }`}
                >
                  {event.name} Photos
                  {isSelected && (
                    <span className="absolute bottom-[-1px] left-0 right-0 h-[1.5px] bg-brand-text" />
                  )}
                </button>
              );
            })}
        </nav>

        {(activeTab === "all" || activeTab === "films") && hasFilms && (
          <section className="space-y-8 pb-12 border-b border-brand-accent/30">
            <div className="flex justify-between items-baseline">
              <h2 className="font-serif text-3xl md:text-4xl font-light">
                Cinematography
              </h2>
              <span className="text-xs uppercase tracking-widest text-brand-text/60">
                Official Releases
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {teaserEmbed && (
                <div className="space-y-3">
                  <div className="relative aspect-video w-full overflow-hidden bg-brand-accent/10 border border-brand-accent/40">
                    <iframe
                      src={teaserEmbed}
                      title={`${client.coupleNames} Wedding Teaser`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-brand-text/70 block">
                    Cinematic Teaser
                  </span>
                </div>
              )}

              {filmEmbed && (
                <div className="space-y-3">
                  <div className="relative aspect-video w-full overflow-hidden bg-brand-accent/10 border border-brand-accent/40">
                    <iframe
                      src={filmEmbed}
                      title={`${client.coupleNames} Wedding Film`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-brand-text/70 block">
                    {client.films?.fullWeddingFilmUrl
                      ? "Full Wedding Film"
                      : client.films?.highlightUrl
                      ? "Highlight Film"
                      : "Pre-Wedding Film"}
                  </span>
                </div>
              )}
            </div>
          </section>
        )}

        {activeTab === "films" && !hasFilms && (
          <div className="py-20 text-center">
            <p className="font-serif text-2xl italic text-brand-text/60">
              No film releases commissioned for this collection.
            </p>
          </div>
        )}

        {activeTab !== "films" && (
          <div className="space-y-20">
            {displayedEvents.map((event) => (
              <section key={event.id} className="space-y-8">
                <div className="flex justify-between items-baseline border-b border-brand-accent/20 pb-4">
                  <h2 className="font-serif text-3xl md:text-4xl font-light">
                    {event.name}
                  </h2>
                  
                </div>

                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                  {event.images.map((src, index) => (
                    <div
                      key={`${src}-${index}`}
                      role="button"
                      tabIndex={0}
                      aria-label={`Enlarge photo ${index + 1} from ${event.name}`}
                      onClick={() => setSelectedImage(src)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") setSelectedImage(src);
                      }}
                      className="break-inside-avoid relative w-full overflow-hidden bg-brand-accent/10 border border-brand-accent/30 cursor-zoom-in group transition-colors duration-300 hover:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-text"
                    >
                      <Image
                        src={src}
                        alt={`${client.coupleNames} - ${event.name} frame ${index + 1}`}
                        width={0}
                        height={0}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="w-full h-auto object-contain block transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-[#211102]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {displayedEvents.length === 0 && (
              <div className="py-20 text-center">
                <p className="font-serif text-2xl italic text-brand-text/60">
                  No photographic frames found for this archive.
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#211102]/92 backdrop-blur-md cursor-zoom-out animate-in fade-in duration-200"
        >
          <div
            className="relative max-w-6xl max-h-[90vh] w-full h-full cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Fullscreen Preview"
              fill
              className="object-contain"
              priority
              sizes="100vw"
            />
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute -top-10 right-0 text-white/90 hover:text-white text-xs uppercase tracking-widest transition-opacity cursor-pointer focus:outline-none focus:underline"
            >
              Close Frame [✕]
            </button>
          </div>
        </div>
      )}
    </div>
  );
}