"use client";

import { useState, useMemo } from "react";
import type { Prestasi } from "@/lib/supabase/types";
import { FeaturedPrestasiHero } from "./FeaturedPrestasiHero";
import { PrestasiCard } from "./PrestasiCard";
import { PrestasiDetailModal } from "./PrestasiDetailModal";
import { Trophy } from "lucide-react";

interface PrestasiClientProps {
  initialPrestasi: Prestasi[];
}

export function PrestasiClient({ initialPrestasi }: PrestasiClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [selectedPrestasi, setSelectedPrestasi] = useState<Prestasi | null>(null);

  // Extract unique categories available in the list
  const categories = useMemo(() => {
    const defaultCats = ["Semua", "Keagamaan", "Akademik", "Bahasa", "Seni"];
    const fromData = Array.from(
      new Set(initialPrestasi.map((p) => p.kategori).filter(Boolean) as string[])
    );
    return Array.from(new Set([...defaultCats, ...fromData]));
  }, [initialPrestasi]);

  // Filter prestasi based on category
  const filteredPrestasi = useMemo(() => {
    if (selectedCategory === "Semua") {
      return initialPrestasi;
    }
    return initialPrestasi.filter(
      (p) => p.kategori?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [initialPrestasi, selectedCategory]);

  const featuredPrestasi = filteredPrestasi.length > 0 ? filteredPrestasi[0] : null;
  const gridPrestasi = filteredPrestasi.length > 1 ? filteredPrestasi.slice(1) : [];

  return (
    <div className="w-full">
      {/* 1. Top Featured Showcase */}
      {featuredPrestasi ? (
        <FeaturedPrestasiHero
          prestasi={featuredPrestasi}
          onSelect={setSelectedPrestasi}
        />
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-zinc-100 mb-12">
          <Trophy className="mx-auto text-zinc-300 mb-3" size={40} />
          <h3 className="font-heading font-bold text-zinc-700 text-lg mb-1">
            Belum Ada Prestasi
          </h3>
          <p className="text-sm text-zinc-500">
            Belum ada catatan prestasi untuk kategori &quot;{selectedCategory}&quot;.
          </p>
        </div>
      )}

      {/* 2. Section Header: "Daftar Prestasi" & Category Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 mb-4 sm:mb-8 pb-2.5 sm:pb-3 border-b border-zinc-200/80">
        <div>
          <h2 className="font-heading text-lg sm:text-2xl font-bold text-zinc-900 tracking-tight">
            Daftar Prestasi
          </h2>
          <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5">
            Rekam jejak kejuaraan dan capaian membanggakan santri Al-Rahmah
          </p>
        </div>

        {/* Minimalist Category Filter Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-all duration-200 cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-brand-primary text-white shadow-xs"
                    : "bg-zinc-100 hover:bg-zinc-200/80 text-zinc-600 hover:text-zinc-900"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. 4-Column Flat Editorial Grid (Desktop) / Compact Feed (Mobile) */}
      {gridPrestasi.length > 0 ? (
        <div className="flex flex-col divide-y divide-zinc-100 sm:divide-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-7 lg:gap-8">
          {gridPrestasi.map((item) => (
            <PrestasiCard
              key={item.id}
              prestasi={item}
              onSelect={setSelectedPrestasi}
            />
          ))}
        </div>
      ) : filteredPrestasi.length === 1 ? (
        <div className="text-center py-8 text-zinc-400 text-xs sm:text-sm">
          Menampilkan 1 prestasi utama untuk kategori ini.
        </div>
      ) : null}

      {/* 4. Pop-up Modal Detail Prestasi */}
      <PrestasiDetailModal
        prestasi={selectedPrestasi}
        onClose={() => setSelectedPrestasi(null)}
      />
    </div>
  );
}
