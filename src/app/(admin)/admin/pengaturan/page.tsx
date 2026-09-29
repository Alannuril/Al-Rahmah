"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save, Globe, Phone, MapPin, Camera, Video, Loader2, ExternalLink } from "lucide-react";
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
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    let active = true;
    async function loadData() {
      try {
        const supabase = createClient();
        const { data } = await supabase.from("pengaturan_website").select("*").limit(1).maybeSingle();
        if (active && data) { setForm(data); setRowId(data.id); }
      } catch {
        // Keep the form available if the database cannot be reached.
      } finally {
        if (active) setLoading(false);
      }
    }
    void loadData();
    return () => { active = false; };
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaveError("");
    setSaved(false);
    try {
      const supabase = createClient();
      if (rowId) {
        const { error } = await supabase.from("pengaturan_website").update({ ...form, updated_at: new Date().toISOString() }).eq("id", rowId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from("pengaturan_website").insert({ ...form }).select().single();
        if (error) throw error;
        if (data) setRowId(data.id);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Gagal menyimpan pengaturan.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" /></div>;

  const inputClass = "w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-700 outline-none focus:border-brand-primary/30 focus:ring-2 focus:ring-brand-primary/10 transition-all";

  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.08 }} className="mx-auto grid max-w-6xl items-start gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,1fr)]">
      <motion.div variants={anim} className="space-y-5 rounded-md border border-zinc-200 bg-white p-4 sm:p-6">
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
      <motion.div variants={anim} className="space-y-5 rounded-md border border-zinc-200 bg-white p-4 sm:p-6">
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
      <motion.div variants={anim} className="flex flex-wrap items-center justify-end gap-3 lg:col-span-2">
        {saveError && <p role="alert" className="mr-auto text-sm text-red-600">{saveError}</p>}
        <a href="/kontak" target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-md border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-700 hover:border-brand-primary hover:text-brand-primary">
          Lihat Halaman Kontak <ExternalLink size={15} aria-hidden="true" />
        </a>
        <button onClick={handleSave} disabled={saving} className="inline-flex min-h-10 items-center gap-2 rounded-md bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-primary/90 disabled:opacity-70">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saved ? "Tersimpan!" : "Simpan Pengaturan"}
        </button>
      </motion.div>
    </motion.div>
  );
}
