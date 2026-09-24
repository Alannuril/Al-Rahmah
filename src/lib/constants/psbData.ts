export interface PsbContact {
  nama: string;
  peran: string;
  nomor: string;
  waUrl: string;
}

export type GelombangStatus = "Dibuka" | "Akan Datang" | "Ditutup";

export interface PsbGelombang {
  id: string;
  nama: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  tanggalTes?: string;
  tanggalPengumuman?: string;
  tanggalDaftarUlang?: string;
  status: GelombangStatus;
  kuota?: string;
  catatan?: string;
  isActive?: boolean;
}

export interface PsbTahapan {
  step: string;
  title: string;
  desc: string;
}

export interface PsbFaq {
  question: string;
  answer: string;
}

export interface PsbAnnouncementData {
  tahunAjaran: string;
  status: "Dibuka" | "Ditutup";
  judul: string;
  periodeLabel: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  deskripsi: string;
  flyerUrl: string;
  googleFormUrl: string;
  jenjang: string[];
  gelombang: PsbGelombang[];
  biayaFormulir: {
    nonYatim: string;
    yatim: string;
    catatanYatim: string;
    rekening: {
      bank: string;
      nomor: string;
      atasNama: string;
    };
  };
  persyaratanUmum: string[];
  persyaratanKhususYatim: string[];
  kontakPanitia: PsbContact[];
  tahapan: PsbTahapan[];
  faqs: PsbFaq[];
}

export const DEFAULT_GELOMBANG_LIST: PsbGelombang[] = [
  {
    id: "gel-1",
    nama: "Gelombang 1",
    tanggalMulai: "2026-01-05",
    tanggalSelesai: "2026-02-28",
    tanggalTes: "1 Maret 2026",
    tanggalPengumuman: "5 Maret 2026",
    tanggalDaftarUlang: "6 - 15 Maret 2026",
    status: "Ditutup",
    kuota: "60 Santri",
    catatan: "Jalur Peminatan Khusus & Prestasi Tahfidz",
    isActive: false,
  },
  {
    id: "gel-2",
    nama: "Gelombang 2",
    tanggalMulai: "2026-03-16",
    tanggalSelesai: "2026-04-02",
    tanggalTes: "5 April 2026",
    tanggalPengumuman: "9 April 2026",
    tanggalDaftarUlang: "10 - 20 April 2026",
    status: "Dibuka",
    kuota: "80 Santri",
    catatan: "Jalur Reguler Terbuka (MTs & MA)",
    isActive: true,
  },
  {
    id: "gel-3",
    nama: "Gelombang 3",
    tanggalMulai: "2026-05-01",
    tanggalSelesai: "2026-06-15",
    tanggalTes: "20 Juni 2026",
    tanggalPengumuman: "25 Juni 2026",
    tanggalDaftarUlang: "26 Juni - 5 Juli 2026",
    status: "Akan Datang",
    kuota: "Sisa Kuota",
    catatan: "Dibuka jika kuota santri baru belum terpenuhi",
    isActive: false,
  },
];

export const DUMMY_PSB_DATA: PsbAnnouncementData = {
  tahunAjaran: "2026/2027",
  status: "Dibuka",
  judul: "Pendaftaran Santri Baru Pondok Pesantren Al-Rahmah Melalui Online",
  periodeLabel: "Senin, 16 Maret s/d Kamis, 2 April 2026 M",
  tanggalMulai: "16 Maret 2026",
  tanggalSelesai: "2 April 2026",
  deskripsi:
    "Pondok Pesantren Al-Rahmah Walantaka membuka pendaftaran santri baru Tahun Ajaran 2026/2027 jenjang MTs & MA secara online melalui Google Form resmi.",
  flyerUrl: "/images/psb/brosur-psb-flyer.png",
  googleFormUrl: "https://forms.gle/9VfDxfNaJ9Qdo5JTA",
  jenjang: ["Madrasah Tsanawiyah (MTs)", "Madrasah Aliyah (MA)"],
  gelombang: DEFAULT_GELOMBANG_LIST,
  biayaFormulir: {
    nonYatim: "Rp 150.000,-",
    yatim: "Gratis (100% Bebas Biaya)",
    catatanYatim:
      "Bagi calon santri berstatus Yatim, pendaftaran dan biaya formulir 100% bebas biaya dengan melampirkan scan Akta Kematian Ayah resmi dari Dukcapil.",
    rekening: {
      bank: "BSI (Bank Syariah Indonesia)",
      nomor: "7777365546",
      atasNama: "Pondok Pesantren Al Rahmah",
    },
  },
  persyaratanUmum: [
    "Pasfoto santri terbaru (pakaian rapi/berkerah).",
    "Scan/foto Kartu Keluarga (KK) terbaru.",
    "Scan/foto Akta Kelahiran calon santri.",
    "Surat Keterangan Lulus (SKL) atau fotokopi Rapor kelas terakhir.",
    "Bukti transfer biaya formulir pendaftaran (khusus non-yatim).",
  ],
  persyaratanKhususYatim: [
    "Scan Akta Kematian Ayah dari Dinas Dukcapil / Surat Keterangan Kematian resmi dari instansi kelurahan.",
  ],
  kontakPanitia: [
    {
      nama: "Akh. Hidayatullah",
      peran: "Panitia PSB",
      nomor: "0895-4019-53841",
      waUrl:
        "https://wa.me/62895401953841?text=Assalamu%27alaikum%20Akh.%20Hidayatullah,%20saya%20ingin%20bertanya%20seputar%20pendaftaran%20PSB%20Al-Rahmah.",
    },
    {
      nama: "Ust. Muhammad Azis",
      peran: "Panitia PSB",
      nomor: "0895-0941-4409",
      waUrl:
        "https://wa.me/6289509414409?text=Assalamu%27alaikum%20Ust.%20Muhammad%20Azis,%20saya%20ingin%20bertanya%20seputar%20pendaftaran%20PSB%20Al-Rahmah.",
    },
    {
      nama: "Ustz. Layli Fauziyah",
      peran: "Panitia PSB",
      nomor: "0896-1895-2845",
      waUrl:
        "https://wa.me/6289618952845?text=Assalamu%27alaikum%20Ustz.%20Layli%20Fauziyah,%20saya%20ingin%20bertanya%20seputar%20pendaftaran%20PSB%20Al-Rahmah.",
    },
  ],
  tahapan: [
    {
      step: "01",
      title: "Siapkan Berkas & Bukti",
      desc: "Siapkan dokumen digital santri (KK, Akta Kelahiran, Pasfoto) serta bukti transfer biaya formulir atau berkas kematian bagi santri yatim.",
    },
    {
      step: "02",
      title: "Isi Formulir Online (Google Form)",
      desc: "Buka link Google Form resmi, lengkapi identitas santri dan data orang tua/wali, serta unggah dokumen yang diperlukan.",
    },
    {
      step: "03",
      title: "Observasi & Seleksi Santri",
      desc: "Mengikuti tahapan tes/observasi pemetaan kemampuan dasar keagamaan santri hingga pengumuman kelulusan resmi dari pondok.",
    },
  ],
  faqs: [
    {
      question: "Kapan batas waktu pendaftaran gelombang ini?",
      answer:
        "Pendaftaran dibuka mulai Senin, 16 Maret sampai dengan Kamis, 2 April 2026 M. Kami menyarankan calon wali santri menyelesaikan pengisian formulir sebelum tanggal penutupan.",
    },
    {
      question: "Bagaimana cara mendapatkan keringanan gratis untuk calon santri yatim?",
      answer:
        "Pondok Pesantren Al-Rahmah membebaskan biaya formulir 100% untuk santri yatim. Cukup lampirkan scan/foto Akta Kematian Ayah dari Dukcapil pada formulir pendaftaran.",
    },
    {
      question: "Jenjang pendidikan apa saja yang tersedia?",
      answer:
        "Tersedia jenjang Madrasah Tsanawiyah (MTs setingkat SMP) dan Madrasah Aliyah (MA setingkat SMA) dengan sistem asrama/mukim berbasis kurikulum pesantren, tahfidz, dan umum.",
    },
    {
      question: "Bagaimana jika butuh bantuan saat mengisi formulir?",
      answer:
        "Silakan hubungi kontak panitia kami via WhatsApp: Akh. Hidayatullah (0895-4019-53841) atau panitia lainnya yang tercantum pada halaman ini.",
    },
  ],
};
