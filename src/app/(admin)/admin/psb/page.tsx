"use client";

import { motion } from "framer-motion";
import { Save, Upload, CheckCircle } from "lucide-react";

const anim = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function InformasiPSBPage() {
  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.08 }} className="max-w-3xl space-y-6">
      {/* Status Card */}
      <motion.div variants={anim} className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 flex items-center gap-4">
        <div className="p-2.5 bg-emerald-100 rounded-xl"><CheckCircle size={20} className="text-emerald-600" /></div>
        <div>
          <p className="text-sm font-semibold text-emerald-700">Pendaftaran Dibuka</p>
          <p className="text-xs text-emerald-600/70 mt-0.5">Tahun Ajaran 2026/2027 — 342 pendaftar terdaftar</p>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div variants={anim} className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Tahun Ajaran</label>
          <input type="text" defaultValue="2026/2027" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-700 outline-none focus:border-brand-primary/30 focus:ring-2 focus:ring-brand-primary/10 transition-all" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Status Pendaftaran</label>
          <select defaultValue="dibuka" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-700 outline-none focus:border-brand-primary/30 focus:ring-2 focus:ring-brand-primary/10 transition-all appearance-none">
            <option value="dibuka">Dibuka</option>
            <option value="ditutup">Ditutup</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Biaya Pendaftaran</label>
          <input type="text" defaultValue="Rp 500.000" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-700 outline-none focus:border-brand-primary/30 focus:ring-2 focus:ring-brand-primary/10 transition-all" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Brosur</label>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-brand-primary/30 hover:bg-brand-primary/[0.02] transition-all cursor-pointer group">
            <Upload size={28} className="mx-auto text-gray-300 group-hover:text-brand-primary/50 transition-colors mb-3" />
            <p className="text-sm text-gray-500">Drag & drop file atau <span className="text-brand-primary font-medium">klik untuk upload</span></p>
            <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG — Maks 5MB</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi Singkat</label>
          <textarea rows={4} defaultValue="Pondok Pesantren Al-Rahmah Walantaka membuka pendaftaran santri baru untuk tahun ajaran 2026/2027. Program unggulan meliputi Tahfidz Al-Quran, Kurikulum Nasional, dan Pengembangan Bahasa Arab & Inggris." className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-700 outline-none focus:border-brand-primary/30 focus:ring-2 focus:ring-brand-primary/10 transition-all resize-none" />
        </div>

        <div className="pt-2">
          <button className="flex items-center gap-2 px-6 py-3 bg-brand-primary hover:bg-brand-primary/90 text-white text-sm font-semibold rounded-xl shadow-sm shadow-brand-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <Save size={16} /> Simpan Perubahan
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
