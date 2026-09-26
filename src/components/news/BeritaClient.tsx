"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";
import type { Berita } from "@/lib/supabase/types";
import { NEWS_CATEGORIES, getNewsCategory } from "@/lib/constants/newsCategories";
import { FeaturedNewsHero } from "./FeaturedNewsHero";
import { NewsCard } from "./NewsCard";

interface BeritaClientProps {
  initialNews: Berita[];
  initialCategory?: string;
  limit?: number;
  allLinkHref?: string;
  allLinkLabel?: string;
}

export function BeritaClient({
  initialNews,
  initialCategory = "Semua",
  limit,
  allLinkHref,
  allLinkLabel = "Lihat semua berita",
}: BeritaClientProps) {
  const filterId = useId();
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

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

  const filteredNews = useMemo(() => {
    return selectedCategory === "Semua"
      ? initialNews
      : initialNews.filter(
          (item) => getNewsCategory(item.kategori) === selectedCategory,
        );
  }, [initialNews, selectedCategory]);

  const visibleNews =
    limit === undefined ? filteredNews : filteredNews.slice(0, limit);
  const featuredNews = visibleNews[0];
  const gridNews = visibleNews.slice(1);

  return (
    <div className="w-full">
      {featuredNews ? (
        <>
          {/* Berita Utama / Paling Besar */}
          <FeaturedNewsHero berita={featuredNews} />

          {/* Bar Kontrol: Dropdown Jenis Berita & Link Lihat Semua Berita (Clean, Tanpa Card) */}
          <div className="my-4 sm:my-6 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200/80 pt-4 sm:pt-5">
            <div className="flex items-center gap-2.5">
              <label
                htmlFor={filterId}
                className="text-xs font-medium text-zinc-600 sm:text-sm"
              >
                Jenis berita
              </label>
              <select
                id={filterId}
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                className="min-h-9 rounded-lg border border-zinc-200 bg-white/70 px-2.5 py-1.5 text-xs font-semibold text-zinc-800 transition-colors hover:border-zinc-300 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/15 sm:text-sm"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "Semua" ? "Semua jenis" : category}
                  </option>
                ))}
              </select>
              <span className="text-[11px] text-zinc-400 sm:text-xs">
                ({filteredNews.length} berita)
              </span>
            </div>

            {allLinkHref && (
              <Link
                href={allLinkHref}
                className="group inline-flex items-center gap-1.5 text-xs font-semibold text-brand-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary sm:text-sm"
              >
                <span>{allLinkLabel}</span>
                <ArrowRight
                  size={14}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            )}
          </div>

          {/* Kolom / Grid Berita Lainnya */}
          {gridNews.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-4 lg:gap-8">
              {gridNews.map((item) => (
                <NewsCard key={item.id} berita={item} />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="rounded-2xl border border-zinc-200 bg-white/60 px-5 py-12 text-center">
          <Newspaper
            className="mx-auto mb-3 text-brand-primary/40"
            size={32}
            aria-hidden="true"
          />
          <h2 className="font-heading text-lg font-semibold text-zinc-700">
            Belum ada berita
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            {selectedCategory === "Semua"
              ? "Berita Al-Rahmah akan ditampilkan di sini."
              : `Belum ada berita untuk jenis ${selectedCategory.toLowerCase()}.`}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {selectedCategory !== "Semua" && (
              <button
                type="button"
                onClick={() => setSelectedCategory("Semua")}
                className="min-h-10 rounded-xl bg-brand-primary/10 px-4 py-2 text-xs font-semibold text-brand-primary transition-colors hover:bg-brand-primary hover:text-white"
              >
                Tampilkan semua jenis
              </button>
            )}
            {allLinkHref && (
              <Link
                href={allLinkHref}
                className="group inline-flex items-center gap-1.5 text-xs font-semibold text-brand-primary underline underline-offset-4 sm:text-sm"
              >
                <span>{allLinkLabel}</span>
                <ArrowRight
                  size={14}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
