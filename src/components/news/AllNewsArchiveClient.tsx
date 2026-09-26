"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Search, X, Newspaper, Calendar, Clock } from "lucide-react";
import type { Berita } from "@/lib/supabase/types";
import { NEWS_CATEGORIES, getNewsCategory } from "@/lib/constants/newsCategories";
import { formatTimeAgo, calculateReadTime } from "@/lib/utils/formatNews";
import { NewsCategoryBadge } from "./NewsCategoryBadge";

interface AllNewsArchiveClientProps {
  initialNews: Berita[];
}

export function AllNewsArchiveClient({ initialNews }: AllNewsArchiveClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const categories = useMemo(() => {
    const available = initialNews.map((item) => getNewsCategory(item.kategori));
    return [
      "Semua",
      "Kejuaraan",
      "Kegiatan",
      "Akademik",
      ...Array.from(new Set([...NEWS_CATEGORIES, ...available])).filter(
        (cat) => !["Kejuaraan", "Kegiatan", "Akademik"].includes(cat) && available.includes(cat),
      ),
    ];
  }, [initialNews]);

  const filteredNews = useMemo(() => {
    return initialNews.filter((item) => {
      const matchCategory =
        selectedCategory === "Semua" || getNewsCategory(item.kategori) === selectedCategory;

      if (!matchCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchTitle = item.judul?.toLowerCase().includes(q);
      const matchExcerpt = item.excerpt?.toLowerCase().includes(q);
      const matchContent = item.konten?.toLowerCase().includes(q);

      return Boolean(matchTitle || matchExcerpt || matchContent);
    });
  }, [initialNews, selectedCategory, searchQuery]);

  const isFiltered = selectedCategory !== "Semua" || searchQuery.trim().length > 0;

  const handleResetFilters = () => {
    setSelectedCategory("Semua");
    setSearchQuery("");
  };

  return (
    <div className="w-full">
      {/* Navigation Breadcrumb & Back Link */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/media/berita"
          className="group inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 transition-colors hover:text-brand-primary sm:text-sm"
        >
          <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          <span>Kembali ke Berita Terkini</span>
        </Link>

        <span className="text-[11px] font-medium text-zinc-400">
          Total {initialNews.length} Berita Terbit
        </span>
      </div>

      {/* Header Section — Minimalist & Airy (skillsCodex inspired) */}
      <header className="mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1 text-xs font-medium text-brand-primary">
          <span className="text-brand-primary/70">◈</span>
          <span>Arsip & Koleksi Berita</span>
        </div>
        <h1 className="mt-3 font-heading text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl lg:text-4xl">
          Semua Berita Al-Rahmah
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
          Jelajahi seluruh arsip publikasi, kabar prestasi, kegiatan santri, dan informasi resmi Pondok Pesantren Al-Rahmah Walantaka.
        </p>
      </header>

      {/* Search & Filter Controls Bar */}
      <div className="mb-8 space-y-4 rounded-2xl border border-zinc-200/80 bg-white/70 p-4 shadow-2xs backdrop-blur-md sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
              aria-hidden="true"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul atau topik berita..."
              className="w-full rounded-xl border border-zinc-200/90 bg-white py-2 pl-10 pr-9 text-xs text-zinc-800 placeholder-zinc-400 transition-colors focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/15 sm:text-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600"
                aria-label="Bersihkan pencarian"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Results Counter */}
          <div className="text-xs text-zinc-500 sm:text-right">
            Menampilkan <span className="font-semibold text-brand-primary">{filteredNews.length}</span> dari {initialNews.length} berita
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-zinc-100">
          <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400 mr-1 sm:text-xs">
            Kategori:
          </span>
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-brand-primary text-white shadow-xs font-semibold"
                    : "bg-white/80 text-zinc-600 border border-zinc-200 hover:border-brand-primary/40 hover:text-brand-primary"
                }`}
              >
                {category}
              </button>
            );
          })}

          {isFiltered && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="ml-auto text-xs font-medium text-brand-primary underline underline-offset-4 hover:text-brand-primary/80"
            >
              Reset Filter
            </button>
          )}
        </div>
      </div>

      {/* News Cards Grid */}
      {filteredNews.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 lg:gap-7">
          {filteredNews.map((item) => {
            const timeAgo = formatTimeAgo(item.created_at);
            const readTime = calculateReadTime(item.konten || item.excerpt);

            return (
              <article
                key={item.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/80 shadow-2xs transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-primary/40 hover:bg-white hover:shadow-md"
              >
                {/* Visual Thumbnail */}
                <Link
                  href={`/media/berita/${item.slug}`}
                  className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 focus:outline-none"
                  tabIndex={-1}
                >
                  {item.thumbnail_url ? (
                    <img
                      src={item.thumbnail_url}
                      alt={item.judul}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-primary to-brand-secondary font-heading text-xl font-bold text-white/40">
                      Al-Rahmah
                    </div>
                  )}

                  <div className="absolute left-3 top-3 z-10">
                    <NewsCategoryBadge category={item.kategori} />
                  </div>
                </Link>

                {/* Content Details */}
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  {/* Meta: Date & Read Time */}
                  <div className="mb-2 flex items-center gap-2 text-[11px] text-zinc-400">
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={12} className="text-zinc-400" aria-hidden="true" />
                      {timeAgo}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={12} className="text-zinc-400" aria-hidden="true" />
                      {readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-heading text-sm font-bold leading-snug tracking-tight text-zinc-900 transition-colors duration-200 group-hover:text-brand-primary sm:text-base line-clamp-2">
                    <Link
                      href={`/media/berita/${item.slug}`}
                      className="focus:outline-none focus-visible:underline"
                    >
                      {item.judul}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  {item.excerpt && (
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-500 sm:text-sm">
                      {item.excerpt}
                    </p>
                  )}

                  {/* Action Link at Bottom */}
                  <div className="mt-auto pt-4 border-t border-zinc-100">
                    <Link
                      href={`/media/berita/${item.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-primary transition-all group-hover:gap-2"
                    >
                      <span>Baca Berita</span>
                      <ArrowRight size={13} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-2xl border border-zinc-200/80 bg-white/70 px-6 py-14 text-center shadow-2xs backdrop-blur-sm">
          <Newspaper className="mx-auto mb-3 text-brand-primary/40" size={36} aria-hidden="true" />
          <h3 className="font-heading text-base font-semibold text-zinc-800 sm:text-lg">
            Tidak Ada Berita yang Cocok
          </h3>
          <p className="mx-auto mt-1 max-w-sm text-xs text-zinc-500 sm:text-sm">
            {searchQuery
              ? `Tidak ditemukan berita untuk kata kunci "${searchQuery}". Silakan coba kata kunci lain.`
              : `Belum ada berita untuk kategori ${selectedCategory}.`}
          </p>
          <div className="mt-5">
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-primary/10 px-4 py-2 text-xs font-semibold text-brand-primary transition-colors hover:bg-brand-primary hover:text-white"
            >
              Reset Pencarian & Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
