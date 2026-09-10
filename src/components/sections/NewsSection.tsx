import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { createClient } from "@/lib/supabase/server";
import type { Berita } from "@/lib/supabase/types";

async function getBerita(): Promise<Berita[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("berita")
      .select("*")
      .eq("status", "Terbit")
      .order("created_at", { ascending: false })
      .limit(4);
    return data ?? [];
  } catch {
    return [];
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

export async function NewsSection() {
  const newsItems = await getBerita();

  // Fallback ke data placeholder jika DB belum terisi
  if (newsItems.length === 0) {
    return (
      <section className="py-18 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="flex-1">
              <SectionHeading
                title="Berita &amp; Informasi Terbaru"
                subtitle="Dapatkan kabar terkini seputar aktivitas, prestasi, dan pengumuman penting dari civitas akademika Al-Rahmah."
                badge="Kabar Al-Rahmah"
              />
            </div>
          </div>
          <div className="flex items-center justify-center py-16 text-gray-400 text-sm">
            Belum ada berita yang diterbitkan.
          </div>
        </div>
      </section>
    );
  }

  const featuredNews = newsItems[0];
  const recommendedNews = newsItems.slice(1);

  return (
    <section className="py-18 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="flex-1">
            <SectionHeading
              title="Berita &amp; Informasi Terbaru"
              subtitle="Dapatkan kabar terkini seputar aktivitas, prestasi, dan pengumuman penting dari civitas akademika Al-Rahmah."
              badge="Kabar Al-Rahmah"
            />
          </div>
          <Link href="/media/berita" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-lime/10 text-brand-primary font-semibold rounded-xl hover:bg-brand-lime/20 transition-colors w-fit shrink-0">
            Lihat Semua Berita
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Desktop */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {newsItems.map((item) => (
            <article key={item.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-brand-primary/20 hover:shadow-xl hover:shadow-brand-primary/5 transition-all duration-300">
              <div className="relative h-56 overflow-hidden">
                {item.thumbnail_url ? (
                  <img src={item.thumbnail_url} alt={item.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-brand-primary to-brand-secondary" />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-brand-lime/40 to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-brand-primary text-xs font-bold tracking-wide rounded-full shadow-sm">{item.kategori}</span>
                </div>
              </div>
              <div className="p-6 flex flex-col grow">
                <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-4">
                  <div className="flex items-center gap-1.5"><Calendar size={14} className="text-brand-lime" /><span>{formatDate(item.created_at)}</span></div>
                  <div className="flex items-center gap-1.5"><User size={14} className="text-brand-lime" /><span>{item.author}</span></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-brand-primary transition-colors line-clamp-2">
                  <Link href={"/media/berita/" + item.slug} className="focus:outline-none">
                    <span className="absolute inset-0 z-10" aria-hidden="true" />
                    {item.judul}
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">{item.excerpt}</p>
                <div className="mt-auto flex items-center gap-2 text-brand-primary font-semibold text-sm group/btn">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile */}
        <div className="flex flex-col gap-6 md:hidden">
          <article className="relative w-full aspect-4/3 rounded-2xl overflow-hidden group shadow-sm">
            <Link href={"/media/berita/" + featuredNews.slug} className="absolute inset-0 z-20"><span className="sr-only">{featuredNews.judul}</span></Link>
            {featuredNews.thumbnail_url ? (
              <img src={featuredNews.thumbnail_url} alt={featuredNews.judul} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-brand-secondary" />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-gray-900/90 via-gray-900/30 to-transparent pointer-events-none" />
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 bg-brand-primary text-white text-xs font-semibold tracking-wide rounded-full shadow-sm">{featuredNews.kategori}</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
              <div className="flex items-center gap-2 text-white/80 text-xs font-medium mb-2.5">
                <span>{featuredNews.author}</span><span className="w-1 h-1 rounded-full bg-white/50" /><span>{formatDate(featuredNews.created_at)}</span>
              </div>
              <h3 className="text-lg font-bold text-white leading-snug line-clamp-3">{featuredNews.judul}</h3>
            </div>
          </article>
          <div className="flex flex-col gap-5 mt-2">
            {recommendedNews.map((item) => (
              <article key={item.id} className="group flex gap-4 items-center bg-transparent relative">
                <Link href={"/media/berita/" + item.slug} className="absolute inset-0 z-20"><span className="sr-only">{item.judul}</span></Link>
                <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden shadow-sm">
                  {item.thumbnail_url ? (
                    <img src={item.thumbnail_url} alt={item.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-brand-primary to-brand-secondary" />
                  )}
                </div>
                <div className="flex flex-col justify-center flex-1 py-1">
                  <span className="text-brand-primary text-xs font-semibold mb-1">{item.kategori}</span>
                  <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 mb-2 group-hover:text-brand-primary transition-colors">{item.judul}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    <span>{item.author}</span><span className="w-1 h-1 rounded-full bg-gray-300" /><span>{formatDate(item.created_at)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
