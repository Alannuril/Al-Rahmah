import { createClient } from "@/lib/supabase/server";
import type { GaleriAlbum } from "@/lib/supabase/types";
import { Camera, Calendar } from "lucide-react";

const DUMMY_ALBUM: GaleriAlbum[] = [
  {
    id: "alb-1",
    judul: "Kunjungan Studi & Silaturahmi Asatidz Jawa-Banten",
    tanggal: "2026-02-10",
    created_at: new Date().toISOString(),
    foto: [
      {
        id: "f-1",
        album_id: "alb-1",
        foto_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
        keterangan: "Sesi diskusi dan ramah tamah",
        created_at: new Date().toISOString(),
      },
    ],
  },
  {
    id: "alb-2",
    judul: "Rihlah Ilmiah & Tadabbur Alam Santri Tahfidz",
    tanggal: "2026-01-18",
    created_at: new Date().toISOString(),
    foto: [
      {
        id: "f-2",
        album_id: "alb-2",
        foto_url: "https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=1200&auto=format&fit=crop",
        keterangan: "Tadabbur alam santri",
        created_at: new Date().toISOString(),
      },
    ],
  },
  {
    id: "alb-3",
    judul: "Wisuda Santri & Pelepasan Alumni Angkatan Ke-18",
    tanggal: "2025-12-22",
    created_at: new Date().toISOString(),
    foto: [
      {
        id: "f-3",
        album_id: "alb-3",
        foto_url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
        keterangan: "Prosesi wisuda santri",
        created_at: new Date().toISOString(),
      },
    ],
  },
  {
    id: "alb-4",
    judul: "Pekan Olahraga & Seni Antar Kelas (POSA)",
    tanggal: "2025-11-15",
    created_at: new Date().toISOString(),
    foto: [
      {
        id: "f-4",
        album_id: "alb-4",
        foto_url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop",
        keterangan: "Keseruan lomba olahraga",
        created_at: new Date().toISOString(),
      },
    ],
  },
];

async function getAlbum(): Promise<GaleriAlbum[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("galeri_album")
      .select("*, foto:galeri_foto(id, foto_url)")
      .order("created_at", { ascending: false });
    if (data && data.length > 0) return data;
    return DUMMY_ALBUM;
  } catch {
    return DUMMY_ALBUM;
  }
}

export async function DokumentasiSection() {
  const albums = await getAlbum();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-7xl mx-auto">
      {albums.map((album) => {
        const coverFoto = album.foto?.[0];
        return (
          <div
            key={album.id}
            className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-zinc-100 flex items-center justify-center">
                {coverFoto ? (
                  <img
                    src={coverFoto.foto_url}
                    alt={album.judul}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white/50">
                    <Camera size={36} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
              </div>

              <div className="p-4 sm:p-5">
                <h3 className="font-heading font-bold text-sm sm:text-base text-zinc-900 leading-snug group-hover:text-brand-primary transition-colors line-clamp-2">
                  {album.judul}
                </h3>
              </div>
            </div>

            {album.tanggal && (
              <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-2 border-t border-zinc-100 flex items-center gap-1.5 text-zinc-400 text-[11px] font-medium">
                <Calendar size={12} className="text-brand-primary" />
                <span>
                  {new Date(album.tanggal).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
