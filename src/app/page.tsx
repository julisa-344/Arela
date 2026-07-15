import { Hero } from "@/components/sections/home/Hero";
import { BestSellers } from "@/components/sections/home/BestSellers";
import { CategoryShowcase } from "@/components/sections/home/CategoryShowcase";
import { IngredientsSection } from "@/components/sections/home/IngredientsSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BestSellers />
      <CategoryShowcase />
      <IngredientsSection />
    </>
  );
}
