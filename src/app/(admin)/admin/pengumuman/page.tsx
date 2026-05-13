"use client";

import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Pin } from "lucide-react";

const announcements = [
  { id: 1, title: "Jadwal Ujian Semester Genap 2026", date: "10 Mei 2026", status: "Aktif", pinned: true },
  { id: 2, title: "Libur Hari Raya Idul Adha 1448H", date: "8 Mei 2026", status: "Aktif", pinned: true },
  { id: 3, title: "Pendaftaran Ekstrakurikuler Semester 2", date: "1 Mei 2026", status: "Aktif", pinned: false },
  { id: 4, title: "Pengumuman Hasil Seleksi PSB Gelombang 1", date: "20 Apr 2026", status: "Arsip", pinned: false },
  { id: 5, title: "Perubahan Jadwal Kunjungan Orang Tua", date: "15 Apr 2026", status: "Arsip", pinned: false },
  { id: 6, title: "Jadwal Kegiatan Ramadhan 1448H", date: "1 Mar 2026", status: "Arsip", pinned: false },
];

const anim = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

export default function PengumumanPage() {
  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }} className="space-y-6">
      <motion.div variants={anim} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-sm text-gray-500">{announcements.filter(a => a.status === "Aktif").length} aktif · {announcements.filter(a => a.status === "Arsip").length} diarsipkan</p>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary hover:bg-brand-primary/90 text-white text-sm font-semibold rounded-xl shadow-sm shadow-brand-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md shrink-0">
          <Plus size={16} /> Tambah Pengumuman
        </button>
      </motion.div>

      <div className="space-y-3">
        {announcements.map((a) => (
          <motion.div key={a.id} variants={anim} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md hover:shadow-gray-100/50 transition-all duration-200 group">
            <div className={`w-1.5 h-12 rounded-full shrink-0 ${a.status === "Aktif" ? "bg-emerald-400" : "bg-gray-200"}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-gray-800 truncate">{a.title}</h3>
                {a.pinned && <Pin size={12} className="text-brand-primary shrink-0 rotate-45" />}
              </div>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs text-gray-400">{a.date}</span>
                <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium ${a.status === "Aktif" ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-500"}`}>
                  {a.status}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              <button className="p-2 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-500 transition-colors"><Edit2 size={15} /></button>
              <button className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
