// components/ClientPortfolioView.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { ClientPortfolio } from "@/data/client";

interface Props {
  client: ClientPortfolio;
}

export default function ClientPortfolioView({ client }: Props) {
  // Always default to the first event's id
  const [activeEventTab, setActiveEventTab] = useState<string>(
    client.events[0]?.id || ""
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Active event with solid fallback
  const activeEvent =
    client.events.find((e) => e.id === activeEventTab) ;
  console.log(activeEvent);

  console.log(client);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-sans antialiased selection:bg-brand-accent selection:text-brand-text">
      {/* Editorial Hero Header */}
      <header className="relative w-full border-b border-brand-accent/40 pt-20 pb-16 px-6 sm:px-12 md:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-text/70">
              {client.location} — {client.date}
            </span>
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl tracking-tight leading-[0.95] font-light">
              {client.coupleNames}
            </h1>
          </div>

          {/* Film Badges */}
          <div className="flex flex-wrap gap-2 text-xs uppercase tracking-wider">
            {client.films?.teaserUrl && (
              <a
                href={client.films.teaserUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 border border-brand-text/30 hover:border-brand-text hover:bg-brand-text hover:text-brand-bg transition-colors duration-300 rounded-full"
              >
                Teaser
              </a>
            )}
            {client.films?.highlightUrl && (
              <a
                href={client.films.highlightUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 border border-brand-text/30 hover:border-brand-text hover:bg-brand-text hover:text-brand-bg transition-colors duration-300 rounded-full"
              >
                Highlight Film
              </a>
            )}
            {client.films?.reelUrl && (
              <a
                href={client.films.reelUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 border border-brand-text/30 hover:border-brand-text hover:bg-brand-text hover:text-brand-bg transition-colors duration-300 rounded-full"
              >
                Reel
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 sm:px-12 md:px-20 py-12">
        {/* Event Navigation Tabs */}
        {client.events?.length > 1 && (
          <nav className="flex items-center space-x-8 border-b border-brand-accent/40 pb-4 mb-12 overflow-x-auto no-scrollbar">
            {client.events.map((event) => {
              console.log(event);
              const isSelected = activeEvent?.id === event.id;
              return (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => {
                    console.log("Clicked tab with ID:", event.id);
                    setActiveEventTab(event.id);
                  }}
                  className={`relative text-sm tracking-widest uppercase transition-all pb-2 whitespace-nowrap cursor-pointer select-none ${
                    isSelected
                      ? "text-brand-text font-medium"
                      : "text-brand-text/50 hover:text-brand-text"
                  }`}
                >
                  {event.name}
                  {isSelected && (
                    <span className="absolute bottom-[-1px] left-0 right-0 h-[1.5px] bg-brand-text" />
                  )}
                </button>
              );
            })}
          </nav>
        )}

        {/* Photos Grid */}
        {activeEvent && activeEvent.images && activeEvent.images.length > 0 ? (
          <section key={activeEvent.id}>
            <div className="flex justify-between items-baseline mb-8">
              <h2 className="font-serif text-3xl md:text-4xl font-light">
                {activeEvent.name}
              </h2>
              <span className="text-xs uppercase tracking-widest text-brand-text/60">
                {activeEvent.images.length} Frames
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {activeEvent.images.map((src, index) => (
                <div
                  key={src}
                  onClick={() => setSelectedImage(src)}
                  className="group relative cursor-pointer overflow-hidden bg-brand-accent/20 aspect-[3/4] rounded-sm transition-transform duration-500 ease-out"
                >
                  <Image
                    src={src}
                    alt={`${client.coupleNames} - ${activeEvent.name} ${
                      index + 1
                    }`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#211102]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </section>
        ) : (
          <div className="py-20 text-center">
            <p className="font-serif text-2xl italic text-brand-text/60">
              No photos found for this event.
            </p>
          </div>
        )}
      </main>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#211102]/85 backdrop-blur-sm cursor-zoom-out animate-in fade-in duration-200"
        >
          <div
            className="relative max-w-5xl max-h-[90vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Fullscreen Preview"
              fill
              className="object-contain"
              priority
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-brand-bg text-xs uppercase tracking-widest hover:opacity-75 transition-opacity cursor-pointer"
            >
              Close [✕]
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
