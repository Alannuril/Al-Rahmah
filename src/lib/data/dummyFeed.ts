import type { Berita, Prestasi } from "@/lib/supabase/types";
import { DUMMY_BERITA } from "@/lib/constants/dummyNews";
import { DUMMY_KEGIATAN } from "@/lib/constants/dummyKegiatan";
import { DUMMY_PRESTASI } from "@/lib/constants/dummyPrestasi";
import { getNewsCategory } from "@/lib/constants/newsCategories";

export function prestasiToBerita(prestasi: Prestasi): Berita {
  const description = prestasi.deskripsi?.trim() || null;
  const date = prestasi.tanggal || prestasi.created_at;

  return {
    id: `prestasi-${prestasi.id}`,
    slug: `prestasi-${prestasi.id}`,
    judul: prestasi.judul,
    kategori: "Kejuaraan",
    thumbnail_url: prestasi.foto_url,
    gambar_urls: prestasi.foto_url ? [prestasi.foto_url] : [],
    konten: description,
    excerpt:
      description && description.length > 220
        ? `${description.slice(0, 220).trimEnd()}…`
        : description,
    author: "Humas",
    status: "Terbit",
    created_at: date,
    updated_at: prestasi.created_at,
  };
}

export function getAllDummyNews(): Berita[] {
  const combined: Berita[] = [
    ...DUMMY_BERITA.map((b) => ({ ...b, kategori: getNewsCategory(b.kategori) })),
    ...DUMMY_KEGIATAN.map((b) => ({ ...b, kategori: getNewsCategory(b.kategori) })),
    ...DUMMY_PRESTASI.map(prestasiToBerita),
  ];

  const unique = new Map<string, Berita>();
  for (const item of combined) {
    const key = item.slug || item.id;
    if (!unique.has(key)) unique.set(key, item);
  }

  return [...unique.values()].sort(
    (a, b) => (Date.parse(b.created_at) || 0) - (Date.parse(a.created_at) || 0),
  );
}

export function getDummyNewsById(id: string): Berita | null {
  const all = getAllDummyNews();
  return all.find((b) => b.id === id || b.slug === id) || null;
}
