// components/PortfolioGrid.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { ClientPortfolio } from "@/data/client";

interface Props {
  initialClients: ClientPortfolio[];
}

export default function PortfolioGrid({ initialClients }: Props) {
  // Exclude clients that only have films and no photo gallery
  const photoClients = initialClients.filter((client) => {
    const hasPhotos =
      Boolean(client.hasPhotoGallery) ||
      Boolean(client.events?.some((e) => e.images && e.images.length > 0));

    return hasPhotos;
  });

  return (
    <div className="w-full flex flex-col divide-y divide-brand-accent/30">
      {photoClients.map((client, idx) => {
        const isReversed = idx % 2 !== 0;

        return (
          <div
            key={client.slug}
            className="group py-12 md:py-20 first:pt-0 last:pb-0"
          >
            <Link
              href={`/portfolio/${client.slug}`}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 lg:gap-16 items-center"
            >
              {/* 1. Dynamic Natural-Aspect Image Frame */}
              <div
                className={`w-full md:col-span-7 flex flex-col gap-2 ${
                  isReversed
                    ? "md:order-2 md:items-end"
                    : "md:order-1 md:items-start"
                }`}
              >
                <div className="relative w-fit max-w-full overflow-hidden bg-brand-accent/10 border border-brand-accent/30">
                  <Image
                    src={client.featuredCover}
                    alt={client.coupleNames}
                    width={0}
                    height={0}
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority={idx === 0}
                    className="w-auto h-auto max-w-full max-h-[75vh] object-contain block transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                </div>
              </div>

              {/* 2. Metadata */}
              <div
                className={`w-full md:col-span-5 flex flex-col justify-center gap-4 ${
                  isReversed
                    ? "md:order-1 md:text-left"
                    : "md:order-2 md:text-left"
                }`}
              >
                <div className="space-y-1.5 md:space-y-2">
                  <h3 className="font-serif text-lg md:text-xl lg:text-xl uppercase tracking-tight text-brand-text transition-all leading-[1.05]">
                    {client.coupleNames}
                  </h3>
                  <div className="flex items-center font-sans text-[9px] sm:text-[12px] uppercase tracking-[0.25em] text-brand-text/60">
                    <span>{client.location}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}