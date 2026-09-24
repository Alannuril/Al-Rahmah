import Link from "next/link";
import { ArrowRight, Calendar, User, Clock } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NewsCard } from "@/components/news/NewsCard";
import { createClient } from "@/lib/supabase/server";
import type { Berita } from "@/lib/supabase/types";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { calculateReadTime } from "@/lib/utils/formatNews";

const DUMMY_BERITA: Berita[] = [
  {
    id: "dummy-1",
    judul: "Santri Al-Rahmah Raih Prestasi Gemilang pada Musabaqah Hifdzil Qur'an Tingkat Provinsi",
    slug: "santri-al-rahmah-raih-juara-mhq-provinsi",
    konten: null,
    excerpt: "Kafilah santri Pondok Pesantren Al-Rahmah berhasil menorehkan prestasi membanggakan dengan meraih juara cabang tahfidz Al-Qur'an tingkat provinsi setelah melalui seleksi ketat antardaerah.",
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
  {
    id: "dummy-5",
    judul: "Kunjungan Edukasi & Pengenalan Sains Santri di Observatorium Nasional",
    slug: "kunjungan-edukasi-pengenalan-sains-santri",
    konten: null,
    excerpt: "Memperluas wawasan keilmuan astronomi dan sains modern, santri mengikuti kegiatan studi edukatif interaktif.",
    kategori: "Kunjungan",
    thumbnail_url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1200&auto=format&fit=crop",
    author: "Biro Humas",
    status: "Terbit",
    created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 10).toISOString(),
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
      .limit(5);

    if (data && data.length > 0) {
      return data;
    }
    return DUMMY_BERITA;
  } catch {
    return DUMMY_BERITA;
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function NewsSection() {
  const newsItems = await getBerita();

  const featuredNews = newsItems[0];
  const remainingNews = newsItems.slice(1);

  return (
    <section className="py-6 sm:py-10 md:py-12 bg-white relative">
      {/* Modern Hairline Divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Header Section */}
        <ScrollReveal variant="fade-up" duration={0.6}>
          <div className="mb-4 sm:mb-7">
            <SectionHeading
              title="Berita & Informasi Terbaru"
              subtitle="Dapatkan kabar terkini seputar aktivitas, prestasi, dan pengumuman penting dari civitas akademika Al-Rahmah."
            />
          </div>
        </ScrollReveal>

        {/* 1. CONTAINER BESAR PALING ATAS: BERITA PALING TERBARU (KOMPAK DI MOBILE) */}
        {featuredNews && (
          <ScrollReveal variant="fade-up" duration={0.6}>
            <article className="group relative mb-5 sm:mb-8">
              <div className="grid grid-cols-1 md:grid-cols-12 items-center md:items-start gap-3.5 sm:gap-6 lg:gap-8">
                {/* Foto pada Bagian Kiri: Kompak di Mobile & Rounded Halus */}
                <div className="md:col-span-5 lg:col-span-5 relative w-full aspect-[16/9] sm:aspect-[16/10] md:aspect-[4/3] lg:aspect-[16/10] max-h-[190px] sm:max-h-[260px] md:max-h-[290px] overflow-hidden bg-zinc-100 rounded-lg shadow-2xs">
                  <Link href={`/media/berita/${featuredNews.slug}`} className="absolute inset-0 z-10">
                    <span className="sr-only">{featuredNews.judul}</span>
                  </Link>

                  {featuredNews.thumbnail_url ? (
                    <img
                      src={featuredNews.thumbnail_url}
                      alt={featuredNews.judul}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-zinc-100 flex items-center justify-center text-zinc-400 font-heading font-bold text-xl">
                      Al-Rahmah
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 md:opacity-20 group-hover:opacity-30 transition-opacity" />

                  {/* Kategori Badge & Tag Terbaru */}
                  <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-20 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 bg-[#1E3F35] text-[#AED69F] text-[10px] sm:text-[11px] font-semibold rounded-md shadow-2xs">
                      Terbaru
                    </span>
                    <span className="px-2 py-0.5 bg-white/95 text-[#2A5C4E] text-[10px] sm:text-[11px] font-semibold rounded-md border border-zinc-200/80 shadow-2xs">
                      {featuredNews.kategori || "Berita"}
                    </span>
                  </div>
                </div>

                {/* Bagian Kanan: Judul Berita & Penjelasan Singkat */}
                <div className="md:col-span-7 lg:col-span-7 flex flex-col justify-between py-0.5 sm:py-1">
                  <div className="space-y-1.5 sm:space-y-3">
                    {/* Meta Info (Tanggal, Penulis, Read Time) */}
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-zinc-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} className="text-[#396E5F]" />
                        <span>{formatDate(featuredNews.created_at)}</span>
                      </div>
                      <span className="text-zinc-300">•</span>
                      {featuredNews.author && (
                        <>
                          <div className="flex items-center gap-1">
                            <User size={12} className="text-[#396E5F]" />
                            <span>{featuredNews.author}</span>
                          </div>
                          <span className="text-zinc-300">•</span>
                        </>
                      )}
                      <div className="flex items-center gap-1">
                        <Clock size={12} className="text-zinc-400" />
                        <span>{calculateReadTime(featuredNews.konten || featuredNews.excerpt)}</span>
                      </div>
                    </div>

                    {/* Judul Berita */}
                    <h3 className="font-heading font-bold text-base sm:text-xl lg:text-[22px] text-zinc-900 group-hover:text-[#396E5F] transition-colors duration-200 leading-snug">
                      <Link href={`/media/berita/${featuredNews.slug}`}>
                        {featuredNews.judul}
                      </Link>
                    </h3>

                    {/* Penjelasan Singkat */}
                    {featuredNews.excerpt && (
                      <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed line-clamp-2 sm:line-clamp-3">
                        {featuredNews.excerpt}
                      </p>
                    )}
                  </div>

                  {/* Tombol Aksi */}
                  <div className="pt-2.5 mt-3 sm:pt-3 sm:mt-4 border-t border-zinc-100 flex items-center justify-between">
                    <Link
                      href={`/media/berita/${featuredNews.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#396E5F] group-hover:text-[#1E3F35] transition-colors group/link"
                    >
                      <span>Baca Selengkapnya</span>
                      <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </ScrollReveal>
        )}

        {/* 2. BERITA LAINNYA: HORIZONTAL SWIPE DI MOBILE, 4-KOLOM DI DESKTOP */}
        {remainingNews.length > 0 && (
          <div className="mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-zinc-100">
            <div className="flex items-center justify-between mb-3.5 sm:mb-5">
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Berita Lainnya
                </h3>
                <span className="sm:hidden text-[10px] text-zinc-400 font-normal">
                  (Geser &rarr;)
                </span>
              </div>
              <Link
                href="/media/berita"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-[#396E5F]/10 text-[#396E5F] hover:bg-[#396E5F] hover:text-white font-semibold text-xs rounded-lg transition-all duration-300 w-fit shrink-0 shadow-2xs group"
              >
                <span>Lihat Semua Berita</span>
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Horizontal Snap Scroll pada Mobile, Grid pada Tablet & Desktop */}
            <StaggerContainer
              staggerDelay={0.06}
              className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory scrollbar-none"
            >
              {remainingNews.map((item) => (
                <StaggerItem
                  key={item.id}
                  variant="fade-up"
                  className="w-[260px] sm:w-auto shrink-0 snap-start h-full"
                >
                  <NewsCard berita={item} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        )}
      </div>
    </section>
  );
}
