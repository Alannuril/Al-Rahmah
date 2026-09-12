import { MapPin, Navigation, Clock, ExternalLink, Compass } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { createClient } from "@/lib/supabase/server";
import type { PengaturanWebsite } from "@/lib/supabase/types";

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/J1PeZhP9SzcFiC3M8";
const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.6912405338826!2d106.2131152!3d-6.172079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e421e377265e6c5%3A0xdc894d9c993a8e4f!2sPondok%20Pesantren%20Al%20Rahmah%20Walantaka!5e0!3m2!1sid!2sid!4v1710000000000!5m2!1sid!2sid";

async function getPengaturan(): Promise<PengaturanWebsite | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("pengaturan_website")
      .select("*")
      .limit(1)
      .maybeSingle();
    return data;
  } catch {
    return null;
  }
}

export async function LocationMapSection() {
  const setting = await getPengaturan();
  const alamat =
    setting?.alamat ||
    "Jl. Raya Walantaka No. 1, Kec. Walantaka, Kota Serang, Banten 42183";
  const noWa = setting?.no_whatsapp || "+62 812-3456-7890";
  const cleanWaNumber = noWa.replace(/[^0-9]/g, "");

  return (
    <section className="py-12 sm:py-16 bg-surface/40 relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Lokasi Pondok Pesantren"
          subtitle="Walantaka, Kota Serang – Akses mudah via Tol Walantaka / Serang Timur."
          centered
          className="mb-8 sm:mb-10"
        />

        {/* Minimalist Grid: Info & Map - Seamless & Borderless */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Info Card (Clean White Surface without borders) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col justify-between gap-6">
            <div className="space-y-4">
              {/* Alamat */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={16} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-zinc-900">
                    Pondok Pesantren Al-Rahmah
                  </h3>
                  <p className="text-xs text-zinc-600 mt-0.5 leading-relaxed">
                    {alamat}
                  </p>
                </div>
              </div>

              {/* Akses */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center shrink-0 mt-0.5">
                  <Navigation size={16} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-zinc-900">
                    Akses Transportasi
                  </h4>
                  <p className="text-xs text-zinc-600 mt-0.5 leading-relaxed">
                    Akses mudah via Exit Tol Walantaka. Jalur dapat dilalui kendaraan roda 2 maupun roda 4/bus.
                  </p>
                </div>
              </div>

              {/* Jam Layanan */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock size={16} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-zinc-900">
                    Layanan Kunjungan
                  </h4>
                  <p className="text-xs text-zinc-600 mt-0.5 leading-relaxed">
                    Senin – Ahad: 08.00 – 16.30 WIB
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons - No Border lines */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white font-medium text-xs shadow-xs transition-all"
              >
                <Compass size={15} />
                <span>Buka di Google Maps</span>
                <ExternalLink size={13} className="opacity-80" />
              </a>

              {cleanWaNumber && (
                <a
                  href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
                    "Halo Admin Al-Rahmah, saya ingin menanyakan rute menuju pondok pesantren."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2.5 rounded-xl bg-surface hover:bg-zinc-200/60 text-zinc-700 font-medium text-xs transition-all text-center"
                >
                  Tanya WA
                </a>
              )}
            </div>
          </div>

          {/* Interactive Map (Compact & Clean Borderless) */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-sm relative h-[280px] sm:h-[320px] lg:h-auto min-h-[280px] bg-zinc-100">
            <iframe
              src={GOOGLE_MAPS_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Lokasi Pondok Pesantren Al-Rahmah Walantaka"
              className="w-full h-full min-h-[280px]"
            />

            {/* Floating Tag without borders */}
            <div className="absolute top-3 left-3 z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-sm shadow-sm text-[11px] font-semibold text-zinc-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Al-Rahmah Walantaka</span>
              </div>
            </div>

            {/* Floating Open Button without borders */}
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-sm hover:bg-white shadow-sm text-[11px] font-semibold text-brand-primary transition-all"
            >
              <span>Perbesar</span>
              <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
