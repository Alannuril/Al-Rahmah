"use client";

import { motion } from "framer-motion";
import { Plus, Search, Edit2, Trash2, Eye } from "lucide-react";

const newsData = [
  {
    id: 1,
    title: "Haflah Akhirussanah 2026 — Wisuda 45 Santri Tahfidz",
    category: "Kegiatan",
    date: "12 Mei 2026",
    status: "Terbit",
    thumbnail: "bg-gradient-to-br from-brand-primary to-brand-secondary",
  },
  {
    id: 2,
    title: "Prestasi Gemilang di Olimpiade Sains Nasional 2026",
    category: "Prestasi",
    date: "8 Mei 2026",
    status: "Terbit",
    thumbnail: "bg-gradient-to-br from-amber-400 to-orange-500",
  },
  {
    id: 3,
    title: "Pembukaan Pendaftaran Santri Baru Tahun Ajaran 2027/2028",
    category: "PSB",
    date: "1 Mei 2026",
    status: "Terbit",
    thumbnail: "bg-gradient-to-br from-brand-lime to-brand-accent",
  },
  {
    id: 4,
    title: "Kunjungan Delegasi dari Ma'had Al-Furqan Malaysia",
    category: "Kegiatan",
    date: "28 Apr 2026",
    status: "Draft",
    thumbnail: "bg-gradient-to-br from-indigo-400 to-purple-500",
  },
  {
    id: 5,
    title: "Program Beasiswa Tahfidz untuk Santri Berprestasi",
    category: "Informasi",
    date: "20 Apr 2026",
    status: "Terbit",
    thumbnail: "bg-gradient-to-br from-brand-secondary to-emerald-600",
  },
  {
    id: 6,
    title: "Peringatan Isra Mi'raj Nabi Muhammad SAW 1448H",
    category: "Kegiatan",
    date: "15 Apr 2026",
    status: "Terbit",
    thumbnail: "bg-gradient-to-br from-cyan-400 to-brand-primary",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function KelolaBeritaPage() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Header Bar */}
      <motion.div
        variants={item}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari berita..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-100 text-sm text-gray-600 placeholder-gray-400 outline-none focus:border-brand-primary/30 focus:ring-2 focus:ring-brand-primary/10 transition-all"
            />
          </div>
          <select className="px-3 py-2.5 rounded-xl bg-white border border-gray-100 text-sm text-gray-600 outline-none focus:border-brand-primary/30 transition-all">
            <option>Semua Kategori</option>
            <option>Kegiatan</option>
            <option>Prestasi</option>
            <option>PSB</option>
            <option>Informasi</option>
          </select>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary hover:bg-brand-primary/90 text-white text-sm font-semibold rounded-xl shadow-sm shadow-brand-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md shrink-0">
          <Plus size={16} />
          Tambah Berita
        </button>
      </motion.div>

      {/* Table — Desktop */}
      <motion.div
        variants={item}
        className="hidden md:block bg-white rounded-2xl border border-gray-100 overflow-hidden"
      >
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">
                Berita
              </th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-4">
                Kategori
              </th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-4">
                Tanggal
              </th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-4">
                Status
              </th>
              <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {newsData.map((news) => (
              <tr
                key={news.id}
                className="hover:bg-gray-50/50 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl ${news.thumbnail} shrink-0`}
                    />
                    <span className="text-sm font-medium text-gray-800 line-clamp-2 max-w-sm">
                      {news.title}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="inline-flex px-2.5 py-1 rounded-lg bg-brand-primary/5 text-brand-primary text-xs font-medium">
                    {news.category}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-gray-500">{news.date}</span>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium ${
                      news.status === "Terbit"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {news.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 rounded-lg hover:bg-brand-primary/5 text-gray-400 hover:text-brand-primary transition-colors" title="Lihat">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-500 transition-colors" title="Edit">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors" title="Hapus">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Cards — Mobile */}
      <div className="md:hidden space-y-3">
        {newsData.map((news) => (
          <motion.div
            key={news.id}
            variants={item}
            className="bg-white rounded-2xl border border-gray-100 p-4"
          >
            <div className="flex items-start gap-3">
              <div className={`w-14 h-14 rounded-xl ${news.thumbnail} shrink-0`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 line-clamp-2">
                  {news.title}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-gray-400">{news.date}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-200" />
                  <span className="inline-flex px-2 py-0.5 rounded-md bg-brand-primary/5 text-brand-primary text-xs font-medium">
                    {news.category}
                  </span>
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium ${
                      news.status === "Terbit"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {news.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-1 mt-3 pt-3 border-t border-gray-50">
              <button className="p-2 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-500 transition-colors text-xs flex items-center gap-1">
                <Edit2 size={14} /> Edit
              </button>
              <button className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors text-xs flex items-center gap-1">
                <Trash2 size={14} /> Hapus
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
