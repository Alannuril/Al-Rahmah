import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Berita, Prestasi } from "@/lib/supabase/types";
import { DUMMY_BERITA } from "@/lib/constants/dummyNews";
import { DUMMY_KEGIATAN } from "@/lib/constants/dummyKegiatan";
import { DUMMY_PRESTASI } from "@/lib/constants/dummyPrestasi";
import { getNewsCategory } from "@/lib/constants/newsCategories";

const fallbackNews = [...DUMMY_BERITA, ...DUMMY_KEGIATAN];

function normalizeBerita(berita: Berita): Berita {
  return { ...berita, kategori: getNewsCategory(berita.kategori) };
}

export function prestasiToBerita(prestasi: Prestasi): Berita {
  const description = prestasi.deskripsi?.trim() || null;
  const date = prestasi.tanggal || prestasi.created_at;

  return {
    id: `prestasi-${prestasi.id}`,
    slug: `prestasi-${prestasi.id}`,
    judul: prestasi.judul,
    kategori: "Kejuaraan",
    thumbnail_url: prestasi.foto_url,
    konten: description,
    excerpt: description && description.length > 220
      ? `${description.slice(0, 220).trimEnd()}…`
      : description,
    author: "Humas",
    status: "Terbit",
    created_at: date,
    updated_at: prestasi.created_at,
  };
}

async function getPublishedNews(): Promise<Berita[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("berita")
      .select("*")
      .eq("status", "Terbit")
      .order("created_at", { ascending: false });

    if (data?.length) return data;
  } catch {
    // Keep the existing sample content available when the database is unavailable.
  }
  return fallbackNews;
}

export async function getPrestasi(): Promise<Prestasi[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("prestasi")
      .select("*")
      .order("tanggal", { ascending: false });

    if (data?.length) return data;
  } catch {
    // Use the same fallback as the former standalone achievement section.
  }
  return DUMMY_PRESTASI;
}

export async function getBeritaFeed(): Promise<Berita[]> {
  const [news, achievements] = await Promise.all([
    getPublishedNews(),
    getPrestasi(),
  ]);

  // Activities already belong to berita; merge that table only once.
  const combined = [
    ...news.filter((item) => item.status === "Terbit").map(normalizeBerita),
    ...achievements.map(prestasiToBerita),
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

export const getBeritaBySlug = cache(async (slug: string): Promise<Berita | null> => {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("berita")
      .select("*")
      .eq("slug", slug)
      .eq("status", "Terbit")
      .single();

    if (data) return normalizeBerita(data);
  } catch {
    // Continue to the existing fallback content.
  }

  const fallback = fallbackNews.find((item) => item.slug === slug);
  if (fallback) return normalizeBerita(fallback);
  if (!slug.startsWith("prestasi-")) return null;

  const id = slug.slice("prestasi-".length);
  if (!id) return null;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("prestasi")
      .select("*")
      .eq("id", id)
      .single();

    if (data) return prestasiToBerita(data);
  } catch {
    // Achievement samples have stable detail URLs too.
  }

  const achievement = DUMMY_PRESTASI.find((item) => item.id === id);
  return achievement ? prestasiToBerita(achievement) : null;
});
