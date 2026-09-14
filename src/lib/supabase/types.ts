// Auto-generated types untuk Supabase tables

export type BeritaStatus = "Draft" | "Terbit";
export type PengumumanStatus = "Aktif" | "Arsip";
export type PsbStatus = "Menunggu" | "Lulus" | "Tidak Lulus";
export type PsbOpenStatus = "Dibuka" | "Ditutup";

export interface Berita {
  id: string;
  judul: string;
  slug: string;
  konten: string | null;
  excerpt: string | null;
  kategori: string;
  thumbnail_url: string | null;
  gambar_urls?: string[] | null;
  author: string;
  status: BeritaStatus;
  created_at: string;
  updated_at: string;
}

export interface GaleriAlbum {
  id: string;
  judul: string;
  tanggal: string | null;
  created_at: string;
  foto?: GaleriFoto[];
}

export interface GaleriFoto {
  id: string;
  album_id: string;
  foto_url: string;
  keterangan: string | null;
  created_at: string;
}

export interface Pengumuman {
  id: string;
  judul: string;
  konten: string | null;
  status: PengumumanStatus;
  is_pinned: boolean;
  tanggal_mulai: string | null;
  tanggal_akhir: string | null;
  created_at: string;
}

export interface Prestasi {
  id: string;
  judul: string;
  kategori: string | null;
  tanggal: string | null;
  deskripsi: string | null;
  foto_url: string | null;
  created_at: string;
}

export interface PsbSettings {
  id: string;
  tahun_ajaran: string | null;
  status: PsbOpenStatus;
  biaya_formulir: string | null;
  deskripsi: string | null;
  brosur_url: string | null;
  updated_at: string;
}

export interface PendaftarPsb {
  id: string;
  user_id?: string | null;
  nama_lengkap: string;
  keterangan?: "Yatim" | "Non Yatim" | string | null;
  tingkat?: "Madrasah Tsanawiyah (MTs)" | "Madrasah Aliyah (MA)" | string | null;
  tempat_lahir: string | null;
  tanggal_lahir: string | null;
  jenis_kelamin: string | null;
  program: string | null;
  nama_ayah: string | null;
  nama_ibu: string | null;
  nama_wali?: string | null;
  no_hp: string | null;
  email?: string | null;
  alamat: string | null;
  asal_sekolah: string | null;
  nisn: string | null;
  status: PsbStatus;
  tahun_ajaran: string | null;
  bukti_pembayaran_url?: string | null;
  kk_url?: string | null;
  akta_url?: string | null;
  rapor_url?: string | null;
  foto_url?: string | null;
  created_at: string;
}

export interface PengaturanWebsite {
  id: string;
  nama_website: string | null;
  tagline: string | null;
  no_whatsapp: string | null;
  alamat: string | null;
  instagram_url: string | null;
  youtube_url: string | null;
  updated_at: string;
}
