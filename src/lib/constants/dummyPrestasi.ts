import type { Prestasi } from "@/lib/supabase/types";

export const DUMMY_PRESTASI: Prestasi[] = [
  {
    id: "dummy-1",
    judul: "Juara 1 Musabaqah Hifdzil Qur'an (MHQ) 10 Juz Tingkat Provinsi Banten",
    kategori: "Keagamaan",
    deskripsi:
      "Kafilah santri Pondok Pesantren Al-Rahmah berhasil menorehkan prestasi gemilang dengan meraih juara pertama cabang tahfidz 10 juz tingkat provinsi setelah bersaing ketat dengan ratusan peserta dari berbagai madrasah dan pesantren se-Banten. Prestasi ini membuktikan keunggulan sistem karantina tahfidz dan metode talaqqi intensif yang diterapkan secara konsisten di lingkungan pesantren.",
    tanggal: "2026-02-15",
    foto_url:
      "https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=1200&auto=format&fit=crop",
    created_at: new Date().toISOString(),
  },
  {
    id: "dummy-2",
    judul: "Juara Umum POSPEDA Tingkat Kota Serang Cabang Pidato & Seni Islami",
    kategori: "Seni",
    deskripsi:
      "Kontingen santri Al-Rahmah berhasil menyabet medali emas dan dinobatkan sebagai Juara Umum dalam Pekan Olahraga & Seni Antar Pondok Pesantren.",
    tanggal: "2026-01-20",
    foto_url:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
    created_at: new Date().toISOString(),
  },
  {
    id: "dummy-3",
    judul: "Juara 1 Pidato Bahasa Arab (Khitobah) Antar Pesantren Se-Jawa & Banten",
    kategori: "Bahasa",
    deskripsi:
      "Menunjukkan kefasihan retorika dan penguasaan tata bahasa Arab fushah berstandar modern di hadapan dewan juri kejuaraan khitobah.",
    tanggal: "2025-11-10",
    foto_url:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop",
    created_at: new Date().toISOString(),
  },
  {
    id: "dummy-4",
    judul: "Medali Perak Kompetisi Sains Madrasah (KSM) Bidang Matematika Terintegrasi",
    kategori: "Akademik",
    deskripsi:
      "Keberhasilan santri jenjang Madrasah Aliyah Al-Rahmah dalam integrasi ilmu sains dan wawasan keislaman di tingkat wilayah.",
    tanggal: "2025-10-05",
    foto_url:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
    created_at: new Date().toISOString(),
  },
  {
    id: "dummy-5",
    judul: "Juara 2 Musabaqah Qira'atil Kutub (MQK) Tingkat Wilayah Banten",
    kategori: "Keagamaan",
    deskripsi:
      "Penguasaan mendalam terhadap literatur kitab kuning klasik cabang Fiqih dan Ushul Fiqih oleh santri Madrasah Aliyah Al-Rahmah.",
    tanggal: "2025-08-22",
    foto_url:
      "https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=1200&auto=format&fit=crop",
    created_at: new Date().toISOString(),
  },
];
