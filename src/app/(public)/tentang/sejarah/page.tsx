import Image from "next/image";
import {
  MapPin,
  Calendar,
  Quote,
  HeartHandshake,
} from "lucide-react";

export const metadata = {
  title: "Sejarah Al-Rahmah - Al-Rahmah",
  description:
    "Menelusuri jejak perjuangan K.H. Abdul Rasyid Muslim dan Umi Hj. Enung Nurhayati dalam merintis Pondok Pesantren Al-Rahmah Walantaka dari pengajian salafiyah hingga madrasah unggulan berakreditasi A.",
};

const TIMELINE_EVENTS = [
  {
    fase: "Fase Awal",
    tahun: "Awal Pengabdian",
    judul: "Pengajian Tradisional di Link. Lebak",
    lokasi: "Link. Lebak, Kel. Lebakwangi, Walantaka",
    deskripsi:
      "Bermula dari kepedulian mendalam terhadap pendidikan moral generasi muda, K.H. Abdul Rasyid Muslim (Alm.) bersama Umi Hj. Enung Nurhayati menginisiasi pengajian tradisional (salafiyah) di lingkungan kampung. Majelis ini hadir sebagai oase bekal agama bagi anak-anak usia sekolah di sekitar koridor jalan Ciruas-Petir.",
    tag: "Akar Salafiyah",
  },
  {
    fase: "Transformasi 2008",
    tahun: "Tahun 2008",
    judul: "Formalisasi & Pendirian MAS Al-Rahmah",
    lokasi: "Kampus Al-Rahmah Walantaka",
    deskripsi:
      "Menyadari pentingnya ijazah formal dan integrasi kurikulum bagi masa depan santri di era modern, K.H. Abdul Rasyid Muslim meresmikan Madrasah Aliyah Swasta (MAS) Al-Rahmah. Langkah strategis ini menjadi tonggak transformasi Al-Rahmah dari pengajian berbasis kampung menuju institusi pendidikan Islam terpadu.",
    tag: "Formalisasi Pendidikan",
  },
  {
    fase: "Ekspansi Sarana",
    tahun: "Pengembangan Berkelanjutan",
    judul: "Pembangunan Gedung & Asrama Permanen",
    lokasi: "Kawasan Pesantren",
    deskripsi:
      "Guna menampung antusiasme dan lonjakan calon santri dari dalam maupun luar Kota Serang, pesantren membangun gedung kelas bertingkat dan asrama putra-putri terpisah secara bertahap. Kapasitas pendidikan melesat hingga mengelola 22 rombongan belajar (rombel) yang didukung oleh sekitar 30 tenaga pendidik berdedikasi.",
    tag: "22 Rombel & 30 Guru",
  },
  {
    fase: "Estafet & Mutu",
    tahun: "Masa Kini",
    judul: "Estafet Kepemimpinan & Akreditasi A",
    lokasi: "Walantaka, Serang, Banten",
    deskripsi:
      "Pasca wafatnya sang perintis, K.H. Abdul Rasyid Muslim (Alm.), amanah pengelolaan dilanjutkan secara teguh oleh keluarga dan jajaran asatidz senior di bawah kepengasuhan Umi Hj. Enung Nurhayati. Dedikasi tersebut mengantarkan madrasah meraih predikat Akreditasi A, menjadikannya tujuan pendidikan Islam swasta unggulan di Kecamatan Walantaka.",
    tag: "Akreditasi A Unggul",
  },
];

export default function SejarahPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-28 min-h-screen bg-surface/40">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">

        {/* ============================================================ */}
        {/* 1. HEADER HALAMAN: CLEAN & MINIMALIS (TANPA BADGE)           */}
        {/* ============================================================ */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 tracking-tight">
            Sejarah Al-Rahmah
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed">
            Menelusuri jejak perjuangan, keikhlasan, dan estafet pengabdian dalam merintis
            Pondok Pesantren Al-Rahmah Walantaka dari pengajian salafiyah kampung hingga
            menjadi madrasah unggulan berakreditasi A.
          </p>
        </div>

        {/* ============================================================ */}
        {/* 2. SECTION: TOKOH PENDIRI UTAMA                              */}
        {/* ============================================================ */}
        <section className="mb-14 sm:mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-1.5">
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-zinc-900 tracking-tight">
              Tokoh Pendiri Utama
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500">
              Sosok perintis di balik peletakan batu pertama dan nilai-nilai dasar kepondokmodernan Al-Rahmah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {/* Tokoh 1: K.H. Abdul Rasyid Muslim (Alm.) */}
            <div className="bg-white rounded-3xl overflow-hidden border border-zinc-200/80 shadow-xs flex flex-col justify-between group hover:border-emerald-300/80 transition-all duration-300">
              <div>
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-zinc-100">
                  <Image
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop"
                    alt="Foto dummy K.H. Abdul Rasyid Muslim (Alm.)"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="text-[11px] font-semibold bg-white/90 backdrop-blur-md text-brand-primary px-3 py-1 rounded-full shadow-xs border border-white/60">
                      Inisiator &amp; Pendiri Utama
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 z-10">
                    <span className="text-[10px] text-white/90 bg-zinc-950/60 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/20">
                      Foto Ilustratif Tokoh
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-7 space-y-2.5">
                  <div>
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-zinc-900 tracking-tight">
                      K.H. Abdul Rasyid Muslim (Alm.)
                    </h3>
                    <p className="text-xs font-semibold text-brand-primary mt-0.5">
                      Dikenal sebagai K.H. Muslim / Kyai Rasyid
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    Sosok ulama perintis sekaligus inisiator utama berdirinya Pondok Pesantren Al-Rahmah.
                    Beliau memelopori pengajian tradisional berbasis kampung hingga mengawal langkah
                    transformasi formal dengan mendirikan Madrasah Aliyah Swasta (MAS) Al-Rahmah pada tahun 2008.
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100/80 flex items-start gap-2.5">
                  <Quote size={15} className="text-brand-primary shrink-0 mt-0.5 opacity-90" />
                  <p className="font-heading italic text-xs text-zinc-700 leading-relaxed">
                    &ldquo;Mendidik dengan keikhlasan lillahi ta&apos;ala adalah kunci keberkahan bagi masa depan santri.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Tokoh 2: Umi Hj. Enung Nurhayati, S.Ag. */}
            <div className="bg-white rounded-3xl overflow-hidden border border-zinc-200/80 shadow-xs flex flex-col justify-between group hover:border-emerald-300/80 transition-all duration-300">
              <div>
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-zinc-100">
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                    alt="Foto dummy Umi Hj. Enung Nurhayati, S.Ag."
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="text-[11px] font-semibold bg-white/90 backdrop-blur-md text-brand-primary px-3 py-1 rounded-full shadow-xs border border-white/60">
                      Pendiri &amp; Pengasuh Yayasan
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 z-10">
                    <span className="text-[10px] text-white/90 bg-zinc-950/60 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/20">
                      Foto Ilustratif Tokoh
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-7 space-y-2.5">
                  <div>
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-zinc-900 tracking-tight">
                      Umi Hj. Enung Nurhayati, S.Ag.
                    </h3>
                    <p className="text-xs font-semibold text-brand-primary mt-0.5">
                      Pengasuh &amp; Penjaga Khitah Yayasan
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    Istri tercinta sekaligus rekan seperjuangan K.H. Abdul Rasyid Muslim yang turut
                    meletakkan batu pertama pembangunan pesantren. Beliau mendedikasikan hidupnya
                    dalam bimbingan spiritual, keputrian, serta melanjutkan kepemimpinan yayasan.
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100/80 flex items-start gap-2.5">
                  <Quote size={15} className="text-brand-primary shrink-0 mt-0.5 opacity-90" />
                  <p className="font-heading italic text-xs text-zinc-700 leading-relaxed">
                    &ldquo;Anak-anak... jadi santri itu harus sabar, ikhlas, dan senantiasa bertawakal.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. SECTION: TITIK AWAL SEJARAH (BASIS KOMUNITAS)             */}
        {/* ============================================================ */}
        <section className="mb-14 sm:mb-20">
          <div className="bg-white rounded-3xl overflow-hidden border border-zinc-200/80 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Visual Suasana Pesantren / Ilustrasi Sejarah */}
              <div className="lg:col-span-5 relative min-h-[260px] sm:min-h-[340px] lg:min-h-full bg-zinc-100">
                <Image
                  src="https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=1200&auto=format&fit=crop"
                  alt="Ilustrasi lingkungan pondok pesantren Al-Rahmah"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/75 via-transparent to-transparent flex flex-col justify-end p-5">
                  <span className="text-[10px] font-semibold text-white/90 bg-zinc-900/60 backdrop-blur-xs px-2.5 py-1 rounded-full w-fit border border-white/20">
                    Dokumentasi Ilustratif Sejarah
                  </span>
                </div>
              </div>

              {/* Narasi Titik Awal Sejarah */}
              <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-brand-primary">
                    <MapPin size={14} />
                    <span>Link. Lebak, Kel. Lebakwangi, Walantaka, Serang</span>
                  </div>

                  <h2 className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl text-zinc-900 tracking-tight leading-snug">
                    Titik Awal &amp; Basis Komunitas
                  </h2>

                  <div className="space-y-3.5 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    <p>
                      Jauh sebelum berkembang menjadi kampus pendidikan modern terpadu seperti saat ini,
                      aktivitas dakwah dan pendidikan Al-Rahmah berakar kuat di tengah-tengah masyarakat
                      kampus kampung, tepatnya di Link. Lebak, Kelurahan Lebakwangi, Walantaka.
                    </p>
                    <p>
                      Pola pembelajarannya bermula dari pengajian tradisional (<em>salafiyah</em>) yang
                      didirikan guna menjawab kebutuhan bekal agama bagi anak-anak usia sekolah di sekitar
                      koridor jalan Ciruas-Petir. Dengan penuh ketelatenan, anak-anak dibimbing membaca
                      Al-Qur&apos;an, memahami tata cara ibadah dasar, serta dibina akhlaknya dalam suasana
                      kekeluargaan yang hangat.
                    </p>
                    <p>
                      Dukungan dan kepercayaan masyarakat sekitar yang begitu besar menjadi bahan bakar
                      semangat bagi perintis untuk terus mengembangkan sarana dan mutu kelembagaan hingga
                      melangkah ke jenjang pendidikan formal.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 flex flex-wrap gap-2 text-xs font-medium text-zinc-600">
                  <span className="px-3 py-1 rounded-lg bg-zinc-50 border border-zinc-200/70">
                    Akar Salafiyah Kampung
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-zinc-50 border border-zinc-200/70">
                    Koridor Ciruas-Petir
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-zinc-50 border border-zinc-200/70">
                    Berbasis Masyarakat
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. SECTION: TONGGAK SEJARAH & TRANSFORMASI (TIMELINE)         */}
        {/* ============================================================ */}
        <section className="mb-14 sm:mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-1.5">
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-zinc-900 tracking-tight">
              Tonggak Sejarah &amp; Transformasi
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500">
              Empat fase penting perjalanan Al-Rahmah dari masa ke masa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {TIMELINE_EVENTS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/80 shadow-xs hover:border-emerald-300/80 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-brand-primary border border-emerald-200/60 font-mono text-xs font-semibold">
                      <Calendar size={12} />
                      <span>{item.tahun}</span>
                    </span>
                    <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                      {item.fase}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-zinc-900 tracking-tight group-hover:text-brand-primary transition-colors">
                    {item.judul}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    {item.deskripsi}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                    <MapPin size={12} />
                    <span className="truncate max-w-[200px]">{item.lokasi}</span>
                  </div>
                  <span className="font-semibold text-brand-primary text-[11px] bg-zinc-50 px-2.5 py-1 rounded-lg border border-zinc-200/60">
                    {item.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 5. CARD PENUTUP: KHITAH & ESTAFET PERJUANGAN                */}
        {/* ============================================================ */}
        <section className="bg-gradient-to-br from-[#14362B] to-[#1E4338] rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-md relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-200 border border-white/15 text-xs font-semibold backdrop-blur-xs">
              <HeartHandshake size={13} className="text-brand-lime" />
              <span>Khitah &amp; Nilai Abadi</span>
            </div>

            <h2 className="font-heading font-bold text-xl sm:text-2xl md:text-3xl text-white tracking-tight">
              Menjaga Amanah Perintis untuk Kemaslahatan Umat
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-zinc-200/90 leading-relaxed">
              Meski sang perintis K.H. Abdul Rasyid Muslim (Alm.) telah berpulang ke Rahmatullah, ruh
              perjuangan dan cita-cita luhur beliau terus hidup di setiap jengkal tanah Al-Rahmah. Di bawah
              pengawalan Umi Hj. Enung Nurhayati bersama jajaran asatidz, pesantren tetap teguh berdiri
              di atas dan untuk semua golongan, berpedoman pada Al-Qur&apos;an dan Hadits, serta senantiasa
              merangkul anak-anak yatim dan dhuafa demi meraih masa depan yang gemilang.
            </p>

            <div className="pt-2 flex flex-wrap justify-center gap-3 text-xs font-medium text-white/80">
              <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15">
                Berdiri untuk Semua Golongan
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15">
                Berpedoman Al-Qur&apos;an &amp; Hadits
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15">
                Merangkul Santri Yatim &amp; Dhuafa
              </span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
