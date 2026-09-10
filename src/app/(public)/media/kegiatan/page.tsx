import { createClient } from "@/lib/supabase/server";
import { CalendarDays, Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Berita } from "@/lib/supabase/types";

export const metadata = {
  title: "Kegiatan Santri - Al-Rahmah",
  description: "Agenda dan kegiatan harian santri Pondok Pesantren Al-Rahmah Walantaka.",
};

async function getKegiatan(): Promise<Berita[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("berita")
      .select("*")
      .eq("status", "Terbit")
      .eq("kategori", "Kegiatan")
      .order("created_at", { ascending: false });
    return data ?? [];
  } catch {
    return [];
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
    <div className="flex flex-col w-full min-h-screen pt-24 bg-gray-50">
      {/* Banner */}
      <section className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-brand-primary">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-primary/80 z-10" />
        <div className="relative z-20 text-center px-4">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
            Kegiatan Santri
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Berbagai aktivitas, agenda, dan momen kebersamaan santri di Pondok Pesantren Al-Rahmah
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 container mx-auto px-4 md:px-6 lg:px-8">
        {kegiatanList.length === 0 ? (
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-12 text-center shadow-xl border border-gray-100">
            <div className="w-16 h-16 rounded-2xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary mx-auto mb-4">
              <CalendarDays size={32} />
            </div>
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">Agenda Kegiatan</h2>
            <p className="text-gray-400 text-sm italic">
              Belum ada artikel kegiatan yang dipublikasikan saat ini.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {kegiatanList.map((item) => (
              <article
                key={item.id}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-brand-primary/20 hover:shadow-xl hover:shadow-brand-primary/5 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  {item.thumbnail_url ? (
                    <img
                      src={item.thumbnail_url}
                      alt={item.judul}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-brand-secondary to-brand-lime" />
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-brand-primary text-xs font-bold rounded-full shadow-sm">
                      {item.kategori}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col grow">
                  <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-3">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-brand-secondary" />
                      <span>{formatDate(item.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User size={13} className="text-brand-secondary" />
                      <span>{item.author}</span>
                    </div>
                  </div>

                  <h2 className="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-brand-primary transition-colors line-clamp-2">
                    {item.judul}
                  </h2>

                  {item.excerpt && (
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {item.excerpt}
                    </p>
                  )}

                  <div className="mt-auto">
                    <Link
                      href={"/media/berita/" + item.slug}
                      className="inline-flex items-center gap-1.5 text-brand-primary font-semibold text-sm group/btn"
                    >
                      Baca Selengkapnya{" "}
                      <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
