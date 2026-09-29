import { Suspense } from "react";
import { BeritaSection } from "@/components/media/BeritaSection";
import styles from "@/components/news/NewsEntrance.module.css";
import { NEWS_CATEGORIES, getNewsCategory } from "@/lib/constants/newsCategories";

export const metadata = {
  title: "Berita Al-Rahmah",
  description: "Berita kegiatan santri, kejuaraan, dan informasi akademik Pondok Pesantren Al-Rahmah Walantaka.",
};

export default async function MediaPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string | string[] }>;
}) {
  const { kategori } = await searchParams;
  const category = typeof kategori === "string" && kategori.trim()
    ? getNewsCategory(kategori)
    : "Semua";
  const initialCategory = NEWS_CATEGORIES.find((item) => item === category) ?? "Semua";

  return (
    <div className="min-h-screen bg-surface/40 pt-28 pb-20 sm:pt-32 sm:pb-24">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <header className={`${styles.heading} mb-6 sm:mb-8`}>
          <h1 id="berita-heading" className="font-heading text-2xl font-bold tracking-tight text-brand-primary sm:text-3xl lg:text-[32px]">
            Berita Al-Rahmah
          </h1>
          <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
            Kegiatan santri, kabar kejuaraan, dan informasi akademik Al-Rahmah.
          </p>
        </header>

        <section id="berita" aria-labelledby="berita-heading" className="scroll-mt-28">
          <Suspense
            fallback={
              <div role="status" className="flex min-h-48 items-center justify-center rounded-2xl bg-white/60 px-4 text-sm text-zinc-500">
                Memuat berita…
              </div>
            }
          >
            <BeritaSection key={initialCategory} initialCategory={initialCategory} />
          </Suspense>
        </section>
      </div>
    </div>
  );
}
