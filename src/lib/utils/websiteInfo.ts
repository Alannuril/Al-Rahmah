import type { PengaturanWebsite } from "@/lib/supabase/types";
import { DUMMY_PSB_DATA, type PsbContact } from "@/lib/constants/psbData";

export const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/J1PeZhP9SzcFiC3M8";
export const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.6912405338826!2d106.2131152!3d-6.172079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e421e377265e6c5%3A0xdc894d9c993a8e4f!2sPondok%20Pesantren%20Al%20Rahmah%20Walantaka!5e0!3m2!1sid!2sid!4v1710000000000!5m2!1sid!2sid";

export function normalizeWhatsApp(value?: string | null): string | null {
  const digits = value?.replace(/\D/g, "") ?? "";
  const number = digits.startsWith("0")
    ? `62${digits.slice(1)}`
    : digits.startsWith("8")
      ? `62${digits}`
      : digits;

  // The installation seed contains this example number, not a pondok contact.
  if (number === "6281234567890" || !/^628\d{7,11}$/.test(number)) return null;
  return number;
}

function externalUrl(value?: string | null): string | null {
  if (!value?.trim()) return null;
  try {
    const url = new URL(value.trim());
    return ["http:", "https:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

export function resolveWebsiteInfo(
  settings?: Partial<PengaturanWebsite> | null,
  contacts: PsbContact[] = DUMMY_PSB_DATA.kontakPanitia,
) {
  const websiteNumber = normalizeWhatsApp(settings?.no_whatsapp);
  const contact = contacts.find((item) => normalizeWhatsApp(item.nomor));
  const number = websiteNumber || normalizeWhatsApp(contact?.nomor);

  return {
    nama_website: settings?.nama_website?.trim() || "Pondok Pesantren Al-Rahmah Walantaka",
    tagline: settings?.tagline?.trim() || "Membentuk Generasi Qurani, Berakhlak, dan Berprestasi.",
    alamat: settings?.alamat?.trim() || "Walantaka, Kota Serang, Banten",
    no_whatsapp: websiteNumber ? settings!.no_whatsapp!.trim() : contact?.nomor ?? "",
    whatsapp_url: number ? `https://wa.me/${number}` : null,
    whatsapp_label: websiteNumber ? "WhatsApp Pondok" : "Panitia PSB",
    instagram_url:
      externalUrl(settings?.instagram_url) ||
      "https://www.instagram.com/pondok.alrahmah/",
    youtube_url:
      externalUrl(settings?.youtube_url) ||
      "https://www.youtube.com/@pondokalrahmah1577",
    facebook_url:
      externalUrl(settings?.facebook_url) ||
      "https://www.facebook.com/p/Pondok-Pesantren-Al-Rahmah-Islamic-Boarding-School-100023081542264/?locale=id_ID",
  };
}

export type WebsiteInfo = ReturnType<typeof resolveWebsiteInfo>;
