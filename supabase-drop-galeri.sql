-- ============================================================
-- SQL Script: Menghapus Tabel & Kebijakan Galeri
-- Jalankan di: Supabase Dashboard > SQL Editor
-- ============================================================

-- Hapus kebijakan RLS
DROP POLICY IF EXISTS "Public read galeri album" ON galeri_album;
DROP POLICY IF EXISTS "Public read galeri foto" ON galeri_foto;
DROP POLICY IF EXISTS "Authenticated full access galeri album" ON galeri_album;
DROP POLICY IF EXISTS "Authenticated full access galeri foto" ON galeri_foto;

-- Hapus tabel galeri (beserta foreign key cascade)
DROP TABLE IF EXISTS galeri_foto CASCADE;
DROP TABLE IF EXISTS galeri_album CASCADE;
