"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, Plus, Trash2, Image as ImageIcon, Eye } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { BeritaStatus } from "@/lib/supabase/types";
import { NEWS_CATEGORIES, getNewsCategory } from "@/lib/constants/newsCategories";
import { getBeritaImages, encodeBeritaContent, cleanBeritaContent } from "@/lib/utils/newsGallery";
import { getDummyNewsById } from "@/lib/data/dummyFeed";
import { NewsPreviewDialog } from "@/components/admin/NewsPreviewDialog";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function EditBeritaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [createdAt, setCreatedAt] = useState(() => new Date().toISOString());

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

  useEffect(() => {
    async function loadBerita() {
      let beritaData = null;

      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("berita")
          .select("*")
          .eq("id", id)
          .single();
        if (data) beritaData = data;
      } catch {
        // Abaikan jika database offline / error
      }

      // Jika data tidak ditemukan di Supabase, cari dari data dummy
      if (!beritaData) {
        beritaData = getDummyNewsById(id);
      }

      if (!beritaData) {
        setError("Berita tidak ditemukan.");
        setLoading(false);
        return;
      }

      // Ambil daftar gambar (hingga 3 gambar)
      const existingImages = getBeritaImages(beritaData);
      setImageUrls(existingImages.length > 0 ? existingImages : [""]);
      setCreatedAt(beritaData.created_at || new Date().toISOString());

      setForm({
        judul: beritaData.judul || "",
        slug: beritaData.slug || "",
        kategori: getNewsCategory(beritaData.kategori),
        author: beritaData.author || "Humas",
        excerpt: beritaData.excerpt || "",
        konten: cleanBeritaContent(beritaData.konten),
        status: (beritaData.status as BeritaStatus) || "Terbit",
      });
      setLoading(false);
    }
    loadBerita();
  }, [id]);

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
      setError("Slug URL wajib diisi.");
      return;
    }

    setSaving(true);
    setError("");

    const supabase = createClient();
    const validImages = imageUrls.map((s) => s.trim()).filter(Boolean);
    const finalKonten = encodeBeritaContent(form.konten, validImages);

    const baseUpdatePayload = {
      judul: form.judul.trim(),
      slug: form.slug.trim(),
      kategori: form.kategori,
      author: form.author.trim() || "Humas",
      thumbnail_url: validImages.length > 0 ? validImages[0] : null,
      excerpt: form.excerpt || null,
      konten: finalKonten || null,
      status: form.status,
      updated_at: new Date().toISOString(),
    };

    const isDummyId = id.startsWith("dummy-") || id.startsWith("keg-") || id.startsWith("prestasi-");
    const persist = async (includeImages: boolean) => {
      const payload = includeImages
        ? { ...baseUpdatePayload, gambar_urls: validImages.length > 0 ? validImages : null }
        : baseUpdatePayload;
      return isDummyId
        ? supabase.from("berita").upsert(payload, { onConflict: "slug" })
        : supabase.from("berita").update(payload).eq("id", id);
    };

    let { error: updateError } = await persist(true);

    // Fallback jika kolom gambar_urls belum ada di DB
    if (
      updateError &&
      (updateError.message?.includes("gambar_urls") ||
        updateError.code === "PGRST204" ||
        updateError.code === "42703")
    ) {
      const fallbackRes = await persist(false);
      updateError = fallbackRes.error;
    }

    if (updateError) {
      setSaving(false);
      setError(updateError.message || "Gagal memperbarui berita.");
      return;
    }

    router.push("/admin/berita");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-brand-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/berita"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-primary transition-colors font-medium"
        >
          <ArrowLeft size={16} /> Kembali ke Kelola Berita
        </Link>
      </div>

      <div className="rounded-md border border-zinc-200 bg-white p-4 sm:p-6 lg:p-8">
        <h1 className="text-xl font-heading font-bold text-gray-800 mb-6">
          Edit Berita
        </h1>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Judul */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Judul Berita <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Santri Al-Rahmah Raih Prestasi..."
              value={form.judul}
              onChange={(e) => {
                const judul = e.target.value;
                setForm((prev) => ({
                  ...prev,
                  judul,
                  slug: prev.slug === slugify(prev.judul) ? slugify(judul) : prev.slug,
                }));
              }}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/10 outline-none transition-all"
            />
          </div>

          {/* Slug URL */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Slug URL <span className="text-red-500">*</span>
            </label>
            <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center">
              <span className="text-xs text-gray-400 font-mono">/media/berita/</span>
              <input
                type="text"
                required
                value={form.slug}
                onChange={(e) => setForm((prev) => ({ ...prev, slug: slugify(e.target.value) }))}
                className="min-w-0 w-full flex-1 rounded-md border border-zinc-200 px-4 py-2.5 font-mono text-sm outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10"
              />
            </div>
          </div>

          {/* Kategori & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Jenis Berita</label>
              <select
                value={form.kategori}
                onChange={(e) => setForm((prev) => ({ ...prev, kategori: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-brand-primary/50 outline-none transition-all"
              >
                {NEWS_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as BeritaStatus }))}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-brand-primary/50 outline-none transition-all"
              >
                <option value="Terbit">Terbit</option>
                <option value="Draft">Draf</option>
              </select>
            </div>
          </div>

          {/* Penulis & Galeri Multi-Gambar */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Penulis</label>
            <input
              type="text"
              value={form.author}
              onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))}
              placeholder="Contoh: Humas Al-Rahmah"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-brand-primary/50 outline-none transition-all"
            />
          </div>

          {/* Multi-Foto Carousel / Dokumentasi */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-semibold text-gray-700 block">
                  Foto Dokumentasi Berita (Maksimal 3 Foto)
                </label>
                <p className="text-xs text-gray-400">
                  Foto pertama akan dijadikan sampul utama. Tambahkan foto lain untuk mode carousel geser.
                </p>
              </div>
              {imageUrls.length < 3 && (
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-primary hover:text-brand-primary/80 transition-colors"
                >
                  <Plus size={14} /> Tambah Foto
                </button>
              )}
            </div>

            <div className="space-y-3">
              {imageUrls.map((url, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="url"
                      placeholder={`URL Foto ${idx + 1} (contoh: https://images.unsplash.com/...)`}
                      value={url}
                      onChange={(e) => handleImageChange(idx, e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-brand-primary/50 outline-none transition-all"
                    />
                  </div>
                  {imageUrls.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="p-2.5 rounded-xl border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-100 transition-colors"
                      title="Hapus foto"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Preview Thumbnail Grid */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {imageUrls.map((url, idx) => (
                <div
                  key={idx}
                  className="relative aspect-video rounded-xl bg-gray-50 border border-gray-100 overflow-hidden flex items-center justify-center"
                >
                  {url.trim() ? (
                    <img
                      src={url}
                      alt={`Preview foto ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-gray-300 text-xs">
                      <ImageIcon size={20} />
                      <span>Foto {idx + 1}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Ringkasan (Excerpt) */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Ringkasan Singkat (Excerpt)
            </label>
            <textarea
              rows={2}
              placeholder="Deskripsi singkat yang menarik untuk tampilan kartu..."
              value={form.excerpt}
              onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-brand-primary/50 outline-none transition-all"
            />
          </div>

          {/* Isi Berita */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Konten Lengkap Berita
            </label>
            <textarea
              rows={8}
              placeholder="Tulis artikel atau berita lengkap di sini..."
              value={form.konten}
              onChange={(e) => setForm((prev) => ({ ...prev, konten: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-brand-primary/50 outline-none transition-all"
            />
          </div>

          {/* Actions */}
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
              className="inline-flex min-h-10 items-center gap-2 rounded-md bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-primary/90 disabled:opacity-50"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </form>
      </div>
      {showPreview && (
        <NewsPreviewDialog
          berita={{
            judul: form.judul.trim() || "Judul Berita",
            kategori: form.kategori,
            created_at: createdAt,
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
