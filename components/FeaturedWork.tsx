"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clients } from "@/data/client";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement[]>([]);

  const featuredClients = clients.slice(0, 3);

  useGSAP(
    () => {
      rowsRef.current.forEach((row) => {
        if (!row) return;

        gsap.fromTo(
          row,
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="w-full px-6 py-16 md:px-12 md:py-28 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-24 pb-6 border-b border-brand-accent/40 gap-4">
        <div>
          <h2 className="font-serif text-3xl md:text-5xl uppercase tracking-light sm:tracking-tight text-brand-text">
            Featured Stories
          </h2>
        </div>
        <Link
          href="/portfolio"
          className="font-sans text-xs uppercase tracking-[0.2em] text-brand-text hover:italic border-b border-brand-text w-fit py-1 transition-all"
        >
          View All Stories ({clients.length})
        </Link>
      </div>

      {/* Dynamic Single-Column Horizontal Rows */}
      <div className="flex flex-col divide-y divide-brand-accent/30">
        {featuredClients.map((client, idx) => {
          const year = client.date
            ? new Date(client.date).getFullYear()
            : "2026";
          const isReversed = idx % 2 !== 0;

          return (
            <div
              key={client.slug}
              ref={(el) => {
                if (el) rowsRef.current[idx] = el;
              }}
              className="group py-12 md:py-20 first:pt-0 last:pb-0"
            >
              <Link
                href={`/portfolio/${client.slug}`}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
              >
                {/* 1. Dynamic Natural-Aspect Image Frame */}
                <div
                  className={`w-full lg:col-span-7 flex ${
                    isReversed
                      ? "lg:order-2 justify-end"
                      : "lg:order-1 justify-start"
                  }`}
                >
                  {/* The container fits strictly to the image's dynamic bounds */}
                  <div className="relative w-fit max-w-full overflow-hidden bg-brand-accent/10 border border-brand-accent/30">
                    <Image
                      src={client.featuredCover}
                      alt={client.coupleNames}
                      width={0}
                      height={0}
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority={idx === 0}
                      className="w-auto h-auto max-w-full max-h-[75vh] object-contain block transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />

                    {/* Frame tag snaps to the real corner */}
                    <div className="absolute top-3 left-3 z-10 bg-brand-bg/90 backdrop-blur-sm px-2.5 py-1 font-sans text-[10px] uppercase tracking-widest text-brand-text border border-brand-accent/30">
                      0{idx + 1}
                    </div>
                  </div>
                </div>

                {/* 2. Editorial Metadata & Context */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-between self-center py-2 ${
                    isReversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="space-y-3 md:space-y-4">
                    <div className=" flex items-center justify-between font-sans text-[10px] sm:text-xs uppercase tracking-[0.25em] text-brand-text/60">
                      <span>{client.location}</span>
                      <span>{year}</span>
                    </div>

                    <h3 className="font-serif text-xl md:text-4xl lg:text-5xl uppercase tracking-tight text-brand-text group-hover:italic transition-all leading-[1.05]">
                      {client.coupleNames}
                    </h3>

                    <p className="font-sans text-[10px] sm:text-xstext-brand-text/50 uppercase tracking-widest leading-relaxed">
                      {client.events?.map((e) => e.name).join(" • ") ||
                        client.venue}
                    </p>
                  </div>

                  <div className="pt-4 lg:pt-14">
                    <span className="inline-flex items-center gap-3 font-sans text-[10px] sm:text-xs uppercase tracking-[0.25em] text-brand-text border-b border-brand-text/80 pb-1 group-hover:border-brand-accent transition-colors">
                      View Story
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
    </section>
  );
}
