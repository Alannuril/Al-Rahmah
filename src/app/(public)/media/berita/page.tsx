import { createClient } from "@/lib/supabase/server";
import { Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Berita } from "@/lib/supabase/types";

export const metadata = {
  title: "Berita & Informasi - Al-Rahmah",
  description: "Berita terkini seputar Pondok Pesantren Al-Rahmah Walantaka.",
};

const DUMMY_BERITA: Berita[] = [
  {
    id: "dummy-1",
    judul: "Santri Al-Rahmah Raih Prestasi Gemilang pada Musabaqah Hifdzil Qur'an Tingkat Provinsi",
    slug: "santri-al-rahmah-raih-juara-mhq-provinsi",
    konten: null,
    excerpt: "Kafilah santri Pondok Pesantren Al-Rahmah berhasil menorehkan prestasi membanggakan dengan meraih juara cabang tahfidz Al-Qur'an tingkat provinsi.",
    kategori: "Prestasi",
    thumbnail_url: "https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=1200&auto=format&fit=crop",
    author: "Humas Al-Rahmah",
    status: "Terbit",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "dummy-2",
    judul: "Pembekalan Santri Akhir: Membangun Kemandirian dan Karakter Kepemimpinan Ummat",
    slug: "pembekalan-santri-akhir-kemandirian-kepemimpinan",
    konten: null,
    excerpt: "Menjelang kelulusan, santri akhir mengikuti program pembekalan intensif kepemimpinan dan pengabdian masyarakat guna persiapan masa depan.",
    kategori: "Kegiatan",
    thumbnail_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
    author: "Biro Pengasuhan",
    status: "Terbit",
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "dummy-3",
    judul: "Pondok Pesantren Al-Rahmah Membuka Pendaftaran Santri Baru (PSB) Tahun Ajaran 2026/2027",
    slug: "penerimaan-santri-baru-psb-2026-2027",
    konten: null,
    excerpt: "Pendaftaran santri baru untuk jenjang MTs dan MA resmi dibuka. Temukan informasi persyaratan, jadwal tes, dan alur pendaftaran terpadu.",
    kategori: "Pengumuman",
    thumbnail_url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
    author: "Panitia PSB",
    status: "Terbit",
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: "dummy-4",
    judul: "Pekan Bahasa Santri: Mengasah Kecakapan Berbahasa Arab & Inggris Berstandar Global",
    slug: "pekan-bahasa-santri-arab-inggris",
    konten: null,
    excerpt: "Meningkatkan kemampuan komunikasi bilingual santri melalui pekan bahasa intensif, pidato bahasa Arab & Inggris, serta simulasi debat internasional.",
    kategori: "Akademik",
    thumbnail_url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop",
    author: "Bagian Bahasa",
    status: "Terbit",
    created_at: new Date(Date.now() - 86400000 * 8).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 8).toISOString(),
  },
];

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

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BeritaPage() {
  const beritaList = await getBerita();

  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-24 min-h-screen bg-surface/40">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Berita & Informasi"
          subtitle="Informasi dan kabar terbaru seputar civitas akademika Pondok Pesantren Al-Rahmah Walantaka."
          centered
        />

        {/* Content Grid */}
        <div className="mt-10 sm:mt-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-7xl mx-auto">
          {beritaList.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden bg-zinc-100">
                {item.thumbnail_url ? (
                  <img
                    src={item.thumbnail_url}
                    alt={item.judul}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-brand-primary to-brand-secondary" />
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
