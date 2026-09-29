import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import type { Berita } from "@/lib/supabase/types";
import { getBeritaImages, cleanBeritaContent } from "@/lib/utils/newsGallery";
import { NewsCategoryBadge } from "./NewsCategoryBadge";
import { NewsImageCarousel } from "./NewsImageCarousel";

export type NewsArticleData = Pick<
  Berita,
  "judul" | "kategori" | "created_at" | "excerpt" | "konten" | "thumbnail_url" | "gambar_urls"
>;

export function NewsArticle({
  berita,
  showFooter = true,
}: {
  berita: NewsArticleData;
  showFooter?: boolean;
}) {
  const formattedDate = new Date(berita.created_at).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const images = getBeritaImages(berita);
  const articleContent = cleanBeritaContent(berita.konten);

  return (
    <>
      {images.length > 0 && (
        <div className="mb-6 w-full sm:mb-8">
          <NewsImageCarousel images={images} alt={berita.judul} />
        </div>
      )}

      <article className="w-full max-w-4xl">
        <div className="mb-3 flex flex-wrap items-center gap-2.5 text-xs text-zinc-500 sm:mb-4">
          <NewsCategoryBadge category={berita.kategori} />
          <span className="text-zinc-300" aria-hidden="true">&bull;</span>
          <div className="flex items-center gap-1.5">
            <Calendar size={13} className="text-brand-primary/80" aria-hidden="true" />
            <span>{formattedDate}</span>
          </div>
        </div>

        <h1 className="mb-4 font-heading text-2xl font-bold leading-snug text-zinc-900 sm:mb-5 sm:text-3xl md:text-4xl">
          {berita.judul}
        </h1>

        {berita.excerpt && (
          <p className="mb-6 border-b border-zinc-200/80 pb-6 text-sm font-normal leading-relaxed text-zinc-600 sm:text-base md:text-lg">
            {berita.excerpt}
          </p>
        )}

        <div className="space-y-4 font-sans text-sm leading-relaxed text-zinc-700 sm:text-base">
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

        {showFooter && (
          <div className="mt-10 flex flex-col justify-between gap-4 border-t border-zinc-200/80 pt-6 sm:flex-row sm:items-center">
            <div className="text-xs text-zinc-400">
              <span>Dipublikasikan oleh Humas Pondok Pesantren Al-Rahmah</span>
            </div>
            <Link
              href="/media/berita"
              className="group inline-flex items-center gap-1.5 text-xs font-semibold text-brand-primary underline-offset-4 hover:underline sm:text-sm"
            >
              <span>Lihat Berita Lainnya</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        )}
      </article>
    </>
  );
}
