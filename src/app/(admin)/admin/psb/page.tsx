"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Save, CheckCircle, XCircle, Users, Search, Filter,
  Trash2, Eye, Check, X, Clock, Loader2, Phone, School, User, ExternalLink, FileCheck
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { PsbSettings, PendaftarPsb, PsbStatus } from "@/lib/supabase/types";

const anim = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function InformasiPSBPage() {
  const [activeTab, setActiveTab] = useState<"settings" | "pendaftar">("settings");

  // PSB Settings State
  const [settings, setSettings] = useState<Partial<PsbSettings>>({
    tahun_ajaran: "2026/2027",
    status: "Dibuka",
    biaya_formulir: "Rp 500.000",
    deskripsi: "",
  });
  const [settingsId, setSettingsId] = useState<string | null>(null);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [savedSettings, setSavedSettings] = useState(false);

  // Pendaftar State
  const [pendaftarList, setPendaftarList] = useState<PendaftarPsb[]>([]);
  const [filteredPendaftar, setFilteredPendaftar] = useState<PendaftarPsb[]>([]);
  const [loadingPendaftar, setLoadingPendaftar] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("Semua");
  const [programFilter, setProgramFilter] = useState<string>("Semua");
  const [kategoriFilter, setKategoriFilter] = useState<string>("Semua");
  const [tingkatFilter, setTingkatFilter] = useState<string>("Semua");
  const [selectedPendaftar, setSelectedPendaftar] = useState<PendaftarPsb | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Fetch Settings
  const fetchSettings = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase.from("psb_settings").select("*").limit(1).maybeSingle();
    if (data) {
      setSettings(data);
      setSettingsId(data.id);
    }
    setLoadingSettings(false);
  }, []);

  // Fetch Pendaftar
  const fetchPendaftar = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("pendaftar_psb")
      .select("*")
      .order("created_at", { ascending: false });
    setPendaftarList(data ?? []);
    setFilteredPendaftar(data ?? []);
    setLoadingPendaftar(false);
  }, []);

  useEffect(() => {
    fetchSettings();
    fetchPendaftar();
  }, [fetchSettings, fetchPendaftar]);

  // Filter Pendaftar
  useEffect(() => {
    let res = pendaftarList;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      res = res.filter(
        (p) =>
          p.nama_lengkap.toLowerCase().includes(q) ||
          (p.nisn && p.nisn.toLowerCase().includes(q)) ||
          (p.asal_sekolah && p.asal_sekolah.toLowerCase().includes(q)) ||
          (p.email && p.email.toLowerCase().includes(q)) ||
          (p.nama_wali && p.nama_wali.toLowerCase().includes(q))
      );
    }
    if (statusFilter !== "Semua") {
      res = res.filter((p) => p.status === statusFilter);
    }
    if (programFilter !== "Semua") {
      res = res.filter((p) => p.program === programFilter);
    }
    if (kategoriFilter !== "Semua") {
      res = res.filter((p) => (p.keterangan || "").toUpperCase() === kategoriFilter.toUpperCase());
    }
    if (tingkatFilter !== "Semua") {
      res = res.filter((p) => (p.tingkat || p.program || "").toLowerCase().includes(tingkatFilter.toLowerCase()));
    }
    setFilteredPendaftar(res);
  }, [searchQuery, statusFilter, programFilter, kategoriFilter, tingkatFilter, pendaftarList]);

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
      const { data } = await supabase.from("psb_settings").insert({ ...settings }).select().single();
      if (data) setSettingsId(data.id);
    }
    setSavingSettings(false);
    setSavedSettings(true);
    setTimeout(() => setSavedSettings(false), 3000);
  };

  // Update Status Pendaftar
  const handleUpdateStatus = async (id: string, newStatus: PsbStatus) => {
    setActionLoading(id);
    const supabase = createClient();
    await supabase.from("pendaftar_psb").update({ status: newStatus }).eq("id", id);
    setPendaftarList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
    if (selectedPendaftar && selectedPendaftar.id === id) {
      setSelectedPendaftar((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    setActionLoading(null);
  };

  // Delete Pendaftar
  const handleDeletePendaftar = async (id: string, name: string) => {
    if (!confirm(`Hapus data pendaftar "${name}"?`)) return;
    setActionLoading(id);
    const supabase = createClient();
    await supabase.from("pendaftar_psb").delete().eq("id", id);
    setPendaftarList((prev) => prev.filter((p) => p.id !== id));
    if (selectedPendaftar?.id === id) setSelectedPendaftar(null);
    setActionLoading(null);
  };

  // Count stats
  const totalCount = pendaftarList.length;
  const menungguCount = pendaftarList.filter((p) => p.status === "Menunggu").length;
  const lulusCount = pendaftarList.filter((p) => p.status === "Lulus").length;
  const tidakLulusCount = pendaftarList.filter((p) => p.status === "Tidak Lulus").length;

  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.08 }} className="space-y-6">
      {/* Header with Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-xl font-heading font-bold text-gray-900">Penerimaan Santri Baru (PSB)</h1>
          <p className="text-sm text-gray-500">Kelola konfigurasi gelombang pendaftaran dan pantau data calon santri.</p>
        </div>

        <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === "settings" ? "bg-white text-brand-primary shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Pengaturan PSB
          </button>
          <button
            onClick={() => setActiveTab("pendaftar")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === "pendaftar" ? "bg-white text-brand-primary shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Users size={14} />
            Data Pendaftar ({totalCount})
          </button>
        </div>
      </div>

      {/* ================= TAB 1: PENGATURAN PSB ================= */}
      {activeTab === "settings" && (
        <div className="max-w-3xl space-y-6">
          {/* Status Badge card */}
          <motion.div
            variants={anim}
            className={`rounded-2xl p-5 flex items-center gap-4 ${
              settings.status === "Dibuka" ? "bg-emerald-50 border border-emerald-100" : "bg-amber-50 border border-amber-100"
            }`}
          >
            <div className={`p-2.5 rounded-xl ${settings.status === "Dibuka" ? "bg-emerald-100" : "bg-amber-100"}`}>
              {settings.status === "Dibuka" ? (
                <CheckCircle size={20} className="text-emerald-600" />
              ) : (
                <XCircle size={20} className="text-amber-600" />
              )}
            </div>
            <div>
              <p className={`text-sm font-semibold ${settings.status === "Dibuka" ? "text-emerald-700" : "text-amber-700"}`}>
                Pendaftaran Sedang {settings.status}
              </p>
              <p className={`text-xs mt-0.5 ${settings.status === "Dibuka" ? "text-emerald-600/70" : "text-amber-600/70"}`}>
                Tahun Ajaran {settings.tahun_ajaran || "2026/2027"} — Total {totalCount} calon santri terdaftar
              </p>
            </div>
          </motion.div>

          {/* Form Settings */}
          <motion.div variants={anim} className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 space-y-6 shadow-sm">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Tahun Ajaran</label>
              <input
                type="text"
                value={settings.tahun_ajaran ?? ""}
                onChange={(e) => setSettings({ ...settings, tahun_ajaran: e.target.value })}
                placeholder="2026/2027"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-800 outline-none focus:bg-white focus:border-brand-primary/30 transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Status Pendaftaran</label>
              <select
                value={settings.status ?? "Dibuka"}
                onChange={(e) => setSettings({ ...settings, status: e.target.value as "Dibuka" | "Ditutup" })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-800 outline-none focus:bg-white focus:border-brand-primary/30 transition-all font-medium"
              >
                <option value="Dibuka">Dibuka (Calon santri dapat mengisi formulir)</option>
                <option value="Ditutup">Ditutup (Pendaftaran sementara dinonaktifkan)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Biaya Formulir Pendaftaran</label>
              <input
                type="text"
                value={settings.biaya_formulir ?? ""}
                onChange={(e) => setSettings({ ...settings, biaya_formulir: e.target.value })}
                placeholder="Contoh: Rp 500.000"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-800 outline-none focus:bg-white focus:border-brand-primary/30 transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Informasi &amp; Catatan PSB</label>
              <textarea
                rows={4}
                value={settings.deskripsi ?? ""}
                onChange={(e) => setSettings({ ...settings, deskripsi: e.target.value })}
                placeholder="Tuliskan petunjuk umum atau informasi kuota..."
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-800 outline-none focus:bg-white focus:border-brand-primary/30 transition-all resize-none leading-relaxed"
              />
            </div>

            <div className="pt-2">
              <button
                onClick={handleSaveSettings}
                disabled={savingSettings}
                className="flex items-center gap-2 px-6 py-3.5 bg-brand-primary hover:bg-brand-primary/90 text-white text-sm font-bold rounded-xl shadow-md shadow-brand-primary/20 transition-all hover:-translate-y-0.5 disabled:opacity-70"
              >
                {savingSettings ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {savedSettings ? "Berhasil Disimpan!" : "Simpan Pengaturan"}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ================= TAB 2: DATA PENDAFTAR ================= */}
      {activeTab === "pendaftar" && (
        <div className="space-y-6">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-400 font-semibold uppercase">Total Pendaftar</p>
              <p className="text-2xl font-heading font-bold text-gray-900 mt-1">{totalCount}</p>
            </div>
            <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-100 shadow-sm">
              <p className="text-xs text-amber-700 font-semibold uppercase">Menunggu</p>
              <p className="text-2xl font-heading font-bold text-amber-700 mt-1">{menungguCount}</p>
            </div>
            <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 shadow-sm">
              <p className="text-xs text-emerald-700 font-semibold uppercase">Lulus / Diterima</p>
              <p className="text-2xl font-heading font-bold text-emerald-700 mt-1">{lulusCount}</p>
            </div>
            <div className="bg-red-50/60 p-4 rounded-2xl border border-red-100 shadow-sm">
              <p className="text-xs text-red-600 font-semibold uppercase">Tidak Lulus</p>
              <p className="text-2xl font-heading font-bold text-red-600 mt-1">{tidakLulusCount}</p>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama, NISN, atau asal sekolah..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm outline-none focus:border-brand-primary/30 transition-all"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-gray-700 outline-none"
              >
                <option value="Semua">Semua Status</option>
                <option value="Menunggu">Menunggu</option>
                <option value="Lulus">Lulus</option>
                <option value="Tidak Lulus">Tidak Lulus</option>
              </select>

              <select
                value={tingkatFilter}
                onChange={(e) => setTingkatFilter(e.target.value)}
                className="px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-gray-700 outline-none"
              >
                <option value="Semua">Semua Jenjang</option>
                <option value="MTs">MTs</option>
                <option value="MA">MA</option>
              </select>

              <select
                value={kategoriFilter}
                onChange={(e) => setKategoriFilter(e.target.value)}
                className="px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-gray-700 outline-none"
              >
                <option value="Semua">Semua Kategori</option>
                <option value="NON YATIM">Non-Yatim</option>
                <option value="YATIM">Yatim</option>
              </select>
            </div>
          </div>

          {/* Pendaftar Table */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50/70 border-b border-gray-100 text-xs text-gray-500 uppercase font-semibold">
                  <tr>
                    <th className="px-6 py-4">Nama Santri</th>
                    <th className="px-4 py-4">Jenjang &amp; Kategori</th>
                    <th className="px-4 py-4">Kontak / Akun</th>
                    <th className="px-4 py-4">Asal Sekolah</th>
                    <th className="px-4 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loadingPendaftar ? (
                    [1, 2, 3].map((i) => (
                      <tr key={i}>
                        <td className="px-6 py-4"><div className="h-4 bg-gray-100 animate-pulse rounded w-36" /></td>
                        <td className="px-4 py-4"><div className="h-4 bg-gray-100 animate-pulse rounded w-20" /></td>
                        <td className="px-4 py-4"><div className="h-4 bg-gray-100 animate-pulse rounded w-28" /></td>
                        <td className="px-4 py-4"><div className="h-4 bg-gray-100 animate-pulse rounded w-32" /></td>
                        <td className="px-4 py-4"><div className="h-4 bg-gray-100 animate-pulse rounded w-16" /></td>
                        <td className="px-6 py-4" />
                      </tr>
                    ))
                  ) : filteredPendaftar.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-gray-400 text-sm">
                        {pendaftarList.length === 0
                          ? "Belum ada calon santri yang mendaftar online."
                          : "Tidak ada pendaftar yang cocok dengan filter pencarian."}
                      </td>
                    </tr>
                  ) : (
                    filteredPendaftar.map((p) => {
                      const statusColor =
                        p.status === "Lulus"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : p.status === "Tidak Lulus"
                          ? "bg-red-50 text-red-700 border-red-200"
                          : "bg-amber-50 text-amber-700 border-amber-200";

                      return (
                        <tr key={p.id} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="font-bold text-gray-900">{p.nama_lengkap}</div>
                            <div className="text-xs text-gray-400">
                              NISN: {p.nisn || "-"} · {p.jenis_kelamin || "-"}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex flex-col gap-1 items-start">
                              <span className="inline-flex px-2 py-0.5 rounded text-[11px] font-bold bg-brand-primary/10 text-brand-primary">
                                {p.tingkat || p.program || "MTs"}
                              </span>
                              <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold ${
                                (p.keterangan || "").toUpperCase() === "YATIM"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-zinc-100 text-zinc-700"
                              }`}>
                                {p.keterangan || "NON YATIM"}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-xs font-medium text-gray-600">
                            {p.no_hp && (
                              <a
                                href={`https://wa.me/${p.no_hp.replace(/[^0-9]/g, "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-brand-primary hover:underline block"
                              >
                                <Phone size={12} />
                                {p.no_hp}
                              </a>
                            )}
                            {p.email && (
                              <span className="text-[11px] text-gray-400 block truncate max-w-[140px]">
                                {p.email}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-4 text-xs text-gray-600">
                            {p.asal_sekolah || "-"}
                          </td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-bold border ${statusColor}`}>
                              {p.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => setSelectedPendaftar(p)}
                                className="p-2 text-gray-500 hover:text-brand-primary hover:bg-brand-primary/5 rounded-lg transition-colors"
                                title="Lihat Detail Pendaftar"
                              >
                                <Eye size={15} />
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(p.id, "Lulus")}
                                disabled={actionLoading === p.id}
                                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                title="Tandai Lulus"
                              >
                                <Check size={15} />
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(p.id, "Tidak Lulus")}
                                disabled={actionLoading === p.id}
                                className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                title="Tandai Tidak Lulus"
                              >
                                <X size={15} />
                              </button>
                              <button
                                onClick={() => handleDeletePendaftar(p.id, p.nama_lengkap)}
                                disabled={actionLoading === p.id}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="Hapus Data"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal Detail Pendaftar */}
          {selectedPendaftar && (
            <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-xl shadow-2xl border border-gray-100 space-y-6 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div>
                    <h3 className="font-heading font-bold text-gray-900 text-lg">
                      Detail Calon Santri
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      ID: {selectedPendaftar.id}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedPendaftar(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Nama Lengkap</p>
                    <p className="font-bold text-gray-800 mt-0.5">{selectedPendaftar.nama_lengkap}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Jenjang / Tingkat</p>
                    <p className="font-semibold text-brand-primary mt-0.5">{selectedPendaftar.tingkat || selectedPendaftar.program || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Kategori</p>
                    <p className="font-semibold text-gray-800 mt-0.5">{selectedPendaftar.keterangan || "NON YATIM"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Jenis Kelamin</p>
                    <p className="font-medium text-gray-700 mt-0.5">{selectedPendaftar.jenis_kelamin || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Tempat, Tgl Lahir</p>
                    <p className="font-medium text-gray-700 mt-0.5">
                      {selectedPendaftar.tempat_lahir || "-"}, {selectedPendaftar.tanggal_lahir || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">NISN</p>
                    <p className="font-mono font-medium text-gray-700 mt-0.5">{selectedPendaftar.nisn || "-"}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-400 font-bold uppercase">Asal Sekolah</p>
                    <p className="font-medium text-gray-700 mt-0.5">{selectedPendaftar.asal_sekolah || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Nama Ayah</p>
                    <p className="font-medium text-gray-700 mt-0.5">{selectedPendaftar.nama_ayah || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Nama Ibu</p>
                    <p className="font-medium text-gray-700 mt-0.5">{selectedPendaftar.nama_ibu || "-"}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-400 font-bold uppercase">Nama Wali</p>
                    <p className="font-medium text-gray-700 mt-0.5">{selectedPendaftar.nama_wali || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">No. WhatsApp</p>
                    <p className="font-medium text-gray-700 mt-0.5">{selectedPendaftar.no_hp || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Email Akun Pendaftar</p>
                    <p className="font-medium text-gray-700 mt-0.5 truncate">{selectedPendaftar.email || "-"}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-400 font-bold uppercase">Alamat Lengkap</p>
                    <p className="font-medium text-gray-700 mt-0.5 leading-relaxed">{selectedPendaftar.alamat || "-"}</p>
                  </div>

                  {/* Berkas & Dokumen Pendaftaran */}
                  <div className="col-span-2 p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                    <p className="text-xs text-gray-500 font-bold uppercase">Berkas Terlampir</p>
                    <div className="flex flex-wrap gap-3">
                      {selectedPendaftar.bukti_pembayaran_url ? (
                        <a
                          href={selectedPendaftar.bukti_pembayaran_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-brand-primary hover:bg-brand-primary/5 transition-all"
                        >
                          <FileCheck size={14} />
                          <span>Lihat Bukti Transfer / Akta Kematian</span>
                          <ExternalLink size={12} className="opacity-70" />
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400 italic">Bukti transfer belum diunggah</span>
                      )}

                      {selectedPendaftar.foto_url ? (
                        <a
                          href={selectedPendaftar.foto_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-brand-primary hover:bg-brand-primary/5 transition-all"
                        >
                          <User size={14} />
                          <span>Lihat Foto Santri</span>
                          <ExternalLink size={12} className="opacity-70" />
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400 italic">Foto santri belum diunggah</span>
                      )}
                    </div>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">Status Saat Ini</p>
                      <p className="font-bold text-base mt-0.5 text-brand-primary">{selectedPendaftar.status}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateStatus(selectedPendaftar.id, "Lulus")}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold"
                      >
                        Set Lulus
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(selectedPendaftar.id, "Tidak Lulus")}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold"
                      >
                        Set Tidak Lulus
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(selectedPendaftar.id, "Menunggu")}
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                      >
                        Set Menunggu
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
