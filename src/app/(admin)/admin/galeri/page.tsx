"use client";

import { motion } from "framer-motion";
import { Plus, Trash2, Calendar, ImageIcon } from "lucide-react";

const galleryData = [
  { id: 1, title: "Wisuda Tahfidz 2026", count: 24, date: "12 Mei 2026", gradient: "from-brand-primary to-emerald-700" },
  { id: 2, title: "Kegiatan Ramadhan 1448H", count: 36, date: "5 Mar 2026", gradient: "from-brand-secondary to-brand-lime" },
  { id: 3, title: "Olimpiade Sains 2026", count: 18, date: "28 Feb 2026", gradient: "from-amber-400 to-orange-500" },
  { id: 4, title: "Perkemahan Santri", count: 42, date: "15 Feb 2026", gradient: "from-cyan-400 to-brand-primary" },
  { id: 5, title: "Kunjungan Delegasi Malaysia", count: 15, date: "20 Jan 2026", gradient: "from-indigo-400 to-purple-500" },
  { id: 6, title: "Peringatan Maulid Nabi", count: 28, date: "10 Jan 2026", gradient: "from-brand-accent to-brand-secondary" },
  { id: 7, title: "Fasilitas Pondok", count: 20, date: "5 Jan 2026", gradient: "from-rose-400 to-pink-500" },
  { id: 8, title: "Kegiatan Ekstrakurikuler", count: 30, date: "28 Des 2025", gradient: "from-emerald-400 to-teal-600" },
];

const anim = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function KelolaGaleriPage() {
  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }} className="space-y-6">
      <motion.div variants={anim} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-sm text-gray-500">{galleryData.length} album · {galleryData.reduce((s, g) => s + g.count, 0)} foto</p>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary hover:bg-brand-primary/90 text-white text-sm font-semibold rounded-xl shadow-sm shadow-brand-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md shrink-0">
          <Plus size={16} /> Upload Foto
        </button>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
        {galleryData.map((g) => (
          <motion.div key={g.id} variants={anim} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:shadow-gray-100/50 hover:-translate-y-0.5 transition-all duration-300">
            <div className={`relative aspect-[4/3] bg-gradient-to-br ${g.gradient}`}>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <button className="opacity-0 group-hover:opacity-100 p-2.5 bg-white/90 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 shadow-lg transform scale-75 group-hover:scale-100">
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                <ImageIcon size={12} className="text-white/80" />
                <span className="text-xs text-white font-medium">{g.count} foto</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-800 truncate">{g.title}</h3>
              <div className="flex items-center gap-1.5 mt-1.5">
                <Calendar size={12} className="text-gray-400" />
                <span className="text-xs text-gray-400">{g.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
