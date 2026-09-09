'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { clients, ClientPortfolio } from '@/data/client';

export default function PhotographyPage() {
  // Only select clients who actually have a photo gallery
  const photoClients = useMemo(
    () => clients.filter((c) => c.hasPhotoGallery && c.events && c.events.length > 0),
    []
  );

  // Active client whose gallery modal is open
  const [selectedClient, setSelectedClient] = useState<ClientPortfolio | null>(null);
  // Active event tab within the selected client's gallery
  const [activeEventTab, setActiveEventTab] = useState<string>('all');
  // Full-resolution single image zoom view
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Grid reveal animation
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
          stagger: 0.1,
          ease: 'power2.out',
        }
      );
    },
    { scope: containerRef }
  );

  // Handle client selection and reset event filter to 'all'
  const handleOpenClient = (client: ClientPortfolio) => {
    setSelectedClient(client);
    setActiveEventTab('all');
  };

  // Prevent background scrolling while any modal is open
  useEffect(() => {
    if (selectedClient || zoomImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedClient, zoomImage]);

  // Derive photos to show based on the active event tab inside the modal
  const activePhotos = useMemo(() => {
    if (!selectedClient) return [];
    if (activeEventTab === 'all') {
      return selectedClient.events.flatMap((e) =>
        e.images.map((img) => ({ src: img, eventName: e.name }))
      );
    }
    const matchingEvent = selectedClient.events.find((e) => e.id === activeEventTab);
    return matchingEvent
      ? matchingEvent.images.map((img) => ({ src: img, eventName: matchingEvent.name }))
      : [];
  }, [selectedClient, activeEventTab]);

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen bg-brand-bg text-brand-text px-6 py-12 md:px-12 md:py-20 max-w-7xl mx-auto"
    >
      {/* Editorial Header */}
      <header className="mb-12 md:mb-16 border-b border-brand-accent/40 pb-8 space-y-4">
        <span className="font-sans text-xs uppercase tracking-[0.3em] text-brand-text/60">
          Visual Archives
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal uppercase tracking-tight">
          Still <span className="italic font-light">&amp; Photography</span>
        </h1>
      </header>

      {/* Main Client Exhibition Cards Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start"
      >
        {photoClients.map((client, idx) => {
          // Asymmetric editorial balance
          const colSpan = idx % 2 === 0 ? 'md:col-span-7' : 'md:col-span-5';
          const aspect = idx % 2 === 0 ? 'aspect-[4/5]' : 'aspect-[3/4]';
          const totalFrames = client.events.reduce((acc, curr) => acc + curr.images.length, 0);

          return (
            <div
              key={client.slug}
              onClick={() => handleOpenClient(client)}
              className={`${colSpan} group cursor-pointer`}
            >
              {/* Image Frame */}
              <div
                className={`relative w-full ${aspect} overflow-hidden bg-brand-accent/20 mb-4 border border-brand-accent/40`}
              >
                <Image
                  src={client.featuredCover}
                  alt={client.coupleNames}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />

                {/* Index Counter */}
                <div className="absolute top-4 left-4 z-10 bg-brand-bg/90 backdrop-blur-sm px-3 py-1 font-sans text-[10px] uppercase tracking-widest text-brand-text border border-brand-accent/30">
                  {String(idx + 1).padStart(2, '0')}
                </div>

                {/* Hover Exhibition Tag */}
                <div className="absolute inset-0 bg-[#211102]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="font-sans text-xs uppercase tracking-[0.25em] text-brand-bg border border-brand-bg/60 px-5 py-2 backdrop-blur-sm bg-[#211102]/40">
                    Open Gallery ({totalFrames})
                  </span>
                </div>
              </div>

              {/* Card Meta */}
              <div className="flex items-baseline justify-between pt-2">
                <h2 className="font-serif text-xl md:text-2xl uppercase tracking-wide text-brand-text group-hover:italic transition-all">
                  {client.coupleNames}
                </h2>
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-brand-text/60">
                  {client.location}
                </span>
              </div>

              <div className="flex items-center justify-between mt-1">
                <p className="font-sans text-xs text-brand-text/50 uppercase tracking-widest">
                  {client.events.map((e) => e.name).join(' • ')}
                </p>
                <span className="font-sans text-[10px] text-brand-text/40 tracking-wider">
                  {totalFrames} Frames
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* FULL EXHIBITION GALLERY MODAL */}
      {selectedClient && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-brand-bg/98 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200"
        >
          {/* Sticky Modal Top Bar */}
          <header className="sticky top-0 z-20 bg-brand-bg/90 backdrop-blur-md border-b border-brand-accent/40 px-6 md:px-12 py-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-text/60 block">
                  {selectedClient.venue} • {selectedClient.location}
                </span>
                <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-tight text-brand-text">
                  {selectedClient.coupleNames}
                </h2>
              </div>

              {/* Event-Wise Filter Navigation Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                <button
                  type="button"
                  onClick={() => setActiveEventTab('all')}
                  className={`font-sans text-xs uppercase tracking-[0.2em] px-4 py-2 border transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    activeEventTab === 'all'
                      ? 'bg-brand-text text-brand-bg border-brand-text'
                      : 'bg-transparent text-brand-text/70 border-brand-accent/40 hover:border-brand-text hover:text-brand-text'
                  }`}
                >
                  All (
                  {selectedClient.events.reduce((acc, curr) => acc + curr.images.length, 0)}
                  )
                </button>

                {selectedClient.events.map((event) => {
                  const isActive = activeEventTab === event.id;
                  return (
                    <button
                      key={event.id}
                      type="button"
                      onClick={() => setActiveEventTab(event.id)}
                      className={`font-sans text-xs uppercase tracking-[0.2em] px-4 py-2 border transition-all duration-300 whitespace-nowrap cursor-pointer ${
                        isActive
                          ? 'bg-brand-text text-brand-bg border-brand-text'
                          : 'bg-transparent text-brand-text/70 border-brand-accent/40 hover:border-brand-text hover:text-brand-text'
                      }`}
                    >
                      {event.name} ({event.images.length})
                    </button>
                  );
                })}
              </div>

              {/* Close Exhibition Button */}
              <button
                type="button"
                onClick={() => setSelectedClient(null)}
                className="self-end md:self-auto font-sans text-xs uppercase tracking-[0.25em] text-brand-text hover:opacity-60 border-b border-brand-text pb-0.5 transition-opacity cursor-pointer"
              >
                Close [✕]
              </button>
            </div>
          </header>

          {/* Modal Gallery Images Grid */}
          <main className="max-w-7xl mx-auto px-6 md:px-12 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {activePhotos.map((photo, i) => (
                <div
                  key={`${photo.src}-${i}`}
                  onClick={() => setZoomImage(photo.src)}
                  className="group relative aspect-[3/4] overflow-hidden bg-brand-accent/20 border border-brand-accent/30 cursor-zoom-in"
                >
                  <Image
                    src={photo.src}
                    alt={`${selectedClient.coupleNames} frame ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#211102]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-brand-bg/90 backdrop-blur-sm px-2 py-0.5 font-sans text-[9px] uppercase tracking-wider text-brand-text">
                    {photo.eventName}
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      )}

      {/* SINGLE IMAGE FULLSCREEN LIGHTBOX */}
      {zoomImage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setZoomImage(null)}
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-[#211102]/92 backdrop-blur-md cursor-zoom-out animate-in fade-in duration-200"
        >
          <div
            className="relative max-w-6xl max-h-[90vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={zoomImage}
              alt="Expanded Wedding Frame"
              fill
              className="object-contain"
              priority
            />
            <button
              type="button"
              onClick={() => setZoomImage(null)}
              className="absolute -top-10 right-0 text-brand-bg text-xs uppercase tracking-[0.25em] hover:text-brand-accent transition-colors cursor-pointer"
            >
              Close Frame [✕]
            </button>
          </div>
        </div>
      )}
    </div>
  );
}