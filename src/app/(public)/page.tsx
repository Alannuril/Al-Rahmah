import { HeroSection } from "@/components/sections/HeroSection";
import { AnnouncementBanner } from "@/components/sections/AnnouncementBanner";
import { AlRahmahStats } from "@/components/sections/AlRahmahStats";
import { HighlightSection } from "@/components/sections/HighlightSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { GalleryFeed } from "@/components/sections/GalleryFeed";
import { LocationMapSection } from "@/components/sections/LocationMapSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <HeroSection />
      <AnnouncementBanner />
      <AlRahmahStats />
      <HighlightSection />
      <NewsSection />
      <GalleryFeed />
      <LocationMapSection />
    </div>
  );
}
