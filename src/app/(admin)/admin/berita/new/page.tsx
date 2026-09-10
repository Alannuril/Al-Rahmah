"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { BeritaStatus } from "@/lib/supabase/types";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function TambahBeritaPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    judul: "",
    slug: "",
    kategori: "Informasi",
    author: "Humas",
    thumbnail_url: "",
    excerpt: "",
    konten: "",
    status: "Terbit" as BeritaStatus,
  });

  const handleJudulChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setForm((prev) => ({
      ...prev,
      judul: val,
      slug: slugify(val),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.judul.trim()) {
      setError("Judul berita wajib diisi.");
      return;
    }
    if (!form.slug.trim()) {
      setError("Slug wajib diisi.");
      return;
    }

    setSaving(true);
    setError("");

    const supabase = createClient();
    const { error: insertError } = await supabase.from("berita").insert({
      judul: form.judul,
      slug: form.slug,
      kategori: form.kategori,
      author: form.author || "Humas",
      thumbnail_url: form.thumbnail_url || null,
      excerpt: form.excerpt || null,
      konten: form.konten || null,
      status: form.status,
    });

    if (insertError) {
      setSaving(false);
      setError(insertError.message || "Gagal menyimpan berita. Pastikan slug unik.");
      return;
    }

    router.push("/admin/berita");
    router.refresh();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top action */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/berita"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-brand-primary font-medium transition-colors"
        >
          <ArrowLeft size={16} />
          Kembali ke Daftar Berita
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
        <div className="mb-6 pb-6 border-b border-gray-100">
          <h1 className="text-xl font-heading font-bold text-gray-900">Tulis Berita Baru</h1>
          <p className="text-sm text-gray-500 mt-1">
            Publikasikan kabar, prestasi, atau kegiatan terbaru pondok pesantren.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Judul & Slug */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                Judul Berita <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.judul}
                onChange={handleJudulChange}
                placeholder="Contoh: Wisuda Tahfidz Quran 30 Juz Angkatan ke-10"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-800 outline-none focus:bg-white focus:border-brand-primary/30 focus:ring-4 focus:ring-brand-primary/5 transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                Slug URL <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-mono">/media/berita/</span>
                <input
                  type="text"
                  required
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
                  placeholder="wisuda-tahfidz-angkatan-10"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-100 text-xs font-mono text-gray-700 outline-none focus:bg-white focus:border-brand-primary/30 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Kategori, Status, Author */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                Kategori
              </label>
              <select
                value={form.kategori}
                onChange={(e) => setForm({ ...form, kategori: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-700 outline-none focus:bg-white focus:border-brand-primary/30 transition-all"
              >
                <option value="Informasi">Informasi</option>
                <option value="Kegiatan">Kegiatan</option>
                <option value="Prestasi">Prestasi</option>
                <option value="PSB">PSB</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                Status Publikasi
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as BeritaStatus })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-700 outline-none focus:bg-white focus:border-brand-primary/30 transition-all"
              >
                <option value="Terbit">Terbit (Langsung Tayang)</option>
                <option value="Draft">Draft (Disimpan Sementara)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                Penulis / Humas
              </label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                placeholder="Humas Al-Rahmah"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-700 outline-none focus:bg-white focus:border-brand-primary/30 transition-all"
              />
            </div>
          </div>

          {/* Thumbnail URL */}
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
              URL Foto Sampul (Thumbnail)
            </label>
            <input
              type="url"
              value={form.thumbnail_url}
              onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value })}
              placeholder="https://images.unsplash.com/... atau URL gambar lainnya"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-700 outline-none focus:bg-white focus:border-brand-primary/30 transition-all"
            />
            {form.thumbnail_url && (
              <div className="mt-3 relative h-48 w-full max-w-sm rounded-xl overflow-hidden border border-gray-200">
                <img
                  src={form.thumbnail_url}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Ringkasan / Excerpt */}
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
              Ringkasan Singkat (Excerpt)
            </label>
            <textarea
              rows={2}
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              placeholder="Tuliskan 1-2 kalimat pengantar berita untuk ditampilkan di kartu depan..."
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-700 outline-none focus:bg-white focus:border-brand-primary/30 transition-all resize-none"
            />
          </div>

          {/* Konten Lengkap */}
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
              Isi Artikel Lengkap
            </label>
            <textarea
              rows={12}
              value={form.konten}
              onChange={(e) => setForm({ ...form, konten: e.target.value })}
              placeholder="Tuliskan isi berita atau artikel selengkapnya di sini..."
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-700 outline-none focus:bg-white focus:border-brand-primary/30 transition-all leading-relaxed"
            />
          </div>

          {/* Tombol Simpan */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3.5 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-primary/20 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70"
            >
              {saving ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              Simpan &amp; Publikasikan
            </button>
            <Link
              href="/admin/berita"
              className="px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold text-sm rounded-xl transition-all"
            >
              Batal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
