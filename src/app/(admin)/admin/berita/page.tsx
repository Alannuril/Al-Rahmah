"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Edit2, Trash2, Eye, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Berita } from "@/lib/supabase/types";
import { NEWS_CATEGORIES, getNewsCategory } from "@/lib/constants/newsCategories";
import { NewsCategoryBadge } from "@/components/news/NewsCategoryBadge";
import { AlRahmahLoader } from "@/components/ui/AlRahmahLoader";
import { getAllDummyNews } from "@/lib/data/dummyFeed";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

export default function KelolaBeritaPage() {
  const [beritaList, setBeritaList] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const dummyList = getAllDummyNews();

    async function loadData() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("berita")
          .select("*")
          .order("created_at", { ascending: false });

        if (!active) return;

        if (!error && data && data.length > 0) {
          // Gabungkan data Supabase dengan data dummy untuk evaluasi lengkap
          const map = new Map<string, Berita>();
          dummyList.forEach((item) => map.set(item.id, item));
          data.forEach((item) => map.set(item.id, item));

          setBeritaList(
            Array.from(map.values()).sort(
              (a, b) => (Date.parse(b.created_at) || 0) - (Date.parse(a.created_at) || 0),
            ),
          );
        } else {
          setBeritaList(dummyList);
        }
      } catch {
        if (active) setBeritaList(dummyList);
      } finally {
        if (active) setLoading(false);
      }
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
    if (!confirm("Hapus berita ini?")) return;
    setDeleting(id);
    try {
      const supabase = createClient();
      await supabase.from("berita").delete().eq("id", id);
    } catch {
      // Abaikan jika offline / dummy
    }
    setBeritaList((prev) => prev.filter((b) => b.id !== id));
    setDeleting(null);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Header Bar */}
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari berita..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-100 text-sm text-gray-600 placeholder-gray-400 outline-none focus:border-brand-primary/30 focus:ring-2 focus:ring-brand-primary/10 transition-all"
            />
          </div>
          <select
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-white border border-gray-100 text-sm text-gray-600 outline-none focus:border-brand-primary/30 transition-all"
          >
            <option value="">Semua Jenis</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <a
          href="/admin/berita/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary hover:bg-brand-primary/90 text-white text-sm font-semibold rounded-xl shadow-sm shadow-brand-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md shrink-0"
        >
          <Plus size={16} /> Tambah Berita
        </a>
      </motion.div>

      {/* Desktop Table View */}
      <motion.div variants={item} className="hidden md:block bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-2xs">
        <table className="w-full">
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
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a href={news.slug ? "/media/berita/" + news.slug : "#"} target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-brand-primary/5 text-gray-400 hover:text-brand-primary transition-colors" title="Lihat Halaman Publik">
                        <Eye size={16} />
                      </a>
                      <a href={"/admin/berita/" + news.id + "/edit"} className="p-2 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-500 transition-colors" title="Edit Berita">
                        <Edit2 size={16} />
                      </a>
                      <button
                        onClick={() => handleDelete(news.id)}
                        disabled={deleting === news.id}
                        className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                        title="Hapus"
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
      <motion.div variants={item} className="block md:hidden space-y-3">
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
            <div key={news.id} className="bg-white rounded-2xl p-4 border border-gray-100 space-y-3 shadow-2xs">
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
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-50">
                <a href={news.slug ? "/media/berita/" + news.slug : "#"} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-lg bg-gray-50 text-gray-600 hover:text-brand-primary text-xs flex items-center gap-1 font-medium">
                  <Eye size={13} /> Lihat
                </a>
                <a href={"/admin/berita/" + news.id + "/edit"} className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-xs flex items-center gap-1 font-medium">
                  <Edit2 size={13} /> Edit
                </a>
                <button
                  onClick={() => handleDelete(news.id)}
                  disabled={deleting === news.id}
                  className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs flex items-center gap-1 font-medium disabled:opacity-50"
                >
                  <Trash2 size={13} /> Hapus
                </button>
              </div>
            </div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
}
