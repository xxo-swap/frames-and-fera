import ArtisticFramesGrid from "@/components/ArtisticFramesGrid";
import EditorialQuoteSection from "@/components/EditorialQuoteSection";
import FeaturedWork from "@/components/FeaturedWork";
import GifHero from "@/components/GifHero";
import Hero from "@/components/Hero";
  
export default function Home() {
  return (
    <main className="w-full">
      <GifHero/>
      {/* <Hero /> */}
      <EditorialQuoteSection/>
      <FeaturedWork/>
      <ArtisticFramesGrid/>

    </main>
  );
}
