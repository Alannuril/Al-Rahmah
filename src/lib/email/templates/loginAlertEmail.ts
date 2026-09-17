import { renderBaseEmailLayout } from "./baseLayout";

export interface LoginAlertEmailData {
  name?: string;
  email: string;
  loginTime?: string;
  device?: string;
  portalUrl?: string;
}

export function renderLoginAlertEmail({
  name,
  email,
  loginTime = new Date().toLocaleString("id-ID", {
    dateStyle: "full",
    timeStyle: "medium",
  }),
  device = "Browser Web",
  portalUrl = "http://localhost:3000/psb/daftar",
}: LoginAlertEmailData): { subject: string; html: string } {
  const displayName = name && name.trim().length > 0 ? name.trim() : "Bapak/Ibu Calon Wali Santri";
  const subject = "Pemberitahuan Masuk Akun - Portal E-PSB Al-Rahmah";

  const contentHtml = `
    <!-- Announcement -->
    <div style="margin-bottom: 20px;">
      <p style="margin: 0 0 10px 0; font-size: 15px; color: #374151;">
        Halo <strong>${displayName}</strong>,
      </p>
      <p style="margin: 0; font-size: 13px; color: #4B5563; line-height: 1.6;">
        Kami mendeteksi adanya aktivitas masuk (login) yang berhasil ke akun Portal E-PSB Pondok Pesantren Al-Rahmah Anda.
      </p>
    </div>

    <!-- Login Details Box -->
    <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 18px; margin-bottom: 24px;">
      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="6" style="font-size: 13px; color: #334155;">
        <tr>
          <td width="35%" style="color: #64748B;">Alamat Email:</td>
          <td style="font-weight: 600; font-family: monospace;">${email}</td>
        </tr>
        <tr>
          <td style="color: #64748B;">Waktu Masuk:</td>
          <td style="font-weight: 600;">${loginTime} WIB</td>
        </tr>
        <tr>
          <td style="color: #64748B;">Perangkat / Klien:</td>
          <td style="font-weight: 600;">${device}</td>
        </tr>
      </table>
    </div>

    <p style="margin: 0 0 20px 0; font-size: 13px; color: #64748B; line-height: 1.6;">
      Jika aktivitas ini dilakukan oleh Anda, Anda tidak perlu melakukan tindakan apapun. Namun jika Anda tidak merasa melakukan aktivitas ini, mohon segera hubungi panitia melalui kontak di bawah.
    </p>

    <!-- Button -->
    <div style="text-align: center; margin: 24px 0 16px 0;">
      <a href="${portalUrl}" target="_blank" style="display: inline-block; background-color: #396E5F; color: #ffffff; font-size: 13px; font-weight: 700; text-decoration: none; padding: 12px 24px; border-radius: 8px;">
        Buka Portal E-PSB &rarr;
      </a>
    </div>
  `;

  const html = renderBaseEmailLayout({
    title: subject,
    preheader: "Pemberitahuan masuk akun ke Portal E-PSB Al-Rahmah.",
    contentHtml,
  });

  return { subject, html };
}

