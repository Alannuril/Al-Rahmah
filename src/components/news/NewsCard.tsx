import Link from "next/link";
import { NewsCategoryBadge } from "./NewsCategoryBadge";
import type { Berita } from "@/lib/supabase/types";
import { formatTimeAgo } from "@/lib/utils/formatNews";

interface NewsCardProps {
  berita: Berita;
  priority?: boolean;
  variant?: "overlay" | "standard";
}

export function NewsCard({ berita, variant = "standard" }: NewsCardProps) {
  const timeAgo = formatTimeAgo(berita.created_at);

  if (variant === "standard") {
    return (
      <Link
        href={`/media/berita/${berita.slug}`}
        className="group flex flex-row sm:flex-col items-start sm:items-stretch gap-3.5 sm:gap-0 py-3.5 first:pt-0 last:pb-0 sm:py-0 h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-xl transition-all"
      >
        {/* Thumbnail Container: Sisi Kiri pada Mobile, Atas pada Desktop */}
        <div className="relative w-28 h-24 sm:w-full sm:h-auto sm:aspect-[16/10] shrink-0 overflow-hidden rounded-xl bg-zinc-100 shadow-2xs border border-zinc-200/40">
          {berita.thumbnail_url ? (
            <img
              src={berita.thumbnail_url}
              alt={berita.judul}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brand-primary/10 to-brand-primary/5 flex items-center justify-center text-brand-primary/40 font-heading font-bold text-xs sm:text-xl">
              Al-Rahmah
            </div>
          )}

          {/* Badge Kategori jenis berita (kompak di mobile) */}
          <NewsCategoryBadge
            category={berita.kategori}
            className="absolute left-1.5 top-1.5 sm:left-2.5 sm:top-2.5 z-10 max-w-[calc(100%-0.75rem)] sm:max-w-[calc(100%-1.25rem)]"
          />
        </div>

        {/* Content: Sisi Kanan pada Mobile, Bawah Foto pada Desktop */}
        <div className="flex flex-col justify-start flex-1 min-w-0 sm:pt-3">
          {/* Metadata: Waktu Rilis */}
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-zinc-400 mb-1 flex-wrap">
            <span>{timeAgo}</span>
          </div>

          {/* Judul Berita */}
          <h3 className="font-heading font-bold text-[13px] sm:text-sm lg:text-base text-zinc-900 group-hover:text-brand-primary transition-colors duration-200 line-clamp-2 leading-snug tracking-tight mb-1 sm:mb-1.5">
            {berita.judul}
          </h3>

          {/* Teks Sebagian (Excerpt) Ditampilkan di Bawah Judul */}
          {berita.excerpt && (
            <p className="line-clamp-2 text-xs sm:text-sm text-zinc-500 leading-relaxed grow">
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
        {/* Waktu publikasi */}
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-zinc-400 mb-1 flex-wrap">
          <span>{timeAgo}</span>
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
