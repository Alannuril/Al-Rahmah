import { ArrowUpRight } from "lucide-react";
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
    <section aria-label="Lokasi Pondok Pesantren" className="bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Lokasi Pondok Pesantren"
          subtitle="Walantaka, Kota Serang, Banten."
          className="mb-6 sm:mb-8"
        />

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-10">
          <div className="h-60 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 sm:h-72 lg:h-80">
            <iframe
              src={GOOGLE_MAPS_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Lokasi Pondok Pesantren Al-Rahmah Walantaka"
              className="h-full w-full"
            />
          </div>

          <div className="min-w-0 lg:py-1">
            <h3 className="text-base font-semibold leading-6 text-zinc-900">
              Pondok Pesantren Al-Rahmah
            </h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600 break-words">
              {alamat}
            </p>

            <dl className="mt-5 space-y-4 border-t border-zinc-200 pt-5">
              <div>
                <dt className="text-xs font-medium text-zinc-500">Akses transportasi</dt>
                <dd className="mt-1 text-sm leading-6 text-zinc-700">
                  Via Exit Tol Walantaka. Dapat dilalui motor, mobil, dan bus.
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-zinc-500">Jam kunjungan</dt>
                <dd className="mt-1 text-sm leading-6 text-zinc-700">
                  Senin – Ahad, 08.00 – 16.30 WIB
                </dd>
              </div>
            </dl>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2A5C4E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
              >
                Petunjuk arah
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>

              {cleanWaNumber && (
                <a
                  href={"https://wa.me/" + cleanWaNumber + "?text=" + encodeURIComponent(
                    "Halo Admin Al-Rahmah, saya ingin menanyakan rute menuju pondok pesantren."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center rounded-sm text-sm font-medium text-brand-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
                >
                  Tanya via WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
