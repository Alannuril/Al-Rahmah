import { NextResponse } from "next/server";
import { verifySmtpConnection, sendWelcomeEmail } from "@/lib/email/mailer";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetEmail = searchParams.get("to");

  const smtpCheck = await verifySmtpConnection();

  if (targetEmail) {
    const testResult = await sendWelcomeEmail({
      email: targetEmail,
      name: "Uji Coba Sistem Notifikasi",
    });
    return NextResponse.json({
      smtpCheck,
      sendTestResult: testResult,
    });
  }

  return NextResponse.json({
    smtpCheck,
    instruction:
      "Untuk menguji kirim email nyata, tambahkan parameter query '?to=email_anda@gmail.com' pada URL ini.",
    environment: {
      SMTP_HOST: process.env.SMTP_HOST || "smtp.gmail.com (default)",
      SMTP_PORT: process.env.SMTP_PORT || "465 (default)",
      SMTP_USER: process.env.SMTP_USER || "alrahmahwalantaka@gmail.com",
      SMTP_PASS_IS_SET: Boolean(process.env.SMTP_PASS && process.env.SMTP_PASS.trim().length > 0),
    },
  });
}

