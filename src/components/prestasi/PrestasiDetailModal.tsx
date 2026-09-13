"use client";

import { useEffect } from "react";
import { X, Trophy, Calendar } from "lucide-react";
import type { Prestasi } from "@/lib/supabase/types";

interface PrestasiDetailModalProps {
  prestasi: Prestasi | null;
  onClose: () => void;
}

export function PrestasiDetailModal({ prestasi, onClose }: PrestasiDetailModalProps) {
  // Handle ESC key & body scroll locking
  useEffect(() => {
    if (!prestasi) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [prestasi, onClose]);

  if (!prestasi) return null;

  const formattedDate = prestasi.tanggal
    ? new Date(prestasi.tanggal).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close Button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal"
            className="w-9 h-9 rounded-full bg-zinc-900/60 hover:bg-zinc-900 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto overscroll-contain flex-1">
          {/* Visual Banner */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-zinc-100 overflow-hidden">
            {prestasi.foto_url ? (
              <img
                src={prestasi.foto_url}
                alt={prestasi.judul}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white/40">
                <Trophy size={56} className="text-white/50" />
              </div>
            )}
          </div>

          {/* Text Content */}
          <div className="p-5 sm:p-7 md:p-8">
            {/* Category & Date Badge */}
            <div className="flex flex-wrap items-center gap-2 text-xs mb-3">
              <span className="px-3 py-1 rounded-full bg-brand-secondary/10 text-brand-secondary font-semibold">
                {prestasi.kategori || "Prestasi"}
              </span>
              {formattedDate && (
                <div className="flex items-center gap-1 text-zinc-400">
                  <Calendar size={13} className="text-zinc-400" />
                  <span>{formattedDate}</span>
                </div>
              )}
            </div>

            {/* Full Title */}
            <h2 className="font-heading font-bold text-lg sm:text-2xl text-zinc-900 leading-snug tracking-tight mb-4">
              {prestasi.judul}
            </h2>

            {/* Full Description */}
            <div className="text-xs sm:text-sm text-zinc-600 leading-relaxed space-y-3 font-sans border-t border-zinc-100 pt-4">
              {prestasi.deskripsi ? (
                prestasi.deskripsi.split("\n").map((p, idx) => {
                  const trimmed = p.trim();
                  if (!trimmed) return null;
                  return <p key={idx}>{trimmed}</p>;
                })
              ) : (
                <p className="italic text-zinc-400">Belum ada keterangan rinci untuk prestasi ini.</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:px-8 sm:py-4 bg-zinc-50 border-t border-zinc-100 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-zinc-200/80 hover:bg-zinc-300 text-zinc-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

