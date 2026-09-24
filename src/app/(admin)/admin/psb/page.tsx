"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Save,
  CheckCircle2,
  XCircle,
  Loader2,
  FileSpreadsheet,
  Calendar,
  CreditCard,
  Phone,
  Upload,
  ExternalLink,
  Plus,
  Trash2,
  Image as ImageIcon,
  AlertCircle,
  Check,
  RefreshCw,
  Sparkles,
  Info,
  Layers,
  Clock,
  Star,
  CalendarDays,
  CheckCircle,
  Tag,
  ArrowRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { PsbSettings } from "@/lib/supabase/types";
import {
  PsbFullConfig,
  PsbGelombangConfig,
  parsePsbSettings,
  encodePsbPayload,
  DEFAULT_GELOMBANG_CONFIGS,
  formatIndoDate,
  formatDateRangeDisplay,
  calculateAutoGelombangStatus,
} from "@/lib/utils/psbHelper";
import { DUMMY_PSB_DATA, PsbContact } from "@/lib/constants/psbData";

const anim = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

export default function InformasiPSBPage() {
  const [config, setConfig] = useState<PsbFullConfig>(() =>
    parsePsbSettings(null)
  );
  const [settingsId, setSettingsId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Upload state
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch Settings from Supabase
  const fetchSettings = useCallback(async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("psb_settings")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (error && error.code !== "PGRST116") {
        console.warn("Notice: Fetching psb_settings returned:", error.message);
      }

      if (data) {
        setSettingsId(data.id);
        setConfig(parsePsbSettings(data as Partial<PsbSettings>));
      }
    } catch (err) {
      console.error("Error fetching PSB settings:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // Handle Field Updates
  const updateField = <K extends keyof PsbFullConfig>(
    key: K,
    val: PsbFullConfig[K]
  ) => {
    setConfig((prev) => ({ ...prev, [key]: val }));
    setSaveSuccess(false);
  };

  // Kontak Panitia Handlers
  const handleContactChange = (
    index: number,
    field: keyof PsbContact,
    value: string
  ) => {
    setConfig((prev) => {
      const updated = [...prev.kontak_panitia];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, kontak_panitia: updated };
    });
    setSaveSuccess(false);
  };

  const handleAddContact = () => {
    setConfig((prev) => ({
      ...prev,
      kontak_panitia: [
        ...prev.kontak_panitia,
        {
          nama: "",
          peran: "Panitia PSB",
          nomor: "",
          waUrl: "",
        },
      ],
    }));
  };

  const handleRemoveContact = (index: number) => {
    if (config.kontak_panitia.length <= 1) {
      alert("Harap pertahankan minimal satu kontak narahubung panitia.");
      return;
    }
    setConfig((prev) => ({
      ...prev,
      kontak_panitia: prev.kontak_panitia.filter((_, i) => i !== index),
    }));
  };

  // Helper Auto-generate Periode Label dari tanggal
  const handleAutoGenerateLabel = () => {
    if (!config.tanggal_mulai || !config.tanggal_selesai) {
      alert("Harap isi Tanggal Mulai dan Tanggal Selesai terlebih dahulu.");
      return;
    }
    const label = formatDateRangeDisplay(config.tanggal_mulai, config.tanggal_selesai);
    updateField("periode_label", `${label} M`);
  };

  // Gelombang Handlers
  const handleGelombangChange = (
    index: number,
    field: keyof PsbGelombangConfig,
    value: unknown
  ) => {
    setConfig((prev) => {
      const updated = [...prev.gelombang];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, gelombang: updated };
    });
    setSaveSuccess(false);
  };

  const handleSetActiveGelombang = (index: number) => {
    setConfig((prev) => {
      const targetWave = prev.gelombang[index];
      const updated = prev.gelombang.map((g, i) => ({
        ...g,
        is_active: i === index,
        // Jika statusnya Akan Datang, otomatis ubah ke Dibuka
        status: i === index && g.status === "Akan Datang" ? "Dibuka" : g.status,
      }));

      // Sinkronkan periode banner utama jika ada tanggalnya
      let newLabel = prev.periode_label;
      if (targetWave.tanggal_mulai && targetWave.tanggal_selesai) {
        newLabel = `${formatDateRangeDisplay(targetWave.tanggal_mulai, targetWave.tanggal_selesai)} M`;
      }

      return {
        ...prev,
        gelombang: updated,
        tanggal_mulai: targetWave.tanggal_mulai || prev.tanggal_mulai,
        tanggal_selesai: targetWave.tanggal_selesai || prev.tanggal_selesai,
        periode_label: newLabel,
      };
    });
    setSaveSuccess(false);
  };

  const handleAddGelombang = () => {
    setConfig((prev) => {
      const nextNum = prev.gelombang.length + 1;
      const newWave: PsbGelombangConfig = {
        id: `gel-${Date.now()}`,
        nama: `Gelombang ${nextNum}`,
        tanggal_mulai: "",
        tanggal_selesai: "",
        tanggal_tes: "",
        tanggal_pengumuman: "",
        tanggal_daftar_ulang: "",
        status: "Akan Datang",
        kuota: "",
        catatan: "",
        is_active: false,
      };
      return {
        ...prev,
        gelombang: [...prev.gelombang, newWave],
      };
    });
    setSaveSuccess(false);
  };

  const handleRemoveGelombang = (index: number) => {
    if (config.gelombang.length <= 1) {
      alert("Harap pertahankan minimal satu skema gelombang pendaftaran.");
      return;
    }
    const wave = config.gelombang[index];
    if (!confirm(`Hapus ${wave.nama}?`)) return;

    setConfig((prev) => {
      const updated = prev.gelombang.filter((_, i) => i !== index);
      if (wave.is_active && updated.length > 0) {
        updated[0].is_active = true;
      }
      return { ...prev, gelombang: updated };
    });
    setSaveSuccess(false);
  };

  const handleApplyDefaultWaves = () => {
    if (
      !confirm(
        "Terapkan skema standar Gelombang 1-3? Tanggal dan pengaturan gelombang saat ini akan digantikan dengan template bawaan."
      )
    ) {
      return;
    }
    setConfig((prev) => ({
      ...prev,
      gelombang: DEFAULT_GELOMBANG_CONFIGS,
    }));
    setSaveSuccess(false);
  };

  const handleAutoDetectWaveStatuses = () => {
    setConfig((prev) => {
      const updated = prev.gelombang.map((wave) => {
        const autoStatus = calculateAutoGelombangStatus(
          wave.tanggal_mulai,
          wave.tanggal_selesai
        );
        return {
          ...wave,
          status: autoStatus,
        };
      });
      return { ...prev, gelombang: updated };
    });
    setSaveSuccess(false);
  };

  const handleSyncBannerFromActiveWave = () => {
    const active = config.gelombang.find((g) => g.is_active) || config.gelombang[0];
    if (!active) return;
    if (!active.tanggal_mulai || !active.tanggal_selesai) {
      alert("Gelombang aktif belum memiliki tanggal mulai dan selesai.");
      return;
    }
    const label = `${formatDateRangeDisplay(active.tanggal_mulai, active.tanggal_selesai)} M`;
    setConfig((prev) => ({
      ...prev,
      tanggal_mulai: active.tanggal_mulai,
      tanggal_selesai: active.tanggal_selesai,
      periode_label: label,
    }));
    alert(`Periode utama berhasil disinkronkan dengan ${active.nama}!`);
  };

  // Handle Upload Image File
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Gagal mengunggah gambar.");
      }

      updateField("brosur_url", json.url);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal mengunggah poster.";
      setUploadError(msg);
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Handle Save to Supabase (Resilient Two-Tier Fallback)
  const handleSave = async () => {
    setSaving(true);
    setErrorMessage("");
    setSaveSuccess(false);

    try {
      const supabase = createClient();
      const { fullPayload, basePayload } = encodePsbPayload(config);

      let saveError = null;

      if (settingsId) {
        // 1. Coba update dengan full payload
        const res = await supabase
          .from("psb_settings")
          .update(fullPayload)
          .eq("id", settingsId);

        saveError = res.error;

        // 2. Jika kolom baru belum ada di DB (error PGRST204 / 42703), gunakan basePayload
        if (
          saveError &&
          (saveError.code === "PGRST204" ||
            saveError.code === "42703" ||
            saveError.message?.includes("column"))
        ) {
          console.info(
            "Kolom dinamis belum bermigrasi, menyimpan ke base payload dengan cadangan JSON di deskripsi."
          );
          const fallbackRes = await supabase
            .from("psb_settings")
            .update(basePayload)
            .eq("id", settingsId);
          saveError = fallbackRes.error;
        }
      } else {
        // 1. Coba insert dengan full payload
        const res = await supabase
          .from("psb_settings")
          .insert(fullPayload)
          .select()
          .single();

        saveError = res.error;

        // 2. Fallback insert jika kolom belum ada
        if (
          saveError &&
          (saveError.code === "PGRST204" ||
            saveError.code === "42703" ||
            saveError.message?.includes("column"))
        ) {
          console.info(
            "Kolom dinamis belum bermigrasi, insert ke base payload dengan cadangan JSON di deskripsi."
          );
          const fallbackRes = await supabase
            .from("psb_settings")
            .insert(basePayload)
            .select()
            .single();
          saveError = fallbackRes.error;
          if (fallbackRes.data) setSettingsId(fallbackRes.data.id);
        } else if (res.data) {
          setSettingsId(res.data.id);
        }
      }

      if (saveError) {
        throw new Error(saveError.message || "Gagal menyimpan data ke database.");
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan.";
      setErrorMessage(msg);
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full px-3.5 py-2.5 rounded-xl bg-zinc-50/70 border border-zinc-200/90 text-sm text-zinc-800 outline-none focus:bg-white focus:border-[#396E5F] focus:ring-2 focus:ring-[#396E5F]/15 transition-all font-medium placeholder:text-zinc-400";

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-3">
        <Loader2 size={32} className="animate-spin text-[#396E5F]" />
        <p className="text-sm text-zinc-500 font-medium">
          Memuat konfigurasi pendaftaran PSB...
        </p>
      </div>
    );
  }

  const isOpened = config.status === "Dibuka";

  return (
    <motion.div
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.05 }}
      className="max-w-5xl space-y-6 pb-16"
    >
      {/* Header Halaman (Clean & Minimalist - Tanpa Tombol Simpan di Atas) */}
      <div className="border-b border-zinc-200/80 pb-5">
        <h1 className="text-2xl font-heading font-bold text-zinc-900 tracking-tight">
          Penerimaan Santri Baru (PSB)
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 mt-1">
          Kelola status penerimaan santri, jadwal gelombang, brosur poster, link formulir, dan kontak panitia secara dinamis.
        </p>
      </div>

      {/* Alert Error / Sukses */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
          <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-600" />
          <div className="flex-1">
            <p className="font-semibold">Gagal Menyimpan</p>
            <p className="text-xs mt-0.5 text-red-600">{errorMessage}</p>
          </div>
        </div>
      )}

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3">
          <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
          <span>
            Perubahan konfigurasi PSB berhasil disimpan dan langsung aktif di halaman publik!
          </span>
        </div>
      )}

      {/* ============================================================ */}
      {/* 1. STATUS CARD DENGAN SAKLAR BUTTON (TOGGLE SWITCH MODERN)   */}
      {/* ============================================================ */}
      <motion.div
        variants={anim}
        className="bg-white rounded-2xl p-5 sm:p-6 border border-zinc-200/80 shadow-2xs transition-all"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                isOpened
                  ? "bg-emerald-50 text-emerald-600 border border-emerald-200/60"
                  : "bg-zinc-100 text-zinc-500 border border-zinc-200"
              }`}
            >
              {isOpened ? (
                <CheckCircle2 size={22} />
              ) : (
                <XCircle size={22} />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-zinc-500">
                  Status Penerimaan
                </span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold transition-colors ${
                    isOpened
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-zinc-100 text-zinc-600 border border-zinc-200"
                  }`}
                >
                  {isOpened ? "Sedang Dibuka" : "Sedang Ditutup"}
                </span>
              </div>
              <p className="font-heading text-base sm:text-lg font-bold text-zinc-900 mt-0.5">
                Tahun Ajaran {config.tahun_ajaran}
              </p>
            </div>
          </div>

          {/* Saklar Toggle Switch (Familiar, Clean, Modern) */}
          <div className="flex items-center gap-3 self-start sm:self-center">
            <div className="text-right hidden sm:block">
              <span className="block text-xs font-bold text-zinc-800">
                {isOpened ? "Pendaftaran Aktif" : "Pendaftaran Nonaktif"}
              </span>
              <span className="block text-[11px] text-zinc-400">
                {isOpened
                  ? "Formulir dapat diakses oleh publik"
                  : "Formulir ditutup untuk publik"}
              </span>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={isOpened}
              onClick={() =>
                updateField("status", isOpened ? "Ditutup" : "Dibuka")
              }
              className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#396E5F]/30 ${
                isOpened ? "bg-[#396E5F]" : "bg-zinc-300"
              }`}
            >
              <span className="sr-only">Toggle Status Pendaftaran</span>
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  isOpened ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ============================================================ */}
        {/* KOLOM KIRI (7 Kolom): FORM SETTINGS UTAMA                    */}
        {/* ============================================================ */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* KARTU 1: INFORMASI DASAR & JADWAL UTAMA */}
          <motion.div
            variants={anim}
            className="bg-white rounded-2xl border border-zinc-200/80 p-5 sm:p-6 shadow-2xs space-y-4"
          >
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div className="flex items-center gap-2 text-zinc-900 font-heading font-bold text-sm sm:text-base">
                <div className="w-7 h-7 rounded-lg bg-[#396E5F]/10 text-[#396E5F] flex items-center justify-center">
                  <Calendar size={15} />
                </div>
                <h2>1. Periode &amp; Banner Utama</h2>
              </div>
              <button
                type="button"
                onClick={handleSyncBannerFromActiveWave}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-[#396E5F] bg-[#396E5F]/10 hover:bg-[#396E5F]/20 transition-colors cursor-pointer"
                title="Salin tanggal pendaftaran dari gelombang yang aktif saat ini"
              >
                <CalendarDays size={12} />
                <span>Sinkron Gelombang Aktif</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                  Tahun Ajaran <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={config.tahun_ajaran}
                  onChange={(e) => updateField("tahun_ajaran", e.target.value)}
                  placeholder="Contoh: 2026/2027"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                  Tanggal Mulai
                </label>
                <input
                  type="date"
                  value={config.tanggal_mulai}
                  onChange={(e) => updateField("tanggal_mulai", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                  Tanggal Selesai (Batas Waktu)
                </label>
                <input
                  type="date"
                  value={config.tanggal_selesai}
                  onChange={(e) =>
                    updateField("tanggal_selesai", e.target.value)
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-zinc-700">
                    Label Periode Pendaftaran
                  </label>
                  <button
                    type="button"
                    onClick={handleAutoGenerateLabel}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold text-[#396E5F] bg-[#396E5F]/8 hover:bg-[#396E5F]/15 transition-colors cursor-pointer"
                  >
                    <Sparkles size={11} /> Auto Format
                  </button>
                </div>
                <input
                  type="text"
                  value={config.periode_label}
                  onChange={(e) =>
                    updateField("periode_label", e.target.value)
                  }
                  placeholder="Contoh: Senin, 16 Maret s/d Kamis, 2 April 2026 M"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                Judul Banner / Pengumuman Pendaftaran
              </label>
              <input
                type="text"
                value={config.judul}
                onChange={(e) => updateField("judul", e.target.value)}
                placeholder="Contoh: Pendaftaran Santri Baru Pondok Pesantren Al-Rahmah Melalui Online"
                className={inputClass}
              />
            </div>
          </motion.div>

          {/* KARTU 2: SKEMA & JADWAL GELOMBANG PENDAFTARAN (DINAMIS) */}
          <motion.div
            variants={anim}
            className="bg-white rounded-2xl border border-zinc-200/80 p-5 sm:p-6 shadow-2xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-3">
              <div className="flex items-center gap-2 text-zinc-900 font-heading font-bold text-sm sm:text-base">
                <div className="w-7 h-7 rounded-lg bg-[#396E5F]/10 text-[#396E5F] flex items-center justify-center">
                  <Layers size={15} />
                </div>
                <div>
                  <h2>2. Skema &amp; Jadwal Gelombang (Dinamis)</h2>
                </div>
              </div>

              {/* Quick actions for Gelombang */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleAutoDetectWaveStatuses}
                  title="Sesuaikan status dibuka/akan datang/ditutup otomatis sesuai tanggal hari ini"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Clock size={12} />
                  <span>Deteksi Status</span>
                </button>
                <button
                  type="button"
                  onClick={handleApplyDefaultWaves}
                  title="Gunakan skema 3 gelombang standar Al-Rahmah"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <RefreshCw size={12} />
                  <span>Preset Standar (1-3)</span>
                </button>
                <button
                  type="button"
                  onClick={handleAddGelombang}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#396E5F]/10 hover:bg-[#396E5F]/15 text-[#396E5F] text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Plus size={13} />
                  <span>Tambah Gelombang</span>
                </button>
              </div>
            </div>

            <p className="text-xs text-zinc-500 leading-relaxed">
              Atur tanggal pembukaan, penutupan, jadwal seleksi/tes, dan pengumuman untuk masing-masing gelombang santri baru. Setiap gelombang akan ditampilkan di halaman PSB publik secara dinamis.
            </p>

            {/* List Kartu Gelombang */}
            <div className="space-y-4 pt-1">
              {config.gelombang.map((wave, idx) => {
                const isActive = wave.is_active;
                return (
                  <div
                    key={wave.id || idx}
                    className={`rounded-2xl border transition-all duration-200 p-4 sm:p-5 space-y-3.5 ${
                      isActive
                        ? "border-[#396E5F] bg-gradient-to-br from-[#F2F7F4] via-white to-white shadow-xs ring-1 ring-[#396E5F]/30"
                        : "border-zinc-200/90 bg-white hover:border-zinc-300"
                    }`}
                  >
                    {/* Top Row: Wave Title, Active Switch, Status Pill, Delete Button */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-heading font-bold text-sm text-zinc-900 flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-[#396E5F] text-white text-[11px] font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span>{wave.nama || `Gelombang ${idx + 1}`}</span>
                        </span>

                        {/* Active Wave Indicator / Trigger */}
                        {isActive ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            <Star size={11} className="fill-emerald-600 text-emerald-600" />
                            <span>Gelombang Aktif</span>
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleSetActiveGelombang(idx)}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-zinc-600 hover:text-[#396E5F] bg-zinc-100 hover:bg-[#396E5F]/10 border border-zinc-200 transition-colors cursor-pointer"
                          >
                            <Star size={11} />
                            <span>Jadikan Gelombang Aktif</span>
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Status Select */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-semibold text-zinc-500">
                            Status:
                          </span>
                          <select
                            value={wave.status}
                            onChange={(e) =>
                              handleGelombangChange(idx, "status", e.target.value)
                            }
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold border outline-none cursor-pointer ${
                              wave.status === "Dibuka"
                                ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                : wave.status === "Akan Datang"
                                ? "bg-sky-50 text-sky-800 border-sky-300"
                                : "bg-zinc-100 text-zinc-700 border-zinc-300"
                            }`}
                          >
                            <option value="Dibuka">🟢 Dibuka</option>
                            <option value="Akan Datang">🔵 Akan Datang</option>
                            <option value="Ditutup">⚪ Ditutup</option>
                          </select>
                        </div>

                        {/* Delete Wave */}
                        <button
                          type="button"
                          onClick={() => handleRemoveGelombang(idx)}
                          disabled={config.gelombang.length <= 1}
                          title="Hapus gelombang ini"
                          className="p-1.5 text-zinc-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>

                    {/* Inputs Grid */}
                    <div className="space-y-3">
                      {/* Row 1: Nama & Periode Pendaftaran */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                        <div className="sm:col-span-4">
                          <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                            Nama Gelombang <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={wave.nama}
                            onChange={(e) =>
                              handleGelombangChange(idx, "nama", e.target.value)
                            }
                            placeholder="Contoh: Gelombang 1"
                            className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-800 outline-none focus:bg-white focus:border-[#396E5F]"
                          />
                        </div>

                        <div className="sm:col-span-4">
                          <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                            Tanggal Mulai Pendaftaran
                          </label>
                          <input
                            type="date"
                            value={wave.tanggal_mulai}
                            onChange={(e) =>
                              handleGelombangChange(
                                idx,
                                "tanggal_mulai",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-800 outline-none focus:bg-white focus:border-[#396E5F]"
                          />
                        </div>

                        <div className="sm:col-span-4">
                          <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                            Tanggal Selesai (Batas Waktu)
                          </label>
                          <input
                            type="date"
                            value={wave.tanggal_selesai}
                            onChange={(e) =>
                              handleGelombangChange(
                                idx,
                                "tanggal_selesai",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-800 outline-none focus:bg-white focus:border-[#396E5F]"
                          />
                        </div>
                      </div>

                      {/* Row 2: Jadwal Seleksi, Pengumuman & Daftar Ulang */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                            Tanggal Tes / Observasi
                          </label>
                          <input
                            type="text"
                            value={wave.tanggal_tes || ""}
                            onChange={(e) =>
                              handleGelombangChange(
                                idx,
                                "tanggal_tes",
                                e.target.value
                              )
                            }
                            placeholder="Contoh: 1 Maret 2026"
                            className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-800 outline-none focus:bg-white focus:border-[#396E5F]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                            Tanggal Pengumuman Kelulusan
                          </label>
                          <input
                            type="text"
                            value={wave.tanggal_pengumuman || ""}
                            onChange={(e) =>
                              handleGelombangChange(
                                idx,
                                "tanggal_pengumuman",
                                e.target.value
                              )
                            }
                            placeholder="Contoh: 5 Maret 2026"
                            className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-800 outline-none focus:bg-white focus:border-[#396E5F]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                            Tanggal Daftar Ulang
                          </label>
                          <input
                            type="text"
                            value={wave.tanggal_daftar_ulang || ""}
                            onChange={(e) =>
                              handleGelombangChange(
                                idx,
                                "tanggal_daftar_ulang",
                                e.target.value
                              )
                            }
                            placeholder="Contoh: 6 - 15 Maret 2026"
                            className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-800 outline-none focus:bg-white focus:border-[#396E5F]"
                          />
                        </div>
                      </div>

                      {/* Row 3: Kuota Santri & Catatan Khusus */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                        <div className="sm:col-span-4">
                          <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                            Target Kuota Santri (Opsional)
                          </label>
                          <input
                            type="text"
                            value={wave.kuota || ""}
                            onChange={(e) =>
                              handleGelombangChange(idx, "kuota", e.target.value)
                            }
                            placeholder="Contoh: 60 Santri"
                            className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-800 outline-none focus:bg-white focus:border-[#396E5F]"
                          />
                        </div>

                        <div className="sm:col-span-8">
                          <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                            Keterangan / Catatan Gelombang (Opsional)
                          </label>
                          <input
                            type="text"
                            value={wave.catatan || ""}
                            onChange={(e) =>
                              handleGelombangChange(
                                idx,
                                "catatan",
                                e.target.value
                              )
                            }
                            placeholder="Contoh: Jalur Peminatan Khusus & Prestasi Tahfidz"
                            className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-800 outline-none focus:bg-white focus:border-[#396E5F]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Wave Footer: Date range badge */}
                    <div className="pt-2 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
                      <span className="text-zinc-500 font-medium flex items-center gap-1.5">
                        <Calendar size={12} className="text-[#396E5F]" />
                        <span>
                          Durasi Pendaftaran:{" "}
                          <strong className="text-zinc-800 font-semibold">
                            {formatDateRangeDisplay(
                              wave.tanggal_mulai,
                              wave.tanggal_selesai
                            )}
                          </strong>
                        </span>
                      </span>

                      {isActive && (
                        <span className="text-[#396E5F] font-semibold flex items-center gap-1">
                          <CheckCircle2 size={12} />
                          <span>Ditampilkan sebagai gelombang aktif di halaman utama</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* KARTU 3: LINK GOOGLE FORM (SATU PINTU) */}
          <motion.div
            variants={anim}
            className="bg-white rounded-2xl border border-zinc-200/80 p-5 sm:p-6 shadow-2xs space-y-4"
          >
            <div className="flex items-center gap-2 text-zinc-900 font-heading font-bold text-sm sm:text-base border-b border-zinc-100 pb-3">
              <div className="w-7 h-7 rounded-lg bg-[#396E5F]/10 text-[#396E5F] flex items-center justify-center">
                <FileSpreadsheet size={15} />
              </div>
              <h2>3. Link Formulir Online (Google Form Satu Pintu)</h2>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                URL Google Form Resmi <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={config.google_form_url}
                  onChange={(e) =>
                    updateField("google_form_url", e.target.value)
                  }
                  placeholder="https://forms.gle/..."
                  className={inputClass}
                />
                {config.google_form_url && (
                  <a
                    href={config.google_form_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold rounded-xl transition-colors shrink-0 cursor-pointer"
                  >
                    <span>Uji Link</span>
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
              <p className="text-[11px] text-zinc-400 mt-1.5">
                Calon wali santri akan langsung diarahkan ke tautan formulir ini saat mengklik tombol &ldquo;Isi Formulir (Google Form)&rdquo;.
              </p>
            </div>
          </motion.div>

          {/* KARTU 3: BIAYA FORMULIR & REKENING PEMBAYARAN */}
          <motion.div
            variants={anim}
            className="bg-white rounded-2xl border border-zinc-200/80 p-5 sm:p-6 shadow-2xs space-y-4"
          >
            <div className="flex items-center gap-2 text-zinc-900 font-heading font-bold text-sm sm:text-base border-b border-zinc-100 pb-3">
              <div className="w-7 h-7 rounded-lg bg-[#396E5F]/10 text-[#396E5F] flex items-center justify-center">
                <CreditCard size={15} />
              </div>
              <h2>4. Biaya Pendaftaran &amp; Rekening Bank</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                  Biaya Formulir (Non-Yatim)
                </label>
                <input
                  type="text"
                  value={config.biaya_formulir}
                  onChange={(e) =>
                    updateField("biaya_formulir", e.target.value)
                  }
                  placeholder="Contoh: Rp 150.000,-"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                  Nama Bank
                </label>
                <input
                  type="text"
                  value={config.rekening_bank}
                  onChange={(e) =>
                    updateField("rekening_bank", e.target.value)
                  }
                  placeholder="Contoh: BSI (Bank Syariah Indonesia)"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                  Nomor Rekening
                </label>
                <input
                  type="text"
                  value={config.rekening_nomor}
                  onChange={(e) =>
                    updateField("rekening_nomor", e.target.value)
                  }
                  placeholder="Contoh: 7777365546"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                  Atas Nama Rekening
                </label>
                <input
                  type="text"
                  value={config.rekening_nama}
                  onChange={(e) =>
                    updateField("rekening_nama", e.target.value)
                  }
                  placeholder="Contoh: Pondok Pesantren Al Rahmah"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Catatan Konsisten Santri Yatim */}
            <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200/50 text-xs text-emerald-800 leading-relaxed flex items-start gap-2">
              <Info size={15} className="text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Kebijakan Santri Yatim Tetap Konsisten:</strong> Calon santri yatim 100% bebas biaya formulir dengan melampirkan Akta Kematian Ayah dari Dukcapil.
              </span>
            </div>
          </motion.div>

          {/* KARTU 5: KONTAK PANITIA PSB (WHATSAPP) */}
          <motion.div
            variants={anim}
            className="bg-white rounded-2xl border border-zinc-200/80 p-5 sm:p-6 shadow-2xs space-y-4"
          >
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div className="flex items-center gap-2 text-zinc-900 font-heading font-bold text-sm sm:text-base">
                <div className="w-7 h-7 rounded-lg bg-[#396E5F]/10 text-[#396E5F] flex items-center justify-center">
                  <Phone size={15} />
                </div>
                <h2>5. Narahubung Panitia (WhatsApp)</h2>
              </div>
              <button
                type="button"
                onClick={handleAddContact}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#396E5F]/10 hover:bg-[#396E5F]/15 text-[#396E5F] text-xs font-semibold transition-colors cursor-pointer"
              >
                <Plus size={13} />
                <span>Tambah Panitia</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {config.kontak_panitia.map((contact, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-zinc-50/70 border border-zinc-200/70 grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center"
                >
                  <div className="sm:col-span-4">
                    <label className="block text-[10px] font-semibold text-zinc-500 uppercase mb-1">
                      Nama
                    </label>
                    <input
                      type="text"
                      value={contact.nama}
                      onChange={(e) =>
                        handleContactChange(idx, "nama", e.target.value)
                      }
                      placeholder="Nama Panitia"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-zinc-200 text-xs text-zinc-800 outline-none focus:border-[#396E5F]"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[10px] font-semibold text-zinc-500 uppercase mb-1">
                      Peran
                    </label>
                    <input
                      type="text"
                      value={contact.peran}
                      onChange={(e) =>
                        handleContactChange(idx, "peran", e.target.value)
                      }
                      placeholder="Panitia PSB"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-zinc-200 text-xs text-zinc-800 outline-none focus:border-[#396E5F]"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <label className="block text-[10px] font-semibold text-zinc-500 uppercase mb-1">
                      No. WhatsApp
                    </label>
                    <input
                      type="text"
                      value={contact.nomor}
                      onChange={(e) =>
                        handleContactChange(idx, "nomor", e.target.value)
                      }
                      placeholder="0895-xxxx-xxxx"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-zinc-200 text-xs text-zinc-800 outline-none focus:border-[#396E5F]"
                    />
                  </div>

                  <div className="sm:col-span-1 flex justify-end sm:pt-4">
                    <button
                      type="button"
                      onClick={() => handleRemoveContact(idx)}
                      title="Hapus kontak"
                      className="p-1.5 text-zinc-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* KARTU 6: CATATAN TAMBAHAN (OPSIONAL) */}
          <motion.div
            variants={anim}
            className="bg-white rounded-2xl border border-zinc-200/80 p-5 sm:p-6 shadow-2xs space-y-2.5"
          >
            <label className="block text-xs font-semibold text-zinc-700">
              6. Catatan atau Petunjuk Tambahan (Opsional)
            </label>
            <textarea
              rows={3}
              value={config.deskripsi}
              onChange={(e) => updateField("deskripsi", e.target.value)}
              placeholder="Tuliskan petunjuk umum tambahan bila ada..."
              className={inputClass + " resize-none leading-relaxed"}
            />
          </motion.div>
        </div>

        {/* ============================================================ */}
        {/* KOLOM KANAN (5 Kolom): POSTER & BROSUR RESMI (PREVIEW)       */}
        {/* ============================================================ */}
        <div className="lg:col-span-5 space-y-6">
          <motion.div
            variants={anim}
            className="bg-white rounded-2xl border border-zinc-200/80 p-5 sm:p-6 shadow-2xs space-y-4"
          >
            <div className="flex items-center gap-2 text-zinc-900 font-heading font-bold text-sm sm:text-base border-b border-zinc-100 pb-3">
              <div className="w-7 h-7 rounded-lg bg-[#396E5F]/10 text-[#396E5F] flex items-center justify-center">
                <ImageIcon size={15} />
              </div>
              <h2>Poster &amp; Brosur Resmi (Flyer)</h2>
            </div>

            {/* Live Preview Poster */}
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-[280px] aspect-[326/456] rounded-xl overflow-hidden bg-zinc-50 border border-zinc-200 shadow-2xs flex items-center justify-center">
                {config.brosur_url ? (
                  <Image
                    src={config.brosur_url}
                    alt="Preview Poster PSB Al-Rahmah"
                    fill
                    sizes="280px"
                    className="object-contain p-2"
                  />
                ) : (
                  <div className="text-center p-6 text-zinc-400">
                    <ImageIcon size={40} className="mx-auto mb-2 opacity-40" />
                    <p className="text-xs font-medium">Belum ada poster</p>
                  </div>
                )}

                {uploadingImage && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex flex-col items-center justify-center gap-2 z-20">
                    <Loader2 size={26} className="animate-spin text-[#396E5F]" />
                    <span className="text-xs font-bold text-[#396E5F]">
                      Mengunggah poster...
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Error Upload */}
            {uploadError && (
              <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                {uploadError}
              </p>
            )}

            {/* Upload Buttons */}
            <div className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/jpg"
                onChange={handleFileUpload}
                className="hidden"
                id="psb-flyer-file-input"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingImage}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#396E5F]/10 hover:bg-[#396E5F]/15 text-[#396E5F] text-xs sm:text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50"
              >
                <Upload size={15} />
                <span>Unggah Foto Poster Baru</span>
              </button>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-500 mb-1">
                  Atau gunakan URL / path gambar langsung:
                </label>
                <input
                  type="text"
                  value={config.brosur_url}
                  onChange={(e) => updateField("brosur_url", e.target.value)}
                  placeholder="/images/psb/brosur-psb-flyer.png"
                  className="w-full px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-200 text-xs text-zinc-800 outline-none focus:border-[#396E5F]"
                />
              </div>

              {/* Reset to Default */}
              {config.brosur_url !== DUMMY_PSB_DATA.flyerUrl && (
                <button
                  type="button"
                  onClick={() => updateField("brosur_url", DUMMY_PSB_DATA.flyerUrl)}
                  className="text-[11px] text-zinc-500 hover:text-zinc-800 flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw size={11} /> Kembalikan ke poster bawaan
                </button>
              )}
            </div>
          </motion.div>

          {/* PRATINJAU SKEMA GELOMBANG PUBLIK */}
          <motion.div
            variants={anim}
            className="bg-white rounded-2xl border border-zinc-200/80 p-5 sm:p-6 shadow-2xs space-y-4"
          >
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div className="flex items-center gap-2 text-zinc-900 font-heading font-bold text-sm sm:text-base">
                <div className="w-7 h-7 rounded-lg bg-[#396E5F]/10 text-[#396E5F] flex items-center justify-center">
                  <CalendarDays size={15} />
                </div>
                <h2>Pratinjau Jadwal Publik</h2>
              </div>
              <span className="text-[11px] font-semibold text-[#396E5F] bg-[#396E5F]/10 px-2 py-0.5 rounded-full">
                Live View
              </span>
            </div>

            <p className="text-xs text-zinc-500">
              Berikut ringkasan jadwal gelombang yang akan dilihat oleh calon wali santri di halaman pendaftaran:
            </p>

            {/* Clean Line Process Stepper Live Preview (No Cards) */}
            <div className="relative pl-6 space-y-6 pt-2">
              {config.gelombang.map((g, i) => {
                const isActive = g.is_active;
                const isOpen = g.status === "Dibuka";
                const isClosed = g.status === "Ditutup";
                const isLast = i === config.gelombang.length - 1;

                return (
                  <div key={g.id || i} className="relative">
                    {/* Connecting vertical line */}
                    {!isLast && (
                      <div
                        className={`absolute -left-[18px] top-6 bottom-[-24px] w-[2px] ${
                          isClosed ? "bg-[#396E5F]" : "bg-zinc-200"
                        }`}
                      />
                    )}

                    {/* Node circle on the line */}
                    <div
                      className={`absolute -left-[27px] top-0.5 w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                        isOpen
                          ? "bg-[#396E5F] text-white ring-2 ring-[#396E5F]/20"
                          : isClosed
                          ? "bg-emerald-100 text-[#396E5F]"
                          : "bg-white text-zinc-400 border border-zinc-300"
                      }`}
                    >
                      {isClosed ? <Check size={11} strokeWidth={2.5} /> : i + 1}
                    </div>

                    {/* Header info */}
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-heading font-bold text-zinc-900 text-xs">
                        {g.nama}
                      </span>
                      {isOpen ? (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Dibuka
                        </span>
                      ) : isClosed ? (
                        <span className="text-[10px] text-zinc-400 font-medium">
                          Ditutup
                        </span>
                      ) : (
                        <span className="text-[10px] text-zinc-400 font-medium">
                          Belum Dibuka
                        </span>
                      )}
                    </div>

                    {/* Schedule dates (Only registration period and test date) */}
                    <div className="text-[11px] text-zinc-600 space-y-0.5">
                      <div className="font-semibold text-zinc-800">
                        {formatDateRangeDisplay(g.tanggal_mulai, g.tanggal_selesai)}
                      </div>
                      {g.tanggal_tes && (
                        <div className="text-zinc-500">
                          Tes: <span className="text-zinc-700 font-medium">{g.tanggal_tes}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 6. BOTTOM SAVE ACTION BAR (MINIMALIST & CLEAN)                */}
      {/* ============================================================ */}
      <motion.div
        variants={anim}
        className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 bg-white rounded-2xl border border-zinc-200/80 shadow-2xs"
      >
        <div className="text-xs text-zinc-500 text-center sm:text-left">
          {saveSuccess ? (
            <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold">
              <CheckCircle2 size={16} className="text-emerald-600" />
              Semua perubahan berhasil disimpan dan langsung aktif di halaman publik!
            </span>
          ) : (
            <span>
              Pastikan data sudah sesuai, lalu klik tombol simpan untuk memperbarui halaman publik.
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#396E5F] hover:bg-[#1E3F35] text-white text-sm font-semibold rounded-xl shadow-xs transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 cursor-pointer shrink-0"
        >
          {saving ? (
            <Loader2 size={16} className="animate-spin" />
          ) : saveSuccess ? (
            <Check size={16} className="text-emerald-300" />
          ) : (
            <Save size={16} />
          )}
          <span>
            {saving
              ? "Menyimpan Perubahan..."
              : saveSuccess
              ? "Perubahan Tersimpan!"
              : "Simpan Semua Pengaturan"}
          </span>
        </button>
      </motion.div>
    </motion.div>
  );
}
