import FeaturedWork from "@/components/FeaturedWork";
import Hero from "@/components/Hero";
  
export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <FeaturedWork/>
    </main>
  );
}