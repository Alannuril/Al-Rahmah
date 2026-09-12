import { createClient } from "@/lib/supabase/server";
import type { Prestasi } from "@/lib/supabase/types";
import { Trophy, Calendar } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = {
  title: "Prestasi & Kejuaraan - Al-Rahmah",
  description: "Prestasi dan kejuaraan santri Pondok Pesantren Al-Rahmah Walantaka.",
};

const KATEGORI_GRADIENT: Record<string, string> = {
  Akademik: "from-amber-500/20 to-orange-500/20 text-amber-700",
  Keagamaan: "from-brand-primary/20 to-emerald-700/20 text-brand-primary",
  Bahasa: "from-indigo-500/20 to-purple-500/20 text-indigo-700",
  Teknologi: "from-cyan-500/20 to-blue-500/20 text-cyan-700",
  Seni: "from-brand-secondary/20 to-brand-lime/20 text-brand-secondary",
};

const DUMMY_PRESTASI: Prestasi[] = [
  {
    id: "dummy-1",
    judul: "Juara 1 Musabaqah Hifdzil Qur'an (MHQ) 10 Juz Tingkat Provinsi Banten",
    kategori: "Keagamaan",
    deskripsi: "Diraih oleh santri Al-Rahmah dalam ajang Musabaqah Tilawatil dan Hifdzil Qur'an se-Banten.",
    tanggal: "2026-02-15",
    foto_url: "https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=1200&auto=format&fit=crop",
    created_at: new Date().toISOString(),
  },
  {
    id: "dummy-2",
    judul: "Juara Umum POSPEDA Tingkat Kota Serang Cabang Pidato & Seni Islami",
    kategori: "Seni",
    deskripsi: "Kontingen santri Al-Rahmah berhasil menyabet medali emas dalam Pekan Olahraga & Seni Antar Pondok Pesantren.",
    tanggal: "2026-01-20",
    foto_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
    created_at: new Date().toISOString(),
  },
  {
    id: "dummy-3",
    judul: "Juara 1 Pidato Bahasa Arab (Khitobah) Antar Pesantren Se-Jawa & Banten",
    kategori: "Bahasa",
    deskripsi: "Menunjukkan kefasihan retorika dan tata bahasa Arab berstandar modern di hadapan dewan juri.",
    tanggal: "2025-11-10",
    foto_url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop",
    created_at: new Date().toISOString(),
  },
  {
    id: "dummy-4",
    judul: "Medali Perak Kompetisi Sains Madrasah (KSM) Bidang Matematika Terintegrasi",
    kategori: "Akademik",
    deskripsi: "Keberhasilan santri jenjang Madrasah Aliyah Al-Rahmah dalam integrasi ilmu sains dan wawasan keislaman.",
    tanggal: "2025-10-05",
    foto_url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
    created_at: new Date().toISOString(),
  },
];

async function getPrestasi(): Promise<Prestasi[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("prestasi").select("*").order("tanggal", { ascending: false });
    if (data && data.length > 0) return data;
    return DUMMY_PRESTASI;
  } catch {
    return DUMMY_PRESTASI;
  }
}

export default async function KejuaraanPage() {
  const prestasiList = await getPrestasi();

  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-24 min-h-screen bg-surface/40">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Prestasi & Kejuaraan"
          subtitle="Rekam jejak torehan prestasi gemilang santri Pondok Pesantren Al-Rahmah di berbagai bidang ilmu."
          centered
        />

        {/* Content Grid */}
        <div className="mt-10 sm:mt-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-7xl mx-auto">
          {prestasiList.map((p) => (
            <div
              key={p.id}
              className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 bg-zinc-100 flex items-center justify-center overflow-hidden">
                  {p.foto_url ? (
                    <img
                      src={p.foto_url}
                      alt={p.judul}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 flex items-center justify-center text-brand-primary">
                      <Trophy size={40} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  {p.kategori && (
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-lg bg-white/95 backdrop-blur-sm text-brand-primary text-[10px] font-bold shadow-xs">
                      {p.kategori}
                    </span>
                  )}
                </div>

                <div className="p-4 sm:p-5">
                  <h3 className="font-heading font-bold text-zinc-900 text-sm sm:text-base line-clamp-2 mb-2 leading-snug group-hover:text-brand-primary transition-colors">
                    {p.judul}
                  </h3>
                  {p.deskripsi && (
                    <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2 mb-3">
                      {p.deskripsi}
                    </p>
                  )}
                </div>
              </div>

              {p.tanggal && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-2 border-t border-zinc-100 flex items-center gap-1.5 text-zinc-400 text-[11px] font-medium">
                  <Calendar size={12} className="text-brand-primary" />
                  <span>
                    {new Date(p.tanggal).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              )}
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
