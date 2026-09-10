import { createClient } from "@/lib/supabase/server";
import type { Prestasi } from "@/lib/supabase/types";
import { Trophy, Calendar } from "lucide-react";

export const metadata = {
  title: "Kejuaraan - Al-Rahmah",
  description: "Prestasi dan kejuaraan santri Pondok Pesantren Al-Rahmah Walantaka.",
};

const KATEGORI_GRADIENT: Record<string, string> = {
  Akademik: "from-amber-400 to-orange-500",
  Keagamaan: "from-brand-primary to-emerald-700",
  Bahasa: "from-indigo-400 to-purple-500",
  Teknologi: "from-cyan-400 to-blue-500",
  Seni: "from-brand-secondary to-brand-lime",
};

async function getPrestasi(): Promise<Prestasi[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("prestasi").select("*").order("tanggal", { ascending: false });
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function KejuaraanPage() {
  const prestasiList = await getPrestasi();

  return (
    <div className="flex flex-col w-full min-h-screen pt-24 bg-gray-50">
      <section className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-brand-primary">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-primary/80 z-10" />
        <div className="relative z-20 text-center px-4">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">Prestasi &amp; Kejuaraan</h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">Daftar prestasi gemilang santri Pondok Pesantren Al-Rahmah</p>
        </div>
      </section>
      <section className="py-16 md:py-24 container mx-auto px-4 md:px-6 lg:px-8">
        {prestasiList.length === 0 ? (
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-12 text-center shadow-xl border border-gray-100">
            <Trophy size={40} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-400 text-sm italic">Data kejuaraan sedang diperbarui.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {prestasiList.map((p) => (
              <div key={p.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                <div className={"relative h-36 bg-gradient-to-br " + (KATEGORI_GRADIENT[p.kategori ?? ""] ?? "from-gray-200 to-gray-300") + " flex items-center justify-center"}>
                  {p.foto_url ? (
                    <img src={p.foto_url} alt={p.judul} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <Trophy size={40} className="text-white/30" />
                  )}
                </div>
                <div className="p-5">
                  {p.kategori && <span className="inline-flex px-2 py-0.5 rounded-md bg-brand-primary/5 text-brand-primary text-xs font-medium mb-2">{p.kategori}</span>}
                  <h3 className="font-bold text-gray-900 text-sm line-clamp-2 mb-2">{p.judul}</h3>
                  {p.tanggal && (
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-gray-400" />
                      <span className="text-xs text-gray-400">{new Date(p.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
