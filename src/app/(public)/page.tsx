import { HeroSection } from "@/components/sections/HeroSection";
import { AnnouncementBanner } from "@/components/sections/AnnouncementBanner";
import { PancaJiwaSection } from "@/components/sections/PancaJiwaSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { HighlightSection } from "@/components/sections/HighlightSection";
import { GalleryFeed } from "@/components/sections/GalleryFeed";
import { LocationMapSection } from "@/components/sections/LocationMapSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <HeroSection />
      <AnnouncementBanner />
      <PancaJiwaSection />
      <NewsSection />
      <HighlightSection />
      <GalleryFeed />
      <LocationMapSection />
    </div>
  );
}
