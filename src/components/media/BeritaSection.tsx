import { BeritaClient } from "@/components/news/BeritaClient";
import { getBeritaFeed } from "@/lib/data/news";

interface BeritaSectionProps {
  initialCategory?: string;
  limit?: number;
  allLinkHref?: string;
  allLinkLabel?: string;
}

export async function BeritaSection({
  initialCategory = "Semua",
  limit,
  allLinkHref = "/media/berita/semua",
  allLinkLabel = "Lihat semua berita",
}: BeritaSectionProps) {
  const beritaList = await getBeritaFeed();

  return (
    <BeritaClient
      initialNews={beritaList}
      initialCategory={initialCategory}
      limit={limit}
      allLinkHref={limit !== undefined ? allLinkHref : undefined}
      allLinkLabel={allLinkLabel}
    />
  );
}
