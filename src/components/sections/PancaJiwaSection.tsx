import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface PancaJiwaItem {
  nomor: string;
  judul: string;
  arab: string;
  deskripsi: string;
}

const PANCA_JIWA_LIST: PancaJiwaItem[] = [
  {
    nomor: "01",
    judul: "Keikhlasan",
    arab: "الإخلاص",
    deskripsi:
      "Beramal, mengabdi, dan menuntut ilmu semata-mata mengharap ridha Allah SWT tanpa pamrih atau keuntungan duniawi semu.",
  },
  {
    nomor: "02",
    judul: "Kesederhanaan",
    arab: "البساطة",
    deskripsi:
      "Membiasakan pola hidup bersahaja, wajar, dan tabah, namun berjiwa besar, berbudi pekerti luhur, serta pantang berputus asa.",
  },
  {
    nomor: "03",
    judul: "Kemandirian",
    arab: "الاعتماد على النفس",
    deskripsi:
      "Sanggup berdikari, bertanggung jawab atas diri sendiri, serta memiliki ketangguhan mental dalam memikul amanah hidup.",
  },
  {
    nomor: "04",
    judul: "Ukhuwah Islamiyah",
    arab: "الأخوة الإسلامية",
    deskripsi:
      "Menjalin persaudaraan sejati atas dasar iman, merajut harmoni dan kebersamaan erat di atas semua golongan.",
  },
];

export function PancaJiwaSection({
  showMobileDescriptions = false,
}: {
  showMobileDescriptions?: boolean;
}) {
  return (
    <section id="panca-jiwa" aria-labelledby="panca-jiwa-heading" className="relative overflow-hidden scroll-mt-24 bg-[#1c483a] py-8 text-white sm:py-16 md:py-20 lg:py-28 xl:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/images/panca-jiwa-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1c483a]/92 via-[#265e4b]/78 to-[#184033]/92" />
        <div
          className="absolute inset-x-0 top-0 h-24 sm:h-48"
          style={{
            background: "linear-gradient(to bottom, #1c483a 0%, rgba(28, 72, 58, 0.8) 40%, transparent 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>
      <div className="relative z-10 mx-auto grid max-w-7xl gap-5 px-4 sm:gap-8 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        <header className="lg:col-span-4">
          <h2 id="panca-jiwa-heading" className="font-heading text-xl font-bold leading-tight sm:text-3xl lg:text-[32px]">
            Panca Jiwa Al-Rahmah
          </h2>
          <p className="mt-2 max-w-lg text-[13px] leading-6 text-white/85 sm:mt-2.5 sm:text-base sm:leading-7">
            Nilai-nilai yang mendasari pembentukan karakter santri dan keteladanan pendidik.
          </p>
        </header>
        {!showMobileDescriptions && (
          <div className="sm:hidden">
            <ol className="divide-y divide-white/20 border-y border-white/20">
              {PANCA_JIWA_LIST.map((pilar) => (
                <li key={pilar.nomor} className="min-w-0 py-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                    <h3 className="inline-flex items-baseline gap-3 font-heading text-sm font-semibold leading-5">
                      <span aria-hidden="true" className="font-mono text-xs font-normal text-brand-lime">
                        {pilar.nomor}
                      </span>
                      {pilar.judul}
                    </h3>
                    <span lang="ar" dir="rtl" className="font-serif text-base leading-5 text-brand-lime">
                      {pilar.arab}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
            <Link
              href="/tentang#panca-jiwa"
              className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-sm py-2 text-[13px] font-medium text-brand-lime underline decoration-brand-lime/50 underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-lime"
            >
              Selengkapnya tentang Panca Jiwa
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        )}
        <ol className={"gap-8 sm:grid sm:grid-cols-2 lg:col-span-8 " + (showMobileDescriptions ? "grid" : "hidden")}>
          {PANCA_JIWA_LIST.map((pilar) => (
            <li key={pilar.nomor} className="min-w-0 border-t border-white/25 pt-5">
              <div className="flex flex-wrap items-start justify-between gap-3 text-brand-lime">
                <span aria-hidden="true" className="font-mono text-sm leading-7">{pilar.nomor}</span>
                <span lang="ar" dir="rtl" className="font-serif text-xl leading-7">{pilar.arab}</span>
              </div>
              <h3 className="mt-3 font-heading text-lg font-semibold leading-snug">
                {pilar.judul}
              </h3>
              <p className="mt-2 text-sm leading-7 text-white/85">
                {pilar.deskripsi}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
