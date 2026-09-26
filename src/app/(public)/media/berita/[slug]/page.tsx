import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { NewsImageCarousel } from "@/components/news/NewsImageCarousel";
import { getBeritaImages, cleanBeritaContent } from "@/lib/utils/newsGallery";
import { calculateReadTime } from "@/lib/utils/formatNews";
import { getBeritaBySlug } from "@/lib/data/news";
import { NewsCategoryBadge } from "@/components/news/NewsCategoryBadge";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const berita = await getBeritaBySlug(slug);
  if (!berita) {
    return { title: "Berita Tidak Ditemukan - Al-Rahmah" };
  }
  return {
    title: `${berita.judul} - Al-Rahmah`,
    description: berita.excerpt || berita.judul,
  };
}

export default async function DetailBeritaPage({ params }: PageProps) {
  const { slug } = await params;
  const berita = await getBeritaBySlug(slug);

  if (!berita) {
    notFound();
  }

  const formattedDate = new Date(berita.created_at).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const images = getBeritaImages(berita);
  const articleContent = cleanBeritaContent(berita.konten);
  const readTime = calculateReadTime(berita.konten || berita.excerpt);

  return (
    <main className="min-h-screen bg-surface/40 pt-28 pb-20 sm:pt-32 sm:pb-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Navigation Breadcrumb / Back button */}
        <div className="mb-5 sm:mb-6">
          <Link
            href="/media/berita"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm text-zinc-500 hover:text-brand-primary font-medium transition-colors"
          >
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            <span>Kembali ke Semua Berita</span>
          </Link>
        </div>

        {/* 1. FOTO DOKUMENTASI BESAR DI BAGIAN ATAS (Tanpa Card, Tanpa Border, Tanpa Rounded) */}
        {images.length > 0 && (
          <div className="mb-6 sm:mb-8 w-full">
            <NewsImageCarousel
              images={images}
              alt={berita.judul}
            />
          </div>
        )}

        {/* 2. DETAIL BERITA DI BAWAH FOTO BESAR (Tanpa Card, Lebar Baca Nyaman) */}
        <article className="w-full max-w-4xl">
          {/* Badge Kategori, Tanggal & Estimasi Waktu Baca */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-zinc-500 mb-3 sm:mb-4">
            <NewsCategoryBadge category={berita.kategori} />
            <span className="text-zinc-300">•</span>
            <div className="flex items-center gap-1.5">
              <Calendar size={13} className="text-brand-primary/80" aria-hidden="true" />
              <span>{formattedDate}</span>
            </div>
            <span className="text-zinc-300">•</span>
            <div className="flex items-center gap-1.5">
              <Clock size={13} className="text-brand-primary/80" aria-hidden="true" />
              <span>{readTime}</span>
            </div>
          </div>

          {/* Judul Berita — Tipografi Proporsional & Bersih (Skills System) */}
          <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-zinc-900 leading-snug tracking-tight mb-4 sm:mb-5">
            {berita.judul}
          </h1>

          {/* Ringkasan / Excerpt jika ada — Elegan & Non-slop */}
          {berita.excerpt && (
            <p className="text-sm sm:text-base md:text-lg text-zinc-600 leading-relaxed font-normal mb-6 pb-6 border-b border-zinc-200/80">
              {berita.excerpt}
            </p>
          )}

          {/* Isi Konten Berita */}
          <div className="text-sm sm:text-base text-zinc-700 leading-relaxed space-y-4 font-sans">
            {articleContent ? (
              articleContent.split("\n").map((paragraph, index) => {
                const trimmed = paragraph.trim();
                if (!trimmed) return null;
                return <p key={index}>{trimmed}</p>;
              })
            ) : (
              <p className="text-zinc-400 italic">Konten berita belum tersedia.</p>
            )}
          </div>

          {/* Footer Artikel */}
          <div className="mt-10 pt-6 border-t border-zinc-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-zinc-400">
              <span>Dipublikasikan oleh Humas Pondok Pesantren Al-Rahmah</span>
            </div>
            <Link
              href="/media/berita"
              className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-primary underline-offset-4 hover:underline"
            >
              <span>Lihat Berita Lainnya</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
