import { createClient } from "@/lib/supabase/server";
import { Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Berita } from "@/lib/supabase/types";

export const metadata = {
  title: "Kegiatan Santri - Al-Rahmah",
  description: "Agenda dan kegiatan harian santri Pondok Pesantren Al-Rahmah Walantaka.",
};

const DUMMY_KEGIATAN: Berita[] = [
  {
    id: "keg-1",
    judul: "Khotmul Qur'an dan Imtihan Tahfidz: Pengukuhan Hafalan 30 Juz Santri",
    slug: "khotmul-quran-dan-imtihan-tahfidz-30-juz",
    konten: null,
    excerpt: "Suasana khidmat menyelimuti wisuda tahfidz di mana puluhan santri memperdengarkan hafalan Al-Qur'an secara mutqin di hadapan asatidz dan orang tua.",
    kategori: "Kegiatan",
    thumbnail_url: "https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=1200&auto=format&fit=crop",
    author: "Biro Pengasuhan",
    status: "Terbit",
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: "keg-2",
    judul: "Perkemahan Santri Akhir Pekan: Mengasah Kemandirian, Disiplin, dan Solidaritas",
    slug: "perkemahan-santri-akhir-pekan-kemandirian",
    konten: null,
    excerpt: "Kegiatan luar ruangan kepramukaan dan kepanduan Islam yang melatih ketangkasan fisik, kepemimpinan regu, serta kecintaan terhadap alam.",
    kategori: "Kegiatan",
    thumbnail_url: "https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=1200&auto=format&fit=crop",
    author: "Kesiswaan",
    status: "Terbit",
    created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
  {
    id: "keg-3",
    judul: "Lomba Pidato 3 Bahasa: Panggung Ekspresi Intelektual Santri Al-Rahmah",
    slug: "lomba-pidato-3-bahasa-santri",
    konten: null,
    excerpt: "Ajang tahunan adu ketangkasan retorika dalam bahasa Arab, Inggris, dan Indonesia untuk melatih mental public speaking santri.",
    kategori: "Kegiatan",
    thumbnail_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
    author: "Bagian Bahasa",
    status: "Terbit",
    created_at: new Date(Date.now() - 86400000 * 12).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 12).toISOString(),
  },
];

async function getKegiatan(): Promise<Berita[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("berita")
      .select("*")
      .eq("status", "Terbit")
      .eq("kategori", "Kegiatan")
      .order("created_at", { ascending: false });

    if (data && data.length > 0) return data;
    return DUMMY_KEGIATAN;
  } catch {
    return DUMMY_KEGIATAN;
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function KegiatanPage() {
  const kegiatanList = await getKegiatan();

  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-24 min-h-screen bg-surface/40">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Kegiatan Santri"
          subtitle="Aktivitas harian, program pembinaan karakter, dan dinamika kebersamaan santri di asrama Al-Rahmah."
          centered
        />

        {/* Content Grid */}
        <div className="mt-10 sm:mt-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-7xl mx-auto">
          {kegiatanList.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden bg-zinc-100">
                {item.thumbnail_url ? (
                  <img
                    src={item.thumbnail_url}
                    alt={item.judul}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-brand-secondary to-brand-lime" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 bg-white/95 backdrop-blur-sm text-brand-primary text-[10px] font-bold rounded-lg shadow-xs">
                    {item.kategori}
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col grow">
                <div className="flex items-center gap-3 text-[11px] font-medium text-zinc-400 mb-2.5">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} className="text-brand-primary" />
                    <span>{formatDate(item.created_at)}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <User size={12} className="text-brand-primary" />
                    <span className="truncate max-w-[100px]">{item.author}</span>
                  </div>
                </div>

                <h2 className="font-heading text-base font-bold text-zinc-900 mb-2 leading-snug group-hover:text-brand-primary transition-colors line-clamp-2">
                  <Link href={"/media/berita/" + item.slug} className="focus:outline-none">
                    {item.judul}
                  </Link>
                </h2>

                {item.excerpt && (
                  <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>
                )}

                <div className="mt-auto pt-3 border-t border-zinc-100 flex items-center justify-between text-brand-primary font-semibold text-xs group/btn">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </article>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
