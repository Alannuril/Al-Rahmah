import { HeroSection } from "@/components/sections/HeroSection";
import { HighlightSection } from "@/components/sections/HighlightSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { GalleryFeed } from "@/components/sections/GalleryFeed";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <HeroSection />
      <HighlightSection />
      <NewsSection />
      <GalleryFeed />
    </div>
  );
}
