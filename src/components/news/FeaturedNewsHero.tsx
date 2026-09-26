import Link from "next/link";
import { NewsCategoryBadge } from "./NewsCategoryBadge";
import { ArrowRight } from "lucide-react";
import type { Berita } from "@/lib/supabase/types";
import { formatTimeAgo, calculateReadTime } from "@/lib/utils/formatNews";

interface FeaturedNewsHeroProps {
  berita: Berita;
}

export function FeaturedNewsHero({ berita }: FeaturedNewsHeroProps) {
  const timeAgo = formatTimeAgo(berita.created_at);
  const readTime = calculateReadTime(berita.konten || berita.excerpt);

  return (
    <article className="relative mb-5 sm:mb-8 md:mb-10">
      <Link
        href={`/media/berita/${berita.slug}`}
        className="group grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6 lg:gap-8 items-start cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-2xl sm:rounded-3xl"
      >
        {/* Left: Compact Visual Showcase */}
        <div className="md:col-span-5 relative w-full h-44 sm:h-56 md:h-64 lg:h-72 xl:h-80 overflow-hidden rounded-2xl sm:rounded-3xl bg-zinc-100 shadow-xs">
          {berita.thumbnail_url ? (
            <img
              src={berita.thumbnail_url}
              alt={berita.judul}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white/30 font-heading font-bold text-3xl">
              Al-Rahmah
            </div>
          )}

          <NewsCategoryBadge
            category={berita.kategori}
            className="absolute left-2.5 top-2.5 z-10 max-w-[calc(100%-1.25rem)]"
          />
        </div>

        {/* Right: Clean Editorial Text (Top-aligned with photo) */}
        <div className="md:col-span-7 flex flex-col justify-start pt-0 sm:pt-0.5">
          {/* Category & Time Meta (No Author Clutter) */}
          <div className="flex items-center gap-2 text-xs mb-2">
            <span className="text-zinc-400">
              {timeAgo}
            </span>
            <span className="text-zinc-300">•</span>
            <span className="text-zinc-400">
              {readTime}
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-heading font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-900 group-hover:text-brand-primary transition-colors duration-200 leading-snug tracking-tight mb-2 line-clamp-2 sm:line-clamp-3">
            {berita.judul}
          </h2>

          {/* Excerpt */}
          {berita.excerpt && (
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed line-clamp-3 sm:line-clamp-4 md:line-clamp-5 lg:line-clamp-6 mb-3 sm:mb-4">
              {berita.excerpt}
            </p>
          )}

          {/* Read CTA */}
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-primary group-hover:gap-2 transition-all">
            <span>Baca Selengkapnya</span>
            <ArrowRight size={13} />
          </div>
        </div>
      </Link>
    </article>
  );
}
