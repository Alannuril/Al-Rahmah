-- ============================================================
-- MIGRASI PSB SETTINGS DINAMIS (Pondok Pesantren Al-Rahmah)
-- Jalankan query ini di SQL Editor dashboard Supabase Anda.
-- ============================================================

ALTER TABLE psb_settings
  ADD COLUMN IF NOT EXISTS judul text DEFAULT 'Pendaftaran Santri Baru Pondok Pesantren Al-Rahmah Melalui Online',
  ADD COLUMN IF NOT EXISTS google_form_url text DEFAULT 'https://forms.gle/9VfDxfNaJ9Qdo5JTA',
  ADD COLUMN IF NOT EXISTS periode_label text DEFAULT 'Senin, 16 Maret s/d Kamis, 2 April 2026 M',
  ADD COLUMN IF NOT EXISTS tanggal_mulai date DEFAULT '2026-03-16',
  ADD COLUMN IF NOT EXISTS tanggal_selesai date DEFAULT '2026-04-02',
  ADD COLUMN IF NOT EXISTS rekening_bank text DEFAULT 'BSI (Bank Syariah Indonesia)',
  ADD COLUMN IF NOT EXISTS rekening_nomor text DEFAULT '7777365546',
  ADD COLUMN IF NOT EXISTS rekening_nama text DEFAULT 'Pondok Pesantren Al Rahmah',
  ADD COLUMN IF NOT EXISTS kontak_panitia jsonb DEFAULT '[
    {"nama": "Akh. Hidayatullah", "peran": "Panitia PSB", "nomor": "0895-4019-53841"},
    {"nama": "Ust. Muhammad Azis", "peran": "Panitia PSB", "nomor": "0895-0941-4409"},
    {"nama": "Ustz. Layli Fauziyah", "peran": "Panitia PSB", "nomor": "0896-1895-2845"}
  ]'::jsonb;

-- Pastikan RLS mengizinkan publik membaca psb_settings
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'psb_settings' AND policyname = 'Public read psb_settings'
  ) THEN
    CREATE POLICY "Public read psb_settings"
      ON psb_settings FOR SELECT
      USING (true);
  END IF;
END $$;

