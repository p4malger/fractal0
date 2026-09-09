/**
 * GET /api/admin/registrations — liste complète + statistiques
 * قائمة المسجلين الكاملة مع الإحصائيات (محمي بكلمة المرور)
 * Paramètres : ?status=nouveau|contacte|confirme|paye|annule&q=recherche
 */
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdminRequest } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    const status = req.nextUrl.searchParams.get("status") ?? "";
    const q = (req.nextUrl.searchParams.get("q") ?? "").trim();

    // Filtres de recherche (nom / téléphone / email / ville / profession)
    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (q) {
      where.OR = [
        { name: { contains: q } },
        { phone: { contains: q } },
        { email: { contains: q } },
        { city: { contains: q } },
        { profession: { contains: q } },
      ];
    }

    const [registrations, total, nouveau, contacte, confirme, paye, annule, last7] =
      await Promise.all([
        db.registration.findMany({
          where,
          orderBy: { createdAt: "desc" },
        }),
        db.registration.count(),
        db.registration.count({ where: { status: "nouveau" } }),
        db.registration.count({ where: { status: "contacte" } }),
        db.registration.count({ where: { status: "confirme" } }),
        db.registration.count({ where: { status: "paye" } }),
        db.registration.count({ where: { status: "annule" } }),
        db.registration.count({
          where: { createdAt: { gte: new Date(Date.now() - 7 * 86400 * 1000) } },
        }),
      ]);

    return NextResponse.json({
      ok: true,
      registrations,
      stats: { total, nouveau, contacte, confirme, paye, annule, last7 },
    });
  } catch (err) {
    console.error("[api/admin/registrations] erreur :", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
