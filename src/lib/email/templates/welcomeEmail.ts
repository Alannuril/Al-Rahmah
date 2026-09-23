import { renderBaseEmailLayout } from "./baseLayout";

export interface WelcomeEmailData {
  name?: string;
  email: string;
  portalUrl?: string;
}

export function renderWelcomeEmail({
  name,
  email,
  portalUrl = "http://localhost:3000/psb",
}: WelcomeEmailData): { subject: string; html: string } {
  const displayName = name && name.trim().length > 0 ? name.trim() : "Bapak/Ibu Calon Wali Santri";
  const subject = "Pendaftaran Akun Berhasil - Portal PSB Pondok Pesantren Al-Rahmah";

  const contentHtml = `
    <!-- Greeting & Welcome Banner -->
    <div style="margin-bottom: 24px;">
      <p style="margin: 0 0 12px 0; font-size: 15px; color: #374151;">
        Selamat datang, <strong>${displayName}</strong>.
      </p>
      <p style="margin: 0 0 16px 0; font-size: 14px; color: #4B5563; line-height: 1.6;">
        Alhamdulillah, akun Anda dengan alamat email <span style="font-family: monospace; background: #EEF5F2; padding: 2px 6px; border-radius: 4px; color: #1E3D34; font-weight: 600;">${email}</span> telah berhasil dibuat dan terdaftar di sistem Portal Penerimaan Santri Baru (E-PSB) Pondok Pesantren Al-Rahmah.
      </p>
    </div>

    <!-- Status Card -->
    <div style="background-color: #F4F8F6; border: 1px solid #D5E5DE; border-radius: 12px; padding: 18px 20px; margin-bottom: 24px;">
      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td width="36" valign="top">
            <div style="width: 28px; height: 28px; border-radius: 50%; background-color: #396E5F; color: #ffffff; text-align: center; line-height: 28px; font-weight: bold; font-size: 15px;">
              &#10003;
            </div>
          </td>
          <td style="padding-left: 10px;">
            <p style="margin: 0; font-size: 14px; font-weight: 700; color: #1E3D34;">
              Status Akun: Aktif
            </p>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #52796F; line-height: 1.5;">
              Anda kini dapat login kapan saja untuk mengisi atau memantau status berkas pendaftaran santri baru.
            </p>
          </td>
        </tr>
      </table>
    </div>

    <!-- Next Steps Section -->
    <div style="margin-bottom: 24px;">
      <h2 style="margin: 0 0 12px 0; font-size: 15px; font-weight: 700; color: #1E3D34; text-transform: uppercase; letter-spacing: 0.5px;">
        Langkah Selanjutnya: Pengisian Formulir E-PSB
      </h2>
      <p style="margin: 0 0 12px 0; font-size: 13px; color: #4B5563;">
        Untuk menyelesaikan proses pendaftaran calon santri, mohon siapkan dokumen berikut sebelum mengisi formulir online:
      </p>
      <ul style="margin: 0 0 16px 0; padding-left: 20px; font-size: 13px; color: #4B5563; line-height: 1.7;">
        <li><strong>Data Calon Santri:</strong> Nama Lengkap, NISN, Tempat &amp; Tanggal Lahir, Asal Sekolah.</li>
        <li><strong>Data Orang Tua / Wali:</strong> Nama Ayah, Ibu, dan Wali serta nomor WhatsApp aktif.</li>
        <li><strong>Pas Foto Calon Santri:</strong> Foto berwarna setengah badan (format JPG/PNG/PDF, maks. 10 MB).</li>
        <li>
          <strong>Bukti Pendaftaran:</strong>
          <div style="margin-top: 4px; font-size: 12px; color: #64748B;">
            &bull; <strong>Non-Yatim:</strong> Bukti transfer Rp 150.000 ke BSI No. Rek <strong>7777365546</strong> a.n. <em>Pondok Pesantren Al Rahmah</em>.<br>
            &bull; <strong>Yatim:</strong> Akta/Surat Keterangan Kematian Ayah dari Dukcapil (Program Beasiswa Penuh).
          </div>
        </li>
      </ul>
    </div>

    <!-- Call to Action Button -->
    <div style="text-align: center; margin: 32px 0 24px 0;">
      <a href="${portalUrl}" target="_blank" style="display: inline-block; background-color: #396E5F; color: #ffffff; font-size: 14px; font-weight: 700; text-decoration: none; padding: 14px 28px; border-radius: 10px; box-shadow: 0 4px 12px rgba(57, 110, 95, 0.25);">
        Masuk &amp; Isi Formulir Pendaftaran &rarr;
      </a>
      <p style="margin: 12px 0 0 0; font-size: 11px; color: #9CA3AF;">
        Atau buka tautan berikut di browser Anda:<br>
        <a href="${portalUrl}" style="color: #396E5F; word-break: break-all;">${portalUrl}</a>
      </p>
    </div>
  `;

  const html = renderBaseEmailLayout({
    title: subject,
    preheader: "Akun Anda berhasil dibuat. Silakan lengkapi formulir pendaftaran santri baru.",
    contentHtml,
  });

  return { subject, html };
}

