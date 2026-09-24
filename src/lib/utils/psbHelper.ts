import { DUMMY_PSB_DATA, PsbAnnouncementData, PsbContact } from "@/lib/constants/psbData";
import type { PsbSettings } from "@/lib/supabase/types";

const CONFIG_PREFIX = "<!-- PSB_CONFIG:";
const CONFIG_SUFFIX = "-->";

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
}

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
