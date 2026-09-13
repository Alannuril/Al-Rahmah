import { Trophy, ArrowRight } from "lucide-react";
import type { Prestasi } from "@/lib/supabase/types";

interface PrestasiCardProps {
  prestasi: Prestasi;
  onSelect?: (prestasi: Prestasi) => void;
}

export function PrestasiCard({ prestasi, onSelect }: PrestasiCardProps) {
  const formattedDate = prestasi.tanggal
    ? new Date(prestasi.tanggal).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div
      onClick={() => onSelect?.(prestasi)}
      className="group flex flex-row sm:flex-col items-center sm:items-stretch gap-3 sm:gap-0 py-3 first:pt-0 last:pb-0 sm:py-0 h-full rounded-xl sm:rounded-2xl transition-all cursor-pointer select-none"
    >
      {/* Thumbnail Container */}
      <div className="relative w-20 h-20 sm:w-full sm:h-auto sm:aspect-[16/10] shrink-0 overflow-hidden rounded-xl sm:rounded-2xl bg-zinc-100 shadow-2xs">
        {prestasi.foto_url ? (
          <img
            src={prestasi.foto_url}
            alt={prestasi.judul}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white/30 font-heading font-bold text-lg sm:text-2xl">
            <Trophy size={24} className="text-white/40" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center flex-1 min-w-0 py-0.5 sm:py-0">
        {/* Meta: Category & Date */}
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-zinc-400 sm:mt-2.5 mb-1 flex-wrap">
          <span className="font-semibold text-brand-secondary">
            {prestasi.kategori || "Prestasi"}
          </span>
          {formattedDate && (
            <>
              <span>•</span>
              <span>{formattedDate}</span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-xs sm:text-sm lg:text-base text-zinc-900 group-hover:text-brand-primary transition-colors duration-200 line-clamp-2 leading-snug tracking-tight mb-0 sm:mb-1.5">
          {prestasi.judul}
        </h3>

        {/* Description (Hidden on mobile for compactness) */}
        {prestasi.deskripsi && (
          <p className="hidden sm:line-clamp-2 text-xs sm:text-sm text-zinc-500 leading-relaxed mb-2 grow">
            {prestasi.deskripsi}
          </p>
        )}

        {/* Action Link: Baca Selengkapnya */}
        <div className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-brand-primary group-hover:underline mt-auto pt-1">
          <span>Baca Selengkapnya</span>
          <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </div>
      </div>
    </div>
  );
}
