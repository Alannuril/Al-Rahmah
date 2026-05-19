import { HeroSection } from "@/components/sections/HeroSection";
import { AlRahmahStats } from "@/components/sections/AlRahmahStats";
import { HighlightSection } from "@/components/sections/HighlightSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { GalleryFeed } from "@/components/sections/GalleryFeed";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <HeroSection />
      <AlRahmahStats />
      <HighlightSection />
      <NewsSection />
      <GalleryFeed />
    </div>
  );
}
