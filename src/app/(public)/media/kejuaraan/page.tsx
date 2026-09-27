import { BeritaSection } from "@/components/media/BeritaSection";

export const metadata = {
  title: "Kejuaraan | Berita Al-Rahmah",
  description: "Berita kegiatan santri, kejuaraan, dan informasi akademik Pondok Pesantren Al-Rahmah Walantaka.",
};

export default function KejuaraanPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-24 min-h-screen bg-surface/40">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <header className="mb-6 sm:mb-8">
          <h1 className="font-heading text-2xl font-bold tracking-tight text-brand-primary sm:text-3xl lg:text-[32px]">
            Berita Al-Rahmah
          </h1>
          <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
            Kegiatan santri, kabar kejuaraan, dan informasi akademik Al-Rahmah.
          </p>
        </header>
        <BeritaSection initialCategory="Kejuaraan" />
      </div>
    </div>
  );
}
