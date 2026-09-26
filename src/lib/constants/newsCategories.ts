export const NEWS_CATEGORIES = [
  "Kejuaraan",
  "Kegiatan",
  "Akademik",
  "Informasi",
  "Pengumuman",
] as const;

export function getNewsCategory(category?: string | null): string {
  const value = category?.trim();
  if (!value) return "Informasi";

  const normalized = value.toLowerCase();
  if (normalized === "prestasi") return "Kejuaraan";
  if (normalized === "psb") return "Akademik";

  return NEWS_CATEGORIES.find((item) => item.toLowerCase() === normalized) ?? value;
}
