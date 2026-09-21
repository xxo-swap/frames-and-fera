// components/ClientPortfolioView.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ClientPortfolio } from "@/data/client";

interface Props {
  client: ClientPortfolio;
}

export default function ClientPortfolioView({ client }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const allImages =
    client.events?.flatMap((event) => event.images || []) || [];

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

  // If the client has no photo frames (e.g. film-only portfolio)
  if (allImages.length === 0) {
    return null; // Or return a custom empty state / redirect
  }

  return (
    <div className="my-16 min-h-screen bg-brand-bg text-brand-text font-sans antialiased selection:bg-brand-accent selection:text-brand-bg">
      {/* Editorial Header */}
      <header className="relative w-full border-b border-brand-accent/40 pt-20 pb-12 px-6 sm:px-12 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col justify-start space-y-3">
          <span className="text-[10px] uppercase tracking-[0.25em] text-brand-text/60">
            {client.location} — {client.date}
          </span>
          <h1 className="font-serif text-[38px] sm:text-5xl md:text-[64px] tracking-tight leading-[0.95] font-light">
            {client.coupleNames}
          </h1>
          <p className="text-[11px] font-sans text-brand-text/50 tracking-wider">
            {client.venue}
          </p>
        </div>
      </header>

      {/* Main Content - Photos Only */}
      <main className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 py-10 space-y-16">
        <section className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {allImages.map((src, index) => (
            <div
              key={`${src}-${index}`}
              role="button"
              tabIndex={0}
              aria-label={`Enlarge photo ${index + 1}`}
              onClick={() => setSelectedImage(src)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setSelectedImage(src);
              }}
              className="break-inside-avoid relative w-full overflow-hidden bg-brand-accent/10 border border-brand-accent/30 cursor-zoom-in group transition-colors duration-300 hover:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-text"
            >
              <Image
                src={src}
                alt={`${client.coupleNames} frame ${index + 1}`}
                width={0}
                height={0}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full h-auto object-contain block transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#211102]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </section>
      </main>

      {/* Lightbox Modal */}
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
              className="absolute -top-9 right-0 text-white/90 hover:text-white text-[10px] uppercase tracking-widest transition-opacity cursor-pointer focus:outline-none focus:underline"
            >
              Close Frame [✕]
            </button>
          </div>
        </div>
      )}
    </div>
  );
}