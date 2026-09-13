"use client";

import { useState, useMemo } from "react";
import type { Berita } from "@/lib/supabase/types";
import { FeaturedNewsHero } from "./FeaturedNewsHero";
import { NewsCard } from "./NewsCard";
import { Newspaper } from "lucide-react";

interface BeritaClientProps {
  initialNews: Berita[];
}

export function BeritaClient({ initialNews }: BeritaClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  // Extract unique categories available in the news list
  const categories = useMemo(() => {
    const defaultCats = ["Semua", "Prestasi", "Kegiatan", "Pengumuman", "Akademik"];
    const fromData = Array.from(
      new Set(initialNews.map((n) => n.kategori).filter(Boolean) as string[])
    );
    const combined = Array.from(new Set([...defaultCats, ...fromData]));
    return combined;
  }, [initialNews]);

  // Filter news based on category
  const filteredNews = useMemo(() => {
    if (selectedCategory === "Semua") {
      return initialNews;
    }
    return initialNews.filter(
      (n) => n.kategori?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [initialNews, selectedCategory]);

  const featuredNews = filteredNews.length > 0 ? filteredNews[0] : null;
  const gridNews = filteredNews.length > 1 ? filteredNews.slice(1) : [];

  return (
    <div className="w-full">
      {/* 1. Top Featured Story */}
      {featuredNews ? (
        <FeaturedNewsHero berita={featuredNews} />
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-zinc-100 mb-12">
          <Newspaper className="mx-auto text-zinc-300 mb-3" size={40} />
          <h3 className="font-heading font-bold text-zinc-700 text-lg mb-1">
            Belum Ada Berita
          </h3>
          <p className="text-sm text-zinc-500">
            Belum ada publikasi berita untuk kategori &quot;{selectedCategory}&quot;.
          </p>
        </div>
      )}

      {/* 2. Section Header: "Berita Terkini" & Category Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 mb-4 sm:mb-8 pb-2.5 sm:pb-3 border-b border-zinc-200/80">
        <div>
          <h2 className="font-heading text-lg sm:text-2xl font-bold text-zinc-900 tracking-tight">
            Berita Terkini
          </h2>
          <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5">
            Informasi pilihan dan kabar terhangat seputar Al-Rahmah
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
      {gridNews.length > 0 ? (
        <div className="flex flex-col divide-y divide-zinc-100 sm:divide-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-7 lg:gap-8">
          {gridNews.map((item) => (
            <NewsCard key={item.id} berita={item} />
          ))}
        </div>
      ) : filteredNews.length === 1 ? (
        <div className="text-center py-8 text-zinc-400 text-xs sm:text-sm">
          Menampilkan 1 berita utama untuk kategori ini.
        </div>
      ) : null}
    </div>
  );
}

