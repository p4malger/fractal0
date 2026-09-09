/**
 * GET  /api/admin/media — médias actuels (bruts) + valeurs par défaut
 * PUT  /api/admin/media — enregistre les liens vidéos + images
 * DELETE /api/admin/media — réinitialise aux valeurs par défaut
 * إدارة روابط الفيديو والصور (محمي بكلمة مرور المدير)
 */
import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import {
  getRawMedia,
  saveSiteMedia,
  resetSiteMedia,
  MAX_VIDEOS,
} from "@/lib/media-store";
import { IMAGES } from "@/lib/course-data";

export const dynamic = "force-dynamic";

const unauthorized = () =>
  NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) return unauthorized();
  try {
    const raw = await getRawMedia();
    return NextResponse.json({
      ok: true,
      videos: raw.videos,
      images: raw.images,
      imageDefaults: IMAGES,
      maxVideos: MAX_VIDEOS,
    });
  } catch (err) {
    console.error("[api/admin/media] GET erreur :", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!isAdminRequest(req)) return unauthorized();
  try {
    const body = await req.json();
    await saveSiteMedia(body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof Error && err.message === "too_many_videos") {
      return NextResponse.json(
        { ok: false, error: "too_many_videos", maxVideos: MAX_VIDEOS },
        { status: 400 }
      );
    }
    console.error("[api/admin/media] PUT erreur :", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAdminRequest(req)) return unauthorized();
  try {
    await resetSiteMedia();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/admin/media] DELETE erreur :", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
