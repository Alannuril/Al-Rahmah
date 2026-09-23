"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Loader2, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/providers/AuthProvider";

function GoogleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.88c2.27-2.09 3.665-5.17 3.665-9.09z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.1C3.28 21.46 7.35 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.32c-.25-.72-.38-1.49-.38-2.32s.13-1.6.38-2.32V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.1z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.28 2.54 1.25 6.58l4.03 3.1c.95-2.83 3.6-4.93 6.72-4.93z"
      />
    </svg>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/psb";
  const oauthError = searchParams.get("error");
  const { refreshUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (oauthError === "oauth_failed") {
      setError("Gagal masuk dengan Google. Mohon coba kembali atau gunakan email.");
    }
  }, [oauthError]);

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
        if (authError.message.includes("Invalid login credentials")) {
          setError("Email atau kata sandi tidak sesuai. Mohon periksa kembali.");
        } else if (authError.message.includes("Email not confirmed")) {
          setError("Email Anda belum dikonfirmasi. Silakan periksa kotak masuk atau spam email Anda.");
        } else {
          setError(authError.message);
        }
        setLoading(false);
        return;
      }

      await refreshUser();
      router.push(redirectPath);
      router.refresh();
    } catch {
      setError("Terjadi kesalahan koneksi. Silakan coba beberapa saat lagi.");
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const callbackUrl = `${window.location.origin}/auth/callback?next=${encodeURIComponent(
        redirectPath
      )}`;

      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: callbackUrl,
        },
      });

      if (authError) {
        setError(
          authError.message.includes("not enabled")
            ? "Penyedia login Google belum diaktifkan di pengaturan Supabase. Silakan gunakan email untuk saat ini."
            : authError.message
        );
        setGoogleLoading(false);
      }
    } catch {
      setError("Gagal memulai otentikasi Google. Silakan coba beberapa saat lagi.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto my-auto py-8">
      {/* Title & Subtitle */}
      <div className="text-center mb-7">
        <h1 className="font-heading font-bold text-2xl text-zinc-900 tracking-tight">
          Masuk Akun E-PSB
        </h1>
        <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">
          Silakan masuk untuk mengakses formulir pendaftaran calon santri baru.
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-5 p-3.5 rounded-xl bg-red-50/90 border border-red-100 text-xs text-red-600 font-medium leading-relaxed text-center">
          {error}
        </div>
      )}

      {/* Google Login Button */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={googleLoading || loading}
        className="w-full py-3 px-4 rounded-xl border border-zinc-200 hover:border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-700 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2.5 shadow-2xs hover:shadow-xs active:scale-[0.99] disabled:opacity-60"
      >
        {googleLoading ? (
          <Loader2 size={16} className="animate-spin text-zinc-400" />
        ) : (
          <GoogleIcon className="w-4 h-4 shrink-0" />
        )}
        <span>{googleLoading ? "Menghubungkan ke Google..." : "Masuk dengan Google"}</span>
      </button>

      {/* Minimalist Divider */}
      <div className="relative my-5 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-200/80" />
        </div>
        <span className="relative bg-white px-3 text-[11px] font-medium text-zinc-400">
          atau dengan email
        </span>
      </div>

      {/* Form (Clean, without card) */}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
            Alamat Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@email.com"
            className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:bg-white focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/10 transition-all font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
            Kata Sandi
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:bg-white focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/10 transition-all font-medium"
          />
        </div>

        <button
          type="submit"
          disabled={loading || googleLoading}
          className="w-full mt-2 py-3.5 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold text-sm shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-70 active:scale-[0.99]"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Memproses...</span>
            </>
          ) : (
            <>
              <span>Masuk Sekarang</span>
              <ArrowRight size={15} />
            </>
          )}
        </button>
      </form>

      {/* Register Prompt */}
      <div className="mt-6 pt-5 border-t border-zinc-100 text-center">
        <p className="text-xs text-zinc-500">
          Belum memiliki akun calon santri?{" "}
          <Link
            href={`/psb/register?redirect=${encodeURIComponent(redirectPath)}`}
            className="font-bold text-brand-primary hover:underline"
          >
            Daftar Akun Baru
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function PsbLoginPage() {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-white">
      {/* ============================================================ */}
      {/* BAGIAN KIRI: Form Tanpa Card & Logo di Tengah Atas           */}
      {/* ============================================================ */}
      <div className="col-span-12 lg:col-span-6 xl:col-span-5 flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-14 min-h-screen">
        {/* Bar Atas: Tombol Kembali Minimalis */}
        <div className="flex items-center justify-between">
          <Link
            href="/psb"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-brand-primary transition-colors group py-1"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Kembali ke Informasi PSB</span>
          </Link>
        </div>

        {/* Logo Berada di Bagian Tengah Atas */}
        <div className="flex flex-col items-center justify-center pt-6 pb-2">
          <Link href="/" className="inline-flex flex-col items-center group">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-2xs border border-zinc-200/80 bg-white mb-2 group-hover:scale-105 transition-transform">
              <Image
                src="/images/logoAl-rahmah.jpeg"
                alt="Logo Al-Rahmah"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-heading font-bold text-base text-zinc-900 tracking-tight">
              Al-Rahmah
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
              Islamic Boarding School
            </span>
          </Link>
        </div>

        {/* Konten Form (Tanpa Card) */}
        <Suspense fallback={<div className="text-center text-sm text-zinc-400 py-12">Memuat...</div>}>
          <LoginForm />
        </Suspense>

        {/* Bar Bawah: Copyright Minimalis */}
        <div className="pt-4 text-center">
          <p className="text-[11px] text-zinc-400">
            © 2026 Pondok Pesantren Al-Rahmah Walantaka
          </p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* BAGIAN KANAN: Foto Suasana Pesantren yang Soft & Tenang      */}
      {/* ============================================================ */}
      <div className="hidden lg:block lg:col-span-6 xl:col-span-7 relative h-full min-h-screen overflow-hidden">
        <Image
          src="/images/bgHero-enhanced.jpg"
          alt="Pondok Pesantren Al-Rahmah"
          fill
          priority
          className="object-cover"
        />
        {/* Soft elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-brand-primary/30 to-black/10" />

        {/* Hairline subtle divider */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-200/40" />

        {/* Caption Editorial di Bagian Bawah Foto */}
        <div className="absolute bottom-10 xl:bottom-14 left-10 xl:left-14 right-10 xl:right-14 z-10 text-white space-y-2.5">
          <span className="text-[11px] font-bold uppercase tracking-widest text-brand-lime">
            Portal Penerimaan Santri Baru 2026-2027
          </span>
          <h2 className="font-heading text-2xl xl:text-3xl font-bold text-white leading-snug tracking-tight">
            Membentuk Generasi Qurani, Berakhlak, dan Berprestasi
          </h2>
          <p className="text-xs xl:text-sm text-white/80 max-w-lg leading-relaxed">
            Menjadi lembaga pendidikan yang merangkul para anak yatim, dhuafa, dan seluruh kalangan masyarakat berlandaskan Al-Qur&apos;an dan As-Sunnah.
          </p>
        </div>
      </div>
    </div>
  );
}
