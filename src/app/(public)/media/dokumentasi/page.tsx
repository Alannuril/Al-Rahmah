import { SectionHeading } from "@/components/ui/SectionHeading";
import { DokumentasiSection } from "@/components/media/DokumentasiSection";

export const metadata = {
  title: "Galeri Dokumentasi - Al-Rahmah",
  description: "Galeri dan dokumentasi visual Pondok Pesantren Al-Rahmah Walantaka.",
};

export default function DokumentasiPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-24 min-h-screen bg-surface/40">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="mb-10 sm:mb-14">
          <SectionHeading title="Galeri Dokumentasi" centered />
        </div>
        <DokumentasiSection />
      </div>
    </div>
  );
}
