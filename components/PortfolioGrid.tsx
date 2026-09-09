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

  // Determine deliverables badge dynamically
  const getDeliverableLabel = (client: ClientPortfolio) => {
    const isPreWed = client.eventTags.some((t) =>
      t.toLowerCase().includes("pre-wedding")
    );
    if (isPreWed) return "Pre-Wedding";

    const hasFilm = Boolean(
      client.films.teaserUrl ||
      client.films.fullWeddingFilmUrl ||
      client.films.highlightUrl
    );
    const hasPhoto = client.hasPhotoGallery;

    if (hasFilm && hasPhoto) return "Film & Photo";
    if (hasFilm) return "Cinematic Film";
    return "Photography";
  };

  // Filter clients based on user selection
  const filteredClients = initialClients.filter((client) => {
    if (activeFilter === "ALL") return true;
    if (activeFilter === "PHOTO") return client.hasPhotoGallery;
    if (activeFilter === "FILM") {
      return Boolean(
        client.films.teaserUrl ||
        client.films.fullWeddingFilmUrl ||
        client.films.highlightUrl
      );
    }
    if (activeFilter === "PRE_WED") {
      return client.eventTags.some((t) =>
        t.toLowerCase().includes("pre-wedding")
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
      <nav className="flex items-center space-x-6 sm:space-x-10 border-b border-white/10 pb-4 overflow-x-auto scrollbar-none">
        {filterTabs.map((tab) => {
          const isSelected = activeFilter === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveFilter(tab.key)}
              className={`relative text-xs tracking-[0.2em] uppercase pb-2 whitespace-nowrap cursor-pointer transition-colors duration-200 ${
                isSelected
                  ? "text-[#c4a47c] font-medium"
                  : "text-white/40 hover:text-white"
              }`}
            >
              {tab.label}
              {isSelected && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c4a47c]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Grid of Client Stories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {filteredClients.map((client) => {
          const categoryBadge = getDeliverableLabel(client);

          return (
            <Link
              key={client.slug}
              href={`/portfolio/${client.slug}`}
              className="group flex flex-col space-y-4 cursor-pointer"
            >
              {/* Card Thumbnail */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-white/[0.02] border border-white/10 transition-all duration-500 group-hover:border-white/30">
                <Image
                  src={client.featuredCover}
                  alt={`${client.coupleNames} Wedding at ${client.venue}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Subtle dark vignette on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                {/* Top Badge: Service Category */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-[10px] uppercase tracking-[0.2em] bg-black/60 backdrop-blur-md border border-white/10 text-white/80 rounded-full">
                    {categoryBadge}
                  </span>
                </div>

                {/* Bottom Overlay: Location Info */}
                <div className="absolute bottom-4 left-4 right-4 text-white/90 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#c4a47c]">
                    {client.location}
                  </p>
                </div>
              </div>

              {/* Card Meta details */}
              <div className="space-y-1">
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#f5f2eb] tracking-wide group-hover:text-[#c4a47c] transition-colors duration-300">
                  {client.coupleNames}
                </h2>
                <div className="flex items-center justify-between text-xs text-white/40 font-light">
                  <span className="line-clamp-1">{client.venue}</span>
                  <span className="whitespace-nowrap ml-2">
                    {new Date(client.date).getFullYear()}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Fallback if a filter returns empty */}
      {filteredClients.length === 0 && (
        <div className="py-20 text-center">
          <p className="font-serif text-2xl italic text-white/40">
            No stories found in this category.
          </p>
        </div>
      )}
    </div>
  );
}