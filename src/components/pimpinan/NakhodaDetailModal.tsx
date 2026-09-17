"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, Quote, CheckCircle2 } from "lucide-react";

export interface NakhodaData {
  id: string;
  nama: string;
  jabatan: string;
  peranTag: string;
  foto: string;
  quote: string;
  ringkasan: string;
  biografiLengkap: string[];
  fokusKontribusi: {
    judul: string;
    deskripsi: string;
  }[];
}

interface NakhodaDetailModalProps {
  nakhoda: NakhodaData | null;
  onClose: () => void;
}

export function NakhodaDetailModal({ nakhoda, onClose }: NakhodaDetailModalProps) {
  // Handle ESC key & body scroll locking
  useEffect(() => {
    if (!nakhoda) return;

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
  }, [nakhoda, onClose]);

  if (!nakhoda) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 border border-zinc-200/80"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Floating */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup modal"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-zinc-900/60 hover:bg-zinc-900 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105"
        >
          <X size={18} />
        </button>

        {/* Scrollable Content Container */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Header Tokoh: Foto & Info Utama */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pt-2 sm:pt-0">
            <div className="relative w-28 h-36 sm:w-32 sm:h-40 rounded-2xl overflow-hidden shadow-xs border border-zinc-200/80 bg-zinc-100 shrink-0">
              <Image
                src={nakhoda.foto}
                alt={`Foto profil ${nakhoda.nama}`}
                fill
                sizes="160px"
                className="object-cover object-top"
              />
            </div>

            <div className="space-y-2 text-center sm:text-left flex-1">
              <span className="inline-block text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-3 py-0.5 rounded-full border border-emerald-200/60">
                {nakhoda.peranTag}
              </span>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-zinc-900 tracking-tight leading-tight">
                {nakhoda.nama}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-brand-primary">
                {nakhoda.jabatan}
              </p>

              {/* Kutipan Khas di Header */}
              <div className="mt-3 p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-left flex items-start gap-2">
                <Quote size={14} className="text-brand-primary shrink-0 mt-0.5 opacity-90" />
                <p className="font-heading italic text-xs text-zinc-700 leading-relaxed">
                  &ldquo;{nakhoda.quote}&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Biografi Lengkap */}
          <div className="space-y-3 pt-2 border-t border-zinc-100">
            <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider block">
              Biografi &amp; Kiprah Dedikasi
            </span>
            <div className="space-y-2.5 text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {nakhoda.biografiLengkap.map((paragraf, idx) => (
                <p key={idx}>{paragraf}</p>
              ))}
            </div>
          </div>

          {/* Fokus Peran & Kontribusi Utama */}
          <div className="space-y-3 pt-2 border-t border-zinc-100">
            <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider block">
              Fokus Peran &amp; Tanggung Jawab
            </span>
            <div className="space-y-2.5">
              {nakhoda.fokusKontribusi.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/70 space-y-1 hover:border-emerald-200/80 transition-colors"
                >
                  <div className="flex items-center gap-2 text-zinc-900 font-semibold text-xs sm:text-sm">
                    <CheckCircle2 size={14} className="text-brand-primary shrink-0" />
                    <span>{item.judul}</span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed pl-5">
                    {item.deskripsi}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tombol Tutup */}
          <div className="pt-4 border-t border-zinc-100 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-semibold text-xs transition-colors cursor-pointer"
            >
              Tutup Profil
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

