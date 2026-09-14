import { createClient } from "@/lib/supabase/client";

export const PSB_BUCKET = "psb-uploads";
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function uploadPsbFile(
  file: File,
  folder: "bukti" | "foto",
  userId: string
): Promise<string> {
  // 1. Validation size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `Ukuran file "${file.name}" melebihi batas maksimal 10 MB (${(file.size / (1024 * 1024)).toFixed(1)} MB).`
    );
  }

  // 2. Validation type
  const isImage = file.type.startsWith("image/");
  const isPdf = file.type === "application/pdf";
  if (!isImage && !isPdf) {
    throw new Error(
      `Format file "${file.name}" tidak didukung. Mohon unggah file format gambar (JPG, PNG, WEBP) atau PDF.`
    );
  }

  const supabase = createClient();

  // 3. Generate sanitized path
  const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const timestamp = Date.now();
  const filePath = `${folder}/${userId}_${timestamp}_${sanitizedFileName}`;

  // 4. Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from(PSB_BUCKET)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    console.error("Storage upload error:", error);
    // Provide a clear explanation in case the bucket is missing
    if (error.message.includes("Bucket not found") || error.message.includes("does not exist")) {
      throw new Error(
        `Bucket storage "${PSB_BUCKET}" belum dibuat di Supabase. Silakan buat bucket "${PSB_BUCKET}" dengan akses public di Supabase Dashboard.`
      );
    }
    throw new Error(`Gagal mengunggah file: ${error.message}`);
  }

  // 5. Get Public URL
  const { data: urlData } = supabase.storage
    .from(PSB_BUCKET)
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}

