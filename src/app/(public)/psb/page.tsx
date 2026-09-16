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
  Copy,
  Check,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { PsbSettings } from "@/lib/supabase/types";
import { useAuth } from "@/components/providers/AuthProvider";

const TAHAPAN_PSB = [
  {
    step: "01",
    title: "Pengisian Formulir Data Diri",
    desc: "Pengisian formulir data diri calon santri atau siswa secara online melalui portal PSB.",
  },
  {
    step: "02",
    title: "Penyerahan Berkas Persyaratan",
    desc: "Penyerahan berkas persyaratan administratif (seperti ijazah, rapor, dan pasfoto).",
  },
  {
    step: "03",
    title: "Tes / Seleksi Masuk",
    desc: "Tes atau seleksi masuk (uji kompetensi dasar atau keagamaan).",
  },
  {
    step: "04",
    title: "Pengumuman & Daftar Ulang",
    desc: "Pengumuman kelulusan dan proses daftar ulang santri baru.",
  },
];

const KONTAK_PANITIA = [
  {
    nama: "Ust. Hidayatullah",
    peran: "Panitia PPSB",
    nomor: "+62 895-4019-53841",
    waUrl: "https://wa.me/62895401953841?text=Assalamu%27alaikum%20Ust.%20Hidayatullah,%20saya%20ingin%20bertanya%20seputar%20pendaftaran%20PSB%20Al-Rahmah.",
  },
  {
    nama: "Ust. Muhammad Azis",
    peran: "Panitia PPSB",
    nomor: "+62 895-0941-4409",
    waUrl: "https://wa.me/6289509414409?text=Assalamu%27alaikum%20Ust.%20Muhammad%20Azis,%20saya%20ingin%20bertanya%20seputar%20pendaftaran%20PSB%20Al-Rahmah.",
  },
  {
    nama: "Ustz. Laily Fauziyah",
    peran: "Panitia PPSB",
    nomor: "+62 896-1895-2845",
    waUrl: "https://wa.me/6289618952845?text=Assalamu%27alaikum%20Ustz.%20Laily%20Fauziyah,%20saya%20ingin%20bertanya%20seputar%20pendaftaran%20PSB%20Al-Rahmah.",
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
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-28 min-h-screen bg-surface/40">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        
        {/* ============================================================ */}
        {/* HEADER: CLEAN & SOFT                                         */}
        {/* ============================================================ */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-[32px] font-bold text-zinc-900 tracking-tight">
            Penerimaan Santri Baru (PSB)
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600">
            Pondok Pesantren Al-Rahmah Walantaka — Islamic Boarding School
          </p>
        </div>

        {/* ============================================================ */}
        {/* HERO STATUS BANNER: SOFT & TO THE POINT                      */}
        {/* ============================================================ */}
        <div className="mt-8 sm:mt-10 bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-zinc-200/80">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs ${
                  isBuka
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                    : "bg-amber-50 text-amber-600 border border-amber-100"
                }`}
              >
                {isBuka ? <CheckCircle2 size={28} /> : <AlertCircle size={28} />}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-heading font-bold text-zinc-900 text-lg sm:text-xl">
                    PSB Tahun Ajaran {settings.tahun_ajaran || "2026/2027"}
                  </h2>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      isBuka
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    GELOMBANG II · {settings.status || "Dibuka"}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 mt-1 leading-relaxed">
                  Pendaftaran terbuka untuk jenjang{" "}
                  <strong>Madrasah Tsanawiyah (MTs)</strong> dan{" "}
                  <strong>Madrasah Aliyah (MA)</strong> bagi anak yatim, dhuafa, dan seluruh kalangan masyarakat.
                </p>

                <div className="mt-2 text-xs text-zinc-500">
                  <span>
                    Biaya Formulir:{" "}
                    <strong className="text-brand-primary font-bold">
                      Rp 150.000 (Non-Yatim) / Gratis (Yatim)
                    </strong>
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Dynamic based on Auth State */}
            {isBuka && (
              <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2.5">
                {!authLoading && user ? (
                  /* --- SUDAH LOGIN --- */
                  <div className="space-y-2 w-full min-w-[220px]">
                    <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-800 font-bold mb-0.5">
                        <UserCheck size={14} />
                        <span>Sesi Masuk Aktif</span>
                      </div>
                      <p className="text-emerald-700 truncate max-w-[220px]">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/psb/daftar"
                      className="w-full px-5 py-3 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
                    >
                      <FileEdit size={15} />
                      <span>Buka Formulir Pendaftaran</span>
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
                  <div className="space-y-2 w-full min-w-[220px]">
                    <Link
                      href="/psb/login?redirect=/psb/daftar"
                      className="w-full px-6 py-3.5 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
                    >
                      <Lock size={15} />
                      <span>Masuk untuk Mendaftar</span>
                      <ArrowRight size={15} />
                    </Link>
                    <p className="text-[11px] text-zinc-500 text-center">
                      Belum punya akun?{" "}
                      <Link
                        href="/psb/register?redirect=/psb/daftar"
                        className="font-bold text-brand-primary hover:underline"
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
        {/* ALUR PSB: MINIMALIST & SOFT DESIGN LINE TAHAPAN              */}
        {/* ============================================================ */}
        <section className="mt-10 sm:mt-12">
          {/* DESKTOP VIEW: HORIZONTAL DESIGN LINE TAHAPAN (lg and up) */}
          <div className="hidden lg:block relative">
            {/* Subtle Horizontal Connecting Line */}
            <div
              className="absolute top-6 left-[12%] right-[12%] h-[2px] bg-emerald-100 -z-0"
              aria-hidden="true"
            />

            <div className="grid grid-cols-4 gap-6 relative z-10">
              {TAHAPAN_PSB.map((item) => (
                <div key={item.step} className="flex flex-col">
                  {/* Step Node Circle */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-emerald-200 text-brand-primary font-bold text-sm flex items-center justify-center shadow-2xs">
                      {item.step}
                    </div>
                  </div>

                  {/* Soft Step Card */}
                  <div className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-xs flex-1 flex flex-col justify-start">
                    <h3 className="font-heading font-bold text-sm text-zinc-900 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-600 leading-relaxed mt-2">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MOBILE & TABLET VIEW: VERTICAL DESIGN LINE TAHAPAN (< lg) */}
          <div className="lg:hidden relative pl-10 sm:pl-12 before:absolute before:left-4 sm:before:left-5 before:top-4 before:bottom-4 before:w-[2px] before:bg-emerald-100 space-y-4">
            {TAHAPAN_PSB.map((item) => (
              <div key={item.step} className="relative">
                {/* Vertical Node Indicator */}
                <div className="absolute -left-10 sm:-left-12 top-2 w-8 h-8 rounded-full bg-white border-2 border-brand-primary flex items-center justify-center text-xs font-bold text-brand-primary shadow-2xs z-10">
                  {item.step}
                </div>

                {/* Soft Step Card */}
                <div className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-xs space-y-1.5">
                  <h3 className="font-heading font-bold text-zinc-900 text-sm leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* KETENTUAN BIAYA & REKENING RESMI PENDAFTARAN                 */}
        {/* ============================================================ */}
        <section className="mt-12 sm:mt-14">
          <div className="mb-5">
            <h3 className="font-heading font-bold text-lg sm:text-xl text-zinc-900">
              Ketentuan Biaya &amp; Rekening Resmi Pendaftaran
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
            {/* NON-YATIM */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-zinc-200/80 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                  <span className="font-bold text-zinc-900 flex items-center gap-2 text-brand-primary text-sm sm:text-base">
                    <CreditCard size={18} />
                    <span>Kategori Non-Yatim</span>
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-brand-primary bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                    Rp 150.000,-
                  </span>
                </div>

                <p className="text-zinc-600 text-xs mt-3 leading-relaxed">
                  Biaya formulir ditransfer ke rekening resmi Pondok Pesantren Al-Rahmah:
                </p>

                <div className="mt-3 p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs text-zinc-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Bank:</span>
                    <strong className="text-zinc-800 font-semibold">BSI (Bank Syariah Indonesia)</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">No. Rekening:</span>
                    <strong className="font-mono text-sm text-brand-primary">7777365546</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Atas Nama:</span>
                    <strong className="text-zinc-800 font-semibold">Pondok Pesantren Al Rahmah</strong>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyAccount}
                className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-emerald-50 text-brand-primary border border-zinc-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
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

            {/* YATIM */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-zinc-200/80 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                  <span className="font-bold text-zinc-900 flex items-center gap-2 text-brand-primary text-sm sm:text-base">
                    <ShieldCheck size={18} />
                    <span>Kategori Yatim</span>
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                    Bebas Biaya (Gratis)
                  </span>
                </div>

                <p className="text-zinc-600 text-xs mt-3 leading-relaxed">
                  Bagi calon santri yatim, pendaftaran digratiskan dengan melampirkan berkas:
                </p>

                <div className="mt-3 p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs text-zinc-700 space-y-0.5">
                  <p className="font-semibold text-zinc-900">• Akta Kematian Ayah</p>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">
                    Dikeluarkan resmi oleh Dinas Kependudukan dan Catatan Sipil (Dukcapil) setempat.
                  </p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/60 text-[11px] text-emerald-800">
                Pondok Pesantren Al-Rahmah berkomitmen mendukung pendidikan santri yatim.
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* LAYANAN INFORMASI & NARAHUBUNG (MODERN GREEN GRADIENT)       */}
        {/* ============================================================ */}
        <section className="mt-12 sm:mt-16">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E4338] via-[#2A5C4E] to-[#387664] text-white p-6 sm:p-8 md:p-10 shadow-xs border border-emerald-700/30">
            {/* Subtle Modern Ambient Light Glow */}
            <div
              className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10">
              <div className="max-w-2xl mb-7">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-emerald-200 border border-white/15 mb-2.5">
                  <MessageCircle size={13} />
                  <span>Layanan Informasi &amp; Bantuan</span>
                </span>
                <h3 className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl text-white tracking-tight">
                  Narahubung Panitia PPSB 2026-2027
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/80 mt-1.5 leading-relaxed">
                  Ada pertanyaan seputar persyaratan atau pendaftaran? Panitia kami siap membantu via WhatsApp.
                </p>
              </div>

              {/* 3 Sleek Minimalist Contact Tiles */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
                {KONTAK_PANITIA.map((kontak, idx) => (
                  <a
                    key={idx}
                    href={kontak.waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-4 rounded-2xl bg-white/[0.08] hover:bg-white/[0.16] border border-white/10 hover:border-emerald-300/40 transition-all duration-300 backdrop-blur-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 group-hover:bg-emerald-400 group-hover:text-emerald-950 text-emerald-300 flex items-center justify-center transition-all duration-300 shrink-0">
                        <Phone size={16} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-sm group-hover:text-emerald-200 transition-colors">
                          {kontak.nama}
                        </h4>
                        <p className="font-mono text-xs text-emerald-100/70 mt-0.5">
                          {kontak.nomor}
                        </p>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white group-hover:text-emerald-900 text-white/70 flex items-center justify-center transition-all shrink-0 ml-2">
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
