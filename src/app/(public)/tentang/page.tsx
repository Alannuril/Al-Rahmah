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
      <header className="bg-[#f4f6f3] pb-10 pt-28 sm:pb-12 sm:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl font-semibold leading-tight text-brand-primary sm:text-4xl">
            Tentang Al-Rahmah
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-600 sm:text-base">
            Berdiri di atas dan untuk semua golongan, berpedoman pada
            Al-Qur&apos;an dan Hadits, bertekad menjadi perekat umat.
          </p>
        </div>
      </header>

      <VisiMisiSection />
      <SejarahSection />
      <NakhodaClient />
    </div>
  );
}
