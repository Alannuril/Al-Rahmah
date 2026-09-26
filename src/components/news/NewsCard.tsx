import Link from "next/link";
import { NewsCategoryBadge } from "./NewsCategoryBadge";
import type { Berita } from "@/lib/supabase/types";
import { formatTimeAgo, calculateReadTime } from "@/lib/utils/formatNews";

interface NewsCardProps {
  berita: Berita;
  priority?: boolean;
  variant?: "overlay" | "standard";
}

export function NewsCard({ berita, variant = "overlay" }: NewsCardProps) {
  const timeAgo = formatTimeAgo(berita.created_at);
  const readTime = calculateReadTime(berita.konten || berita.excerpt);

  if (variant === "standard") {
    return (
      <Link
        href={`/media/berita/${berita.slug}`}
        className="group flex flex-row sm:flex-col items-center sm:items-stretch gap-3 sm:gap-0 py-2 first:pt-0 last:pb-0 sm:py-0 h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg transition-colors"
      >
        {/* Thumbnail Container */}
        <div className="relative w-20 h-20 sm:w-full sm:h-auto sm:aspect-[16/9] shrink-0 overflow-hidden rounded-lg bg-zinc-100">
          {berita.thumbnail_url ? (
            <img
              src={berita.thumbnail_url}
              alt={berita.judul}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white/30 font-heading font-bold text-lg sm:text-2xl">
              Al-Rahmah
            </div>
          )}
          <NewsCategoryBadge
            category={berita.kategori}
            className="absolute left-1.5 top-1.5 max-w-[calc(100%-0.75rem)] sm:left-2.5 sm:top-2.5"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center flex-1 min-w-0 py-0.5 sm:py-0">
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-zinc-400 sm:mt-2.5 mb-1 flex-wrap">
            <span>{timeAgo}</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">{readTime}</span>
          </div>

          <h3 className="font-heading font-bold text-xs sm:text-sm lg:text-base text-zinc-900 group-hover:text-brand-primary transition-colors duration-200 line-clamp-2 leading-snug tracking-tight mb-0 sm:mb-1.5">
            {berita.judul}
          </h3>

          {berita.excerpt && (
            <p className="hidden sm:line-clamp-2 text-xs sm:text-sm text-zinc-500 leading-relaxed mb-2 grow">
              {berita.excerpt}
            </p>
          )}
        </div>
      </Link>
    );
  }

  // Overlay Variant: Judul di bagian bawah kiri foto dengan gradasi halus dari bawah ke atas
  return (
    <Link
      href={`/media/berita/${berita.slug}`}
      className="group flex flex-col w-full h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg transition-colors"
    >
      {/* Thumbnail Container with Title & Soft Gradient Overlay */}
      <div className="relative w-full aspect-[16/10] shrink-0 overflow-hidden rounded-lg bg-zinc-100 shadow-2xs">
        {berita.thumbnail_url ? (
          <img
            src={berita.thumbnail_url}
            alt={berita.judul}
              loading="lazy"
              decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white/30 font-heading font-bold text-xl">
            Al-Rahmah
          </div>
        )}

        {/* Soft Gradient Overlay dari Bawah ke Atas */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        <NewsCategoryBadge
          category={berita.kategori}
          className="absolute left-2.5 top-2.5 z-10 max-w-[calc(100%-1.25rem)]"
        />

        {/* Judul Berita pada Bagian Bawah Kiri Foto */}
        <div className="absolute bottom-0 inset-x-0 p-3 sm:p-3.5 z-10 flex flex-col justify-end">
          <h3 className="font-heading font-bold text-xs sm:text-sm lg:text-[15px] text-white group-hover:text-[#AED69F] transition-colors duration-200 line-clamp-2 leading-snug drop-shadow-xs">
            {berita.judul}
          </h3>
        </div>
      </div>

      {/* Meta & Excerpt di Bawah Foto */}
      <div className="flex flex-col flex-1 min-w-0 pt-2.5">
        {/* Meta: Kategori, Relatif Waktu, Waktu Baca */}
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-zinc-400 mb-1 flex-wrap">
          <span>{timeAgo}</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">{readTime}</span>
        </div>

        {/* Penjelasan Singkat (Excerpt) */}
        {berita.excerpt && (
          <p className="line-clamp-2 text-xs text-zinc-500 leading-relaxed">
            {berita.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
