import { VisiMisiSection } from "@/components/tentang/VisiMisiSection";
import { SejarahSection } from "@/components/tentang/SejarahSection";
import { TentangHashScroll } from "@/components/tentang/TentangHashScroll";
import { NakhodaClient } from "@/components/pimpinan/NakhodaClient";

export const metadata = {
  title: "Tentang Al-Rahmah",
  description:
    "Visi, misi, sejarah, serta profil pimpinan Pondok Pesantren Al-Rahmah Walantaka Serang.",
};

export default function TentangPage() {
  return (
    <div className="w-full min-w-0 bg-white text-zinc-900">
      <TentangHashScroll />
      <header className="mx-auto max-w-6xl px-4 pb-10 pt-28 sm:px-6 sm:pb-12 sm:pt-32 lg:px-8">
        <h1 className="font-heading text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Tentang Al-Rahmah
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
          Berdiri di atas dan untuk semua golongan, berpedoman pada
          Al-Qur&apos;an dan Hadits, bertekad menjadi perekat umat.
        </p>
      </header>

      <VisiMisiSection />
      <SejarahSection />
      <NakhodaClient />
    </div>
  );
}
