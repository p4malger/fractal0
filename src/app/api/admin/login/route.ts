/**
 * POST /api/admin/login — connexion à la page d'administration
 * تسجيل الدخول إلى لوحة الإدارة (5 محاولات كل 10 دقائق)
 */
import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  checkPassword,
  clearLoginFailures,
  clientIp,
  createSessionToken,
  isLoginBlocked,
  recordLoginFailure,
} from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const ip = clientIp(req);

  if (isLoginBlocked(ip)) {
    return NextResponse.json(
      { ok: false, error: "blocked", message: "تم تجاوز عدد المحاولات — أعد المحاولة بعد 10 دقائق" },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";

  if (!password || !checkPassword(password)) {
    recordLoginFailure(ip);
    return NextResponse.json(
      { ok: false, error: "invalid_password", message: "كلمة المرور غير صحيحة" },
      { status: 401 }
    );
  }

  clearLoginFailures(ip);
  const { token, maxAge } = createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });
  return res;
}
