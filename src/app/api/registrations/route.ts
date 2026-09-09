/**
 * ============================================================
 *  POST /api/registrations — enregistrement public
 *  حفظ بيانات نموذج التسجيل في قاعدة البيانات
 * ------------------------------------------------------------
 *  • Appelé par le formulaire d'inscription (silencieux, sans
 *    bloquer l'envoi WhatsApp qui s'ouvre en parallèle).
 *  • Dédupliqué par téléphone : si le même numéro se réinscrit
 *    (bouton « Modifier ma demande »), la fiche est mise à jour
 *    au lieu d'être dupliquée — الحالة وملاحظة الإدارة محفوظة.
 * ============================================================
 */
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const MAX_LEN = {
  name: 120,
  phone: 30,
  email: 190,
  profession: 90,
  city: 90,
  level: 120,
  message: 1500,
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
    }

    const str = (v: unknown, max: number): string =>
      typeof v === "string" ? v.trim().slice(0, max) : "";

    const name = str(body.name, MAX_LEN.name);
    const phoneRaw = str(body.phone, MAX_LEN.phone);
    const email = str(body.email, MAX_LEN.email);
    const profession = str(body.profession, MAX_LEN.profession);
    const city = str(body.city, MAX_LEN.city);
    const level =
      str(body.level, MAX_LEN.level) || "Formation complète — Niveaux 1, 2 et 2+";
    const message = str(body.message, MAX_LEN.message);

    // Validation minimale (identique au formulaire côté client)
    if (name.length < 3) {
      return NextResponse.json({ ok: false, error: "invalid_name" }, { status: 400 });
    }
    const phoneDigits = phoneRaw.replace(/[^0-9]/g, "");
    if (phoneDigits.length < 9) {
      return NextResponse.json({ ok: false, error: "invalid_phone" }, { status: 400 });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
    }
    if (!profession) {
      return NextResponse.json({ ok: false, error: "invalid_profession" }, { status: 400 });
    }

    // Dédupliqué par numéro de téléphone (digits)
    const existing = await db.registration.findFirst({
      where: { phone: { contains: phoneDigits } },
      orderBy: { createdAt: "desc" },
    });

    if (existing) {
      const updated = await db.registration.update({
        where: { id: existing.id },
        data: {
          name,
          phone: phoneRaw,
          email: email || null,
          profession,
          city: city || null,
          level,
          message: message || null,
        },
      });
      return NextResponse.json({ ok: true, id: updated.id, updated: true });
    }

    const created = await db.registration.create({
      data: {
        name,
        phone: phoneRaw,
        email: email || null,
        profession,
        city: city || null,
        level,
        message: message || null,
        source: "site",
      },
    });
    return NextResponse.json({ ok: true, id: created.id, updated: false }, { status: 201 });
  } catch (err) {
    console.error("[api/registrations] erreur :", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
