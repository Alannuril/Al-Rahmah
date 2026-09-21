import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NewsCard } from "@/components/news/NewsCard";
import { createClient } from "@/lib/supabase/server";
import type { Berita } from "@/lib/supabase/types";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

const DUMMY_BERITA: Berita[] = [
  {
    id: "dummy-1",
    judul: "Santri Al-Rahmah Raih Prestasi Gemilang pada Musabaqah Hifdzil Qur'an Tingkat Provinsi",
    slug: "santri-al-rahmah-raih-juara-mhq-provinsi",
    konten: null,
    excerpt: "Kafilah santri Pondok Pesantren Al-Rahmah berhasil menorehkan prestasi membanggakan dengan meraih juara cabang tahfidz Al-Qur'an tingkat provinsi.",
    kategori: "Prestasi",
    thumbnail_url: "https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=1200&auto=format&fit=crop",
    author: "Humas Al-Rahmah",
    status: "Terbit",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "dummy-2",
    judul: "Pembekalan Santri Akhir: Membangun Kemandirian dan Karakter Kepemimpinan Ummat",
    slug: "pembekalan-santri-akhir-kemandirian-kepemimpinan",
    konten: null,
    excerpt: "Menjelang kelulusan, santri akhir mengikuti program pembekalan intensif kepemimpinan dan pengabdian masyarakat guna persiapan masa depan.",
    kategori: "Kegiatan",
    thumbnail_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
    author: "Biro Pengasuhan",
    status: "Terbit",
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "dummy-3",
    judul: "Pondok Pesantren Al-Rahmah Membuka Pendaftaran Santri Baru (PSB) Tahun Ajaran 2026/2027",
    slug: "penerimaan-santri-baru-psb-2026-2027",
    konten: null,
    excerpt: "Pendaftaran santri baru untuk jenjang MTs dan MA resmi dibuka. Temukan informasi persyaratan, jadwal tes, dan alur pendaftaran terpadu.",
    kategori: "Pengumuman",
    thumbnail_url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
    author: "Panitia PSB",
    status: "Terbit",
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: "dummy-4",
    judul: "Pekan Bahasa Santri: Mengasah Kecakapan Berbahasa Arab & Inggris Berstandar Global",
    slug: "pekan-bahasa-santri-arab-inggris",
    konten: null,
    excerpt: "Meningkatkan kemampuan komunikasi bilingual santri melalui pekan bahasa intensif, pidato bahasa Arab & Inggris, serta simulasi debat internasional.",
    kategori: "Akademik",
    thumbnail_url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop",
    author: "Bagian Bahasa",
    status: "Terbit",
    created_at: new Date(Date.now() - 86400000 * 8).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 8).toISOString(),
  },
];

async function getBerita(): Promise<Berita[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("berita")
      .select("*")
      .eq("status", "Terbit")
      .order("created_at", { ascending: false })
      .limit(4);

    if (data && data.length > 0) {
      return data;
    }
    return DUMMY_BERITA;
  } catch {
    return DUMMY_BERITA;
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

export async function NewsSection() {
  const newsItems = await getBerita();

  const featuredNews = newsItems[0];
  const recommendedNews = newsItems.slice(1);

  return (
    <section className="py-14 sm:py-16 md:py-20 bg-white relative">
      {/* Modern Hairline Divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header Section */}
        <ScrollReveal variant="fade-up" duration={0.6}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 md:mb-12 gap-4 sm:gap-6">
            <div className="flex-1">
              <SectionHeading
                title="Berita &amp; Informasi Terbaru"
                subtitle="Dapatkan kabar terkini seputar aktivitas, prestasi, dan pengumuman penting dari civitas akademika Al-Rahmah."
              />
            </div>
            <Link
              href="/media/berita"
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white font-semibold text-xs sm:text-sm rounded-2xl transition-all duration-300 w-fit shrink-0 shadow-xs"
            >
              <span>Lihat Semua Berita</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </ScrollReveal>

        {/* --- DESKTOP VIEW (4 Clean Columns - Editorial Design System with Stagger) --- */}
        <StaggerContainer staggerDelay={0.1} className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {newsItems.map((item) => (
            <StaggerItem key={item.id} variant="fade-up">
              <NewsCard berita={item} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* --- MOBILE VIEW (1 Featured + 3 Compact List Cards) --- */}
        <ScrollReveal variant="fade-up" className="flex flex-col gap-4 md:hidden">
          {/* Featured Card */}
          <article className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden group shadow-xs">
            <Link href={"/media/berita/" + featuredNews.slug} className="absolute inset-0 z-20">
              <span className="sr-only">{featuredNews.judul}</span>
            </Link>
            {featuredNews.thumbnail_url ? (
              <img
                src={featuredNews.thumbnail_url}
                alt={featuredNews.judul}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-brand-secondary" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/35 to-transparent pointer-events-none" />
            
            <div className="absolute top-3 left-3 z-10">
              <span className="px-2.5 py-0.5 bg-brand-primary text-white text-[10px] font-bold rounded-lg shadow-xs">
                {featuredNews.kategori}
              </span>
            </div>

            <div className="absolute bottom-0 inset-x-0 p-4 z-10">
              <div className="text-white/80 text-[11px] font-medium mb-1.5">
                <span>{formatDate(featuredNews.created_at)}</span>
              </div>
              <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">
                {featuredNews.judul}
              </h3>
            </div>
          </article>

          {/* List of Other News */}
          <div className="flex flex-col gap-3">
            {recommendedNews.map((item) => (
              <article
                key={item.id}
                className="group flex gap-3.5 items-center bg-white p-3 rounded-2xl shadow-xs relative"
              >
                <Link href={"/media/berita/" + item.slug} className="absolute inset-0 z-20">
                  <span className="sr-only">{item.judul}</span>
                </Link>
                <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-zinc-100 relative">
                  {item.thumbnail_url ? (
                    <img
                      src={item.thumbnail_url}
                      alt={item.judul}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-brand-primary to-brand-secondary" />
                  )}
                </div>
                <div className="flex flex-col justify-center flex-1 min-w-0 py-0.5">
                  <span className="text-brand-primary text-[10px] font-bold uppercase tracking-wider mb-1">
                    {item.kategori}
                  </span>
                  <h3 className="font-heading font-bold text-zinc-900 text-xs sm:text-sm leading-snug line-clamp-2 mb-1 group-hover:text-brand-primary transition-colors">
                    {item.judul}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-medium">
                    <span>{formatDate(item.created_at)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
