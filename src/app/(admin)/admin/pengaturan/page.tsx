"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Save, Globe, Phone, MapPin, Camera, Video, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { PengaturanWebsite } from "@/lib/supabase/types";

const anim = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function PengaturanPage() {
  const [form, setForm] = useState<Partial<PengaturanWebsite>>({
    nama_website: "",
    tagline: "",
    no_whatsapp: "",
    alamat: "",
    instagram_url: "",
    youtube_url: "",
  });
  const [rowId, setRowId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const fetchData = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase.from("pengaturan_website").select("*").limit(1).single();
    if (data) { setForm(data); setRowId(data.id); }
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSave = async () => {
    setSaving(true);
    const supabase = createClient();
    if (rowId) {
      await supabase.from("pengaturan_website").update({ ...form, updated_at: new Date().toISOString() }).eq("id", rowId);
    } else {
      const { data } = await supabase.from("pengaturan_website").insert({ ...form }).select().single();
      if (data) setRowId(data.id);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" /></div>;

  const inputClass = "w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-700 outline-none focus:border-brand-primary/30 focus:ring-2 focus:ring-brand-primary/10 transition-all";

  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.08 }} className="max-w-3xl space-y-6">
      <motion.div variants={anim} className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 space-y-6">
        <h2 className="font-heading font-bold text-gray-800 flex items-center gap-2"><Globe size={18} className="text-brand-primary" /> Informasi Umum</h2>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Website</label>
          <input type="text" value={form.nama_website ?? ""} onChange={(e) => setForm({ ...form, nama_website: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Tagline</label>
          <input type="text" value={form.tagline ?? ""} onChange={(e) => setForm({ ...form, tagline: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5"><Phone size={14} /> Nomor WhatsApp</label>
          <input type="text" value={form.no_whatsapp ?? ""} onChange={(e) => setForm({ ...form, no_whatsapp: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5"><MapPin size={14} /> Alamat Pondok</label>
          <textarea rows={3} value={form.alamat ?? ""} onChange={(e) => setForm({ ...form, alamat: e.target.value })} className={inputClass + " resize-none"} />
        </div>
      </motion.div>
      <motion.div variants={anim} className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 space-y-6">
        <h2 className="font-heading font-bold text-gray-800">Media Sosial</h2>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5"><Camera size={14} /> Link Instagram</label>
          <input type="url" value={form.instagram_url ?? ""} onChange={(e) => setForm({ ...form, instagram_url: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5"><Video size={14} /> Link YouTube</label>
          <input type="url" value={form.youtube_url ?? ""} onChange={(e) => setForm({ ...form, youtube_url: e.target.value })} className={inputClass} />
        </div>
      </motion.div>
      <motion.div variants={anim} className="pt-2">
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-brand-primary hover:bg-brand-primary/90 text-white text-sm font-semibold rounded-xl shadow-sm shadow-brand-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md disabled:opacity-70">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saved ? "Tersimpan!" : "Simpan Pengaturan"}
        </button>
      </motion.div>
    </motion.div>
  );
}
