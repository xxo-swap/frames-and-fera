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
    <main className="min-h-screen bg-[#0f0e0d] text-[#e8e4df] font-sans antialiased selection:bg-[#c4a47c] selection:text-black">
      {/* Editorial Archive Header */}
      <header className="relative w-full border-b border-white/10 pt-28 pb-16 px-6 sm:px-12 md:px-20 bg-gradient-to-b from-[#141211] to-[#0f0e0d]">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#c4a47c]">
            Visual Archive
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl tracking-tight leading-[0.9] font-light text-[#f5f2eb]">
            Selected Stories
          </h1>
          <p className="text-sm sm:text-base text-white/50 max-w-xl font-light pt-2">
            Capturing unscripted human emotion and cinematic celebrations across destination venues.
          </p>
        </div>
      </header>

      {/* Interactive Gallery Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 py-16">
        <PortfolioGrid initialClients={clients} />
      </section>
    </main>
  );
}