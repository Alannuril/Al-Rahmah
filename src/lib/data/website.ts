import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { resolveWebsiteInfo } from "@/lib/utils/websiteInfo";
import { parsePsbSettings } from "@/lib/utils/psbHelper";

// Share a request's settings between the footer and other server sections.
export const getWebsiteInfo = cache(async () => {
  try {
    const supabase = await createClient();
    const [website, psb] = await Promise.all([
      supabase.from("pengaturan_website").select("*").limit(1).maybeSingle(),
      supabase.from("psb_settings").select("*").limit(1).maybeSingle(),
    ]);
    return resolveWebsiteInfo(website.data, parsePsbSettings(psb.data).kontak_panitia);
  } catch {
    return resolveWebsiteInfo();
  }
});
