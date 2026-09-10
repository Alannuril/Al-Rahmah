"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Award, Calendar, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Prestasi } from "@/lib/supabase/types";

const KATEGORI_GRADIENT: Record<string, string> = {
  Akademik: "from-amber-400 to-orange-500",
  Keagamaan: "from-brand-primary to-emerald-700",
  Bahasa: "from-indigo-400 to-purple-500",
  Teknologi: "from-cyan-400 to-blue-500",
  Seni: "from-brand-secondary to-brand-lime",
};

const anim = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

export default function MediaPrestasiPage() {
  const [list, setList] = useState<Prestasi[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ judul: "", kategori: "Akademik", tanggal: "", deskripsi: "" });
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase.from("prestasi").select("*").order("created_at", { ascending: false });
    setList(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSave = async () => {
    if (!form.judul.trim()) return;
    setSaving(true);
    const supabase = createClient();
    await supabase.from("prestasi").insert({ ...form, tanggal: form.tanggal || null });
    setForm({ judul: "", kategori: "Akademik", tanggal: "", deskripsi: "" });
    setShowForm(false);
    setSaving(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus data prestasi ini?")) return;
    setDeleting(id);
    const supabase = createClient();
    await supabase.from("prestasi").delete().eq("id", id);
    setList((prev) => prev.filter((p) => p.id !== id));
    setDeleting(null);
  };

  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }} className="space-y-6">
      <motion.div variants={anim} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-sm text-gray-500">{list.length} prestasi tercatat</p>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary hover:bg-brand-primary/90 text-white text-sm font-semibold rounded-xl shadow-sm shadow-brand-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md shrink-0">
          <Plus size={16} /> Tambah Prestasi
        </button>
      </motion.div>

      {showForm && (
        <motion.div variants={anim} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h3 className="font-semibold text-gray-800">Prestasi Baru</h3>
          <input type="text" placeholder="Judul prestasi..." value={form.judul} onChange={(e) => setForm({ ...form, judul: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm outline-none focus:border-brand-primary/30 focus:ring-2 focus:ring-brand-primary/10 transition-all" />
          <div className="grid grid-cols-2 gap-4">
            <select value={form.kategori} onChange={(e) => setForm({ ...form, kategori: e.target.value })} className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm outline-none">
              {["Akademik","Keagamaan","Bahasa","Teknologi","Seni"].map((k) => <option key={k}>{k}</option>)}
            </select>
            <input type="date" value={form.tanggal} onChange={(e) => setForm({ ...form, tanggal: e.target.value })} className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm outline-none focus:border-brand-primary/30" />
          </div>
          <textarea rows={2} placeholder="Deskripsi (opsional)..." value={form.deskripsi} onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm outline-none focus:border-brand-primary/30 transition-all resize-none" />
          <div className="flex gap-3">
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-xl disabled:opacity-70 transition-all hover:-translate-y-0.5">
              {saving ? <Loader2 size={16} className="animate-spin" /> : "Simpan"}
            </button>
            <button onClick={() => setShowForm(false)} className="px-5 py-2.5 bg-gray-100 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-200 transition-all">Batal</button>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        {loading ? (
          [1,2,3,4,5,6].map((i) => <div key={i} className="h-52 bg-white rounded-2xl border border-gray-100 animate-pulse" />)
        ) : list.length === 0 ? (
          <div className="col-span-3 bg-white rounded-2xl border border-gray-100 p-8 text-center text-sm text-gray-400">Belum ada data prestasi.</div>
        ) : (
          list.map((m) => (
            <motion.div key={m.id} variants={anim} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:shadow-gray-100/50 hover:-translate-y-0.5 transition-all duration-300">
              <div className={"relative h-36 bg-gradient-to-br " + (KATEGORI_GRADIENT[m.kategori ?? ""] ?? "from-gray-200 to-gray-300") + " flex items-center justify-center"}>
                {m.foto_url ? (
                  <img src={m.foto_url} alt={m.judul} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <Award size={40} className="text-white/30" />
                )}
                <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleDelete(m.id)} disabled={deleting === m.id} className="p-1.5 bg-white/90 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all shadow disabled:opacity-50">
                    {deleting === m.id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                  </button>
                </div>
              </div>
              <div className="p-4">
                <span className="inline-flex px-2 py-0.5 rounded-md bg-brand-primary/5 text-brand-primary text-xs font-medium mb-2">{m.kategori}</span>
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">{m.judul}</h3>
                {m.tanggal && (
                  <div className="flex items-center gap-1.5 mt-2">
                    <Calendar size={12} className="text-gray-400" />
                    <span className="text-xs text-gray-400">{new Date(m.tanggal).toLocaleDateString("id-ID")}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
