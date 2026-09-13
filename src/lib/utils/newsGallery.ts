/**
 * Utility helpers untuk manajemen galeri multi-gambar (maksimal 3 foto) pada Berita.
 * Mendukung backward compatibility baik kolom `gambar_urls` sudah ada di Supabase maupun belum.
 */

export function getBeritaImages(berita: {
  thumbnail_url?: string | null;
  gambar_urls?: string[] | null;
  konten?: string | null;
}): string[] {
  const result: string[] = [];

  // 1. Cek dari kolom `gambar_urls` (jika array sudah diisi di DB)
  if (Array.isArray(berita.gambar_urls) && berita.gambar_urls.length > 0) {
    for (const url of berita.gambar_urls) {
      if (typeof url === "string" && url.trim().length > 0) {
        result.push(url.trim());
      }
    }
  }

  // 2. Cek apakah ada metadata terenkapsulasi di konten: <!--gallery:[...]-->
  if (result.length === 0 && berita.konten && berita.konten.includes("<!--gallery:")) {
    try {
      const match = berita.konten.match(/<!--gallery:(.*?)-->/);
      if (match && match[1]) {
        const parsed = JSON.parse(match[1]);
        if (Array.isArray(parsed)) {
          for (const url of parsed) {
            if (typeof url === "string" && url.trim().length > 0) {
              result.push(url.trim());
            }
          }
        }
      }
    } catch {
      // Abaikan jika gagal parsing JSON
    }
  }

  // 3. Fallback: gunakan `thumbnail_url` jika belum ada gambar yang terdeteksi
  if (result.length === 0 && berita.thumbnail_url && berita.thumbnail_url.trim().length > 0) {
    result.push(berita.thumbnail_url.trim());
  }

  // Batasi maksimal 3 gambar unik
  return Array.from(new Set(result)).slice(0, 3);
}

/**
 * Menyematkan metadata galeri multi-gambar (jika > 1 gambar) ke dalam konten
 * agar tetap dapat dimuat meski database belum dimigrasi dengan kolom baru.
 */
export function encodeBeritaContent(konten: string, images: string[]): string {
  // Hapus komentar galeri lama jika ada
  const cleaned = cleanBeritaContent(konten);
  const validImages = images.map((s) => s.trim()).filter(Boolean).slice(0, 3);

  if (validImages.length > 1) {
    return `<!--gallery:${JSON.stringify(validImages)}-->\n\n${cleaned}`;
  }

  return cleaned;
}

/**
 * Membersihkan komentar metadata galeri dari isi berita agar tidak muncul di pembaca artikel.
 */
export function cleanBeritaContent(konten: string | null): string {
  if (!konten) return "";
  return konten.replace(/<!--gallery:[\s\S]*?-->/g, "").trim();
}

