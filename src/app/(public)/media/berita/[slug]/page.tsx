import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Berita } from "@/lib/supabase/types";
import { NewsImageCarousel } from "@/components/news/NewsImageCarousel";
import { getBeritaImages, cleanBeritaContent } from "@/lib/utils/newsGallery";

import { DUMMY_BERITA } from "@/lib/constants/dummyNews";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getBeritaBySlug(slug: string): Promise<Berita | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("berita")
      .select("*")
      .eq("slug", slug)
      .eq("status", "Terbit")
      .single();
    if (data) return data;
    return DUMMY_BERITA.find((b) => b.slug === slug) ?? null;
  } catch {
    return DUMMY_BERITA.find((b) => b.slug === slug) ?? null;
  }
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

  return (
    <div className="flex flex-col w-full min-h-screen pt-28 pb-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
        {/* Breadcrumb / Back button */}
        <div className="mb-6">
          <Link
            href="/media/berita"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-primary font-medium transition-colors"
          >
            <ArrowLeft size={16} />
            Kembali ke Semua Berita
          </Link>
        </div>

        {/* Article Container */}
        <article className="bg-white rounded-3xl p-6 md:p-12 shadow-sm border border-gray-100 overflow-hidden">
          {/* Badge & Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs font-bold rounded-full">
              {berita.kategori}
            </span>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Calendar size={13} className="text-brand-primary" />
              <span>{formattedDate}</span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-2xl md:text-4xl font-heading font-bold text-gray-900 leading-tight mb-6">
            {berita.judul}
          </h1>

          {/* Excerpt if present */}
          {berita.excerpt && (
            <p className="text-gray-600 text-base md:text-lg italic leading-relaxed mb-8 border-l-4 border-brand-primary/30 pl-4 py-1 bg-gray-50/50 rounded-r-xl">
              {berita.excerpt}
            </p>
          )}

          {/* Multi-Image Carousel / Featured Image (Scrollable if >1 image) */}
          {images.length > 0 && (
            <NewsImageCarousel
              images={images}
              alt={berita.judul}
            />
          )}

          {/* Article Body */}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4 font-sans">
            {articleContent ? (
              articleContent.split("\n").map((paragraph, index) => {
                const trimmed = paragraph.trim();
                if (!trimmed) return null;
                return <p key={index}>{trimmed}</p>;
              })
            ) : (
              <p className="text-gray-400 italic">Konten berita belum tersedia.</p>
            )}
          </div>

          {/* Footer of article */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>Dipublikasikan oleh Humas Pondok Pesantren Al-Rahmah</span>
            </div>
            <Link
              href="/media/berita"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-100 hover:bg-brand-primary hover:text-white text-gray-700 text-sm font-semibold transition-all"
            >
              Lihat Berita Lainnya
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
