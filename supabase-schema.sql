-- ============================================================
-- Al-Rahmah Pondok Pesantren — Supabase Database Schema
-- Jalankan script ini di: Supabase Dashboard > SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ============================================================
-- TABEL BERITA
-- ============================================================
create table if not exists berita (
  id uuid primary key default gen_random_uuid(),
  judul text not null,
  slug text unique not null,
  konten text,
  excerpt text,
  kategori text not null default 'Informasi',
  thumbnail_url text,
  gambar_urls text[], -- Opsional: Array URL gambar (hingga 3 gambar) untuk fitur scroll gallery berita
  author text not null default 'Humas',
  status text not null default 'Draft' check (status in ('Draft', 'Terbit')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Jalankan jika tabel berita sudah ada sebelumnya:
-- alter table berita add column if not exists gambar_urls text[];

-- ============================================================
-- TABEL GALERI
-- ============================================================
create table if not exists galeri_album (
  id uuid primary key default gen_random_uuid(),
  judul text not null,
  tanggal date,
  created_at timestamptz not null default now()
);

create table if not exists galeri_foto (
  id uuid primary key default gen_random_uuid(),
  album_id uuid not null references galeri_album(id) on delete cascade,
  foto_url text not null,
  keterangan text,
  created_at timestamptz not null default now()
);

-- ============================================================
-- TABEL PENGUMUMAN
-- ============================================================
create table if not exists pengumuman (
  id uuid primary key default gen_random_uuid(),
  judul text not null,
  konten text,
  status text not null default 'Aktif' check (status in ('Aktif', 'Arsip')),
  is_pinned boolean not null default false,
  tanggal_mulai date,
  tanggal_akhir date,
  created_at timestamptz not null default now()
);

-- ============================================================
-- TABEL PRESTASI
-- ============================================================
create table if not exists prestasi (
  id uuid primary key default gen_random_uuid(),
  judul text not null,
  kategori text,
  tanggal date,
  deskripsi text,
  foto_url text,
  created_at timestamptz not null default now()
);

-- ============================================================
-- TABEL PSB SETTINGS
-- ============================================================
create table if not exists psb_settings (
  id uuid primary key default gen_random_uuid(),
  tahun_ajaran text,
  status text not null default 'Dibuka' check (status in ('Dibuka', 'Ditutup')),
  judul text default 'Pendaftaran Santri Baru Pondok Pesantren Al-Rahmah Melalui Online',
  biaya_formulir text,
  deskripsi text,
  brosur_url text,
  google_form_url text default 'https://forms.gle/9VfDxfNaJ9Qdo5JTA',
  periode_label text default 'Senin, 16 Maret s/d Kamis, 2 April 2026 M',
  tanggal_mulai date default '2026-03-16',
  tanggal_selesai date default '2026-04-02',
  rekening_bank text default 'BSI (Bank Syariah Indonesia)',
  rekening_nomor text default '7777365546',
  rekening_nama text default 'Pondok Pesantren Al Rahmah',
  kontak_panitia jsonb default '[
    {"nama": "Akh. Hidayatullah", "peran": "Panitia PSB", "nomor": "0895-4019-53841"},
    {"nama": "Ust. Muhammad Azis", "peran": "Panitia PSB", "nomor": "0895-0941-4409"},
    {"nama": "Ustz. Layli Fauziyah", "peran": "Panitia PSB", "nomor": "0896-1895-2845"}
  ]'::jsonb,
  gelombang jsonb default '[
    {
      "id": "gel-1",
      "nama": "Gelombang 1",
      "tanggal_mulai": "2026-01-05",
      "tanggal_selesai": "2026-02-28",
      "tanggal_tes": "1 Maret 2026",
      "tanggal_pengumuman": "5 Maret 2026",
      "tanggal_daftar_ulang": "6 - 15 Maret 2026",
      "status": "Ditutup",
      "kuota": "60 Santri",
      "catatan": "Jalur Peminatan Khusus & Prestasi Tahfidz",
      "is_active": false
    },
    {
      "id": "gel-2",
      "nama": "Gelombang 2",
      "tanggal_mulai": "2026-03-16",
      "tanggal_selesai": "2026-04-02",
      "tanggal_tes": "5 April 2026",
      "tanggal_pengumuman": "9 April 2026",
      "tanggal_daftar_ulang": "10 - 20 April 2026",
      "status": "Dibuka",
      "kuota": "80 Santri",
      "catatan": "Jalur Reguler Terbuka (MTs & MA)",
      "is_active": true
    },
    {
      "id": "gel-3",
      "nama": "Gelombang 3",
      "tanggal_mulai": "2026-05-01",
      "tanggal_selesai": "2026-06-15",
      "tanggal_tes": "20 Juni 2026",
      "tanggal_pengumuman": "25 Juni 2026",
      "tanggal_daftar_ulang": "26 Juni - 5 Juli 2026",
      "status": "Akan Datang",
      "kuota": "Sisa Kuota",
      "catatan": "Dibuka jika kuota santri baru belum terpenuhi",
      "is_active": false
    }
  ]'::jsonb,
  updated_at timestamptz not null default now()
);

-- Insert default PSB settings
insert into psb_settings (
  tahun_ajaran, status, judul, biaya_formulir, deskripsi, brosur_url, google_form_url, periode_label, tanggal_mulai, tanggal_selesai, rekening_bank, rekening_nomor, rekening_nama
) values (
  '2026/2027',
  'Dibuka',
  'Pendaftaran Santri Baru Pondok Pesantren Al-Rahmah Melalui Online',
  'Rp 150.000,-',
  'Pondok Pesantren Al-Rahmah Walantaka membuka pendaftaran santri baru Tahun Ajaran 2026/2027 jenjang MTs & MA secara online melalui Google Form resmi.',
  '/images/psb/brosur-psb-flyer.png',
  'https://forms.gle/9VfDxfNaJ9Qdo5JTA',
  'Senin, 16 Maret s/d Kamis, 2 April 2026 M',
  '2026-03-16',
  '2026-04-02',
  'BSI (Bank Syariah Indonesia)',
  '7777365546',
  'Pondok Pesantren Al Rahmah'
) on conflict do nothing;


-- ============================================================
-- TABEL PENGATURAN WEBSITE
-- ============================================================
create table if not exists pengaturan_website (
  id uuid primary key default gen_random_uuid(),
  nama_website text,
  tagline text,
  no_whatsapp text,
  alamat text,
  instagram_url text,
  youtube_url text,
  updated_at timestamptz not null default now()
);

-- Insert default website settings
insert into pengaturan_website (
  nama_website, tagline, no_whatsapp, alamat, instagram_url, youtube_url
) values (
  'Pondok Pesantren Al-Rahmah Walantaka',
  'Membentuk Generasi Qurani, Berakhlak, dan Berprestasi',
  '+62 812-3456-7890',
  'Jl. Raya Walantaka No. 1, Kecamatan Walantaka, Kota Serang, Provinsi Banten 42183',
  'https://instagram.com/alrahmah.walantaka',
  'https://youtube.com/@alrahmahwalantaka'
) on conflict do nothing;

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Aktifkan RLS untuk semua tabel
alter table berita enable row level security;
alter table galeri_album enable row level security;
alter table galeri_foto enable row level security;
alter table pengumuman enable row level security;
alter table prestasi enable row level security;
alter table psb_settings enable row level security;
alter table pengaturan_website enable row level security;

-- PUBLIC: boleh baca berita yang sudah terbit
create policy "Public read berita terbit"
  on berita for select
  using (status = 'Terbit');

-- PUBLIC: boleh baca galeri album
create policy "Public read galeri album"
  on galeri_album for select
  using (true);

-- PUBLIC: boleh baca galeri foto
create policy "Public read galeri foto"
  on galeri_foto for select
  using (true);

-- PUBLIC: boleh baca pengumuman aktif
create policy "Public read pengumuman aktif"
  on pengumuman for select
  using (status = 'Aktif');

-- PUBLIC: boleh baca prestasi
create policy "Public read prestasi"
  on prestasi for select
  using (true);

-- PUBLIC: boleh baca psb settings
create policy "Public read psb settings"
  on psb_settings for select
  using (true);

-- PUBLIC: boleh baca pengaturan website
create policy "Public read pengaturan website"
  on pengaturan_website for select
  using (true);

-- AUTHENTICATED (Admin): full access semua tabel
create policy "Authenticated full access berita"
  on berita for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated full access galeri album"
  on galeri_album for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated full access galeri foto"
  on galeri_foto for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated full access pengumuman"
  on pengumuman for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated full access prestasi"
  on prestasi for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated full access psb settings"
  on psb_settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated full access pengaturan"
  on pengaturan_website for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============================================================
-- STORAGE BUCKETS
-- Buat manual di Supabase Dashboard > Storage:
-- 1. "galeri"            (Public)
-- 2. "berita-thumbnails" (Public)
-- 3. "prestasi"          (Public)
-- 4. "psb-brosur"        (Public)
-- ============================================================
