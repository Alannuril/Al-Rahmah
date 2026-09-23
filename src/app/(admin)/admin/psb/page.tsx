"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Save,
  CheckCircle,
  XCircle,
  Loader2,
  FileSpreadsheet,
  ShieldCheck,
  Info,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { PsbSettings } from "@/lib/supabase/types";

const anim = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function InformasiPSBPage() {
  // PSB Settings State
  const [settings, setSettings] = useState<Partial<PsbSettings>>({
    tahun_ajaran: "2026/2027",
    status: "Dibuka",
    biaya_formulir: "Rp 150.000 (Non-Yatim) / Gratis (Yatim)",
    deskripsi: "",
  });
  const [settingsId, setSettingsId] = useState<string | null>(null);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [savedSettings, setSavedSettings] = useState(false);

  // Fetch Settings
  const fetchSettings = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("psb_settings")
      .select("*")
      .limit(1)
      .maybeSingle();
    if (data) {
      setSettings(data);
      setSettingsId(data.id);
    }
    setLoadingSettings(false);
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // Save Settings
  const handleSaveSettings = async () => {
    setSavingSettings(true);
    const supabase = createClient();
    if (settingsId) {
      await supabase
        .from("psb_settings")
        .update({ ...settings, updated_at: new Date().toISOString() })
        .eq("id", settingsId);
    } else {
      const { data } = await supabase
        .from("psb_settings")
        .insert({ ...settings })
        .select()
        .single();
      if (data) setSettingsId(data.id);
    }
    setSavingSettings(false);
    setSavedSettings(true);
    setTimeout(() => setSavedSettings(false), 3000);
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.08 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-xl font-heading font-bold text-gray-900">
            Penerimaan Santri Baru (PSB)
          </h1>
          <p className="text-sm text-gray-500">
            Kelola konfigurasi status penerimaan santri dan integrasi pendaftaran satu pintu.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom Kiri: Form Pengaturan PSB */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Banner */}
          <motion.div
            variants={anim}
            className={`rounded-2xl p-5 flex items-center gap-4 ${
              settings.status === "Dibuka"
                ? "bg-emerald-50 border border-emerald-100"
                : "bg-amber-50 border border-amber-100"
            }`}
          >
            <div
              className={`p-2.5 rounded-xl ${
                settings.status === "Dibuka"
                  ? "bg-emerald-100"
                  : "bg-amber-100"
              }`}
            >
              {settings.status === "Dibuka" ? (
                <CheckCircle size={20} className="text-emerald-600" />
              ) : (
                <XCircle size={20} className="text-amber-600" />
              )}
            </div>
            <div>
              <p
                className={`text-sm font-semibold ${
                  settings.status === "Dibuka"
                    ? "text-emerald-700"
                    : "text-amber-700"
                }`}
              >
                Pendaftaran Sedang {settings.status}
              </p>
              <p
                className={`text-xs mt-0.5 ${
                  settings.status === "Dibuka"
                    ? "text-emerald-600/70"
                    : "text-amber-600/70"
                }`}
              >
                Tahun Ajaran {settings.tahun_ajaran || "2026/2027"} — Sistem Satu Pintu Google Form
              </p>
            </div>
          </motion.div>

          {/* Form Settings */}
          <motion.div
            variants={anim}
            className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 space-y-6 shadow-sm"
          >
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                Tahun Ajaran
              </label>
              <input
                type="text"
                value={settings.tahun_ajaran ?? ""}
                onChange={(e) =>
                  setSettings({ ...settings, tahun_ajaran: e.target.value })
                }
                placeholder="2026/2027"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-800 outline-none focus:bg-white focus:border-brand-primary/30 transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                Status Pendaftaran
              </label>
              <select
                value={settings.status ?? "Dibuka"}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    status: e.target.value as "Dibuka" | "Ditutup",
                  })
                }
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-800 outline-none focus:bg-white focus:border-brand-primary/30 transition-all font-medium"
              >
                <option value="Dibuka">
                  Dibuka (Calon wali santri dapat mengakses formulir pendaftaran)
                </option>
                <option value="Ditutup">
                  Ditutup (Pendaftaran sementara dinonaktifkan di website)
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                Biaya Formulir Pendaftaran
              </label>
              <input
                type="text"
                value={settings.biaya_formulir ?? ""}
                onChange={(e) =>
                  setSettings({ ...settings, biaya_formulir: e.target.value })
                }
                placeholder="Contoh: Rp 150.000"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-800 outline-none focus:bg-white focus:border-brand-primary/30 transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                Informasi &amp; Catatan PSB
              </label>
              <textarea
                rows={4}
                value={settings.deskripsi ?? ""}
                onChange={(e) =>
                  setSettings({ ...settings, deskripsi: e.target.value })
                }
                placeholder="Tuliskan petunjuk umum atau informasi kuota..."
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-800 outline-none focus:bg-white focus:border-brand-primary/30 transition-all resize-none leading-relaxed"
              />
            </div>

            <div className="pt-2">
              <button
                onClick={handleSaveSettings}
                disabled={savingSettings || loadingSettings}
                className="flex items-center gap-2 px-6 py-3.5 bg-brand-primary hover:bg-brand-primary/90 text-white text-sm font-bold rounded-xl shadow-md shadow-brand-primary/20 transition-all hover:-translate-y-0.5 disabled:opacity-70 cursor-pointer"
              >
                {savingSettings ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Save size={16} />
                )}
                {savedSettings ? "Berhasil Disimpan!" : "Simpan Pengaturan"}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Kolom Kanan: Informasi Skema Satu Pintu Google Form */}
        <div className="space-y-6">
          <motion.div
            variants={anim}
            className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-primary flex items-center justify-center">
              <FileSpreadsheet size={20} />
            </div>
            <div>
              <h3 className="font-heading font-bold text-gray-900 text-base">
                Pendaftaran Satu Pintu (Google Form)
              </h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Sesuai kebijakan pendaftaran baru, calon santri mengisi formulir langsung melalui Google Form panitia. Berkas dan data tersimpan otomatis di Google Drive/Spreadsheet panitia.
              </p>
            </div>

            <div className="pt-2 border-t border-gray-100 space-y-2.5 text-xs text-gray-600">
              <div className="flex items-start gap-2">
                <ShieldCheck size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <span>Penyimpanan Supabase lebih hemat dan performa database website tetap optimal.</span>
              </div>
              <div className="flex items-start gap-2">
                <Info size={16} className="text-blue-600 shrink-0 mt-0.5" />
                <span>Seluruh calon santri terkoordinasi langsung dengan panitia PSB Walantaka.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
