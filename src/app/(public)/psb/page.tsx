"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  CheckCircle,
  AlertCircle,
  Phone,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  FileEdit,
  LogOut,
  Building,
  CreditCard,
  School,
  Lock,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { PsbSettings } from "@/lib/supabase/types";
import { useAuth } from "@/components/providers/AuthProvider";

export default function PsbPage() {
  const { user, loading: authLoading, signOut } = useAuth();

  const [settings, setSettings] = useState<Partial<PsbSettings>>({
    tahun_ajaran: "2026/2027",
    status: "Dibuka",
    biaya_formulir: "Rp 150.000 (Non-Yatim) / Gratis (Yatim)",
    deskripsi: "Pondok Pesantren Al-Rahmah Walantaka membuka pendaftaran santri baru.",
  });
  const [loadingSettings, setLoadingSettings] = useState(true);

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
      } finally {
        setLoadingSettings(false);
      }
    }
    loadSettings();
  }, []);

  const isBuka = settings.status === "Dibuka";

  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-28 min-h-screen bg-surface/40">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">
        <SectionHeading
          title="Penerimaan Santri Baru (PSB)"
          subtitle="Pondok Pesantren Al-Rahmah Walantaka — Islamic Boarding School"
          centered
        />

        {/* ============================================================ */}
        {/* HERO STATUS BANNER: ADAPTIVE BEFORE / AFTER LOGIN            */}
        {/* ============================================================ */}
        <div className="mt-8 sm:mt-10 bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-zinc-200/80">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div
                className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs ${
                  isBuka
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                    : "bg-amber-50 text-amber-600 border border-amber-100"
                }`}
              >
                {isBuka ? <CheckCircle size={30} /> : <AlertCircle size={30} />}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-heading font-bold text-zinc-900 text-lg sm:text-xl">
                    PSB Tahun Ajaran {settings.tahun_ajaran || "2026/2027"}
                  </h3>
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
                <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 mt-2">
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
                  <div className="space-y-2 w-full">
                    <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-800 font-bold mb-0.5">
                        <UserCheck size={14} />
                        <span>Sesi Masuk Aktif</span>
                      </div>
                      <p className="text-emerald-700 truncate max-w-[240px]">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/psb/daftar"
                      className="w-full px-6 py-3.5 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
                    >
                      <FileEdit size={16} />
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
                  <div className="space-y-2 w-full">
                    <Link
                      href="/psb/login?redirect=/psb/daftar"
                      className="w-full px-7 py-3.5 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
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
        {/* NARASIKAN ALUR PENDAFTARAN LENGKAP                           */}
        {/* ============================================================ */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white rounded-3xl p-6 border border-zinc-200/80 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h4 className="font-heading font-bold text-base text-zinc-900">
              Buat Akun &amp; Masuk
            </h4>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Wali santri mendaftar akun terlebih dahulu menggunakan alamat email aktif untuk menjaga keamanan data pendaftaran.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-zinc-200/80 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h4 className="font-heading font-bold text-base text-zinc-900">
              Isi Data &amp; Unggah Berkas
            </h4>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Isi data lengkap sesuai Ijazah/Rapor (huruf kapital), pilih tingkat MTs/MA, dan upload bukti transfer / akta kematian serta foto santri.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-zinc-200/80 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h4 className="font-heading font-bold text-base text-zinc-900">
              Verifikasi &amp; Tes Seleksi
            </h4>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Sekretariat PPSB memverifikasi berkas dan menghubungi nomor WhatsApp terdaftar untuk jadwal observasi/tes dan daftar ulang.
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/* INFORMASI PEMBAYARAN & PERSYARATAN                           */}
        {/* ============================================================ */}
        <div className="mt-8 bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs">
          <h3 className="font-heading font-bold text-lg sm:text-xl text-zinc-900 mb-4">
            Ketentuan Biaya &amp; Rekening Resmi Pendaftaran
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/70 space-y-2">
              <span className="font-bold text-zinc-900 flex items-center gap-1.5 text-brand-primary">
                <CreditCard size={16} />
                <span>Kategori Non-Yatim: Rp 150.000,-</span>
              </span>
              <p className="text-zinc-600 leading-relaxed">
                Biaya formulir ditransfer ke rekening resmi Pondok Pesantren Al-Rahmah:
              </p>
              <div className="p-2.5 rounded-xl bg-white border border-zinc-200 font-mono text-xs text-zinc-800 space-y-0.5">
                <p>Bank: <strong>BSI (Bank Syariah Indonesia)</strong></p>
                <p>No. Rekening: <strong>7777365546</strong></p>
                <p>Atas Nama: <strong>Pondok Pesantren Al Rahmah</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/70 space-y-2">
              <span className="font-bold text-zinc-900 flex items-center gap-1.5 text-brand-primary">
                <ShieldCheck size={16} />
                <span>Kategori Yatim: Bebas Biaya (Gratis)</span>
              </span>
              <p className="text-zinc-600 leading-relaxed">
                Bagi calon santri yatim, pendaftaran digratiskan dengan melampirkan berkas:
              </p>
              <div className="p-2.5 rounded-xl bg-white border border-zinc-200 text-xs text-zinc-700">
                <p className="font-semibold text-zinc-900">• Akta Kematian Ayah</p>
                <p className="text-[11px] text-zinc-500 mt-0.5">
                  Dikeluarkan resmi oleh Dinas Kependudukan dan Catatan Sipil (Dukcapil) setempat.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* KONTAK PANITIA PPSB 2026-2027                                */}
        {/* ============================================================ */}
        <div className="mt-8 bg-brand-primary text-white rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-semibold text-brand-lime uppercase tracking-widest block mb-1">
                Layanan Informasi
              </span>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                Narahubung Panitia PPSB 2026-2027
              </h3>
              <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-xl">
                Butuh bantuan seputar persyaratan atau alur pendaftaran? Hubungi ustadz/ustadzah panitia via WhatsApp:
              </p>
            </div>

            <div className="flex flex-col gap-2 w-full md:w-auto text-xs font-semibold">
              <a
                href="https://wa.me/62895401953841"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors flex items-center gap-2"
              >
                <Phone size={14} className="text-brand-lime" />
                <span>Ust. Hidayatullah: +62 895-4019-53841</span>
              </a>
              <a
                href="https://wa.me/6289509414409"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors flex items-center gap-2"
              >
                <Phone size={14} className="text-brand-lime" />
                <span>Ust. Muhammad Azis: +62 895-0941-4409</span>
              </a>
              <a
                href="https://wa.me/6289618952845"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors flex items-center gap-2"
              >
                <Phone size={14} className="text-brand-lime" />
                <span>Ustz. Laily Fauziyah: +62 896-1895-2845</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
