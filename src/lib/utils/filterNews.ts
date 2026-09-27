import type { Berita } from "@/lib/supabase/types";
import { getNewsCategory } from "@/lib/constants/newsCategories";
import { cleanBeritaContent } from "@/lib/utils/newsGallery";

function normalizeSearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, "")
    .toLocaleLowerCase("id-ID")
    .trim();
}

export function filterNews(
  news: Berita[],
  category = "Semua",
  query = "",
): Berita[] {
  const terms = normalizeSearch(query).split(/\s+/).filter(Boolean);

  return news.filter((item) => {
    const itemCategory = getNewsCategory(item.kategori);
    if (category !== "Semua" && itemCategory !== getNewsCategory(category)) {
      return false;
    }
    if (terms.length === 0) return true;

    const searchableText = normalizeSearch([
      item.judul,
      item.excerpt || "",
      cleanBeritaContent(item.konten),
      itemCategory,
    ].join(" "));

    return terms.every((term) => searchableText.includes(term));
  });
}
