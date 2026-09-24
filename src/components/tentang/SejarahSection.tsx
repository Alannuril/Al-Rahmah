import Image from "next/image";
import { MapPin } from "lucide-react";

export function SejarahSection() {
  return (
    <section id="sejarah" aria-labelledby="sejarah-heading" className="scroll-mt-24 border-y border-brand-primary/15 bg-[#f3f2ee] py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <header className="grid gap-4 border-b border-brand-primary/20 pb-8 lg:grid-cols-12 lg:items-start lg:gap-16">
          <h2 id="sejarah-heading" className="font-heading text-2xl font-semibold leading-tight text-[#244f43] sm:text-[32px] lg:col-span-5">
            Sejarah Al-Rahmah
          </h2>
          <p className="max-w-xl text-base leading-7 text-zinc-600 lg:col-span-7">
            Berawal dari pengajian salafiyah di Link. Lebak, Walantaka,
            Al-Rahmah tumbuh bersama masyarakat di sekitarnya.
          </p>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-4">
            <div className="relative mx-auto aspect-[534/721] w-full max-w-72 border-b-[6px] border-brand-primary bg-[#d5e2d4]">
              <Image
                src="/images/rasyid-muslim.png"
                alt="K.H. Abdul Rasyid Muslim, pendiri Pondok Pesantren Al-Rahmah"
                fill
                sizes="288px"
                className="object-contain"
              />
            </div>
          </div>
          <div className="lg:col-span-8">
            <p className="text-sm font-semibold text-brand-primary">Pendiri Al-Rahmah</p>
            <h3 className="mt-2 font-heading text-2xl font-semibold leading-snug text-[#244f43]">
              K.H. Abdul Rasyid Muslim <span className="font-normal text-zinc-600">(Alm.)</span>
            </h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Dikenal sebagai K.H. Muslim atau Kyai Rasyid.
            </p>
            <div className="mt-6 max-w-2xl space-y-5 text-base leading-8 text-zinc-600">
              <p>
                Bersama istrinya, Umi Hj. Enung Nurhayati, S.Ag., beliau
                merintis Al-Rahmah melalui pengajian tradisional di Link. Lebak.
                Keduanya membimbing anak-anak membaca Al-Qur&apos;an,
                memahami tauhid, dan membiasakan adab dalam kehidupan sehari-hari.
              </p>
              <p>
                Pengajian ini kemudian berkembang menjadi lembaga pendidikan
                pesantren. Pada tahun 2008, Madrasah Aliyah Swasta Al-Rahmah
                diresmikan sebagai bagian dari perkembangannya.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-8 border-t border-brand-primary/20 pt-12 sm:mt-16 sm:pt-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-16">
          <figure>
            <div className="relative aspect-[1024/672] overflow-hidden rounded-sm bg-zinc-100">
              <Image
                src="/images/sejarah-titik-awal.jpg"
                alt="Anak-anak belajar bersama mengelilingi meja dan papan tulis di halaman terbuka"
                fill
                sizes="(max-width: 1023px) calc(100vw - 32px), (max-width: 1280px) 55vw, 672px"
                className="object-contain"
              />
            </div>
            <figcaption className="mt-3 border-l-2 border-brand-primary/40 pl-3 text-xs leading-5 text-zinc-600">
              Pengajian pada masa perintisan Al-Rahmah di Link. Lebak.
            </figcaption>
          </figure>
          <div>
            <h3 className="font-heading text-2xl font-semibold leading-snug text-[#244f43]">
              Berawal dari pengajian salafiyah
            </h3>
            <p className="mt-5 text-base leading-8 text-zinc-600">
              Pengajian ini hadir untuk memenuhi kebutuhan pendidikan agama
              bagi anak-anak usia sekolah di sekitar jalan Ciruas-Petir.
              Pembelajaran berlangsung dalam suasana kekeluargaan, dekat
              dengan kehidupan masyarakat setempat.
            </p>
            <p className="mt-5 text-base leading-8 text-zinc-600">
              Kepercayaan masyarakat mendorong para perintis memperluas
              kegiatan pendidikan, dari pengajian tradisional menuju
              pendidikan formal di lingkungan pesantren.
            </p>
            <p className="mt-5 flex items-start gap-2 text-sm leading-6 text-brand-primary">
              <MapPin size={16} aria-hidden="true" className="mt-1 shrink-0" />
              <span>Link. Lebak, Kelurahan Lebakwangi, Walantaka, Serang.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
