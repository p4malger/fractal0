/**
 * PATCH /api/admin/registrations/[id] — mise à jour (statut, note)
 * DELETE /api/admin/registrations/[id] — suppression
 * تحديث الحالة أو الملاحظة / حذف مسجل (محمي بكلمة المرور)
 */
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdminRequest } from "@/lib/admin-auth";

const ALLOWED_STATUSES = ["nouveau", "contacte", "confirme", "paye", "annule"];

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const { id } = await params;

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const data: { status?: string; adminNote?: string } = {};
  if (typeof body.status === "string") {
    if (!ALLOWED_STATUSES.includes(body.status)) {
      return NextResponse.json({ ok: false, error: "invalid_status" }, { status: 400 });
    }
    data.status = body.status;
  }
  if (typeof body.adminNote === "string") {
    data.adminNote = body.adminNote.trim().slice(0, 2000) || null;
  }
  if (Object.keys(data).length === 0) {
    return NextResponse.json({ ok: false, error: "empty_update" }, { status: 400 });
  }

  try {
    const updated = await db.registration.update({
      where: { id },
      data,
    });
    return NextResponse.json({ ok: true, registration: updated });
  } catch {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const { id } = await params;

  try {
    await db.registration.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }
}
