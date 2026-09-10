"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Pin, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Pengumuman } from "@/lib/supabase/types";

const anim = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

export default function PengumumanPage() {
  const [list, setList] = useState<Pengumuman[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ judul: "", konten: "", status: "Aktif", is_pinned: false });
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase.from("pengumuman").select("*").order("created_at", { ascending: false });
    setList(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSave = async () => {
    if (!form.judul.trim()) return;
    setSaving(true);
    const supabase = createClient();
    await supabase.from("pengumuman").insert({ ...form });
    setForm({ judul: "", konten: "", status: "Aktif", is_pinned: false });
    setShowForm(false);
    setSaving(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus pengumuman ini?")) return;
    setDeleting(id);
    const supabase = createClient();
    await supabase.from("pengumuman").delete().eq("id", id);
    setList((prev) => prev.filter((p) => p.id !== id));
    setDeleting(null);
  };

  const handleToggleStatus = async (p: Pengumuman) => {
    const newStatus = p.status === "Aktif" ? "Arsip" : "Aktif";
    const supabase = createClient();
    await supabase.from("pengumuman").update({ status: newStatus }).eq("id", p.id);
    setList((prev) => prev.map((x) => (x.id === p.id ? { ...x, status: newStatus } : x)));
  };

  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }} className="space-y-6">
      <motion.div variants={anim} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          {list.filter((a) => a.status === "Aktif").length} aktif · {list.filter((a) => a.status === "Arsip").length} diarsipkan
        </p>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary hover:bg-brand-primary/90 text-white text-sm font-semibold rounded-xl shadow-sm shadow-brand-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md shrink-0"
        >
          <Plus size={16} /> Tambah Pengumuman
        </button>
      </motion.div>

      {showForm && (
        <motion.div variants={anim} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h3 className="font-semibold text-gray-800">Pengumuman Baru</h3>
          <input
            type="text"
            placeholder="Judul pengumuman..."
            value={form.judul}
            onChange={(e) => setForm({ ...form, judul: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm outline-none focus:border-brand-primary/30 focus:ring-2 focus:ring-brand-primary/10 transition-all"
          />
          <textarea
            rows={3}
            placeholder="Isi pengumuman (opsional)..."
            value={form.konten}
            onChange={(e) => setForm({ ...form, konten: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm outline-none focus:border-brand-primary/30 focus:ring-2 focus:ring-brand-primary/10 transition-all resize-none"
          />
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input type="checkbox" checked={form.is_pinned} onChange={(e) => setForm({ ...form, is_pinned: e.target.checked })} className="rounded" />
              Sematkan (Pin)
            </label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="px-3 py-2 rounded-xl bg-gray-50 border border-gray-100 text-sm outline-none">
              <option>Aktif</option>
              <option>Arsip</option>
            </select>
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-xl disabled:opacity-70 transition-all hover:-translate-y-0.5">
              {saving ? <Loader2 size={16} className="animate-spin" /> : "Simpan"}
            </button>
            <button onClick={() => setShowForm(false)} className="px-5 py-2.5 bg-gray-100 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-200 transition-all">Batal</button>
          </div>
        </motion.div>
      )}

      <div className="space-y-3">
        {loading ? (
          [1,2,3].map((i) => <div key={i} className="h-16 bg-white rounded-2xl border border-gray-100 animate-pulse" />)
        ) : list.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-sm text-gray-400">
            Belum ada pengumuman. Klik &quot;Tambah Pengumuman&quot; untuk membuat.
          </div>
        ) : (
          list.map((a) => (
            <motion.div key={a.id} variants={anim} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md hover:shadow-gray-100/50 transition-all duration-200 group">
              <div className={"w-1.5 h-12 rounded-full shrink-0 cursor-pointer " + (a.status === "Aktif" ? "bg-emerald-400" : "bg-gray-200")} onClick={() => handleToggleStatus(a)} title="Klik untuk ubah status" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-gray-800 truncate">{a.judul}</h3>
                  {a.is_pinned && <Pin size={12} className="text-brand-primary shrink-0 rotate-45" />}
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs text-gray-400">{new Date(a.created_at).toLocaleDateString("id-ID")}</span>
                  <span className={"inline-flex px-2 py-0.5 rounded-md text-xs font-medium " + (a.status === "Aktif" ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-500")}>
                    {a.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <button onClick={() => handleDelete(a.id)} disabled={deleting === a.id} className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50">
                  {deleting === a.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
