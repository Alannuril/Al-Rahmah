import { createClient } from "@/lib/supabase/client";
import type { Berita } from "@/lib/supabase/types";
import { getAllDummyNews } from "./dummyFeed";

export async function getAdminNews(): Promise<Berita[]> {
  const fallback = getAllDummyNews();

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("berita")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data?.length) return fallback;

    const bySlug = new Map<string, Berita>();
    fallback.forEach((item) => bySlug.set(item.slug || item.id, item));
    data.forEach((item) => bySlug.set(item.slug || item.id, item));

    return [...bySlug.values()].sort(
      (a, b) => (Date.parse(b.created_at) || 0) - (Date.parse(a.created_at) || 0),
    );
  } catch {
    return fallback;
  }
}
