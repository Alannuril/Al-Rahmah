import { createClient } from "@/lib/supabase/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BeritaClient } from "@/components/news/BeritaClient";
import type { Berita } from "@/lib/supabase/types";
import { DUMMY_BERITA } from "@/lib/constants/dummyNews";

export const metadata = {
  title: "Berita & Informasi - Al-Rahmah",
  description: "Informasi dan kabar terbaru seputar civitas akademika Pondok Pesantren Al-Rahmah Walantaka.",
};

async function getBerita(): Promise<Berita[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("berita")
      .select("*")
      .eq("status", "Terbit")
      .order("created_at", { ascending: false });

    if (data && data.length > 0) {
      return data;
    }
    return DUMMY_BERITA;
  } catch {
    return DUMMY_BERITA;
  }
}

export default async function BeritaPage() {
  const beritaList = await getBerita();

  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-24 min-h-screen bg-surface/40">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Page Header (Clean & Minimalist) */}
        <div className="mb-6 sm:mb-8">
          <SectionHeading
            title="Berita & Informasi"
            centered
          />
        </div>

        {/* Editorial News Design System Layout */}
        <BeritaClient initialNews={beritaList} />
      </div>
    </div>
  );
}
