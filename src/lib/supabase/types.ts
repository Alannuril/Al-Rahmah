// Auto-generated types untuk Supabase tables

export type BeritaStatus = "Draft" | "Terbit";
export type PengumumanStatus = "Aktif" | "Arsip";
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

export interface PsbContact {
  nama: string;
  peran: string;
  nomor: string;
  waUrl?: string;
}

export interface PsbSettings {
  id: string;
  tahun_ajaran: string | null;
  status: PsbOpenStatus;
  judul?: string | null;
  biaya_formulir: string | null;
  deskripsi: string | null;
  brosur_url: string | null;
  google_form_url?: string | null;
  periode_label?: string | null;
  tanggal_mulai?: string | null;
  tanggal_selesai?: string | null;
  rekening_bank?: string | null;
  rekening_nomor?: string | null;
  rekening_nama?: string | null;
  kontak_panitia?: PsbContact[] | null;
  updated_at: string;
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
