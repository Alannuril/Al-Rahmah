import type { Berita } from "@/lib/supabase/types";

export const DUMMY_BERITA: Berita[] = [
  {
    id: "dummy-1",
    judul: "Santri Al-Rahmah Raih Prestasi Gemilang pada Musabaqah Hifdzil Qur'an Tingkat Provinsi",
    slug: "santri-al-rahmah-raih-juara-mhq-provinsi",
    konten: `Alhamdulillah, kafilah santri Pondok Pesantren Al-Rahmah Walantaka kembali mengukir sejarah manis dengan menorehkan prestasi gemilang pada ajang Musabaqah Hifdzil Qur'an (MHQ) tingkat Provinsi Banten. Setelah melewati babak penyisihan yang ketat bersaing dengan puluhan kafilah dari berbagai madrasah dan pondok pesantren terkemuka, santri Al-Rahmah berhasil mengamankan juara pertama di cabang tahfidz Al-Qur'an.

Pimpinan Pondok Pesantren Al-Rahmah menyampaikan apresiasi dan rasa syukur yang mendalam atas pencapaian ini. Keberhasilan ini tidak lepas dari ketekunan para santri, bimbingan intensif dari para asatidz pembina tahfidz, serta doa restu dari para wali santri dan segenap civitas akademika pondok pesantren.

Melalui program halaqah Qur'aniyah yang terstruktur dan karantina tahfidz berkala, Pondok Pesantren Al-Rahmah senantiasa berkomitmen membina generasi Qur'ani yang kokoh dalam hafalan, mendalam dalam pemahaman, serta luhur dalam pengamalan akhlakul karimah sehari-hari. Semoga capaian ini menjadi pemantik semangat bagi seluruh santri untuk terus meningkatkan prestasi dan kecintaan kepada Al-Qur'an.`,
    excerpt:
      "Kafilah santri Pondok Pesantren Al-Rahmah berhasil menorehkan prestasi membanggakan dengan meraih juara cabang tahfidz Al-Qur'an tingkat provinsi setelah bersaing dengan ratusan peserta dari berbagai daerah. Pencapaian ini menjadi bukti komitmen pesantren dalam melahirkan generasi huffadz yang berakhlak mulia dan berwawasan luas.",
    kategori: "Prestasi",
    thumbnail_url:
      "https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=1200&auto=format&fit=crop",
    gambar_urls: [
      "https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop",
    ],
    author: "Humas Al-Rahmah",
    status: "Terbit",
    created_at: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "dummy-2",
    judul: "Pembekalan Santri Akhir: Membangun Kemandirian dan Karakter Kepemimpinan Ummat",
    slug: "pembekalan-santri-akhir-kemandirian-kepemimpinan",
    konten: `Menjelang masa kelulusan, seluruh santri kelas akhir mengikuti rangkaian kegiatan Pembekalan Santri Akhir yang diselenggarakan oleh Biro Pengasuhan Santri Al-Rahmah. Program ini dirancang khusus guna membekali para santri dengan ketrampilan hidup (life skills), wawasan kepemimpinan, dan kesiapan mental dalam menghadapi jenjang pendidikan tinggi serta kehidupan bermasyarakat.

Materi pembekalan meliputi manajemen organisasi, komunikasi publik yang efektif, etika dakwah kontemporer, dan literasi digital berwawasan Islam. Diharapkan setelah menuntaskan pendidikan di pondok, para alumni siap menjadi motor penggerak kebaikan di mana pun mereka berkiprah.`,
    excerpt:
      "Menjelang kelulusan, santri akhir mengikuti program pembekalan intensif kepemimpinan dan pengabdian masyarakat guna persiapan terjun ke perguruan tinggi dan dakwah ummat. Kegiatan ini membekali santri dengan wawasan manajerial, integritas akhlak, serta kesiapan mental.",
    kategori: "Kegiatan",
    thumbnail_url:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
    author: "Biro Pengasuhan",
    status: "Terbit",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: "dummy-3",
    judul: "Pondok Pesantren Al-Rahmah Membuka Pendaftaran Santri Baru (PSB) Tahun Ajaran 2026/2027",
    slug: "penerimaan-santri-baru-psb-2026-2027",
    konten: `Panitia Penerimaan Santri Baru (PSB) Pondok Pesantren Al-Rahmah Walantaka secara resmi mengumumkan pembukaan pendaftaran santri baru untuk tahun ajaran 2026/2027. Pendaftaran dibuka untuk jenjang Madrasah Tsanawiyah (MTs) dan Madrasah Aliyah (MA).

Proses pendaftaran dilaksanakan secara terpadu melalui sistem online pesantren guna memudahkan calon wali santri dari berbagai daerah. Pesantren menyediakan beasiswa khusus bagi santri berprestasi di bidang tahfidz dan akademik.`,
    excerpt:
      "Pendaftaran santri baru untuk jenjang MTs dan MA resmi dibuka secara daring. Temukan informasi persyaratan berkas, jadwal observasi, dan alur pendaftaran terpadu melalui portal resmi PSB demi memudahkan calon wali santri dalam mendaftarkan putra-putrinya.",
    kategori: "Pengumuman",
    thumbnail_url:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
    author: "Panitia PSB",
    status: "Terbit",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: "dummy-4",
    judul: "Pekan Bahasa Santri: Mengasah Kecakapan Berbahasa Arab & Inggris Berstandar Global",
    slug: "pekan-bahasa-santri-arab-inggris",
    konten: `Pekan Bahasa Santri merupakan agenda tahunan yang diadakan oleh Bagian Bahasa Pusat Sumber Belajar Al-Rahmah. Selama satu pekan penuh, lingkungan asrama dan madrasah menerapkan disiplin percakapan dua bahasa (bi-lingual environment) secara intensif.

Rangkaian acara diisi dengan berbagai perlombaan kreatif seperti khitobah (pidato bahasa Arab & Inggris), lomba debat isu kontemporer, pementasan drama bahasa asing, serta penulisan esai berbahasa Arab fushah.`,
    excerpt:
      "Meningkatkan kemampuan komunikasi bilingual santri melalui pekan bahasa intensif, perlombaan pidato tiga bahasa, serta simulasi debat keilmuan Islam modern. Program ini bertujuan membekali para santri dengan wawasan internasional.",
    kategori: "Akademik",
    thumbnail_url:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop",
    author: "Bagian Bahasa",
    status: "Terbit",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: "dummy-5",
    judul: "Kunjungan Silaturahmi Asatidz & Tokoh Pendidikan Nasional ke Pesantren Al-Rahmah",
    slug: "kunjungan-silaturahmi-asatidz-tokoh-pendidikan",
    konten: `Pondok Pesantren Al-Rahmah Walantaka menerima kunjungan kehormatan dari jajaran tokoh pendidikan dan pimpinan pondok pesantren se-Jawa Barat dan Banten. Kunjungan ini bertujuan untuk mempererat tali silaturahmi serta berbagi praktik baik dalam pengelolaan kurikulum terpadu antara keilmuan salafiyah dan kurikulum nasional.`,
    excerpt:
      "Pertemuan hangat membahas penguatan kurikulum integratif antara kitab kuning salafiyah dan sains modern dalam mencetak generasi rahmatan lil 'alamin. Forum silaturahmi ini memperkuat sinergi pesantren dengan para pemangku kebijakan pendidikan nasional.",
    kategori: "Kegiatan",
    thumbnail_url:
      "https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=1200&auto=format&fit=crop",
    author: "Sekretariat",
    status: "Terbit",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
  },
];

