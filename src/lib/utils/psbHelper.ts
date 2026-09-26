import {
  DUMMY_PSB_DATA,
  PsbAnnouncementData,
  PsbContact,
  PsbGelombang,
} from "@/lib/constants/psbData";
import type { PsbSettings, PsbGelombangDb } from "@/lib/supabase/types";

const CONFIG_PREFIX = "<!-- PSB_CONFIG:";
const CONFIG_SUFFIX = "-->";

export interface PsbGelombangConfig {
  id: string;
  nama: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
  tanggal_tes?: string;
  tanggal_pengumuman?: string;
  tanggal_daftar_ulang?: string;
  status: "Dibuka" | "Akan Datang" | "Ditutup";
  kuota?: string;
  catatan?: string;
  is_active?: boolean;
  link_formulir?: string;
}

export interface PsbFullConfig {
  tahun_ajaran: string;
  status: "Dibuka" | "Ditutup";
  judul: string;
  periode_label: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
  deskripsi: string;
  brosur_url: string;
  google_form_url: string;
  biaya_formulir: string;
  rekening_bank: string;
  rekening_nomor: string;
  rekening_nama: string;
  kontak_panitia: PsbContact[];
  gelombang: PsbGelombangConfig[];
}

export const DEFAULT_GELOMBANG_CONFIGS: PsbGelombangConfig[] = [
  {
    id: "gel-1",
    nama: "Gelombang 1",
    tanggal_mulai: "2026-01-05",
    tanggal_selesai: "2026-02-28",
    tanggal_tes: "1 Maret 2026",
    tanggal_pengumuman: "5 Maret 2026",
    tanggal_daftar_ulang: "6 - 15 Maret 2026",
    status: "Ditutup",
    kuota: "60 Santri",
    catatan: "Jalur Peminatan Khusus & Prestasi Tahfidz",
    is_active: false,
  },
  {
    id: "gel-2",
    nama: "Gelombang 2",
    tanggal_mulai: "2026-03-16",
    tanggal_selesai: "2026-04-02",
    tanggal_tes: "5 April 2026",
    tanggal_pengumuman: "9 April 2026",
    tanggal_daftar_ulang: "10 - 20 April 2026",
    status: "Dibuka",
    kuota: "80 Santri",
    catatan: "Jalur Reguler Terbuka (MTs & MA)",
    is_active: true,
  },
  {
    id: "gel-3",
    nama: "Gelombang 3",
    tanggal_mulai: "2026-05-01",
    tanggal_selesai: "2026-06-15",
    tanggal_tes: "20 Juni 2026",
    tanggal_pengumuman: "25 Juni 2026",
    tanggal_daftar_ulang: "26 Juni - 5 Juli 2026",
    status: "Akan Datang",
    kuota: "Sisa Kuota",
    catatan: "Dibuka jika kuota santri baru belum terpenuhi",
    is_active: false,
  },
];

/**
 * Mengubah data DB psb_settings menjadi PsbFullConfig dengan fallback aman
 */
export function parsePsbSettings(data?: Partial<PsbSettings> | null): PsbFullConfig {
  if (!data) {
    return {
      tahun_ajaran: DUMMY_PSB_DATA.tahunAjaran,
      status: DUMMY_PSB_DATA.status,
      judul: DUMMY_PSB_DATA.judul,
      periode_label: DUMMY_PSB_DATA.periodeLabel,
      tanggal_mulai: DUMMY_PSB_DATA.tanggalMulai,
      tanggal_selesai: DUMMY_PSB_DATA.tanggalSelesai,
      deskripsi: DUMMY_PSB_DATA.deskripsi,
      brosur_url: DUMMY_PSB_DATA.flyerUrl,
      google_form_url: DUMMY_PSB_DATA.googleFormUrl,
      biaya_formulir: DUMMY_PSB_DATA.biayaFormulir.nonYatim,
      rekening_bank: DUMMY_PSB_DATA.biayaFormulir.rekening.bank,
      rekening_nomor: DUMMY_PSB_DATA.biayaFormulir.rekening.nomor,
      rekening_nama: DUMMY_PSB_DATA.biayaFormulir.rekening.atasNama,
      kontak_panitia: DUMMY_PSB_DATA.kontakPanitia,
      gelombang: DEFAULT_GELOMBANG_CONFIGS,
    };
  }

  // Cek apakah ada metadata tersembunyi di dalam deskripsi sebagai cadangan
  let embeddedConfig: Partial<PsbFullConfig> = {};
  let cleanDeskripsi = data.deskripsi || "";
  if (cleanDeskripsi.includes(CONFIG_PREFIX) && cleanDeskripsi.includes(CONFIG_SUFFIX)) {
    try {
      const start = cleanDeskripsi.indexOf(CONFIG_PREFIX) + CONFIG_PREFIX.length;
      const end = cleanDeskripsi.indexOf(CONFIG_SUFFIX, start);
      const jsonStr = cleanDeskripsi.substring(start, end).trim();
      embeddedConfig = JSON.parse(jsonStr);
      cleanDeskripsi = cleanDeskripsi.substring(0, cleanDeskripsi.indexOf(CONFIG_PREFIX)).trim();
    } catch {
      // Ignore JSON parse error
    }
  }

  const rawGelombang =
    (data.gelombang && data.gelombang.length > 0)
      ? data.gelombang
      : (embeddedConfig.gelombang && embeddedConfig.gelombang.length > 0)
      ? embeddedConfig.gelombang
      : DEFAULT_GELOMBANG_CONFIGS;

  return {
    tahun_ajaran: data.tahun_ajaran || embeddedConfig.tahun_ajaran || DUMMY_PSB_DATA.tahunAjaran,
    status: (data.status || embeddedConfig.status || DUMMY_PSB_DATA.status) as "Dibuka" | "Ditutup",
    judul: data.judul || embeddedConfig.judul || DUMMY_PSB_DATA.judul,
    periode_label: data.periode_label || embeddedConfig.periode_label || DUMMY_PSB_DATA.periodeLabel,
    tanggal_mulai: data.tanggal_mulai || embeddedConfig.tanggal_mulai || DUMMY_PSB_DATA.tanggalMulai,
    tanggal_selesai: data.tanggal_selesai || embeddedConfig.tanggal_selesai || DUMMY_PSB_DATA.tanggalSelesai,
    deskripsi: cleanDeskripsi || embeddedConfig.deskripsi || DUMMY_PSB_DATA.deskripsi,
    brosur_url: data.brosur_url || embeddedConfig.brosur_url || DUMMY_PSB_DATA.flyerUrl,
    google_form_url: data.google_form_url || embeddedConfig.google_form_url || DUMMY_PSB_DATA.googleFormUrl,
    biaya_formulir: data.biaya_formulir || embeddedConfig.biaya_formulir || DUMMY_PSB_DATA.biayaFormulir.nonYatim,
    rekening_bank: data.rekening_bank || embeddedConfig.rekening_bank || DUMMY_PSB_DATA.biayaFormulir.rekening.bank,
    rekening_nomor: data.rekening_nomor || embeddedConfig.rekening_nomor || DUMMY_PSB_DATA.biayaFormulir.rekening.nomor,
    rekening_nama: data.rekening_nama || embeddedConfig.rekening_nama || DUMMY_PSB_DATA.biayaFormulir.rekening.atasNama,
    kontak_panitia: ensureContacts(
      (data.kontak_panitia && data.kontak_panitia.length > 0
        ? data.kontak_panitia
        : embeddedConfig.kontak_panitia && embeddedConfig.kontak_panitia.length > 0
        ? embeddedConfig.kontak_panitia
        : DUMMY_PSB_DATA.kontakPanitia) as Array<{
            nama: string;
            peran: string;
            nomor: string;
            waUrl?: string;
          }>
    ),
    gelombang: ensureGelombang(rawGelombang as (PsbGelombangConfig | PsbGelombangDb)[]),
  };
}

function ensureContacts(
  contacts?: Array<{ nama: string; peran: string; nomor: string; waUrl?: string }>
): PsbContact[] {
  if (!contacts || contacts.length === 0) return DUMMY_PSB_DATA.kontakPanitia;
  return contacts.map((c) => ({
    nama: c.nama,
    peran: c.peran,
    nomor: c.nomor,
    waUrl:
      c.waUrl ||
      `https://wa.me/62${c.nomor.replace(/[^0-9]/g, "").replace(/^0/, "")}?text=Assalamu%27alaikum%20${encodeURIComponent(
        c.nama
      )},%20saya%20ingin%20bertanya%20seputar%20pendaftaran%20PSB%20Al-Rahmah.`,
  }));
}

export function ensureGelombang(
  list?: Array<Partial<PsbGelombangConfig | PsbGelombangDb>>
): PsbGelombangConfig[] {
  if (!list || list.length === 0) return DEFAULT_GELOMBANG_CONFIGS;
  return list.map((g, idx) => ({
    id: g.id || `gel-${idx + 1}`,
    nama: g.nama || `Gelombang ${idx + 1}`,
    tanggal_mulai: g.tanggal_mulai || "",
    tanggal_selesai: g.tanggal_selesai || "",
    tanggal_tes: g.tanggal_tes || "",
    tanggal_pengumuman: g.tanggal_pengumuman || "",
    tanggal_daftar_ulang: g.tanggal_daftar_ulang || "",
    status: (g.status || "Akan Datang") as "Dibuka" | "Akan Datang" | "Ditutup",
    kuota: g.kuota || "",
    catatan: g.catatan || "",
    is_active: g.is_active ?? idx === 0,
    link_formulir: g.link_formulir || "",
  }));
}

/**
 * Mengemas config menjadi payload DB dan string deskripsi dengan metadata fallback
 */
export function encodePsbPayload(config: PsbFullConfig) {
  // Metadata fallback disimpan di akhir deskripsi
  const metadataJson = JSON.stringify({
    judul: config.judul,
    periode_label: config.periode_label,
    tanggal_mulai: config.tanggal_mulai,
    tanggal_selesai: config.tanggal_selesai,
    google_form_url: config.google_form_url,
    rekening_bank: config.rekening_bank,
    rekening_nomor: config.rekening_nomor,
    rekening_nama: config.rekening_nama,
    kontak_panitia: config.kontak_panitia,
    gelombang: config.gelombang,
  });

  const fullDeskripsi = config.deskripsi
    ? `${config.deskripsi.trim()}\n\n${CONFIG_PREFIX}${metadataJson}${CONFIG_SUFFIX}`
    : `${CONFIG_PREFIX}${metadataJson}${CONFIG_SUFFIX}`;

  // Full payload jika kolom tabel sudah ada
  const fullPayload = {
    tahun_ajaran: config.tahun_ajaran,
    status: config.status,
    judul: config.judul,
    biaya_formulir: config.biaya_formulir,
    deskripsi: fullDeskripsi,
    brosur_url: config.brosur_url,
    google_form_url: config.google_form_url,
    periode_label: config.periode_label,
    tanggal_mulai: config.tanggal_mulai,
    tanggal_selesai: config.tanggal_selesai,
    rekening_bank: config.rekening_bank,
    rekening_nomor: config.rekening_nomor,
    rekening_nama: config.rekening_nama,
    kontak_panitia: config.kontak_panitia,
    gelombang: config.gelombang,
    updated_at: new Date().toISOString(),
  };

  // Base payload jika migrasi kolom belum dijalankan di DB Supabase
  const basePayload = {
    tahun_ajaran: config.tahun_ajaran,
    status: config.status,
    biaya_formulir: config.biaya_formulir,
    deskripsi: fullDeskripsi,
    brosur_url: config.brosur_url,
    updated_at: new Date().toISOString(),
  };

  return { fullPayload, basePayload };
}

/**
 * Mengubah PsbFullConfig menjadi format PsbAnnouncementData untuk konsumsi halaman publik
 */
export function configToAnnouncementData(config: PsbFullConfig): PsbAnnouncementData {
  return {
    ...DUMMY_PSB_DATA,
    tahunAjaran: config.tahun_ajaran,
    status: config.status,
    judul: config.judul,
    periodeLabel: config.periode_label,
    tanggalMulai: config.tanggal_mulai,
    tanggalSelesai: config.tanggal_selesai,
    deskripsi: config.deskripsi,
    flyerUrl: config.brosur_url,
    googleFormUrl: config.google_form_url,
    gelombang: config.gelombang.map((g) => ({
      id: g.id,
      nama: g.nama,
      tanggalMulai: g.tanggal_mulai,
      tanggalSelesai: g.tanggal_selesai,
      tanggalTes: g.tanggal_tes,
      tanggalPengumuman: g.tanggal_pengumuman,
      tanggalDaftarUlang: g.tanggal_daftar_ulang,
      status: g.status,
      kuota: g.kuota,
      catatan: g.catatan,
      isActive: g.is_active,
      linkFormulir: g.link_formulir || config.google_form_url,
    })),
    biayaFormulir: {
      ...DUMMY_PSB_DATA.biayaFormulir,
      nonYatim: config.biaya_formulir,
      rekening: {
        bank: config.rekening_bank,
        nomor: config.rekening_nomor,
        atasNama: config.rekening_nama,
      },
    },
    kontakPanitia: config.kontak_panitia.map((c) => ({
      ...c,
      waUrl:
        c.waUrl ||
        `https://wa.me/62${c.nomor.replace(/[^0-9]/g, "").replace(/^0/, "")}?text=Assalamu%27alaikum%20${encodeURIComponent(
          c.nama
        )},%20saya%20ingin%20bertanya%20seputar%20pendaftaran%20PSB%20Al-Rahmah.`,
    })),
  };
}

/**
 * Helper untuk memformat tanggal YYYY-MM-DD ke Bahasa Indonesia
 * Contoh: "2026-03-16" -> "16 Maret 2026"
 */
export function formatIndoDate(dateStr?: string | null): string {
  if (!dateStr) return "";
  // Jika formatnya sudah teks bebas, kembalikan langsung
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr.trim())) {
    return dateStr;
  }
  try {
    const [y, m, d] = dateStr.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/**
 * Helper format rentang tanggal (Contoh: "16 Maret s/d 2 April 2026")
 */
export function formatDateRangeDisplay(startStr?: string, endStr?: string): string {
  if (!startStr && !endStr) return "Jadwal belum ditentukan";
  if (startStr && !endStr) return `Mulai ${formatIndoDate(startStr)}`;
  if (!startStr && endStr) return `Sampai ${formatIndoDate(endStr)}`;

  const formattedStart = formatIndoDate(startStr);
  const formattedEnd = formatIndoDate(endStr);
  return `${formattedStart} s/d ${formattedEnd}`;
}

/**
 * Menghitung status gelombang otomatis berdasarkan tanggal hari ini
 */
export function calculateAutoGelombangStatus(
  startStr?: string,
  endStr?: string
): "Dibuka" | "Akan Datang" | "Ditutup" {
  if (!startStr || !endStr) return "Akan Datang";
  try {
    const now = new Date();
    // Normalize to date only (00:00:00)
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    const [sy, sm, sd] = startStr.split("-").map(Number);
    const startDate = new Date(sy, sm - 1, sd).getTime();

    const [ey, em, ed] = endStr.split("-").map(Number);
    const endDate = new Date(ey, em - 1, ed, 23, 59, 59).getTime();

    if (today < startDate) return "Akan Datang";
    if (today > endDate) return "Ditutup";
    return "Dibuka";
  } catch {
    return "Dibuka";
  }
}

/**
 * Mencari gelombang yang sedang aktif atau dibuka
 */
export function findActiveGelombang(
  list?: PsbGelombangConfig[] | PsbGelombang[]
): (PsbGelombangConfig | PsbGelombang) | null {
  if (!list || list.length === 0) return null;
  // 1. Prioritaskan yang secara eksplisit is_active / isActive = true
  const explicitlyActive = list.find((g) =>
    "is_active" in g ? g.is_active : (g as PsbGelombang).isActive
  );
  if (explicitlyActive) return explicitlyActive;

  // 2. Cari yang statusnya "Dibuka"
  const openWave = list.find((g) => g.status === "Dibuka");
  if (openWave) return openWave;

  // 3. Fallback ke elemen pertama
  return list[0];
}
