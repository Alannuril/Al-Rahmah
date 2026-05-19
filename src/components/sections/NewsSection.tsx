import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const newsItems = [
  {
    id: 1,
    title: "Pondok Al-Rahmah Borong Juara Lomba Tahfidz Tingkat Provinsi",
    excerpt: "Alhamdulillah, santriwan dan santriwati Pondok Pesantren Al-Rahmah berhasil meraih medali emas dalam kompetisi Musabaqoh Hifdzil Quran tingkat provinsi...",
    category: "Prestasi",
    date: "12 Mei 2026",
    author: "Humas",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2070&auto=format&fit=crop",
    slug: "/media/berita/lomba-tahfidz"
  },
  {
    id: 2,
    title: "Pendaftaran Santri Baru Tahun Ajaran 2026/2027 Telah Dibuka",
    excerpt: "Kabar gembira bagi Ayah Bunda yang ingin mendaftarkan putra-putrinya di lingkungan pendidikan islami, modern, dan integratif. Kuota terbatas!",
    category: "Informasi",
    date: "08 Mei 2026",
    author: "Panitia PSB",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop",
    slug: "/psb"
  },
  {
    id: 3,
    title: "Kunjungan Studi Banding dari Universitas Islam Internasional",
    excerpt: "Pondok Pesantren Al-Rahmah kedatangan tamu kehormatan civitas akademika dari luar negeri untuk mempelajari kurikulum boarding school terpadu.",
    category: "Kegiatan",
    date: "02 Mei 2026",
    author: "Sekretariat",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1949&auto=format&fit=crop",
    slug: "/media/berita/kunjungan-studi"
  },
  {
    id: 4,
    title: "Pelatihan Kepemimpinan dan Jurnalistik Santri Kelas Berbakat",
    excerpt: "Membekali santri dengan kemampuan public speaking dan dasar-dasar jurnalistik islami sebagai bekal dakwah di era modern.",
    category: "Kegiatan",
    date: "25 April 2026",
    author: "OSPAR",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop",
    slug: "/media/berita/pelatihan-kepemimpinan"
  }
];

export function NewsSection() {
  const featuredNews = newsItems[0];
  const recommendedNews = newsItems.slice(1);

  return (
    <section className="py-18 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="flex-1">
            <SectionHeading 
              title="Berita & Informasi Terbaru" 
              subtitle="Dapatkan kabar terkini seputar aktivitas, prestasi, dan pengumuman penting dari civitas akademika Al-Rahmah."
              badge="Kabar Al-Rahmah"
            />
          </div>
          <Link 
            href="/media/berita" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-lime/10 text-brand-primary font-semibold rounded-xl hover:bg-brand-lime/20 transition-colors w-fit shrink-0"
          >
            Lihat Semua Berita
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* --- DESKTOP VIEW --- */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {newsItems.map((item) => (
            <article 
              key={item.id} 
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-brand-primary/20 hover:shadow-xl hover:shadow-brand-primary/5 transition-all duration-300"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-brand-lime/40 to-transparent pointer-events-none"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-brand-primary text-xs font-bold tracking-wide rounded-full shadow-sm">
                    {item.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col grow">
                <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-brand-lime" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User size={14} className="text-brand-lime" />
                    <span>{item.author}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-brand-primary transition-colors line-clamp-2">
                  <Link href={item.slug} className="focus:outline-none">
                    <span className="absolute inset-0 z-10" aria-hidden="true"></span>
                    {item.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                  {item.excerpt}
                </p>
                
                <div className="mt-auto flex items-center gap-2 text-brand-primary font-semibold text-sm group/btn">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* --- MOBILE VIEW --- */}
        <div className="flex flex-col gap-6 md:hidden">
          {/* Featured News */}
          <article className="relative w-full aspect-4/3 rounded-2xl overflow-hidden group shadow-sm">
            <Link href={featuredNews.slug} className="absolute inset-0 z-20">
              <span className="sr-only">{featuredNews.title}</span>
            </Link>
            <img
              src={featuredNews.image}
              alt={featuredNews.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-linear-to-t from-gray-900/90 via-gray-900/30 to-transparent pointer-events-none"></div>

            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 bg-brand-primary text-white text-xs font-semibold tracking-wide rounded-full shadow-sm">
                {featuredNews.category}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5 z-10 flex flex-col justify-end">
              <div className="flex items-center gap-2 text-white/80 text-xs font-medium mb-2.5 drop-shadow-md">
                <span>{featuredNews.author}</span>
                <span className="w-1 h-1 rounded-full bg-white/50"></span>
                <span>{featuredNews.date}</span>
              </div>
              <h3 className="text-lg font-bold text-white leading-snug line-clamp-3 drop-shadow-md">
                {featuredNews.title}
              </h3>
            </div>
          </article>

          {/* Recommended News List */}
          <div className="flex flex-col gap-5 mt-2">
            {recommendedNews.map((item) => (
              <article key={item.id} className="group flex gap-4 items-center bg-transparent relative">
                <Link href={item.slug} className="absolute inset-0 z-20">
                  <span className="sr-only">{item.title}</span>
                </Link>
                <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden shadow-sm">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col justify-center flex-1 py-1">
                  <span className="text-brand-primary text-xs font-semibold mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 mb-2 group-hover:text-brand-primary transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    <span>{item.author}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
