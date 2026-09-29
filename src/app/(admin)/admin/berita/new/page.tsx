"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, Plus, Trash2, Image as ImageIcon, Eye } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { BeritaStatus } from "@/lib/supabase/types";
import { NEWS_CATEGORIES } from "@/lib/constants/newsCategories";
import { encodeBeritaContent } from "@/lib/utils/newsGallery";
import { NewsPreviewDialog } from "@/components/admin/NewsPreviewDialog";

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
  const [showPreview, setShowPreview] = useState(false);

  const [imageUrls, setImageUrls] = useState<string[]>([""]);

  const [form, setForm] = useState({
    judul: "",
    slug: "",
    kategori: "Informasi",
    author: "Humas",
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

  const handleImageChange = (index: number, value: string) => {
    setImageUrls((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleAddImage = () => {
    if (imageUrls.length < 3) {
      setImageUrls((prev) => [...prev, ""]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageUrls((prev) => {
      if (prev.length === 1) return [""];
      return prev.filter((_, i) => i !== index);
    });
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

    const validImages = imageUrls.map((u) => u.trim()).filter(Boolean).slice(0, 3);
    const primaryThumbnail = validImages[0] || null;
    const finalKonten = encodeBeritaContent(form.konten, validImages);

    const supabase = createClient();

    // Payload dengan kolom gambar_urls (jika kolom tersedia di DB)
    const basePayload = {
      judul: form.judul,
      slug: form.slug,
      kategori: form.kategori,
      author: form.author || "Humas",
      thumbnail_url: primaryThumbnail,
      excerpt: form.excerpt || null,
      konten: finalKonten || null,
      status: form.status,
    };

    let { error: insertError } = await supabase.from("berita").insert({
      ...basePayload,
      gambar_urls: validImages.length > 0 ? validImages : null,
    });

    // Jika Supabase mengembalikan error karena kolom gambar_urls belum ada di DB, fallback simpan tanpa kolom tersebut
    if (
      insertError &&
      (insertError.message?.includes("gambar_urls") ||
        insertError.code === "PGRST204" ||
        insertError.code === "42703")
    ) {
      const fallbackRes = await supabase.from("berita").insert(basePayload);
      insertError = fallbackRes.error;
    }

    if (insertError) {
      setSaving(false);
      setError(insertError.message || "Gagal menyimpan berita. Pastikan slug unik.");
      return;
    }

    router.push("/admin/berita");
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-5xl space-y-5">
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

      <div className="rounded-md border border-zinc-200 bg-white p-4 sm:p-6 lg:p-8">
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
              <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center">
                <span className="text-xs text-gray-400 font-mono">/media/berita/</span>
                <input
                  type="text"
                  required
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
                  placeholder="wisuda-tahfidz-angkatan-10"
                  className="min-w-0 w-full flex-1 rounded-md border border-zinc-200 bg-zinc-50 px-4 py-2.5 font-mono text-xs text-zinc-700 outline-none focus:border-brand-primary focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Kategori, Status, Author */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                Jenis Berita
              </label>
              <select
                value={form.kategori}
                onChange={(e) => setForm({ ...form, kategori: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-700 outline-none focus:bg-white focus:border-brand-primary/30 transition-all"
              >
                {!NEWS_CATEGORIES.some((category) => category === form.kategori) && (
                  <option value={form.kategori}>{form.kategori}</option>
                )}
                {NEWS_CATEGORIES.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
                Pilih Akademik untuk informasi PSB dan keputusan akademik.
              </p>
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

          {/* Multi-Image Section (Maksimal 3 Gambar) */}
          <div className="space-y-4 border-t border-zinc-200 pt-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Foto &amp; Galeri Berita (Maksimal 3 Foto)
                </label>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Foto 1 menjadi sampul utama. Jika menambahkan lebih dari 1 foto, pembaca dapat menggeser/scroll foto secara interaktif.
                </p>
              </div>

              {imageUrls.length < 3 && (
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-primary/10 hover:bg-brand-primary text-brand-primary hover:text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <Plus size={14} />
                  Tambah Foto ({imageUrls.length}/3)
                </button>
              )}
            </div>

            <div className="space-y-3 pt-2">
              {imageUrls.map((url, idx) => (
                <div
                  key={idx}
                  className="space-y-2.5 border-t border-zinc-200 pt-3.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                      <ImageIcon size={14} className="text-brand-primary" />
                      {idx === 0
                        ? "Foto 1 (Sampul Utama / Thumbnail)"
                        : `Foto Tambahan ${idx + 1}`}
                    </span>

                    {idx > 0 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="text-gray-400 hover:text-red-500 p-1 transition-colors cursor-pointer"
                        title="Hapus foto ini"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>

                  <input
                    type="url"
                    value={url}
                    onChange={(e) => handleImageChange(idx, e.target.value)}
                    placeholder="https://images.unsplash.com/... atau URL gambar lainnya"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-gray-50 border border-gray-100 text-xs text-gray-700 outline-none focus:bg-white focus:border-brand-primary/30 transition-all"
                  />

                  {url.trim() && (
                    <div className="relative h-36 w-full max-w-xs rounded-lg overflow-hidden border border-gray-200 bg-gray-100 mt-2">
                      <img
                        src={url}
                        alt={`Preview foto ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
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
          <div className="flex flex-wrap items-center justify-end gap-2 border-t border-zinc-200 pt-4">
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="inline-flex min-h-10 items-center gap-2 rounded-md border border-zinc-200 px-4 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            >
              <Eye size={16} aria-hidden="true" />
              Pratinjau
            </button>
            <Link
              href="/admin/berita"
              className="inline-flex min-h-10 items-center rounded-md px-4 py-2.5 text-sm font-semibold text-zinc-600 hover:bg-zinc-100"
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex min-h-10 items-center gap-2 rounded-md bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-primary/90 disabled:opacity-70"
            >
              {saving ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              {form.status === "Draft" ? "Simpan Draft" : "Simpan & Publikasikan"}
            </button>
          </div>
        </form>
      </div>
      {showPreview && (
        <NewsPreviewDialog
          berita={{
            judul: form.judul.trim() || "Judul Berita",
            kategori: form.kategori,
            created_at: new Date().toISOString(),
            excerpt: form.excerpt.trim() || null,
            konten: form.konten.trim() || null,
            thumbnail_url: imageUrls.find((url) => url.trim())?.trim() || null,
            gambar_urls: imageUrls.map((url) => url.trim()).filter(Boolean),
          }}
          status={form.status}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}
