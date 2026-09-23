import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import { renderWelcomeEmail, type WelcomeEmailData } from "./templates/welcomeEmail";
import { renderLoginAlertEmail, type LoginAlertEmailData } from "./templates/loginAlertEmail";

export interface SendMailResult {
  success: boolean;
  messageId?: string;
  error?: string;
  reason?: string;
  simulated?: boolean;
}

/**
 * Returns a configured nodemailer transporter.
 */
function getTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER || "alrahmahwalantaka@gmail.com";
  const pass = (process.env.SMTP_PASS || "").trim();

  return {
    isConfigured: Boolean(user && pass),
    transporter: nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    }),
    from: process.env.SMTP_FROM || `"Pondok Pesantren Al-Rahmah" <${user}>`,
  };
}

/**
 * Helper to get the embedded logo attachment for CID usage
 */
function getLogoAttachment() {
  const logoPath = path.join(process.cwd(), "public/images/logoAl-rahmah.jpeg");
  if (fs.existsSync(logoPath)) {
    return [
      {
        filename: "logoAl-rahmah.jpeg",
        path: logoPath,
        cid: "logo-alrahmah",
      },
    ];
  }
  return [];
}

/**
 * Generic email sender with error tolerance
 */
async function sendMail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<SendMailResult> {
  const { isConfigured, transporter, from } = getTransporter();

  if (!isConfigured) {
    console.warn(
      `[EmailService] ⚠️ SMTP_PASS belum dikonfigurasi di .env.local.\n` +
      `[EmailService] Email untuk '${to}' dengan subjek '${subject}' disimulasikan (tidak terkirim nyata sampai SMTP_PASS diisi).`
    );
    return {
      success: false,
      reason: "SMTP_PASS_NOT_CONFIGURED",
      simulated: true,
    };
  }

  try {
    const attachments = getLogoAttachment();
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html,
      attachments,
    });

    console.log(`[EmailService] ✅ Email berhasil terkirim ke '${to}' [ID: ${info.messageId}]`);
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error: unknown) {
    const errMsg = (error as Error)?.message || "Gagal mengirim email";
    console.error(`[EmailService] ❌ Gagal mengirim email ke '${to}':`, errMsg);
    return {
      success: false,
      error: errMsg,
    };
  }
}

/**
 * Send welcome email to newly registered user
 */
export async function sendWelcomeEmail(data: WelcomeEmailData): Promise<SendMailResult> {
  const { subject, html } = renderWelcomeEmail(data);
  return sendMail({
    to: data.email,
    subject,
    html,
  });
}


/**
 * Send login alert notification email
 */
export async function sendLoginAlertEmail(data: LoginAlertEmailData): Promise<SendMailResult> {
  const { subject, html } = renderLoginAlertEmail(data);
  return sendMail({
    to: data.email,
    subject,
    html,
  });
}

/**
 * Verifies SMTP connection directly
 */
export async function verifySmtpConnection(): Promise<{ ok: boolean; message: string }> {
  const { isConfigured, transporter } = getTransporter();
  if (!isConfigured) {
    return {
      ok: false,
      message: "SMTP_PASS belum diisi di file .env.local. Buat App Password di Akun Google Anda terlebih dahulu.",
    };
  }

  try {
    await transporter.verify();
    return {
      ok: true,
      message: "Koneksi SMTP Gmail berhasil diverifikasi! Sistem siap mengirim email.",
    };
  } catch (err: unknown) {
    return {
      ok: false,
      message: (err as Error)?.message || "Gagal menghubungkan ke server SMTP Gmail.",
    };
  }
}

