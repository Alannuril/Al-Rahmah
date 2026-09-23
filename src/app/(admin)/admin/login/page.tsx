"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  Loader2,
  Eye,
  EyeOff,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError) {
        setLoading(false);
        setError("Email atau kata sandi salah. Silakan coba lagi.");
        return;
      }

      localStorage.setItem("alrahmah_admin_logged_in", "true");
      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      setLoading(false);
      const msg =
        err instanceof Error
          ? err.message
          : "Terjadi gangguan koneksi. Coba lagi.";
      setError(msg);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center lg:flex-row lg:items-stretch bg-zinc-900 lg:bg-white overflow-x-hidden">
      {/* ============================================================ */}
      {/* SISI KIRI (DESKTOP) / FULL BACKGROUND (MOBILE): FOTO MASJID  */}
      {/* ============================================================ */}
      <div className="fixed inset-0 w-full h-full lg:relative lg:inset-auto lg:w-1/2 lg:min-h-screen overflow-hidden bg-[#1E3F35] flex flex-col justify-end p-6 sm:p-10 lg:p-12 z-0">
        {/* Background Image Masjid */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gedung2.jpg"
            alt="Masjid Al-Rahmah"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className="object-cover object-center"
          />
          {/* Layer overlay yang menyatu dengan foto */}
          <div className="absolute inset-0 bg-[#1E3F35]/70 lg:bg-transparent backdrop-blur-[1px] lg:backdrop-blur-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/55 lg:from-[#11241E]/90 lg:via-[#1E3F35]/50 lg:to-black/25" />
        </div>

        {/* Bottom Tagline (Desktop) */}
        <div className="relative z-10 hidden lg:block">
          <h2 className="font-heading font-bold text-white text-2xl tracking-tight">
            Pondok Pesantren Al-Rahmah
          </h2>
          <p className="mt-1 text-sm text-zinc-300">
            Membina Generasi Qur&apos;ani &amp; Berakhlak Mulia
          </p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SISI KANAN (DESKTOP) / KARTU GLASS (MOBILE): FORM LOGIN      */}
      {/* ============================================================ */}
      <div className="relative z-10 flex-1 flex flex-col justify-between items-center p-4 sm:p-6 lg:p-16 w-full lg:w-1/2 lg:bg-white min-h-screen lg:min-h-auto">
        {/* Spacer Atas Desktop */}
        <div className="hidden lg:block h-4" />

        {/* Form Card: Mobile berupa Glassmorphism Transparan; Desktop berupa Flat Seamless */}
        <div className="w-full max-w-sm sm:max-w-md bg-white/45 sm:bg-white/55 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none p-6 sm:p-8 lg:p-0 rounded-3xl lg:rounded-none shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] lg:shadow-none border border-white/60 lg:border-none space-y-5 my-auto transition-all">
          {/* Logo Al-Rahmah di Bagian Atas Form (Tengah, Tanpa Border) & Header */}
          <div className="text-center space-y-2">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 mx-auto">
              <Image
                src="/images/logoAl-rahmah.jpeg"
                alt="Logo Al-Rahmah"
                fill
                sizes="64px"
                priority
                className="object-contain drop-shadow-sm"
              />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-heading font-bold text-zinc-900 tracking-tight">
                Masuk Admin
              </h1>
              <p className="text-xs sm:text-sm text-zinc-700 lg:text-zinc-500 font-medium mt-0.5">
                Masukkan email dan kata sandi Anda.
              </p>
            </div>
          </div>

          {/* Alert Error */}
          {error && (
            <div className="p-3 rounded-xl bg-red-50/90 border border-red-200 text-red-800 text-xs sm:text-sm flex items-center gap-2.5 shadow-xs">
              <AlertCircle size={16} className="shrink-0 text-red-600" />
              <p className="leading-snug font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-3.5">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-zinc-800 tracking-wide"
              >
                Email
              </label>
              <div className="relative group">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#396E5F] pointer-events-none transition-colors">
                  <Mail size={16} />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@alrahmah.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/85 lg:bg-zinc-50/80 border border-zinc-300/90 lg:border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:bg-white focus:border-[#396E5F] focus:ring-4 focus:ring-[#396E5F]/15 transition-all shadow-2xs font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-zinc-800 tracking-wide"
              >
                Kata Sandi
              </label>
              <div className="relative group">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#396E5F] pointer-events-none transition-colors">
                  <Lock size={16} />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/85 lg:bg-zinc-50/80 border border-zinc-300/90 lg:border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:bg-white focus:border-[#396E5F] focus:ring-4 focus:ring-[#396E5F]/15 transition-all shadow-2xs font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Sembunyikan sandi" : "Lihat sandi"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer p-1"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-[#396E5F] hover:bg-[#1E3F35] text-white font-semibold text-sm transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer mt-1 shadow-md shadow-emerald-950/20 hover:shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Memproses...</span>
                </>
              ) : (
                <span>Masuk</span>
              )}
            </button>
          </form>

          {/* Link Kembali ke Beranda di bawah tombol Masuk */}
          <div className="text-center pt-1">
            <Link
              href="/"
              className="group inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-700 lg:text-zinc-500 hover:text-[#396E5F] transition-colors duration-150"
            >
              <ArrowLeft
                size={13}
                className="transition-transform duration-150 group-hover:-translate-x-0.5"
              />
              <span>Kembali ke Beranda</span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-[11px] sm:text-xs text-white/80 lg:text-zinc-400 pt-3 pb-1 drop-shadow-sm">
          &copy; {new Date().getFullYear()} Pondok Pesantren Al-Rahmah
        </div>
      </div>
    </div>
  );
}
