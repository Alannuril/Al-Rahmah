import { NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/lib/email/mailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, portalUrl } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { ok: false, error: "Alamat email tidak valid." },
        { status: 400 }
      );
    }

    const host = request.headers.get("host");
    const proto = request.headers.get("x-forwarded-proto") || "http";
    const origin = `${proto}://${host}`;
    const targetPortalUrl = portalUrl || `${origin}/psb`;

    const result = await sendWelcomeEmail({
      email: email.trim(),
      name: name?.trim(),
      portalUrl: targetPortalUrl,
    });

    return NextResponse.json({ ok: true, result });
  } catch (err: unknown) {
    console.error("API /api/email/welcome error:", err);
    return NextResponse.json(
      { ok: false, error: (err as Error)?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

