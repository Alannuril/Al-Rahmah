export interface BaseEmailLayoutOptions {
  title: string;
  preheader?: string;
  contentHtml: string;
}

export function renderBaseEmailLayout({
  title,
  preheader = "Pondok Pesantren Al-Rahmah Walantaka Serang",
  contentHtml,
}: BaseEmailLayoutOptions): string {
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${title}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #F3F6F4;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #1F2937;
      -webkit-font-smoothing: antialiased;
    }
    table {
      border-collapse: collapse;
    }
    img {
      border: 0;
      line-height: 100%;
      outline: none;
      text-decoration: none;
    }
    a {
      color: #396E5F;
      text-decoration: none;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      border: 1px solid #E5EBE8;
    }
    @media only screen and (max-width: 620px) {
      .email-container {
        width: 100% !important;
        border-radius: 0 !important;
        border: none !important;
      }
      .content-padding {
        padding: 24px 20px !important;
      }
      .header-padding {
        padding: 24px 20px 16px 20px !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 30px 12px; background-color: #F3F6F4;">
  <!-- Hidden Preheader -->
  <div style="display: none; font-size: 1px; color: #F3F6F4; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    ${preheader}
  </div>

  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <!-- Main Email Container -->
        <table role="presentation" class="email-container" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; border: 1px solid #E5EBE8;">
          
          <!-- Header Branding -->
          <tr>
            <td align="center" class="header-padding" style="padding: 32px 32px 20px 32px; background: linear-gradient(180deg, #F0F6F3 0%, #ffffff 100%); border-bottom: 1px solid #EEF3F0;">
              <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <!-- Logo Al-Rahmah via CID -->
                    <img src="cid:logo-alrahmah" alt="Logo Al-Rahmah" width="72" height="72" style="display: block; width: 72px; height: 72px; border-radius: 14px; box-shadow: 0 2px 8px rgba(57,110,95,0.15); margin-bottom: 12px; object-fit: contain; background: #ffffff;" />
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <h1 style="margin: 0; font-size: 18px; font-weight: 800; color: #1E3D34; letter-spacing: 0.5px; text-transform: uppercase;">
                      Pondok Pesantren Al-Rahmah
                    </h1>
                    <p style="margin: 4px 0 0 0; font-size: 11px; font-weight: 600; color: #396E5F; letter-spacing: 1.5px; text-transform: uppercase;">
                      Islamic Boarding School Walantaka
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Body Content -->
          <tr>
            <td class="content-padding" style="padding: 32px; font-size: 14px; line-height: 1.6; color: #374151;">
              <!-- Islamic Greeting -->
              <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 600; color: #1E3D34;">
                Assalamu&rsquo;alaikum Warahmatullahi Wabarakatuh,
              </p>

              <!-- Dynamic Body Slot -->
              ${contentHtml}

              <!-- Closing -->
              <div style="margin-top: 28px; padding-top: 20px; border-top: 1px dashed #E5EBE8;">
                <p style="margin: 0; font-size: 13px; color: #4B5563;">
                  Wassalamu&rsquo;alaikum Warahmatullahi Wabarakatuh,
                </p>
                <p style="margin: 6px 0 0 0; font-size: 14px; font-weight: 700; color: #1E3D34;">
                  Panitia Penerimaan Santri Baru (PPSB)<br>
                  <span style="font-size: 12px; font-weight: 500; color: #6B7280;">Pondok Pesantren Al-Rahmah Walantaka</span>
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer Information -->
          <tr>
            <td style="padding: 24px 32px; background-color: #FAFCFB; border-top: 1px solid #EEF3F0; text-align: center;">
              <!-- Panitia Contact Channels -->
              <p style="margin: 0 0 10px 0; font-size: 12px; font-weight: 700; color: #1E3D34; text-transform: uppercase; letter-spacing: 0.5px;">
                Layanan Informasi &amp; Kontak Panitia
              </p>
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 16px;">
                <tr>
                  <td align="center" style="font-size: 12px; color: #4B5563; line-height: 1.8;">
                    <strong>Ust. Hidayatullah:</strong> <a href="https://wa.me/62895401953841" style="color: #396E5F; text-decoration: underline;">+62 895-4019-53841</a><br>
                    <strong>Ust. Muhammad Azis:</strong> <a href="https://wa.me/6289509414409" style="color: #396E5F; text-decoration: underline;">+62 895-0941-4409</a><br>
                    <strong>Ustz. Laily Fauziyah:</strong> <a href="https://wa.me/6289618952845" style="color: #396E5F; text-decoration: underline;">+62 896-1895-2845</a>
                  </td>
                </tr>
              </table>

              <!-- Address & Legal -->
              <p style="margin: 0; font-size: 11px; color: #9CA3AF; line-height: 1.5;">
                Jl. Raya Cikande - Serang KM. 10, Kp. Pasir Manggu, RT.01/RW.01, Cigoong, Walantaka, Kota Serang, Banten 42183
              </p>
              <p style="margin: 8px 0 0 0; font-size: 11px; color: #9CA3AF;">
                &copy; ${new Date().getFullYear()} Pondok Pesantren Al-Rahmah. Seluruh hak cipta dilindungi undang-undang.
              </p>
              <p style="margin: 8px 0 0 0; font-size: 10px; color: #A0AEC0; font-style: italic;">
                Email ini dikirim secara otomatis sebagai tanda konfirmasi resmi. Mohon simpan email ini sebagai referensi Anda.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

