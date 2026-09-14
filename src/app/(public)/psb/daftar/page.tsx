"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Phone,
  User,
  School,
  Building,
  CreditCard,
  LogOut,
  ArrowRight,
  Loader2,
  Calendar,
  X,
  FileCheck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import { useLoading } from "@/components/providers/LoadingProvider";
import { createClient } from "@/lib/supabase/client";
import { uploadPsbFile } from "@/lib/supabase/storage";
import type { PendaftarPsb } from "@/lib/supabase/types";

export default function PsbDaftarPage() {
  const router = useRouter();
  const { user, loading: authLoading, signOut } = useAuth();
  const { showLoading, hideLoading } = useLoading();

  // Existing registrations for this user
  const [existingList, setExistingList] = useState<PendaftarPsb[]>([]);
  const [checkingExisting, setCheckingExisting] = useState(true);
  const [showNewForm, setShowNewForm] = useState(false);

  // Form states
  const [form, setForm] = useState({
    email: "",
    keterangan: "NON YATIM" as "YATIM" | "NON YATIM",
    tingkat: "Madrasah Tsanawiyah (MTs)" as
      | "Madrasah Tsanawiyah (MTs)"
      | "Madrasah Aliyah (MA)",
    nama_lengkap: "",
    nisn: "",
    jenis_kelamin: "LAKI-LAKI" as "LAKI-LAKI" | "PEREMPUAN",
    tempat_lahir: "",
    tanggal_lahir: "",
    nama_ayah: "",
    nama_ibu: "",
    nama_wali: "",
    alamat: "",
    no_hp: "",
    asal_sekolah: "",
  });

  // Files
  const [buktiFile, setBuktiFile] = useState<File | null>(null);
  const [fotoFile, setFotoFile] = useState<File | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successData, setSuccessData] = useState<PendaftarPsb | null>(null);

  const buktiInputRef = useRef<HTMLInputElement>(null);
  const fotoInputRef = useRef<HTMLInputElement>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/psb/login?redirect=/psb/daftar");
    }
  }, [user, authLoading, router]);

  // Set email from auth user & fetch existing registration
  useEffect(() => {
    if (user?.email) {
      setForm((prev) => ({
        ...prev,
        email: prev.email || user.email || "",
      }));

      const fetchExisting = async () => {
        try {
          const supabase = createClient();
          const { data } = await supabase
            .from("pendaftar_psb")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

          if (data && data.length > 0) {
            setExistingList(data);
          }
        } catch (err) {
          console.error("Error checking existing registration:", err);
        } finally {
          setCheckingExisting(false);
        }
      };

      fetchExisting();
    }
  }, [user]);

  const handleLogout = async () => {
    await signOut();
    router.push("/psb");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Validate files
    if (!buktiFile) {
      setErrorMessage(
        form.keterangan === "NON YATIM"
          ? "Mohon unggah bukti pembayaran formulir pendaftaran."
          : "Mohon unggah akta kematian ayah dari Dukcapil."
      );
      return;
    }

    if (!fotoFile) {
      setErrorMessage("Mohon unggah foto calon santri baru (setengah badan).");
      return;
    }

    if (!user) {
      setErrorMessage("Sesi masuk Anda telah kedaluwarsa. Silakan masuk kembali.");
      return;
    }

    setSubmitting(true);
    showLoading(
      "Mengirim Formulir E-PSB",
      "Mengunggah berkas dan menyimpan data pendaftaran santri..."
    );

    try {
      // 1. Upload Bukti Pendaftaran (bukti transfer / akta kematian)
      let buktiUrl: string | null = null;
      try {
        buktiUrl = await uploadPsbFile(buktiFile, "bukti", user.id);
      } catch (uploadErr: unknown) {
        console.warn("Storage upload warning for bukti:", uploadErr);
        // If storage is not configured yet, notify user clearly
        throw new Error(
          (uploadErr as Error)?.message ||
            "Gagal mengunggah bukti pendaftaran. Pastikan ukuran file di bawah 10 MB."
        );
      }

      // 2. Upload Foto Calon Santri
      let fotoUrl: string | null = null;
      try {
        fotoUrl = await uploadPsbFile(fotoFile, "foto", user.id);
      } catch (uploadErr: unknown) {
        console.warn("Storage upload warning for foto:", uploadErr);
        throw new Error(
          (uploadErr as Error)?.message ||
            "Gagal mengunggah foto calon santri. Pastikan ukuran file di bawah 10 MB."
        );
      }

      // 3. Insert record into Supabase table pendaftar_psb
      const supabase = createClient();
      const insertPayload = {
        user_id: user.id,
        nama_lengkap: form.nama_lengkap.trim().toUpperCase(),
        keterangan: form.keterangan,
        tingkat: form.tingkat,
        program: form.tingkat, // backward compatibility
        tempat_lahir: form.tempat_lahir.trim().toUpperCase() || null,
        tanggal_lahir: form.tanggal_lahir || null,
        jenis_kelamin: form.jenis_kelamin,
        nama_ayah: form.nama_ayah.trim().toUpperCase() || null,
        nama_ibu: form.nama_ibu.trim().toUpperCase() || null,
        nama_wali: form.nama_wali.trim().toUpperCase() || null,
        no_hp: form.no_hp.trim(),
        email: form.email.trim(),
        alamat: form.alamat.trim().toUpperCase() || null,
        asal_sekolah: form.asal_sekolah.trim().toUpperCase() || null,
        nisn: form.nisn.trim() || null,
        status: "Menunggu" as const,
        tahun_ajaran: "2026/2027",
        bukti_pembayaran_url: buktiUrl,
        foto_url: fotoUrl,
      };

      const { data, error: insertError } = await supabase
        .from("pendaftar_psb")
        .insert(insertPayload)
        .select()
        .single();

      if (insertError) {
        throw new Error(
          insertError.message || "Gagal menyimpan data ke sistem pendaftaran."
        );
      }

      setSuccessData(data);
      setExistingList((prev) => [data, ...prev]);
      setShowNewForm(false);
    } catch (err: unknown) {
      setErrorMessage(
        (err as Error)?.message ||
          "Terjadi kesalahan saat memproses formulir. Silakan coba kembali."
      );
    } finally {
      setSubmitting(false);
      hideLoading();
    }
  };

  if (authLoading || checkingExisting) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-surface/40 flex flex-col items-center justify-center">
        <Loader2 size={36} className="animate-spin text-brand-primary mb-3" />
        <p className="text-xs sm:text-sm text-zinc-500 font-medium">
          Memeriksa sesi login dan data pendaftaran...
        </p>
      </div>
    );
  }

  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-28 min-h-screen bg-surface/40">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
        {/* ============================================================ */}
        {/* USER PROFILE & SESSION BAR                                   */}
        {/* ============================================================ */}
        <div className="mb-6 p-4 rounded-2xl bg-white border border-zinc-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-sm shrink-0">
              {user?.email?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                Akun Terhubung (Wali / Calon Santri)
              </p>
              <p className="text-xs sm:text-sm font-bold text-zinc-900">
                {user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-600 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={14} />
            <span>Ganti Akun / Keluar</span>
          </button>
        </div>

        {/* ============================================================ */}
        {/* EXISTING REGISTRATION VIEW (If user already registered)      */}
        {/* ============================================================ */}
        {existingList.length > 0 && !showNewForm && (
          <div className="mb-8 space-y-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100">
                <div>
                  <span className="text-[11px] font-bold text-brand-secondary uppercase tracking-wider block mb-1">
                    Status Pendaftaran Anda
                  </span>
                  <h2 className="font-heading font-bold text-xl sm:text-2xl text-zinc-900">
                    Data Pendaftaran E-PSB Diterima
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                    Pondok Pesantren Al-Rahmah telah mencatat data pendaftaran calon santri Anda.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowNewForm(true);
                    setSuccessData(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-brand-primary/10 hover:bg-brand-primary text-brand-primary hover:text-white font-semibold text-xs sm:text-sm transition-all shrink-0"
                >
                  + Daftarkan Santri Lainnya
                </button>
              </div>

              <div className="mt-6 space-y-4">
                {existingList.map((item) => {
                  const statusBg =
                    item.status === "Lulus"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : item.status === "Tidak Lulus"
                      ? "bg-red-50 text-red-700 border-red-200"
                      : "bg-amber-50 text-amber-700 border-amber-200";

                  return (
                    <div
                      key={item.id}
                      className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="text-xs font-mono font-bold text-zinc-400">
                            #{item.id.slice(0, 8).toUpperCase()}
                          </span>
                          <h3 className="font-heading font-bold text-base text-zinc-900">
                            {item.nama_lengkap}
                          </h3>
                        </div>
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border w-fit ${statusBg}`}
                        >
                          Status: {item.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2 border-t border-zinc-200/60">
                        <div>
                          <span className="text-zinc-400 block">Tingkat:</span>
                          <span className="font-semibold text-zinc-800">
                            {item.tingkat || item.program || "-"}
                          </span>
                        </div>
                        <div>
                          <span className="text-zinc-400 block">Kategori:</span>
                          <span className="font-semibold text-zinc-800">
                            {item.keterangan || "NON YATIM"}
                          </span>
                        </div>
                        <div>
                          <span className="text-zinc-400 block">NISN:</span>
                          <span className="font-semibold text-zinc-800">
                            {item.nisn || "-"}
                          </span>
                        </div>
                        <div>
                          <span className="text-zinc-400 block">Tanggal Daftar:</span>
                          <span className="font-semibold text-zinc-800">
                            {new Date(item.created_at).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>

                      {/* File links if available */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {item.bukti_pembayaran_url && (
                          <a
                            href={item.bukti_pembayaran_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-zinc-200 text-[11px] font-semibold text-zinc-700 hover:text-brand-primary"
                          >
                            <FileCheck size={12} className="text-brand-primary" />
                            <span>Lihat Berkas Bukti</span>
                          </a>
                        )}
                        {item.foto_url && (
                          <a
                            href={item.foto_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-zinc-200 text-[11px] font-semibold text-zinc-700 hover:text-brand-primary"
                          >
                            <User size={12} className="text-brand-primary" />
                            <span>Lihat Foto Santri</span>
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SUCCESS MESSAGE JUST AFTER SUBMITTING                        */}
        {/* ============================================================ */}
        {successData && !showNewForm && (
          <div className="mb-8 p-7 rounded-3xl bg-emerald-50 border border-emerald-200 text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto mb-3 shadow-xs">
              <CheckCircle2 size={28} />
            </div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-emerald-950 mb-1">
              Alhamdulillah, Pendaftaran Berhasil Dikirim!
            </h2>
            <p className="text-xs sm:text-sm text-emerald-800 max-w-lg mx-auto leading-relaxed mb-4">
              Formulir calon santri atas nama{" "}
              <strong>{successData.nama_lengkap}</strong> telah tersimpan di sistem E-PSB Al-Rahmah. Nomor Registrasi Anda:
            </p>
            <div className="inline-block px-5 py-2.5 rounded-xl bg-white border border-emerald-200 text-base font-mono font-bold text-emerald-900 shadow-2xs mb-4">
              #{successData.id.slice(0, 8).toUpperCase()}
            </div>
            <p className="text-xs text-emerald-700 max-w-md mx-auto leading-relaxed">
              Sekretariat PPSB akan memverifikasi berkas Anda. Silakan simpan nomor kontak panitia di bawah jika ada pertanyaan.
            </p>
          </div>
        )}

        {/* ============================================================ */}
        {/* REGISTRATION FORM (Shown if no previous, or user clicked +) */}
        {/* ============================================================ */}
        {(existingList.length === 0 || showNewForm) && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-zinc-200/80 shadow-xs">
            {/* Header Form */}
            <div className="mb-8 pb-6 border-b border-zinc-100">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold mb-3">
                <span>E-PSB 2026-2027</span>
                <span>·</span>
                <span>GELOMBANG II</span>
              </div>
              <h1 className="font-heading font-bold text-2xl sm:text-3xl text-zinc-900 tracking-tight">
                Penerimaan Santri Baru Al-Rahmah
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1.5 leading-relaxed">
                Silakan isi formulir menggunakan data sesuai <strong>Ijazah / Rapor</strong>, menggunakan <strong>HURUF KAPITAL</strong>. Tanda bintang (*) wajib diisi.
              </p>

              {/* Info Panitia PPSB 2026-2027 */}
              <div className="mt-5 p-4 rounded-2xl bg-zinc-50 border border-zinc-200/70 text-xs text-zinc-700">
                <p className="font-bold text-zinc-900 mb-2 flex items-center gap-1.5 text-brand-primary">
                  <Phone size={14} />
                  <span>Narahubung Informasi PPSB 2026-2027:</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-zinc-600 font-medium">
                  <a
                    href="https://wa.me/62895401953841"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-primary"
                  >
                    • Ust. Hidayatullah: <strong>+62 895-4019-53841</strong>
                  </a>
                  <a
                    href="https://wa.me/6289509414409"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-primary"
                  >
                    • Ust. Muhammad Azis: <strong>+62 895-0941-4409</strong>
                  </a>
                  <a
                    href="https://wa.me/6289618952845"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-primary"
                  >
                    • Ustz. Laily Fauziyah: <strong>+62 896-1895-2845</strong>
                  </a>
                </div>
              </div>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-100 flex items-start gap-3 text-xs sm:text-sm text-red-600 font-medium leading-relaxed">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* ---------------------------------------------------- */}
              {/* 1. KETERANGAN & TINGKAT                              */}
              {/* ---------------------------------------------------- */}
              <div className="space-y-5">
                <h3 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-brand-primary flex items-center gap-2">
                  <Building size={16} />
                  <span>1. Kategori &amp; Tingkat Pendidikan</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Keterangan: YATIM / NON YATIM */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                      Keterangan Kategori *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {(["NON YATIM", "YATIM"] as const).map((kat) => (
                        <button
                          key={kat}
                          type="button"
                          onClick={() => setForm({ ...form, keterangan: kat })}
                          className={`p-3 rounded-xl border text-xs sm:text-sm font-bold transition-all text-center ${
                            form.keterangan === kat
                              ? "bg-brand-primary text-white border-brand-primary shadow-xs"
                              : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100"
                          }`}
                        >
                          {kat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tingkat: MTs / MA */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                      Tingkat Jenjang Pendidikan *
                    </label>
                    <select
                      value={form.tingkat}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          tingkat: e.target.value as
                            | "Madrasah Tsanawiyah (MTs)"
                            | "Madrasah Aliyah (MA)",
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs sm:text-sm font-semibold text-zinc-900 outline-none focus:bg-white focus:border-brand-primary/40 transition-all"
                    >
                      <option value="Madrasah Tsanawiyah (MTs)">
                        Madrasah Tsanawiyah (MTs)
                      </option>
                      <option value="Madrasah Aliyah (MA)">
                        Madrasah Aliyah (MA)
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* 2. IDENTITAS CALON SANTRI                            */}
              {/* ---------------------------------------------------- */}
              <div className="pt-6 border-t border-zinc-100 space-y-5">
                <h3 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-brand-primary flex items-center gap-2">
                  <User size={16} />
                  <span>2. Identitas Calon Santri Baru</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Nama Lengkap */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Nama Lengkap Calon Santri Baru (Huruf Kapital) *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.nama_lengkap}
                      onChange={(e) =>
                        setForm({ ...form, nama_lengkap: e.target.value.toUpperCase() })
                      }
                      placeholder="CONTOH: MUHAMMAD FAIZ AL-FARISI"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs sm:text-sm font-semibold text-zinc-900 uppercase outline-none focus:bg-white focus:border-brand-primary/40 transition-all"
                    />
                  </div>

                  {/* NISN */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      NISN (Nomor Induk Siswa Nasional) *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.nisn}
                      onChange={(e) => setForm({ ...form, nisn: e.target.value })}
                      placeholder="10 digit nomor NISN"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs sm:text-sm font-mono text-zinc-900 outline-none focus:bg-white focus:border-brand-primary/40 transition-all"
                    />
                  </div>

                  {/* Jenis Kelamin */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Jenis Kelamin *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(["LAKI-LAKI", "PEREMPUAN"] as const).map((jk) => (
                        <button
                          key={jk}
                          type="button"
                          onClick={() => setForm({ ...form, jenis_kelamin: jk })}
                          className={`py-3 px-2 rounded-xl border text-xs font-bold transition-all text-center ${
                            form.jenis_kelamin === jk
                              ? "bg-brand-primary text-white border-brand-primary"
                              : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100"
                          }`}
                        >
                          {jk}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tempat Lahir */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Tempat Lahir *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.tempat_lahir}
                      onChange={(e) =>
                        setForm({ ...form, tempat_lahir: e.target.value.toUpperCase() })
                      }
                      placeholder="KOTA / KABUPATEN LAHIR"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs sm:text-sm uppercase text-zinc-900 outline-none focus:bg-white focus:border-brand-primary/40 transition-all"
                    />
                  </div>

                  {/* Tanggal Lahir */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Tanggal Lahir *
                    </label>
                    <input
                      type="date"
                      required
                      value={form.tanggal_lahir}
                      onChange={(e) => setForm({ ...form, tanggal_lahir: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs sm:text-sm text-zinc-900 outline-none focus:bg-white focus:border-brand-primary/40 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* 3. DATA ORANG TUA / WALI                             */}
              {/* ---------------------------------------------------- */}
              <div className="pt-6 border-t border-zinc-100 space-y-5">
                <h3 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-brand-primary flex items-center gap-2">
                  <User size={16} />
                  <span>3. Data Orang Tua &amp; Wali</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Nama Ayah */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Nama Ayah *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.nama_ayah}
                      onChange={(e) =>
                        setForm({ ...form, nama_ayah: e.target.value.toUpperCase() })
                      }
                      placeholder="NAMA LENGKAP AYAH"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs sm:text-sm uppercase text-zinc-900 outline-none focus:bg-white focus:border-brand-primary/40 transition-all"
                    />
                  </div>

                  {/* Nama Ibu */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Nama Ibu *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.nama_ibu}
                      onChange={(e) =>
                        setForm({ ...form, nama_ibu: e.target.value.toUpperCase() })
                      }
                      placeholder="NAMA LENGKAP IBU"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs sm:text-sm uppercase text-zinc-900 outline-none focus:bg-white focus:border-brand-primary/40 transition-all"
                    />
                  </div>

                  {/* Nama Wali */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Nama Wali *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.nama_wali}
                      onChange={(e) =>
                        setForm({ ...form, nama_wali: e.target.value.toUpperCase() })
                      }
                      placeholder="NAMA WALI / SAMA DGN AYAH"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs sm:text-sm uppercase text-zinc-900 outline-none focus:bg-white focus:border-brand-primary/40 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* 4. ALAMAT, KONTAK & ASAL SEKOLAH                     */}
              {/* ---------------------------------------------------- */}
              <div className="pt-6 border-t border-zinc-100 space-y-5">
                <h3 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-brand-primary flex items-center gap-2">
                  <School size={16} />
                  <span>4. Alamat, Kontak &amp; Asal Sekolah</span>
                </h3>

                <div className="space-y-4">
                  {/* Alamat */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Alamat Lengkap Calon Santri Baru *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={form.alamat}
                      onChange={(e) =>
                        setForm({ ...form, alamat: e.target.value.toUpperCase() })
                      }
                      placeholder="KAMPUNG / JALAN, RT/RW, DESA/KELURAHAN, KECAMATAN, KABUPATEN/KOTA, PROVINSI"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs sm:text-sm uppercase text-zinc-900 outline-none focus:bg-white focus:border-brand-primary/40 transition-all resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nomor HP / WA */}
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                        Nomor HP / WhatsApp Aktif *
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.no_hp}
                        onChange={(e) => setForm({ ...form, no_hp: e.target.value })}
                        placeholder="Contoh: 081234567890"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs sm:text-sm text-zinc-900 outline-none focus:bg-white focus:border-brand-primary/40 transition-all"
                      />
                    </div>

                    {/* Asal Sekolah */}
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                        Asal Sekolah Sebelumnya *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.asal_sekolah}
                        onChange={(e) =>
                          setForm({ ...form, asal_sekolah: e.target.value.toUpperCase() })
                        }
                        placeholder="CONTOH: SD NEGERI 1 HARAPAN JAYA"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs sm:text-sm uppercase text-zinc-900 outline-none focus:bg-white focus:border-brand-primary/40 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* 5. UPLOAD DOKUMEN & BUKTI PENDAFTARAN                */}
              {/* ---------------------------------------------------- */}
              <div className="pt-6 border-t border-zinc-100 space-y-5">
                <h3 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-brand-primary flex items-center gap-2">
                  <CreditCard size={16} />
                  <span>5. Upload Berkas &amp; Bukti Pendaftaran</span>
                </h3>

                {/* Petunjuk Bukti Pendaftaran Sesuai Kategori */}
                {form.keterangan === "NON YATIM" ? (
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 space-y-1.5">
                    <p className="font-bold text-emerald-900">
                      Instruksi Pembayaran Pendaftaran Non-Yatim:
                    </p>
                    <p>
                      Silakan lakukan pembayaran biaya formulir sebesar{" "}
                      <strong>Rp 150.000,-</strong> ke rekening resmi:
                    </p>
                    <ul className="list-disc list-inside font-semibold text-emerald-900 pl-1 space-y-0.5">
                      <li>Bank: BSI (Bank Syariah Indonesia)</li>
                      <li>No. Rekening: 7777365546</li>
                      <li>Atas Nama: Pondok Pesantren Al Rahmah</li>
                    </ul>
                    <p className="pt-1 text-emerald-800 text-[11px]">
                      Setelah transfer, mohon unggah foto/struk bukti transfer Anda di bawah ini (Maks. 10 MB).
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1.5">
                    <p className="font-bold text-amber-900">
                      Instruksi Verifikasi Santri Yatim:
                    </p>
                    <p>
                      Untuk Kategori Yatim, silakan unggah{" "}
                      <strong>Akta Kematian Ayah</strong> yang diperoleh dari Dukcapil setempat sebagai dokumen verifikasi pembebasan biaya formulir.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* File 1: Bukti Pendaftaran */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      {form.keterangan === "NON YATIM"
                        ? "Bukti Pembayaran Pendaftaran *"
                        : "Akta Kematian Ayah (Dukcapil) *"}
                    </label>

                    <input
                      ref={buktiInputRef}
                      type="file"
                      accept="image/*,application/pdf"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setBuktiFile(file);
                      }}
                    />

                    {buktiFile ? (
                      <div className="p-4 rounded-2xl bg-zinc-50 border border-emerald-300 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <FileCheck size={20} className="text-emerald-600 shrink-0" />
                          <div className="truncate">
                            <p className="text-xs font-bold text-zinc-900 truncate">
                              {buktiFile.name}
                            </p>
                            <p className="text-[10px] text-zinc-400">
                              {(buktiFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setBuktiFile(null);
                            if (buktiInputRef.current) buktiInputRef.current.value = "";
                          }}
                          className="p-1 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-zinc-100"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => buktiInputRef.current?.click()}
                        className="w-full p-5 rounded-2xl border-2 border-dashed border-zinc-300 hover:border-brand-primary bg-zinc-50/50 hover:bg-zinc-50 text-center transition-all flex flex-col items-center justify-center gap-1.5 text-zinc-500 hover:text-brand-primary"
                      >
                        <Upload size={22} />
                        <span className="text-xs font-bold">Pilih File Berkas</span>
                        <span className="text-[10px] text-zinc-400">
                          Format: PDF atau Gambar (JPG, PNG). Maks 10 MB.
                        </span>
                      </button>
                    )}
                  </div>

                  {/* File 2: Foto Calon Santri */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Foto Calon Santri Baru (Setengah Badan) *
                    </label>

                    <input
                      ref={fotoInputRef}
                      type="file"
                      accept="image/*,application/pdf"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setFotoFile(file);
                      }}
                    />

                    {fotoFile ? (
                      <div className="p-4 rounded-2xl bg-zinc-50 border border-emerald-300 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <FileCheck size={20} className="text-emerald-600 shrink-0" />
                          <div className="truncate">
                            <p className="text-xs font-bold text-zinc-900 truncate">
                              {fotoFile.name}
                            </p>
                            <p className="text-[10px] text-zinc-400">
                              {(fotoFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setFotoFile(null);
                            if (fotoInputRef.current) fotoInputRef.current.value = "";
                          }}
                          className="p-1 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-zinc-100"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fotoInputRef.current?.click()}
                        className="w-full p-5 rounded-2xl border-2 border-dashed border-zinc-300 hover:border-brand-primary bg-zinc-50/50 hover:bg-zinc-50 text-center transition-all flex flex-col items-center justify-center gap-1.5 text-zinc-500 hover:text-brand-primary"
                      >
                        <User size={22} />
                        <span className="text-xs font-bold">Pilih Foto Santri</span>
                        <span className="text-[10px] text-zinc-400">
                          Potret berdiri / setengah badan. Format JPG/PNG/PDF. Maks 10 MB.
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* SUBMIT BUTTON & DISCLAIMER                           */}
              {/* ---------------------------------------------------- */}
              <div className="pt-6 border-t border-zinc-100 space-y-4">
                <div className="flex items-start gap-2 text-[11px] text-zinc-400 leading-relaxed">
                  <ShieldCheck size={16} className="shrink-0 text-brand-secondary mt-0.5" />
                  <span>
                    Dengan menekan tombol kirim, saya menyatakan bahwa seluruh data yang diisikan adalah benar dan dapat dipertanggungjawabkan sesuai dokumen resmi kependudukan dan ijazah/rapor.
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
                  {showNewForm && (
                    <button
                      type="button"
                      onClick={() => setShowNewForm(false)}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs sm:text-sm font-semibold transition-all"
                    >
                      Batal
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-70 active:scale-[0.99]"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Mengirim Data &amp; Berkas...</span>
                      </>
                    ) : (
                      <>
                        <span>Kirim Formulir Pendaftaran</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

