import { HeroSection } from "@/components/HeroSection";
import { PageFooter } from "@/components/PageFooter";
import { getHeroContent } from "@/lib/article";

export default function HomePage() {
  const hero = getHeroContent();

  return (
    <>
      <HeroSection {...hero} />
      <PageFooter variant="home" />
    </>
  );
}
