import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "Tidak ada file yang diunggah." },
        { status: 400 }
      );
    }

    // Validasi tipe file
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: "Format file tidak didukung. Harap unggah format JPG, PNG, atau WEBP.",
        },
        { status: 400 }
      );
    }

    // Validasi ukuran file (maksimal 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: "Ukuran file terlalu besar. Maksimal ukuran adalah 5 MB.",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Tentukan direktori penyimpanan
    const targetDir = path.join(process.cwd(), "public", "images", "psb");
    await mkdir(targetDir, { recursive: true });

    // Generate nama file yang unik dan bersih
    const originalExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const cleanExt = ["png", "jpg", "jpeg", "webp"].includes(originalExt)
      ? originalExt
      : "jpg";
    const filename = `flyer-psb-${Date.now()}.${cleanExt}`;
    const filePath = path.join(targetDir, filename);

    await writeFile(filePath, buffer);

    const publicUrl = `/images/psb/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
    });
  } catch (error) {
    console.error("Error upload file:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Terjadi kesalahan saat mengunggah file. Silakan coba lagi.",
      },
      { status: 500 }
    );
  }
}

