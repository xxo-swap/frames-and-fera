// app/portfolio/page.tsx
import { clients } from "@/data/client";
import PortfolioGrid from "@/components/PortfolioGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — Wedding Visual Archive",
  description: "A curation of story-driven wedding photography and cinematic films across India.",
};

export default function PortfolioPage() {
  return (
    <main className="my-16 min-h-screen bg-brand-bg text-brand-text font-sans antialiased selection:bg-brand-accent selection:text-brand-bg">
      <header className="relative w-full border-b border-brand-accent/40 pt-24 pb-12 px-6 sm:px-12 md:px-20">
        <div className="max-w-7xl mx-auto space-y-3">
          {/* Scaled down ~20%: text-xs (12px) -> text-[10px] */}
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-accent">
            Archive
          </span>
          {/* Scaled down ~20%: text-5xl/7xl/8xl (48/72/96px) -> text-[38px]/text-5xl/text-[64px] */}
          <h1 className="font-serif text-[38px] sm:text-5xl md:text-[64px] tracking-tight leading-[0.9] font-light text-brand-text">
            Selected Stories
          </h1>
          {/* Scaled down ~20%: text-sm/text-base (14/16px) -> text-[11px] sm:text-[13px] */}
          <p className="text-[11px] sm:text-[13px] text-brand-text/60 max-w-xl font-light pt-1.5 leading-relaxed">
            Capturing unscripted human emotion and cinematic celebrations across destination venues.
          </p>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 py-12">
        <PortfolioGrid initialClients={clients} />
      </section>
    </main>
  );
}