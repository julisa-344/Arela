import { Hero } from "@/components/sections/home/Hero";
import { BestSellers } from "@/components/sections/home/BestSellers";
import { PhilosophySection } from "@/components/sections/home/PhilosophySection";
import { CategoryShowcase } from "@/components/sections/home/CategoryShowcase";
import { AnatomySection } from "@/components/sections/home/AnatomySection";
import { EditorialBanner } from "@/components/sections/home/EditorialBanner";
import { NewArrivals } from "@/components/sections/home/NewArrivals";
import { IngredientsSection } from "@/components/sections/home/IngredientsSection";
import { ClosingStatement } from "@/components/sections/home/ClosingStatement";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BestSellers />
      <PhilosophySection />
      <CategoryShowcase />
      <AnatomySection />
      <EditorialBanner />
      <NewArrivals />
      <IngredientsSection />
      <ClosingStatement />
    </>
  );
}
