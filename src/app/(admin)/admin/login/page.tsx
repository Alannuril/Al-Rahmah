"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate authentication with specific credentials
    setTimeout(() => {
      if (email === "alrahmah@gmail.com" && password === "alrahmah123") {
        localStorage.setItem("alrahmah_admin_logged_in", "true");
        router.push("/admin");
      } else {
        setLoading(false);
        setError("Email atau kata sandi salah.");
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-brand-primary/5 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-brand-secondary/5 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[440px] relative z-10"
      >
        <div className="bg-white rounded-[32px] shadow-2xl shadow-brand-primary/5 border border-gray-100 p-8 md:p-10">
          {/* Logo & Header */}
          <div className="text-center mb-10">
            <div className="relative w-20 h-20 mx-auto mb-6 rounded-2xl overflow-hidden shadow-xl shadow-brand-primary/10 border-4 border-white">
              <Image
                src="/images/logoAl-rahmah.jpeg"
                alt="Logo Al-Rahmah"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="font-heading font-bold text-2xl text-gray-900 tracking-tight">
              Admin CMS
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Silakan masuk untuk mengelola konten
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                Email / Username
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-primary transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alrahmah@gmail.com"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:bg-white focus:border-brand-primary/30 focus:ring-4 focus:ring-brand-primary/5 transition-all text-sm text-gray-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-primary transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:bg-white focus:border-brand-primary/30 focus:ring-4 focus:ring-brand-primary/5 transition-all text-sm text-gray-700"
                />
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-500 font-medium text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-brand-primary hover:bg-brand-primary/90 text-white font-bold text-sm shadow-xl shadow-brand-primary/20 transition-all active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  Masuk ke Panel
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-10 text-center">
            <p className="text-xs text-gray-400">
              © 2026 Pondok Pesantren Al-Rahmah Walantaka
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
