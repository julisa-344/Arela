import { AboutHero } from "@/components/sections/nosotros/AboutHero";
import { ReasonsSection } from "@/components/sections/nosotros/ReasonsSection";
import { PillarsSection } from "@/components/sections/nosotros/PillarsSection";
import { TeamSection } from "@/components/sections/nosotros/TeamSection";
import { AboutCTA } from "@/components/sections/nosotros/AboutCTA";
import { SITE } from "@/shared/constants/site";

export const metadata = {
  title: `Nosotros | ${SITE.name}`,
};

export default function NosotrosPage() {
  return (
    <>
      <AboutHero />
      <ReasonsSection />
      <PillarsSection />
      <TeamSection />
      <AboutCTA />
    </>
  );
}
