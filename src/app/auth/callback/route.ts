import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendWelcomeEmail } from "@/lib/email/mailer";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/psb/daftar";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user?.email) {
          const createdAt = new Date(user.created_at).getTime();
          // If created within the last 2 minutes, consider it a new registration
          const isNewUser = Math.abs(Date.now() - createdAt) < 120 * 1000;
          if (isNewUser) {
            sendWelcomeEmail({
              email: user.email,
              name:
                user.user_metadata?.full_name ||
                user.user_metadata?.name ||
                "",
              portalUrl: `${origin}${next}`,
            }).catch((e) =>
              console.warn("Failed to send welcome email for OAuth user:", e)
            );
          }
        }
      } catch (userErr) {
        console.warn("Error checking user for welcome email:", userErr);
      }

      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // If there was an error or no code, redirect back to login
  return NextResponse.redirect(`${origin}/psb/login?error=oauth_failed`);
}

