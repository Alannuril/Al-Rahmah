"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  AlertCircle,
  Phone,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  FileEdit,
  LogOut,
  CreditCard,
  Lock,
  FileText,
  Sparkles,
  Copy,
  Check,
  GraduationCap,
  Award,
  BookOpen,
  HelpCircle,
  Clock,
  School,
  FileCheck,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { PsbSettings } from "@/lib/supabase/types";
import { useAuth } from "@/components/providers/AuthProvider";

const TAHAPAN_PSB = [
  {
    step: "01",
    tag: "Tahap 1",
    title: "Pengisian Formulir Data Diri",
    subtitle: "Calon Santri atau Siswa",
    desc: "Wali santri atau calon siswa mengisi formulir pendaftaran daring melalui portal PSB dengan data diri lengkap, data orang tua/wali, serta memilih jenjang pendidikan (MTs atau MA).",
    icon: FileEdit,
    points: [
      "Identitas lengkap calon santri/siswa",
      "Pilihan jenjang MTs atau MA",
      "Data orang tua & kontak aktif WhatsApp",
    ],
  },
  {
    step: "02",
    tag: "Tahap 2",
    title: "Penyerahan Berkas Administratif",
    subtitle: "Dokumen Persyaratan",
    desc: "Menyerahkan atau mengunggah berkas persyaratan administratif seperti salinan ijazah/SKL, rapor semester terakhir, kartu keluarga, akta kelahiran, dan pasfoto terbaru.",
    icon: FileText,
    points: [
      "Salinan Ijazah/SKL & Rapor terakhir",
      "Pasfoto formal & Kartu Keluarga (KK)",
      "Akta Kematian Ayah (khusus santri yatim)",
    ],
  },
  {
    step: "03",
    tag: "Tahap 3",
    title: "Tes atau Seleksi Masuk",
    subtitle: "Kompetensi & Keagamaan",
    desc: "Calon santri mengikuti tahapan seleksi masuk yang mencakup uji kompetensi dasar (akademik & logika) serta uji keagamaan (membaca Al-Qur'an, hafalan surat pendek, dan praktik ibadah).",
    icon: GraduationCap,
    points: [
      "Uji Kompetensi Dasar (Akademik)",
      "Uji Keagamaan (Tahsin & Hafalan Al-Qur'an)",
      "Praktik Wudhu & Shalat fardhu",
    ],
  },
  {
    step: "04",
    tag: "Tahap 4",
    title: "Pengumuman & Daftar Ulang",
    subtitle: "Kelulusan & Registrasi",
    desc: "Pengumuman hasil seleksi disampaikan secara transparan melalui portal PSB dan konfirmasi panitia. Calon santri yang dinyatakan lulus melanjutkan ke proses registrasi daftar ulang.",
    icon: Award,
    points: [
      "Pengumuman kelulusan resmi via portal",
      "Konfirmasi jadwal & panduan daftar ulang",
      "Pemberian nomor induk santri resmi",
    ],
  },
];

const DOKUMEN_PERSYARATAN = [
  {
    nama: "Salinan Ijazah / SKL",
    keterangan: "Ijazah SD/MI sederajat (untuk MTs) atau MTs/SMP sederajat (untuk MA).",
  },
  {
    nama: "Salinan Rapor Terakhir",
    keterangan: "Rapor 2 semester terakhir yang telah dilegalisir oleh pihak sekolah asal.",
  },
  {
    nama: "Pasfoto Berwarna Terbaru",
    keterangan: "Ukuran 3x4 (3 lembar) dengan latar belakang merah/biru, berpakaian rapi.",
  },
  {
    nama: "Kartu Keluarga (KK) & Akta Lahir",
    keterangan: "Fotokopi KK dan Akta Kelahiran calon santri untuk verifikasi data kependudukan.",
  },
  {
    nama: "Bukti Pembayaran Formulir",
    keterangan: "Bukti transfer biaya formulir Rp 150.000,- bagi pendaftar kategori Non-Yatim.",
  },
  {
    nama: "Akta Kematian Ayah (Khusus Yatim)",
    keterangan: "Diterbitkan resmi oleh Disdukcapil setempat sebagai syarat pendaftaran bebas biaya.",
  },
];

const MATERI_SELEKSI = [
  {
    kategori: "Uji Kompetensi Dasar",
    icon: BookOpen,
    uraian:
      "Evaluasi kemampuan akademik dasar calon santri meliputi pemahaman membaca, kemampuan menulis bahasa Indonesia yang baik, serta logika numerik dasar.",
  },
  {
    kategori: "Uji Keagamaan & Al-Qur'an",
    icon: Sparkles,
    uraian:
      "Pemeriksaan kemampuan membaca Al-Qur'an (tahsin/makhorijul huruf), hafalan surat-surat pendek pada Juz 'Amma (Juz 30), serta pengetahuan ibadah dasar.",
  },
  {
    kategori: "Observasi & Wawancara",
    icon: UserCheck,
    uraian:
      "Wawancara kesiapan belajar dan tinggal di pondok pesantren bersama calon santri, serta dialog komitmen bersama orang tua / wali santri.",
  },
];

const FAQ_LIST = [
  {
    tanya: "Apakah santri yatim benar-benar bebas biaya (gratis)?",
    jawab:
      "Ya, betul. Pondok Pesantren Al-Rahmah memberikan beasiswa penuh bebas biaya formulir pendaftaran dan SPP bulanan bagi anak yatim dengan melampirkan Akta Kematian Ayah resmi dari Dukcapil.",
  },
  {
    tanya: "Kapan jadwal tes seleksi dilaksanakan setelah mendaftar?",
    jawab:
      "Setelah data dan berkas pendaftaran diverifikasi oleh panitia, sekretariat PPSB akan menghubungi nomor WhatsApp terdaftar untuk mengonfirmasikan jadwal seleksi masuk.",
  },
  {
    tanya: "Apakah seluruh santri wajib mukim (tinggal di asrama)?",
    jawab:
      "Ya, sistem pendidikan di Pondok Pesantren Al-Rahmah berkonsep Islamic Boarding School terpadu di mana seluruh santri tinggal di asrama dengan bimbingan ustadz/ustadzah selama 24 jam.",
  },
];

export default function PsbPage() {
  const { user, loading: authLoading, signOut } = useAuth();

  const [settings, setSettings] = useState<Partial<PsbSettings>>({
    tahun_ajaran: "2026/2027",
    status: "Dibuka",
    biaya_formulir: "Rp 150.000 (Non-Yatim) / Gratis (Yatim)",
    deskripsi: "Pondok Pesantren Al-Rahmah Walantaka membuka pendaftaran santri baru.",
  });
  const [copiedAccount, setCopiedAccount] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("psb_settings")
          .select("*")
          .limit(1)
          .maybeSingle();
        if (data) setSettings(data);
      } catch (err) {
        console.error("Error loading PSB settings:", err);
      }
    }
    loadSettings();
  }, []);

  const isBuka = settings.status === "Dibuka";

  const handleCopyAccount = () => {
    navigator.clipboard.writeText("7777365546");
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  return (
    <div className="pt-28 sm:pt-32 pb-24 sm:pb-32 min-h-screen bg-gradient-to-b from-[#F5F8F6] via-white to-[#F6F9F7]">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        
        {/* ============================================================ */}
        {/* SECTION HEADER: CLEAN & SOFT                                 */}
        {/* ============================================================ */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/70 text-brand-primary text-xs font-semibold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
            <span>Penerimaan Santri Baru (PSB) Tahun Ajaran {settings.tahun_ajaran || "2026/2027"}</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-[40px] font-bold text-zinc-900 tracking-tight leading-tight">
            Penerimaan Santri Baru (PSB)
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
            Membuka gerbang pendidikan Islam berkualitas berlandaskan Al-Qur&apos;an dan As-Sunnah.
            Daftarkan putra-putri Anda di Pondok Pesantren Al-Rahmah Walantaka — Islamic Boarding School.
          </p>
        </div>

        {/* ============================================================ */}
        {/* HERO STATUS BANNER: SOFT CARD                                */}
        {/* ============================================================ */}
        <div className="mt-8 sm:mt-10 bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_24px_-4px_rgba(57,110,95,0.06)] border border-emerald-100/80">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-5">
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs ${
                  isBuka
                    ? "bg-emerald-50 text-brand-primary border border-emerald-200/70"
                    : "bg-amber-50 text-amber-700 border border-amber-200/70"
                }`}
              >
                {isBuka ? <CheckCircle2 size={28} /> : <AlertCircle size={28} />}
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-heading font-bold text-zinc-900 text-lg sm:text-xl">
                    PSB Tahun Ajaran {settings.tahun_ajaran || "2026/2027"}
                  </h2>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold ${
                      isBuka
                        ? "bg-emerald-100/80 text-emerald-800 border border-emerald-200/60"
                        : "bg-amber-100/80 text-amber-800 border border-amber-200/60"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isBuka ? "bg-emerald-600" : "bg-amber-600"
                      }`}
                    />
                    GELOMBANG II · {settings.status || "Dibuka"}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-xl">
                  Pendaftaran terbuka untuk jenjang{" "}
                  <strong className="text-zinc-800 font-semibold">Madrasah Tsanawiyah (MTs)</strong> dan{" "}
                  <strong className="text-zinc-800 font-semibold">Madrasah Aliyah (MA)</strong> bagi santri yatim, dhuafa, serta kalangan masyarakat luas.
                </p>

                {/* Soft Meta Tags */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-50 border border-zinc-200/70 text-xs text-zinc-600">
                    <School size={13} className="text-brand-primary" />
                    <span>MTs &amp; MA Terpadu</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50/70 border border-emerald-200/70 text-xs font-semibold text-emerald-800">
                    <Sparkles size={13} className="text-emerald-700" />
                    <span>Santri Yatim: 100% Bebas Biaya</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-50 border border-zinc-200/70 text-xs text-zinc-600">
                    <CreditCard size={13} className="text-brand-primary" />
                    <span>Formulir Non-Yatim: Rp 150.000,-</span>
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Dynamic based on Auth State */}
            {isBuka && (
              <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2.5">
                {!authLoading && user ? (
                  /* --- SUDAH LOGIN --- */
                  <div className="space-y-2 w-full min-w-[240px]">
                    <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-800 font-semibold mb-0.5">
                        <UserCheck size={14} />
                        <span>Sesi Masuk Aktif</span>
                      </div>
                      <p className="text-emerald-700 truncate max-w-[220px]">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/psb/daftar"
                      className="w-full px-5 py-3 bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 group"
                    >
                      <FileEdit size={16} />
                      <span>Buka Formulir Pendaftaran</span>
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>

                    <button
                      onClick={() => signOut()}
                      className="w-full text-center text-xs font-medium text-zinc-400 hover:text-red-600 transition-colors py-1 flex items-center justify-center gap-1"
                    >
                      <LogOut size={12} />
                      <span>Keluar Akun</span>
                    </button>
                  </div>
                ) : (
                  /* --- BELUM LOGIN --- */
                  <div className="space-y-2 w-full min-w-[240px]">
                    <Link
                      href="/psb/login?redirect=/psb/daftar"
                      className="w-full px-6 py-3.5 bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs hover:shadow-sm transition-all flex items-center justify-center gap-2 group"
                    >
                      <Lock size={15} />
                      <span>Masuk untuk Mendaftar</span>
                      <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                    <p className="text-[11px] text-zinc-500 text-center">
                      Belum punya akun?{" "}
                      <Link
                        href="/psb/register?redirect=/psb/daftar"
                        className="font-semibold text-brand-primary hover:underline"
                      >
                        Daftar Akun Baru
                      </Link>
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ============================================================ */}
        {/* ALUR DARI PSB: MINIMALIST & SOFT DESIGN LINE TAHAPAN         */}
        {/* ============================================================ */}
        <section className="mt-14 sm:mt-16">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs font-semibold tracking-wider uppercase text-brand-primary bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full mb-2.5">
              Alur Pendaftaran
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              Tahapan Alur Pendaftaran Santri Baru
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed">
              Empat tahapan terstruktur yang dirancang sederhana dan transparan untuk memudahkan calon santri dan orang tua.
            </p>
          </div>

          {/* DESKTOP VIEW: HORIZONTAL DESIGN LINE TAHAPAN (lg and up) */}
          <div className="hidden lg:block relative">
            {/* Soft Continuous Connecting Line */}
            <div
              className="absolute top-7 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-emerald-200 via-emerald-300 to-emerald-200 -z-0"
              aria-hidden="true"
            />

            <div className="grid grid-cols-4 gap-6 relative z-10">
              {TAHAPAN_PSB.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.step} className="flex flex-col group">
                    {/* Node Tahapan (Circular with Number & Soft Ring) */}
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-white border-2 border-emerald-200 shadow-xs flex items-center justify-center text-brand-primary font-heading font-bold text-base transition-all duration-300 group-hover:border-brand-primary group-hover:scale-105 group-hover:bg-emerald-50/50">
                        <span>{item.step}</span>
                      </div>
                    </div>

                    {/* Soft Step Card */}
                    <div className="bg-white rounded-2xl p-5 border border-emerald-100/80 shadow-[0_2px_12px_-2px_rgba(57,110,95,0.04)] hover:shadow-md transition-all duration-300 hover:border-emerald-300/70 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/50">
                            {item.tag}
                          </span>
                          <IconComponent size={16} className="text-brand-primary/60" />
                        </div>

                        <h3 className="font-heading font-bold text-zinc-900 text-sm sm:text-base leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-[11px] font-semibold text-brand-primary/80 mt-0.5">
                          {item.subtitle}
                        </p>

                        <p className="text-xs text-zinc-600 leading-relaxed mt-2.5">
                          {item.desc}
                        </p>
                      </div>

                      {/* Checklist Highlights */}
                      <ul className="mt-4 pt-3 border-t border-zinc-100 space-y-1.5">
                        {item.points.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-[11px] text-zinc-600 leading-tight">
                            <Check size={12} className="text-emerald-600 shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* MOBILE & TABLET VIEW: VERTICAL DESIGN LINE TAHAPAN (< lg) */}
          <div className="lg:hidden relative pl-10 sm:pl-12 before:absolute before:left-4 sm:before:left-5 before:top-4 before:bottom-4 before:w-[2px] before:bg-gradient-to-b before:from-emerald-300 via-emerald-200 before:to-emerald-100 space-y-6">
            {TAHAPAN_PSB.map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.step} className="relative group">
                  {/* Vertical Node Indicator */}
                  <div className="absolute -left-10 sm:-left-12 top-1.5 w-8 h-8 rounded-full bg-white border-2 border-brand-primary flex items-center justify-center text-xs font-bold text-brand-primary shadow-xs z-10">
                    {item.step}
                  </div>

                  {/* Mobile Soft Step Card */}
                  <div className="bg-white rounded-2xl p-5 border border-emerald-100/80 shadow-xs space-y-2 hover:border-emerald-200 transition-colors">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/50">
                        {item.tag}
                      </span>
                      <IconComponent size={16} className="text-brand-primary" />
                    </div>

                    <h3 className="font-heading font-bold text-zinc-900 text-sm sm:text-base leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[11px] font-medium text-brand-primary">
                      {item.subtitle}
                    </p>

                    <p className="text-xs text-zinc-600 leading-relaxed">
                      {item.desc}
                    </p>

                    <ul className="pt-2 border-t border-zinc-100 space-y-1">
                      {item.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-[11px] text-zinc-600">
                          <Check size={12} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================ */}
        {/* DUA KOLOM: BERKAS PERSYARATAN & MATERI SELEKSI               */}
        {/* ============================================================ */}
        <section className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* KARTU 1: BERKAS PERSYARATAN ADMINISTRATIF */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100/80 shadow-[0_4px_20px_-4px_rgba(57,110,95,0.05)] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-primary flex items-center justify-center shrink-0 border border-emerald-200/60">
                  <FileCheck size={20} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-zinc-900">
                    Berkas Persyaratan Administratif
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Dokumen wajib disiapkan saat pendaftaran daring / verifikasi
                  </p>
                </div>
              </div>

              <div className="space-y-3 mt-4">
                {DOKUMEN_PERSYARATAN.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-zinc-50/70 border border-zinc-200/60 hover:border-emerald-200/80 transition-colors"
                  >
                    <p className="text-xs font-semibold text-zinc-900 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
                      {doc.nama}
                    </p>
                    <p className="text-[11px] text-zinc-500 mt-1 pl-3 leading-relaxed">
                      {doc.keterangan}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-zinc-100 text-xs text-zinc-500 flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-brand-primary shrink-0" />
              <span>Format dokumen digital: PDF atau JPG/PNG maks. 2MB</span>
            </div>
          </div>

          {/* KARTU 2: MATERI TES / SELEKSI MASUK */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100/80 shadow-[0_4px_20px_-4px_rgba(57,110,95,0.05)] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-primary flex items-center justify-center shrink-0 border border-emerald-200/60">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-zinc-900">
                    Materi Tes &amp; Seleksi Masuk
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Standar uji kompetensi calon santri Al-Rahmah
                  </p>
                </div>
              </div>

              <div className="space-y-3.5 mt-4">
                {MATERI_SELEKSI.map((materi, idx) => {
                  const MatIcon = materi.icon;
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-zinc-50/70 border border-zinc-200/60 space-y-1.5 hover:border-emerald-200/80 transition-colors"
                    >
                      <div className="flex items-center gap-2 text-brand-primary font-semibold text-xs">
                        <MatIcon size={15} />
                        <span>{materi.kategori}</span>
                      </div>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        {materi.uraian}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/60 text-xs text-zinc-700 space-y-1">
                <p className="font-semibold text-emerald-900 flex items-center gap-1.5">
                  <Clock size={13} className="text-brand-primary" />
                  <span>Jadwal &amp; Konfirmasi Seleksi</span>
                </p>
                <p className="text-[11px] text-zinc-600 leading-relaxed">
                  Jadwal tes seleksi akan diinformasikan oleh Sekretariat Panitia langsung ke nomor WhatsApp pendaftar setelah berkas terverifikasi.
                </p>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-zinc-100 text-xs text-zinc-500 flex items-center gap-1.5">
              <Sparkles size={14} className="text-brand-primary shrink-0" />
              <span>Tes dirancang edukatif, ramah anak, dan objektif</span>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* INFORMASI PEMBAYARAN & REKENING RESMI                        */}
        {/* ============================================================ */}
        <section className="mt-12 sm:mt-16 bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100/80 shadow-[0_4px_24px_-4px_rgba(57,110,95,0.06)]">
          <div className="max-w-2xl mb-6">
            <span className="text-xs font-semibold text-brand-primary uppercase tracking-wider bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-full">
              Biaya &amp; Pembayaran
            </span>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-zinc-900 mt-2">
              Ketentuan Biaya &amp; Rekening Resmi Pendaftaran
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1">
              Seluruh transaksi formulir pendaftaran dilakukan resmi melalui rekening perbankan syariah pondok pesantren.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
            
            {/* CARD NON-YATIM */}
            <div className="p-5 rounded-2xl bg-zinc-50/80 border border-zinc-200/70 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-zinc-900 flex items-center gap-1.5 text-brand-primary text-sm">
                    <CreditCard size={17} />
                    <span>Kategori Non-Yatim (Reguler)</span>
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Rp 150.000,-
                  </span>
                </div>
                <p className="text-zinc-600 text-xs leading-relaxed mt-2">
                  Biaya formulir ditransfer ke rekening resmi Pondok Pesantren Al-Rahmah Walantaka:
                </p>

                {/* Bank Account Box with Copy Button */}
                <div className="mt-3 p-3.5 rounded-xl bg-white border border-zinc-200/80 space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Bank Penampung:</span>
                    <strong className="text-zinc-800 font-semibold">Bank Syariah Indonesia (BSI)</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Nomor Rekening:</span>
                    <span className="font-mono font-bold text-sm text-brand-primary tracking-wider">
                      7777365546
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Atas Nama:</span>
                    <strong className="text-zinc-800 font-semibold">Pondok Pesantren Al Rahmah</strong>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyAccount}
                className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-emerald-50 text-brand-primary border border-zinc-200/80 hover:border-emerald-300 font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-2xs"
              >
                {copiedAccount ? (
                  <>
                    <Check size={14} className="text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Nomor Rekening Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Salin Nomor Rekening BSI</span>
                  </>
                )}
              </button>
            </div>

            {/* CARD YATIM */}
            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/70 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-zinc-900 flex items-center gap-1.5 text-brand-primary text-sm">
                    <ShieldCheck size={18} className="text-emerald-700" />
                    <span>Kategori Santri Yatim</span>
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-200/70 text-emerald-900">
                    100% Gratis
                  </span>
                </div>
                <p className="text-zinc-600 text-xs leading-relaxed mt-2">
                  Sebagai komitmen kepedulian sosial, pendaftaran dan biaya pendidikan santri yatim digratiskan dengan melampirkan persyaratan:
                </p>

                <div className="mt-3 p-3.5 rounded-xl bg-white border border-emerald-200/70 text-xs text-zinc-700 space-y-1 shadow-2xs">
                  <p className="font-bold text-zinc-900 flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-brand-primary" />
                    <span>Akta Kematian Ayah</span>
                  </p>
                  <p className="text-[11px] text-zinc-500 leading-relaxed pl-5">
                    Diterbitkan resmi oleh Dinas Kependudukan dan Catatan Sipil (Dukcapil) setempat sebagai validasi status yatim.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/80 border border-emerald-100 text-[11px] text-emerald-800 flex items-center gap-2">
                <Sparkles size={14} className="text-emerald-600 shrink-0" />
                <span>Program beasiswa penuh dan pembinaan khusus santri yatim.</span>
              </div>
            </div>

          </div>
        </section>

        {/* ============================================================ */}
        {/* TANYA JAWAB (FAQ) PSB: CLEAN & MINIMALIST                    */}
        {/* ============================================================ */}
        <section className="mt-12 sm:mt-16">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-xs font-semibold text-brand-primary uppercase tracking-wider bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-full">
              Pertanyaan Umum
            </span>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-zinc-900 mt-2">
              Frequently Asked Questions (FAQ)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FAQ_LIST.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-zinc-200/70 shadow-2xs space-y-2 hover:border-emerald-200 transition-colors"
              >
                <div className="flex items-start gap-2 text-brand-primary font-semibold text-xs leading-snug">
                  <HelpCircle size={15} className="shrink-0 mt-0.5" />
                  <span>{faq.tanya}</span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed pl-5">
                  {faq.jawab}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* KONTAK NARAHUBUNG PANITIA PPSB                               */}
        {/* ============================================================ */}
        <section className="mt-12 sm:mt-16 bg-gradient-to-br from-brand-primary via-[#2E584C] to-[#23453B] text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-semibold text-brand-lime uppercase tracking-widest block">
                Layanan Informasi &amp; Bantuan
              </span>
              <h3 className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl text-white">
                Narahubung Panitia PPSB 2026-2027
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Memiliki pertanyaan seputar alur pendaftaran, persyaratan berkas, atau jadwal seleksi? 
                Ustadz dan Ustadzah panitia siap membantu Anda melalui pesan WhatsApp.
              </p>
            </div>

            <div className="flex flex-col gap-2.5 w-full lg:w-auto shrink-0 text-xs font-semibold">
              <a
                href="https://wa.me/62895401953841?text=Assalamu%27alaikum%20Panitia%20PSB%20Al-Rahmah,%20saya%20ingin%20bertanya%20mengenai%20pendaftaran%20santri%20baru."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-2.5">
                  <Phone size={14} className="text-brand-lime" />
                  <span>Ust. Hidayatullah</span>
                </div>
                <span className="text-white/70 text-[11px] group-hover:text-white transition-colors">
                  +62 895-4019-53841
                </span>
              </a>

              <a
                href="https://wa.me/6289509414409?text=Assalamu%27alaikum%20Panitia%20PSB%20Al-Rahmah,%20saya%20ingin%20bertanya%20mengenai%20pendaftaran%20santri%20baru."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-2.5">
                  <Phone size={14} className="text-brand-lime" />
                  <span>Ust. Muhammad Azis</span>
                </div>
                <span className="text-white/70 text-[11px] group-hover:text-white transition-colors">
                  +62 895-0941-4409
                </span>
              </a>

              <a
                href="https://wa.me/6289618952845?text=Assalamu%27alaikum%20Panitia%20PSB%20Al-Rahmah,%20saya%20ingin%20bertanya%20mengenai%20pendaftaran%20santri%20baru."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-2.5">
                  <Phone size={14} className="text-brand-lime" />
                  <span>Ustz. Laily Fauziyah</span>
                </div>
                <span className="text-white/70 text-[11px] group-hover:text-white transition-colors">
                  +62 896-1895-2845
                </span>
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
