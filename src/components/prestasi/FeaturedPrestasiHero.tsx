import { Trophy, ArrowRight } from "lucide-react";
import type { Prestasi } from "@/lib/supabase/types";

interface FeaturedPrestasiHeroProps {
  prestasi: Prestasi;
  onSelect?: (prestasi: Prestasi) => void;
}

export function FeaturedPrestasiHero({ prestasi, onSelect }: FeaturedPrestasiHeroProps) {
  const formattedDate = prestasi.tanggal
    ? new Date(prestasi.tanggal).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <article
      onClick={() => onSelect?.(prestasi)}
      className="relative mb-5 sm:mb-8 md:mb-10 cursor-pointer select-none"
    >
      <div className="group grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6 lg:gap-8 items-start rounded-2xl sm:rounded-3xl">
        {/* Left: Compact Visual Showcase */}
        <div className="md:col-span-5 relative w-full h-44 sm:h-56 md:h-64 lg:h-72 xl:h-80 overflow-hidden rounded-2xl sm:rounded-3xl bg-zinc-100 shadow-xs">
          {prestasi.foto_url ? (
            <img
              src={prestasi.foto_url}
              alt={prestasi.judul}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white/30 font-heading font-bold text-3xl">
              <Trophy size={48} className="text-white/40" />
            </div>
          )}
        </div>

        {/* Right: Clean Editorial Text (Top-aligned with photo) */}
        <div className="md:col-span-7 flex flex-col justify-start pt-0 sm:pt-0.5">
          {/* Category & Date Meta */}
          <div className="flex items-center gap-2 text-xs mb-2">
            <span className="font-semibold text-brand-secondary">
              {prestasi.kategori || "Prestasi Santri"}
            </span>
            {formattedDate && (
              <>
                <span className="text-zinc-300">•</span>
                <span className="text-zinc-400">{formattedDate}</span>
              </>
            )}
          </div>

          {/* Headline */}
          <h2 className="font-heading font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-900 group-hover:text-brand-primary transition-colors duration-200 leading-snug tracking-tight mb-2 line-clamp-2 sm:line-clamp-3">
            {prestasi.judul}
          </h2>

          {/* Excerpt / Deskripsi */}
          {prestasi.deskripsi && (
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed line-clamp-3 sm:line-clamp-4 md:line-clamp-5 lg:line-clamp-6 mb-3 sm:mb-4">
              {prestasi.deskripsi}
            </p>
          )}

          {/* Action Link: Baca Selengkapnya */}
          <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-primary group-hover:underline">
            <span>Baca Selengkapnya</span>
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </article>
  );
}
