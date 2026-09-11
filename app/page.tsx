import FeaturedWork from "@/components/FeaturedWork";
import Hero from "@/components/Hero";
import Testimonials from "@/components/testimonial";
  
export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <FeaturedWork/>
      <Testimonials />
    </main>
  );
}