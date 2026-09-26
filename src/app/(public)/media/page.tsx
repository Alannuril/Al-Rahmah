import { Suspense } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BeritaSection } from "@/components/media/BeritaSection";
import { DokumentasiSection } from "@/components/media/DokumentasiSection";

export const metadata = {
  title: "Media - Al-Rahmah",
  description: "Berita kegiatan santri, kejuaraan, informasi akademik, dan dokumentasi Pondok Pesantren Al-Rahmah Walantaka.",
};

export default function MediaPage() {
  return (
    <div className="min-h-screen bg-surface/40 pt-28 pb-20 sm:pt-32 sm:pb-24">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <header className="mb-6 sm:mb-8">
          <h1 id="berita-heading" className="font-heading text-2xl font-bold tracking-tight text-brand-primary sm:text-3xl lg:text-[32px]">
            Berita Al-Rahmah
          </h1>
          <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
            Kegiatan santri, kabar kejuaraan, dan informasi akademik Al-Rahmah.
          </p>
        </header>

        <section id="berita" aria-labelledby="berita-heading" className="scroll-mt-28">
          <Suspense
            fallback={
              <div role="status" className="flex min-h-48 items-center justify-center rounded-2xl bg-white/60 px-4 text-sm text-zinc-500">
                Memuat berita…
              </div>
            }
          >
            <BeritaSection limit={9} />
          </Suspense>
        </section>

        <section id="dokumentasi" aria-label="Galeri Dokumentasi" className="mt-12 scroll-mt-28 border-t border-zinc-300/70 pt-8 sm:mt-16 sm:pt-10">
          <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <SectionHeading
              title="Galeri Dokumentasi"
              subtitle="Kumpulan foto kegiatan dan momen bersama di Al-Rahmah."
            />
            <Link
              href="/media/dokumentasi"
              className="inline-flex min-h-11 shrink-0 items-center gap-1.5 self-start rounded-lg text-sm font-semibold text-brand-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary sm:self-auto"
            >
              Buka halaman dokumentasi
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <Suspense
            fallback={
              <div role="status" className="flex min-h-48 items-center justify-center rounded-2xl bg-white/60 px-4 text-sm text-zinc-500">
                Memuat dokumentasi…
              </div>
            }
          >
            <DokumentasiSection />
          </Suspense>
        </section>
      </div>
    </div>
  );
}
