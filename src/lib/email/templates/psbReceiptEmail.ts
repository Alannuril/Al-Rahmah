import { renderBaseEmailLayout } from "./baseLayout";

export interface PsbReceiptEmailData {
  registrationId: string | number;
  namaSantri: string;
  tingkat: string;
  keterangan: string;
  nisn?: string;
  namaOrangTua?: string;
  noHp?: string;
  email: string;
  tanggal?: string;
  portalUrl?: string;
}

export function renderPsbReceiptEmail({
  registrationId,
  namaSantri,
  tingkat,
  keterangan,
  nisn = "-",
  namaOrangTua = "-",
  noHp = "-",
  tanggal = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  portalUrl = "http://localhost:3000/psb/daftar",
}: PsbReceiptEmailData): { subject: string; html: string } {
  const cleanId = String(registrationId).length > 8 ? String(registrationId).slice(0, 8).toUpperCase() : String(registrationId);
  const formattedRegNo = `#PSB-${cleanId}`;
  const subject = `Bukti Pendaftaran Santri Baru ${formattedRegNo} - ${namaSantri.toUpperCase()} | PP Al-Rahmah`;

  const contentHtml = `
    <!-- Top Announcement -->
    <div style="margin-bottom: 24px;">
      <div style="display: inline-block; background-color: #E8F5E9; color: #2E7D32; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">
        &#10003; Berkas Pendaftaran Berhasil Dikirim
      </div>
      <p style="margin: 0 0 10px 0; font-size: 15px; color: #374151;">
        Alhamdulillah, data pendaftaran calon santri baru atas nama <strong>${namaSantri.toUpperCase()}</strong> telah berhasil tersimpan dalam sistem E-PSB Pondok Pesantren Al-Rahmah.
      </p>
      <p style="margin: 0; font-size: 13px; color: #6B7280; line-height: 1.6;">
        Email ini berfungsi sebagai tanda bukti resmi penerimaan berkas pendaftaran santri baru untuk Tahun Ajaran 2026/2027.
      </p>
    </div>

    <!-- Official Registration Receipt Card -->
    <div style="background-color: #FAFCFB; border: 1.5px solid #D5E5DE; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 14px; border-bottom: 1px dashed #D5E5DE; padding-bottom: 12px;">
        <tr>
          <td>
            <span style="font-size: 11px; font-weight: 700; color: #6B7280; text-transform: uppercase; letter-spacing: 1px;">Nomor Registrasi</span>
            <div style="font-size: 18px; font-weight: 800; color: #1E3D34; font-family: monospace; letter-spacing: 1px; margin-top: 2px;">
              ${formattedRegNo}
            </div>
          </td>
          <td align="right" valign="top">
            <span style="display: inline-block; background: #396E5F; color: #ffffff; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 8px;">
              ${tingkat}
            </span>
          </td>
        </tr>
      </table>

      <!-- Table Details -->
      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="6" style="font-size: 13px; color: #374151;">
        <tr>
          <td width="38%" style="color: #6B7280; padding-left: 0;">Nama Lengkap:</td>
          <td style="font-weight: 700; color: #1E3D34;">${namaSantri.toUpperCase()}</td>
        </tr>
        <tr>
          <td style="color: #6B7280; padding-left: 0;">NISN:</td>
          <td style="font-weight: 600;">${nisn || "-"}</td>
        </tr>
        <tr>
          <td style="color: #6B7280; padding-left: 0;">Kategori Pendaftar:</td>
          <td>
            <span style="font-weight: 700; color: ${keterangan.toUpperCase().includes("YATIM") && !keterangan.toUpperCase().includes("NON") ? "#0284C7" : "#1E3D34"};">
              ${keterangan}
            </span>
          </td>
        </tr>
        <tr>
          <td style="color: #6B7280; padding-left: 0;">Orang Tua / Wali:</td>
          <td style="font-weight: 600;">${namaOrangTua}</td>
        </tr>
        <tr>
          <td style="color: #6B7280; padding-left: 0;">No. WhatsApp:</td>
          <td style="font-weight: 600;">${noHp}</td>
        </tr>
        <tr>
          <td style="color: #6B7280; padding-left: 0;">Waktu Pengajuan:</td>
          <td style="font-weight: 600; color: #4B5563;">${tanggal}</td>
        </tr>
        <tr>
          <td style="color: #6B7280; padding-left: 0;">Status Berkas:</td>
          <td>
            <span style="display: inline-block; background-color: #FEF3C7; color: #92400E; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 6px;">
              Menunggu Verifikasi Panitia
            </span>
          </td>
        </tr>
      </table>
    </div>

    <!-- Next Stages Workflow -->
    <div style="margin-bottom: 24px;">
      <h2 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 700; color: #1E3D34; text-transform: uppercase; letter-spacing: 0.5px;">
        Tahapan Seleksi Selanjutnya:
      </h2>
      <ol style="margin: 0 0 16px 0; padding-left: 20px; font-size: 13px; color: #4B5563; line-height: 1.7;">
        <li>
          <strong>Verifikasi Dokumen:</strong> Panitia PPSB akan memeriksa kelengkapan bukti pembayaran/akta kematian dan pas foto Anda dalam waktu 1-3 hari kerja.
        </li>
        <li>
          <strong>Konfirmasi &amp; Jadwal Tes:</strong> Panitia akan menghubungi Anda melalui nomor WhatsApp (<strong>${noHp}</strong>) terkait konfirmasi jadwal tes baca Al-Qur'an dan wawancara calon santri.
        </li>
        <li>
          <strong>Pengumuman Kelulusan:</strong> Status hasil seleksi dapat dicek langsung melalui Portal E-PSB Al-Rahmah.
        </li>
      </ol>
    </div>

    <!-- Call to Action Button -->
    <div style="text-align: center; margin: 30px 0 20px 0;">
      <a href="${portalUrl}" target="_blank" style="display: inline-block; background-color: #396E5F; color: #ffffff; font-size: 14px; font-weight: 700; text-decoration: none; padding: 14px 28px; border-radius: 10px; box-shadow: 0 4px 12px rgba(57, 110, 95, 0.25);">
        Pantau Status Pendaftaran Anda &rarr;
      </a>
    </div>

    <div style="background-color: #EFF6FF; border-left: 4px solid #3B82F6; padding: 12px 16px; border-radius: 0 8px 8px 0; margin-top: 20px;">
      <p style="margin: 0; font-size: 12px; color: #1E40AF; line-height: 1.5;">
        <strong>Perhatian:</strong> Jika Anda memiliki pertanyaan atau ingin memperbarui dokumen yang salah diunggah, silakan hubungi kontak panitia melalui nomor WhatsApp yang tertera di bagian bawah email ini.
      </p>
    </div>
  `;

  const html = renderBaseEmailLayout({
    title: subject,
    preheader: `Bukti Pendaftaran ${formattedRegNo} untuk ${namaSantri.toUpperCase()} berhasil dikirimkan.`,
    contentHtml,
  });

  return { subject, html };
}

