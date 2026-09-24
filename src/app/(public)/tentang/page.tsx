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
    <div className="w-full min-w-0 bg-[#e3ece3] text-zinc-900">
      <TentangHashScroll />
      <header className="bg-[#244f43] pb-10 pt-28 text-white sm:pb-12 sm:pt-36">
        <div className="mx-auto grid max-w-[1280px] gap-5 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-8">
          <h1 className="font-heading text-3xl font-semibold leading-tight sm:text-[42px] lg:col-span-5">
            Tentang Al-Rahmah
          </h1>
          <p className="max-w-2xl text-base leading-8 text-white/80 lg:col-span-7 lg:border-l lg:border-brand-lime/40 lg:pl-8">
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
