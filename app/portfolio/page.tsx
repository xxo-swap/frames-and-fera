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
      <header className="relative w-full border-b border-brand-accent/40 pt-28 pb-16 px-6 sm:px-12 md:px-20">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-accent">
            Archive
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl tracking-tight leading-[0.9] font-light text-brand-text">
            Selected Stories
          </h1>
          <p className="text-sm sm:text-base text-brand-text/60 max-w-xl font-light pt-2">
            Capturing unscripted human emotion and cinematic celebrations across destination venues.
          </p>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 py-16">
        <PortfolioGrid initialClients={clients} />
      </section>
    </main>
  );
}