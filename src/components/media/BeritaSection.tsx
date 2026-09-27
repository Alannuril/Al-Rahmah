import { BeritaClient } from "@/components/news/BeritaClient";
import { getBeritaFeed } from "@/lib/data/news";

interface BeritaSectionProps {
  initialCategory?: string;
}

export async function BeritaSection({
  initialCategory = "Semua",
}: BeritaSectionProps) {
  const beritaList = await getBeritaFeed();

  return <BeritaClient initialNews={beritaList} initialCategory={initialCategory} />;
}
