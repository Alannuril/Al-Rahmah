import { NextResponse } from "next/server";
import { sendPsbReceiptEmail } from "@/lib/email/mailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      registrationId,
      namaSantri,
      tingkat,
      keterangan,
      nisn,
      namaOrangTua,
      noHp,
      email,
      tanggal,
      portalUrl,
    } = body;

    if (!email || !namaSantri || !registrationId) {
      return NextResponse.json(
        { ok: false, error: "Data pendaftaran tidak lengkap." },
        { status: 400 }
      );
    }

    const host = request.headers.get("host");
    const proto = request.headers.get("x-forwarded-proto") || "http";
    const origin = `${proto}://${host}`;
    const targetPortalUrl = portalUrl || `${origin}/psb/daftar`;

    const result = await sendPsbReceiptEmail({
      registrationId,
      namaSantri,
      tingkat: tingkat || "MTs",
      keterangan: keterangan || "NON YATIM",
      nisn: nisn || "-",
      namaOrangTua: namaOrangTua || "-",
      noHp: noHp || "-",
      email: email.trim(),
      tanggal,
      portalUrl: targetPortalUrl,
    });

    return NextResponse.json({ ok: true, result });
  } catch (err: unknown) {
    console.error("API /api/email/psb-receipt error:", err);
    return NextResponse.json(
      { ok: false, error: (err as Error)?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

