"use client";

import { useId, useMemo, useRef, useState } from "react";
import { ChevronDown, Newspaper, Search, X } from "lucide-react";
import type { Berita } from "@/lib/supabase/types";
import { NEWS_CATEGORIES, getNewsCategory } from "@/lib/constants/newsCategories";
import { filterNews } from "@/lib/utils/filterNews";
import { FeaturedNewsHero } from "./FeaturedNewsHero";
import { NewsCard } from "./NewsCard";

interface BeritaClientProps {
  initialNews: Berita[];
  initialCategory?: string;
}

export function BeritaClient({
  initialNews,
  initialCategory = "Semua",
}: BeritaClientProps) {
  const controlsId = useId();
  const filterId = `${controlsId}-jenis`;
  const searchId = `${controlsId}-pencarian`;
  const resultsId = `${controlsId}-hasil`;
  const searchRef = useRef<HTMLInputElement>(null);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => {
    const available = initialNews.map((item) => getNewsCategory(item.kategori));
    return [
      "Semua",
      "Kejuaraan",
      "Kegiatan",
      "Akademik",
      ...Array.from(new Set([...NEWS_CATEGORIES, ...available])).filter(
        (category) =>
          !["Kejuaraan", "Kegiatan", "Akademik"].includes(category) &&
          available.includes(category),
      ),
    ];
  }, [initialNews]);

  const filteredNews = useMemo(
    () => filterNews(initialNews, selectedCategory, searchQuery),
    [initialNews, selectedCategory, searchQuery],
  );
  const featuredNews = filteredNews[0];
  const gridNews = filteredNews.slice(1);
  const isFiltered = selectedCategory !== "Semua" || searchQuery.trim().length > 0;

  function clearSearch() {
    setSearchQuery("");
    searchRef.current?.focus();
  }

  function resetFilters() {
    setSelectedCategory("Semua");
    setSearchQuery("");
    searchRef.current?.focus();
  }

  return (
    <div className="w-full">
      {featuredNews && <FeaturedNewsHero berita={featuredNews} />}

      <div
        role="search"
        aria-label="Cari dan saring berita"
        className="mt-0 mb-4 flex flex-col gap-3 border-t border-zinc-200/80 pt-2 sm:mb-6 sm:flex-row sm:items-center sm:justify-between sm:pt-3"
      >
        <div className="flex items-center gap-2">
          <label htmlFor={filterId} className="text-sm text-zinc-500">
            Jenis berita
          </label>
          <div className="relative">
            <select
              id={filterId}
              aria-controls={resultsId}
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="min-h-8 min-w-28 cursor-pointer appearance-none rounded-md border-0 bg-white/60 py-1.5 pl-2.5 pr-6 text-[13px] font-medium text-brand-primary transition-colors hover:bg-white/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            >
              {categories.map((category) => (
                <option key={category} value={category} className="bg-white text-zinc-700">
                  {category === "Semua" ? "Semua jenis" : category}
                </option>
              ))}
            </select>
            <ChevronDown
              size={13}
              aria-hidden="true"
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-brand-primary/60"
            />
          </div>
        </div>

        <div className="relative w-full sm:w-80 lg:w-96">
          <label htmlFor={searchId} className="sr-only">Cari berita</label>
          <Search
            size={15}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <input
            ref={searchRef}
            id={searchId}
            type="search"
            aria-controls={resultsId}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Cari berita..."
            className="min-h-9 w-full rounded-lg border border-zinc-200/80 bg-white/60 py-2 pl-9 pr-9 text-sm text-zinc-700 placeholder:text-zinc-400 focus:border-brand-primary/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/10 [&::-webkit-search-cancel-button]:appearance-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Hapus pencarian"
              className="absolute right-0.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-zinc-400 hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-brand-primary"
            >
              <X size={14} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <p role="status" aria-live="polite" aria-atomic="true" className="mb-4 text-[11px] text-zinc-500 sm:mb-5 sm:text-xs">
        {filteredNews.length} berita {isFiltered ? "ditemukan" : "tersedia"}
      </p>

      <div id={resultsId}>
        {gridNews.length > 0 && (
          <div className="grid grid-cols-1 divide-y divide-zinc-200/60 sm:divide-y-0 sm:grid-cols-2 lg:grid-cols-4 sm:gap-7 lg:gap-8">
            {gridNews.map((item) => (
              <NewsCard key={item.id} berita={item} variant="standard" />
            ))}
          </div>
        )}

        {!featuredNews && (
          <div className="py-12 text-center">
            <Newspaper className="mx-auto mb-3 text-brand-primary/40" size={32} aria-hidden="true" />
            <h2 className="font-heading text-lg font-semibold text-zinc-700">
              {isFiltered ? "Berita tidak ditemukan" : "Belum ada berita"}
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              {isFiltered
                ? "Coba kata kunci lain atau ubah jenis berita."
                : "Berita Al-Rahmah akan ditampilkan di sini."}
            </p>
            {isFiltered && (
              <button
                type="button"
                onClick={resetFilters}
                className="mt-3 min-h-9 rounded-md px-2 text-xs font-medium text-brand-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
              >
                Reset pencarian dan filter
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
