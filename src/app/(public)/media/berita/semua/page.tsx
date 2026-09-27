import { Metadata } from "next";
import { getBeritaFeed } from "@/lib/data/news";
import { AllNewsArchiveClient } from "@/components/news/AllNewsArchiveClient";

export const metadata: Metadata = {
  title: "Semua Berita & Arsip - Al-Rahmah",
  description: "Arsip lengkap seluruh berita kegiatan, prestasi kejuaraan, dan informasi akademik Pondok Pesantren Al-Rahmah Walantaka.",
};

export default async function SemuaBeritaPage() {
  const allNews = await getBeritaFeed();

  return (
    <div className="min-h-screen bg-surface/40 pt-28 pb-20 sm:pt-32 sm:pb-24">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <AllNewsArchiveClient initialNews={allNews} />
      </div>
    </div>
  );
}
