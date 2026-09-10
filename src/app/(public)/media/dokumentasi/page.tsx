import { createClient } from "@/lib/supabase/server";
import type { GaleriAlbum } from "@/lib/supabase/types";
import { Camera } from "lucide-react";

export const metadata = {
  title: "Dokumentasi - Al-Rahmah",
  description: "Galeri dan dokumentasi Pondok Pesantren Al-Rahmah Walantaka.",
};

async function getAlbum(): Promise<GaleriAlbum[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("galeri_album")
      .select("*, foto:galeri_foto(id, foto_url)")
      .order("created_at", { ascending: false });
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function DokumentasiPage() {
  const albums = await getAlbum();

  return (
    <div className="flex flex-col w-full min-h-screen pt-24 bg-gray-50">
      <section className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-brand-primary">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-primary/80 z-10" />
        <div className="relative z-20 text-center px-4">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">Galeri Dokumentasi</h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">Momen-momen berharga di Pondok Pesantren Al-Rahmah</p>
        </div>
      </section>
      <section className="py-16 md:py-24 container mx-auto px-4 md:px-6 lg:px-8">
        {albums.length === 0 ? (
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-12 text-center shadow-xl border border-gray-100">
            <Camera size={40} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-400 text-sm italic">Galeri foto sedang dalam proses unggah.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {albums.map((album) => {
              const coverFoto = album.foto?.[0];
              return (
                <div key={album.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                  <div className="relative h-52 overflow-hidden">
                    {coverFoto ? (
                      <img src={coverFoto.foto_url} alt={album.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
                        <Camera size={40} className="text-white/30" />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 mb-1">{album.judul}</h3>
                    {album.tanggal && <p className="text-xs text-gray-400">{new Date(album.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
