import { SectionHeading } from "@/components/ui/SectionHeading";
import { Camera as Instagram } from "lucide-react";
import clsx from "clsx";
import { createClient } from "@/lib/supabase/server";
import type { GaleriFoto, PengaturanWebsite } from "@/lib/supabase/types";

const FALLBACK_ITEMS = [
  { src: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop", type: "Dokumentasi", span: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop", type: "Kegiatan Santri", span: "col-span-1 md:col-span-2 row-span-2" },
  { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop", type: "Pembelajaran", span: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop", type: "Kajian & Ibadah", span: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop", type: "Prestasi", span: "col-span-1 md:col-span-2 row-span-1" },
];

const SPANS = [
  "col-span-1 row-span-1",
  "col-span-1 md:col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 md:col-span-2 row-span-1",
];

async function getGalleryData(): Promise<{ photos: { src: string; type: string; span: string }[]; instagramUrl: string }> {
  try {
    const supabase = await createClient();
    const [fotoRes, settingRes] = await Promise.all([
      supabase.from("galeri_foto").select("*").order("created_at", { ascending: false }).limit(5),
      supabase.from("pengaturan_website").select("instagram_url").limit(1).single(),
    ]);

    const instagramUrl = settingRes.data?.instagram_url || "https://instagram.com/alrahmah.walantaka";

    if (fotoRes.data && fotoRes.data.length >= 3) {
      const photos = fotoRes.data.map((f: GaleriFoto, i: number) => ({
        src: f.foto_url,
        type: f.keterangan || "Al-Rahmah",
        span: SPANS[i % SPANS.length],
      }));
      return { photos, instagramUrl };
    }

    return { photos: FALLBACK_ITEMS, instagramUrl };
  } catch {
    return { photos: FALLBACK_ITEMS, instagramUrl: "https://instagram.com/alrahmah.walantaka" };
  }
}

export async function GalleryFeed() {
  const { photos, instagramUrl } = await getGalleryData();

  // Parse username from instagram URL
  let igHandle = "@alrahmah.walantaka";
  try {
    const cleanUrl = instagramUrl.replace(/\/+$/, "");
    const parts = cleanUrl.split("/");
    if (parts.length > 0 && parts[parts.length - 1]) {
      igHandle = "@" + parts[parts.length - 1].replace("@", "");
    }
  } catch {
    // fallback
  }

  return (
    <section className="py-28 bg-brand-primary relative overflow-hidden">
      {/* Decorative background geometry */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#1a352d] rounded-bl-full opacity-60 z-0" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-brand-secondary/5 rounded-tr-full blur-3xl z-0" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <SectionHeading
            title="Galeri Aktivitas"
            subtitle="Intip keseruan dan semangat belajar para santri di Pondok Pesantren Al-Rahmah."
            badge="Momen Berharga"
            light
          />
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full transition-all backdrop-blur-md shadow-xl group whitespace-nowrap hover:-translate-y-1"
          >
            <Instagram size={20} className="text-brand-secondary group-hover:scale-110 transition-transform" />
            <span className="font-semibold tracking-wide text-sm">{igHandle}</span>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-3 md:gap-5 h-[500px] md:h-[700px]">
          {photos.map((item, index) => (
            <div key={index} className={clsx("group relative rounded-2xl md:rounded-3xl overflow-hidden bg-brand-secondary shadow-lg", item.span)}>
              <div className="absolute inset-0 bg-brand-primary/20 group-hover:bg-transparent transition-colors z-10 duration-500 mix-blend-overlay" />
              <img
                src={item.src}
                alt={`Gallery ${item.type}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-end p-6 md:p-8">
                <span className="text-white font-bold tracking-widest uppercase bg-brand-secondary shadow-lg shadow-brand-secondary/30 px-5 py-2 rounded-full w-fit text-xs backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {item.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
