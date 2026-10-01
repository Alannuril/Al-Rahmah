"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Edit2, Trash2, Eye, Loader2, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Berita } from "@/lib/supabase/types";
import { NEWS_CATEGORIES, getNewsCategory } from "@/lib/constants/newsCategories";
import { NewsCategoryBadge } from "@/components/news/NewsCategoryBadge";
import { AlRahmahLoader } from "@/components/ui/AlRahmahLoader";
import { NewsPreviewDialog } from "@/components/admin/NewsPreviewDialog";
import { getAdminNews } from "@/lib/data/adminNews";
import { getDummyNewsById } from "@/lib/data/dummyFeed";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

export default function KelolaBeritaPage() {
  const [beritaList, setBeritaList] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [preview, setPreview] = useState<Berita | null>(null);

  useEffect(() => {
    let active = true;

    async function loadData() {
      const news = await getAdminNews();
      if (!active) return;
      setBeritaList(news);
      setLoading(false);
    }

    loadData();
    return () => { active = false; };
  }, []);

  const filtered = useMemo(() => beritaList.filter((news) => (
    news.judul.toLowerCase().includes(search.toLowerCase())
    && (!kategori || getNewsCategory(news.kategori) === kategori)
  )), [search, kategori, beritaList]);

  const categories = useMemo(() => Array.from(new Set([
    ...NEWS_CATEGORIES,
    ...beritaList.map((news) => getNewsCategory(news.kategori)),
  ])), [beritaList]);

  const handleDelete = async (id: string) => {
    if (getDummyNewsById(id)) {
      alert("Berita contoh bawaan tidak dapat dihapus dari admin.");
      return;
    }
    if (!confirm("Hapus berita ini?")) return;
    setDeleting(id);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("berita").delete().eq("id", id);
      if (error) throw error;
      setBeritaList((prev) => prev.filter((b) => b.id !== id));
    } catch (error) {
      alert(error instanceof Error ? error.message : "Gagal menghapus berita.");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-5">
      {/* Header Bar */}
      <motion.div variants={item} className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative min-w-0 flex-1 lg:w-80 lg:flex-none">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari berita..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="min-h-10 w-full rounded-md border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-700 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10"
            />
          </div>
          <select
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            className="min-h-10 rounded-md border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-700 outline-none focus:border-brand-primary sm:w-48"
          >
            <option value="">Semua Jenis</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <a
          href="/admin/berita/new"
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary sm:self-start lg:self-auto"
        >
          <Plus size={16} /> Tambah Berita
        </a>
      </motion.div>

      {/* Desktop Table View */}
      <motion.div variants={item} className="hidden overflow-x-auto rounded-md border border-zinc-200 bg-white md:block">
        <table className="w-full min-w-[760px]">
          <thead>
            <tr className="border-b border-gray-100 bg-zinc-50/50">
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Berita</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-4">Jenis Berita</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-4">Tanggal</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-4">Status</th>
              <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-12">
                  <AlRahmahLoader
                    size="md"
                    label="Memuat Data Berita..."
                    sublabel="Menghubungkan ke database Al-Rahmah..."
                  />
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-12 text-sm text-gray-400">Tidak ada berita yang sesuai filter.</td></tr>
            ) : (
              filtered.map((news) => (
                <tr key={news.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {news.thumbnail_url ? (
                        <img src={news.thumbnail_url} alt={news.judul} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary shrink-0" />
                      )}
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium text-gray-800 line-clamp-2 max-w-sm">{news.judul}</span>
                        {news.author && (
                          <span className="text-xs text-gray-400 mt-0.5">Oleh: {news.author}</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <NewsCategoryBadge category={news.kategori} />
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-gray-500">{new Date(news.created_at).toLocaleDateString("id-ID")}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={"inline-flex px-2.5 py-1 rounded-lg text-xs font-medium " + (news.status === "Terbit" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600")}>
                      {news.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button type="button" onClick={() => setPreview(news)} className="rounded-md p-2 text-zinc-600 hover:bg-zinc-100 hover:text-brand-primary" title="Pratinjau berita" aria-label={`Pratinjau ${news.judul}`}>
                        <Eye size={16} />
                      </button>
                      {news.status === "Terbit" && news.slug && (
                        <a href={"/media/berita/" + news.slug} target="_blank" rel="noreferrer" className="rounded-md p-2 text-zinc-600 hover:bg-zinc-100 hover:text-brand-primary" title="Lihat halaman publik" aria-label={`Lihat ${news.judul} di situs`}>
                          <ExternalLink size={16} />
                        </a>
                      )}
                      <a href={"/admin/berita/" + news.id + "/edit"} className="rounded-md p-2 text-zinc-600 hover:bg-zinc-100 hover:text-brand-primary" title="Edit Berita" aria-label={`Edit ${news.judul}`}>
                        <Edit2 size={16} />
                      </a>
                      <button
                        onClick={() => handleDelete(news.id)}
                        disabled={deleting === news.id}
                        className="rounded-md p-2 text-zinc-600 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                        title="Hapus"
                        aria-label={`Hapus ${news.judul}`}
                      >
                        {deleting === news.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>

      {/* Mobile Cards View */}
      <motion.div variants={item} className="space-y-3 md:hidden">
        {loading ? (
          <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center">
            <AlRahmahLoader size="md" label="Memuat Data Berita..." />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center text-sm text-gray-400">
            Tidak ada berita yang sesuai filter.
          </div>
        ) : (
          filtered.map((news) => (
            <div key={news.id} className="space-y-3 rounded-md border border-zinc-200 bg-white p-4">
              <div className="flex items-start gap-3">
                {news.thumbnail_url ? (
                  <img src={news.thumbnail_url} alt={news.judul} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <NewsCategoryBadge category={news.kategori} />
                    <span className={"inline-flex px-2 py-0.5 rounded-md text-[11px] font-medium " + (news.status === "Terbit" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600")}>
                      {news.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-800 line-clamp-2">{news.judul}</h4>
                  <p className="text-xs text-gray-400 mt-1">{new Date(news.created_at).toLocaleDateString("id-ID")}</p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-1 border-t border-zinc-100 pt-2">
                <button type="button" onClick={() => setPreview(news)} className="flex h-10 w-10 items-center justify-center rounded-md text-zinc-600 hover:bg-zinc-100" title="Pratinjau berita" aria-label={`Pratinjau ${news.judul}`}>
                  <Eye size={17} />
                </button>
                {news.status === "Terbit" && news.slug && (
                  <a href={"/media/berita/" + news.slug} target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-md text-zinc-600 hover:bg-zinc-100" title="Lihat halaman publik" aria-label={`Lihat ${news.judul} di situs`}>
                    <ExternalLink size={17} />
                  </a>
                )}
                <a href={"/admin/berita/" + news.id + "/edit"} className="flex h-10 w-10 items-center justify-center rounded-md text-zinc-600 hover:bg-zinc-100" title="Edit berita" aria-label={`Edit ${news.judul}`}>
                  <Edit2 size={17} />
                </a>
                <button
                  onClick={() => handleDelete(news.id)}
                  disabled={deleting === news.id}
                  className="flex h-10 w-10 items-center justify-center rounded-md text-red-600 hover:bg-red-50 disabled:opacity-50"
                  title="Hapus berita"
                  aria-label={`Hapus ${news.judul}`}
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          ))
        )}
      </motion.div>
      {preview && (
        <NewsPreviewDialog berita={preview} status={preview.status} onClose={() => setPreview(null)} />
      )}
    </motion.div>
  );
}
