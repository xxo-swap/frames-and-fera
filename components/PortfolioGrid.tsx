// components/PortfolioGrid.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ClientPortfolio } from "@/data/client";

interface Props {
  initialClients: ClientPortfolio[];
}

type FilterCategory = "ALL" | "PHOTO" | "FILM" | "PRE_WED";

export default function PortfolioGrid({ initialClients }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("ALL");

  const getDeliverableLabel = (client: ClientPortfolio) => {
    if (client.services?.includes("Pre-Wedding Film") || client.services?.includes("Pre-Wedding Shoot")) {
      return "Pre-Wedding";
    }

    const hasFilm = client.services?.includes("Wedding Film") || Boolean(
      client.films?.teaserUrl ||
      client.films?.fullWeddingFilmUrl ||
      client.films?.weddingFilmUrl ||
      client.films?.highlightUrl
    );
    const hasPhoto = client.services?.includes("Photography") || client.hasPhotoGallery;

    if (hasFilm && hasPhoto) return "Film & Photo";
    if (hasFilm) return "Cinematic Film";
    return "Photography";
  };

  const filteredClients = initialClients.filter((client) => {
    if (activeFilter === "ALL") return true;
    if (activeFilter === "PHOTO") {
      return client.services?.includes("Photography") || client.hasPhotoGallery;
    }
    if (activeFilter === "FILM") {
      return (
        client.services?.includes("Wedding Film") ||
        Boolean(
          client.films?.teaserUrl ||
          client.films?.fullWeddingFilmUrl ||
          client.films?.weddingFilmUrl ||
          client.films?.highlightUrl
        )
      );
    }
    if (activeFilter === "PRE_WED") {
      return (
        client.services?.includes("Pre-Wedding Film") ||
        client.services?.includes("Pre-Wedding Shoot") ||
        client.eventTags?.some((t) => t.toLowerCase().includes("pre-wedding"))
      );
    }
    return true;
  });

  const filterTabs: { label: string; key: FilterCategory }[] = [
    { label: "All Stories", key: "ALL" },
    { label: "Photography", key: "PHOTO" },
    { label: "Wedding Films", key: "FILM" },
    { label: "Pre-Weddings", key: "PRE_WED" },
  ];

  return (
    <div className="space-y-12">
      {/* Category Filter Tabs */}
      <nav className="flex items-center space-x-6 sm:space-x-10 border-b border-brand-accent/40 pb-4 overflow-x-auto no-scrollbar">
        {filterTabs.map((tab) => {
          const isSelected = activeFilter === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveFilter(tab.key)}
              className={`relative text-xs tracking-[0.2em] uppercase pb-2 whitespace-nowrap cursor-pointer transition-colors duration-200 select-none ${
                isSelected
                  ? "text-brand-text font-medium"
                  : "text-brand-text/50 hover:text-brand-text"
              }`}
            >
              {tab.label}
              {isSelected && (
                <span className="absolute bottom-[-1px] left-0 right-0 h-[1.5px] bg-brand-text" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Dynamic Single-Column Horizontal Rows */}
      <div className="flex flex-col divide-y divide-brand-accent/30">
        {filteredClients.map((client, idx) => {
          const categoryBadge = getDeliverableLabel(client);
          const year = client.date ? new Date(client.date).getFullYear() : "2026";
          const isReversed = idx % 2 !== 0;

          // Resolve display services
          const displayServices =
            client.services && client.services.length > 0
              ? client.services
              : [categoryBadge];

          return (
            <div
              key={client.slug}
              className="group py-12 md:py-20 first:pt-0 last:pb-0"
            >
              <Link
                href={`/portfolio/${client.slug}`}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center cursor-pointer"
              >
                {/* 1. Dynamic Natural-Aspect Image Frame */}
                <div
                  className={`w-full lg:col-span-7 flex ${
                    isReversed ? "lg:order-2 justify-end" : "lg:order-1 justify-start"
                  }`}
                >
                  <div className="relative w-fit max-w-full overflow-hidden bg-brand-accent/10 border border-brand-accent/30 transition-colors duration-500 group-hover:border-brand-accent">
                    <Image
                      src={client.featuredCover}
                      alt={`${client.coupleNames} Wedding at ${client.venue}`}
                      width={0}
                      height={0}
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority={idx === 0}
                      className="w-auto h-auto max-w-full max-h-[75vh] object-contain block transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />

                    {/* Primary Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] bg-brand-bg/90 backdrop-blur-sm border border-brand-accent/30 text-brand-text">
                        {categoryBadge}
                      </span>
                    </div>

                    {/* Index Tag */}
                    <div className="absolute top-3 right-3 z-10 px-2.5 py-1 text-[10px] uppercase tracking-widest text-brand-text bg-brand-bg/90 backdrop-blur-sm border border-brand-accent/30">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                  </div>
                </div>

                {/* 2. Editorial Metadata & Context */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-between self-center py-2 ${
                    isReversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between font-sans text-xs uppercase tracking-[0.25em] text-brand-text/60">
                      <span>{client.location}</span>
                      <span>{year}</span>
                    </div>

                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight text-brand-text group-hover:italic transition-all leading-[1.05]">
                      {client.coupleNames}
                    </h2>

                    <p className="font-sans text-xs text-brand-text/50 uppercase tracking-widest leading-relaxed">
                      {client.events?.map((e) => e.name).join(" • ") || client.venue}
                    </p>

                    {/* Commissioned Services Pills */}
                    <div className="pt-2 space-y-2">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-brand-text/40 block">
                        Services Commissioned
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {displayServices.map((service) => (
                          <span
                            key={service}
                            className="px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] border border-brand-accent/40 bg-brand-accent/10 rounded-full text-brand-text/80 font-light"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 lg:pt-12">
                    <span className="inline-flex items-center gap-3 font-sans text-xs uppercase tracking-[0.25em] text-brand-text border-b border-brand-text/80 pb-1 group-hover:border-brand-accent transition-colors">
                      View Story Framing
                      <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Fallback if a filter returns empty */}
      {filteredClients.length === 0 && (
        <div className="py-20 text-center">
          <p className="font-serif text-2xl italic text-brand-text/60">
            No stories found in this category.
          </p>
        </div>
      )}
    </div>
  );
}