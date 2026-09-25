import Image from "next/image";
import { MapPin } from "lucide-react";

export function SejarahSection() {
  return (
    <section id="sejarah" aria-labelledby="sejarah-heading" className="scroll-mt-24 border-y border-zinc-200 bg-white py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-2xl">
          <h2 id="sejarah-heading" className="font-heading text-2xl font-bold leading-tight text-brand-primary sm:text-3xl lg:text-[32px]">
            Sejarah Al-Rahmah
          </h2>
          <p className="mt-2.5 text-sm leading-7 text-zinc-600 sm:text-base">
            Berawal dari pengajian salafiyah di Link. Lebak, Walantaka,
            Al-Rahmah tumbuh bersama masyarakat di sekitarnya.
          </p>
        </header>

        <div className="mt-8 grid gap-7 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-4">
            <div className="relative mx-auto aspect-[534/721] w-full max-w-72 overflow-hidden rounded-lg bg-brand-primary/10">
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
            <h3 className="mt-2 font-heading text-xl font-semibold leading-snug text-zinc-900 sm:text-2xl">
              K.H. Abdul Rasyid Muslim <span className="font-normal text-zinc-600">(Alm.)</span>
            </h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Dikenal sebagai K.H. Muslim atau Kyai Rasyid.
            </p>
            <div className="mt-5 max-w-2xl space-y-4 text-sm leading-7 text-zinc-600 sm:text-base">
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

        <div className="mt-10 grid gap-7 border-t border-zinc-200 pt-10 sm:mt-12 sm:pt-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-12">
          <div>
            <h3 className="font-heading text-xl font-semibold leading-snug text-zinc-900 sm:text-2xl">
              Berawal dari pengajian salafiyah
            </h3>
            <p className="mt-4 text-sm leading-7 text-zinc-600 sm:text-base">
              Pengajian ini hadir untuk memenuhi kebutuhan pendidikan agama
              bagi anak-anak usia sekolah di sekitar jalan Ciruas-Petir.
              Pembelajaran berlangsung dalam suasana kekeluargaan, dekat
              dengan kehidupan masyarakat setempat.
            </p>
            <p className="mt-4 text-sm leading-7 text-zinc-600 sm:text-base">
              Kepercayaan masyarakat mendorong para perintis memperluas
              kegiatan pendidikan, dari pengajian tradisional menuju
              pendidikan formal di lingkungan pesantren.
            </p>
            <p className="mt-5 flex items-start gap-2 text-sm leading-6 text-brand-primary">
              <MapPin size={16} aria-hidden="true" className="mt-1 shrink-0" />
              <span>Link. Lebak, Kelurahan Lebakwangi, Walantaka, Serang.</span>
            </p>
          </div>
          <figure>
            <div className="relative aspect-[1024/672] overflow-hidden rounded-lg bg-zinc-100">
              <Image
                src="/images/sejarah-titik-awal.jpg"
                alt="Anak-anak belajar bersama mengelilingi meja dan papan tulis di halaman terbuka"
                fill
                sizes="(max-width: 1023px) calc(100vw - 32px), (max-width: 1280px) 40vw, 487px"
                className="object-contain"
              />
            </div>
            <figcaption className="mt-2 text-xs leading-6 text-zinc-600">
              Pengajian pada masa perintisan Al-Rahmah di Link. Lebak.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
