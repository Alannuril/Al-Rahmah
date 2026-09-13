import Link from "next/link";
import type { Berita } from "@/lib/supabase/types";
import { formatTimeAgo, calculateReadTime } from "@/lib/utils/formatNews";

interface NewsCardProps {
  berita: Berita;
  priority?: boolean;
}

export function NewsCard({ berita }: NewsCardProps) {
  const timeAgo = formatTimeAgo(berita.created_at);
  const readTime = calculateReadTime(berita.konten || berita.excerpt);

  return (
    <Link
      href={`/media/berita/${berita.slug}`}
      className="group flex flex-row sm:flex-col items-center sm:items-stretch gap-3 sm:gap-0 py-3 first:pt-0 last:pb-0 sm:py-0 h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-xl sm:rounded-2xl transition-colors"
    >
      {/* Thumbnail Container */}
      <div className="relative w-20 h-20 sm:w-full sm:h-auto sm:aspect-[16/10] shrink-0 overflow-hidden rounded-xl sm:rounded-2xl bg-zinc-100">
        {berita.thumbnail_url ? (
          <img
            src={berita.thumbnail_url}
            alt={berita.judul}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white/30 font-heading font-bold text-lg sm:text-2xl">
            Al-Rahmah
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center flex-1 min-w-0 py-0.5 sm:py-0">
        {/* Meta: Category, Relative Time & Read Time */}
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-zinc-400 sm:mt-2.5 mb-1 flex-wrap">
          <span className="font-semibold text-brand-secondary">
            {berita.kategori || "Berita"}
          </span>
          <span>•</span>
          <span>{timeAgo}</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">{readTime}</span>
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-xs sm:text-sm lg:text-base text-zinc-900 group-hover:text-brand-primary transition-colors duration-200 line-clamp-2 leading-snug tracking-tight mb-0 sm:mb-1.5">
          {berita.judul}
        </h3>

        {/* Excerpt (Hidden on mobile to save space and keep it minimal) */}
        {berita.excerpt && (
          <p className="hidden sm:line-clamp-2 text-xs sm:text-sm text-zinc-500 leading-relaxed mb-2 grow">
            {berita.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
