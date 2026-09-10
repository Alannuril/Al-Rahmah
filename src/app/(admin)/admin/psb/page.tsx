"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Save, CheckCircle, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { PsbSettings } from "@/lib/supabase/types";

const anim = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function InformasiPSBPage() {
  const [settings, setSettings] = useState<Partial<PsbSettings>>({
    tahun_ajaran: "",
    status: "Dibuka",
    biaya_formulir: "",
    deskripsi: "",
  });
  const [settingsId, setSettingsId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const fetchData = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase.from("psb_settings").select("*").limit(1).single();
    if (data) {
      setSettings(data);
      setSettingsId(data.id);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSave = async () => {
    setSaving(true);
    const supabase = createClient();
    if (settingsId) {
      await supabase.from("psb_settings").update({ ...settings, updated_at: new Date().toISOString() }).eq("id", settingsId);
    } else {
      const { data } = await supabase.from("psb_settings").insert({ ...settings }).select().single();
      if (data) setSettingsId(data.id);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.08 }} className="max-w-3xl space-y-6">
      <motion.div variants={anim} className={"rounded-2xl p-5 flex items-center gap-4 " + (settings.status === "Dibuka" ? "bg-emerald-50 border border-emerald-100" : "bg-amber-50 border border-amber-100")}>
        <div className={"p-2.5 rounded-xl " + (settings.status === "Dibuka" ? "bg-emerald-100" : "bg-amber-100")}>
          <CheckCircle size={20} className={settings.status === "Dibuka" ? "text-emerald-600" : "text-amber-600"} />
        </div>
        <div>
          <p className={"text-sm font-semibold " + (settings.status === "Dibuka" ? "text-emerald-700" : "text-amber-700")}>
            Pendaftaran {settings.status}
          </p>
          <p className={"text-xs mt-0.5 " + (settings.status === "Dibuka" ? "text-emerald-600/70" : "text-amber-600/70")}>
            Tahun Ajaran {settings.tahun_ajaran}
          </p>
        </div>
      </motion.div>

      <motion.div variants={anim} className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Tahun Ajaran</label>
          <input type="text" value={settings.tahun_ajaran ?? ""} onChange={(e) => setSettings({ ...settings, tahun_ajaran: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-700 outline-none focus:border-brand-primary/30 focus:ring-2 focus:ring-brand-primary/10 transition-all" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Status Pendaftaran</label>
          <select value={settings.status ?? "Dibuka"} onChange={(e) => setSettings({ ...settings, status: e.target.value as "Dibuka" | "Ditutup" })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-700 outline-none focus:border-brand-primary/30 focus:ring-2 focus:ring-brand-primary/10 transition-all appearance-none">
            <option value="Dibuka">Dibuka</option>
            <option value="Ditutup">Ditutup</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Biaya Formulir</label>
          <input type="text" value={settings.biaya_formulir ?? ""} onChange={(e) => setSettings({ ...settings, biaya_formulir: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-700 outline-none focus:border-brand-primary/30 focus:ring-2 focus:ring-brand-primary/10 transition-all" placeholder="Rp 500.000" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi</label>
          <textarea rows={4} value={settings.deskripsi ?? ""} onChange={(e) => setSettings({ ...settings, deskripsi: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-700 outline-none focus:border-brand-primary/30 focus:ring-2 focus:ring-brand-primary/10 transition-all resize-none" />
        </div>
        <div className="pt-2">
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-brand-primary hover:bg-brand-primary/90 text-white text-sm font-semibold rounded-xl shadow-sm shadow-brand-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md disabled:opacity-70">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saved ? "Tersimpan!" : "Simpan Perubahan"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
