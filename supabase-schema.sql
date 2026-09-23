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
  biaya_formulir text,
  deskripsi text,
  brosur_url text,
  updated_at timestamptz not null default now()
);

-- Insert default PSB settings
insert into psb_settings (tahun_ajaran, status, biaya_formulir, deskripsi)
values (
  '2026/2027',
  'Dibuka',
  'Rp 500.000',
  'Pondok Pesantren Al-Rahmah Walantaka membuka pendaftaran santri baru untuk tahun ajaran 2026/2027.'
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
