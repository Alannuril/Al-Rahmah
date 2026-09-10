import { createClient } from "@/lib/supabase/server";
import { Megaphone, Calendar, ArrowRight } from "lucide-react";
import type { Pengumuman } from "@/lib/supabase/types";

async function getActivePinnedPengumuman(): Promise<Pengumuman | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("pengumuman")
      .select("*")
      .eq("status", "Aktif")
      .eq("is_pinned", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    return data;
  } catch {
    return null;
  }
}

export async function AnnouncementBanner() {
  const item = await getActivePinnedPengumuman();

  if (!item) return null;

  return (
    <aside aria-label="Pengumuman Penting" className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-md relative z-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="p-1.5 bg-white/20 rounded-lg shrink-0 backdrop-blur-xs">
              <Megaphone size={16} className="text-white animate-pulse" />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 bg-white text-amber-700 text-[10px] font-extrabold uppercase tracking-wider rounded-md">
                Pengumuman
              </span>
              <p className="text-sm font-semibold text-white drop-shadow-xs">
                {item.judul}
              </p>
              {item.konten && (
                <span className="hidden md:inline text-xs text-white/85 font-normal">
                  — {item.konten}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-xs text-white/80">
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span>{new Date(item.created_at).toLocaleDateString("id-ID")}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
