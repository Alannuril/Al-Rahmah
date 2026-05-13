"use client";

import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Award, Calendar } from "lucide-react";

const mediaData = [
  { id: 1, title: "Juara 1 Olimpiade Sains Nasional", category: "Akademik", date: "8 Mei 2026", gradient: "from-amber-400 to-orange-500" },
  { id: 2, title: "Juara Umum MTQ Tingkat Provinsi", category: "Keagamaan", date: "20 Apr 2026", gradient: "from-brand-primary to-emerald-700" },
  { id: 3, title: "Finalis Lomba Debat Bahasa Arab", category: "Bahasa", date: "10 Apr 2026", gradient: "from-indigo-400 to-purple-500" },
  { id: 4, title: "Juara 2 Kompetisi Robotik Regional", category: "Teknologi", date: "1 Mar 2026", gradient: "from-cyan-400 to-blue-500" },
  { id: 5, title: "Best Speaker — MUN Jakarta 2026", category: "Akademik", date: "15 Feb 2026", gradient: "from-rose-400 to-pink-500" },
  { id: 6, title: "Juara 3 Kaligrafi Nasional", category: "Seni", date: "5 Feb 2026", gradient: "from-brand-secondary to-brand-lime" },
];

const anim = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

export default function MediaPrestasiPage() {
  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }} className="space-y-6">
      <motion.div variants={anim} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-sm text-gray-500">{mediaData.length} prestasi tercatat</p>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary hover:bg-brand-primary/90 text-white text-sm font-semibold rounded-xl shadow-sm shadow-brand-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md shrink-0">
          <Plus size={16} /> Tambah Prestasi
        </button>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        {mediaData.map((m) => (
          <motion.div key={m.id} variants={anim} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:shadow-gray-100/50 hover:-translate-y-0.5 transition-all duration-300">
            <div className={`relative h-36 bg-gradient-to-br ${m.gradient} flex items-center justify-center`}>
              <Award size={40} className="text-white/30" />
              <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 bg-white/90 rounded-lg text-blue-500 hover:bg-blue-500 hover:text-white transition-all shadow"><Edit2 size={13} /></button>
                <button className="p-1.5 bg-white/90 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all shadow"><Trash2 size={13} /></button>
              </div>
            </div>
            <div className="p-4">
              <span className="inline-flex px-2 py-0.5 rounded-md bg-brand-primary/5 text-brand-primary text-xs font-medium mb-2">{m.category}</span>
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">{m.title}</h3>
              <div className="flex items-center gap-1.5 mt-2">
                <Calendar size={12} className="text-gray-400" />
                <span className="text-xs text-gray-400">{m.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
