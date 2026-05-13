"use client";

import { motion } from "framer-motion";
import { Save, Globe, Phone, MapPin, Camera, Video } from "lucide-react";

const anim = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function PengaturanPage() {
  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.08 }} className="max-w-3xl space-y-6">
      <motion.div variants={anim} className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 space-y-6">
        <h2 className="font-heading font-bold text-gray-800 flex items-center gap-2"><Globe size={18} className="text-brand-primary" /> Informasi Umum</h2>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Website</label>
          <input type="text" defaultValue="Pondok Pesantren Al-Rahmah Walantaka" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-700 outline-none focus:border-brand-primary/30 focus:ring-2 focus:ring-brand-primary/10 transition-all" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Tagline</label>
          <input type="text" defaultValue="Membentuk Generasi Qurani, Berakhlak, dan Berprestasi" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-700 outline-none focus:border-brand-primary/30 focus:ring-2 focus:ring-brand-primary/10 transition-all" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5"><Phone size={14} /> Nomor WhatsApp</label>
          <input type="text" defaultValue="+62 812-3456-7890" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-700 outline-none focus:border-brand-primary/30 focus:ring-2 focus:ring-brand-primary/10 transition-all" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5"><MapPin size={14} /> Alamat Pondok</label>
          <textarea rows={3} defaultValue="Jl. Raya Walantaka No. 1, Kecamatan Walantaka, Kota Serang, Provinsi Banten 42183" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-700 outline-none focus:border-brand-primary/30 focus:ring-2 focus:ring-brand-primary/10 transition-all resize-none" />
        </div>
      </motion.div>

      <motion.div variants={anim} className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 space-y-6">
        <h2 className="font-heading font-bold text-gray-800">Media Sosial</h2>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5"><Camera size={14} /> Link Instagram</label>
          <input type="url" defaultValue="https://instagram.com/alrahmah.walantaka" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-700 outline-none focus:border-brand-primary/30 focus:ring-2 focus:ring-brand-primary/10 transition-all" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5"><Video size={14} /> Link YouTube</label>
          <input type="url" defaultValue="https://youtube.com/@alrahmahwalantaka" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-700 outline-none focus:border-brand-primary/30 focus:ring-2 focus:ring-brand-primary/10 transition-all" />
        </div>
      </motion.div>

      <motion.div variants={anim} className="pt-2">
        <button className="flex items-center gap-2 px-6 py-3 bg-brand-primary hover:bg-brand-primary/90 text-white text-sm font-semibold rounded-xl shadow-sm shadow-brand-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <Save size={16} /> Simpan Pengaturan
        </button>
      </motion.div>
    </motion.div>
  );
}
