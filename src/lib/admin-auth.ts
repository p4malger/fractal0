/**
 * ============================================================
 *  AUTHENTIFICATION ADMIN — مصادقة لوحة الإدارة
 * ------------------------------------------------------------
 *  Protection de /admin et des routes /api/admin/*.
 *  • Mot de passe : variable d'environnement ADMIN_PASSWORD (.env)
 *    ⚠️ غيّر كلمة المرور من ملف .env ثم أعد تشغيل الخادم
 *  • Session : cookie httpOnly signé HMAC-SHA256 (7 jours)
 *  • Anti-force-brute : 5 tentatives / 10 minutes par IP
 * ============================================================
 */
import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export const ADMIN_COOKIE = "gha_admin";
const SESSION_SECONDS = 7 * 24 * 60 * 60; // 7 jours
const MAX_ATTEMPTS = 5;
const LOCK_MS = 10 * 60 * 1000; // 10 minutes

/** Mot de passe admin (définit dans .env) */
function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "GoHealthy2026!Admin";
}

/** Signe une charge utile avec HMAC-SHA256 dérivé du mot de passe */
function sign(payload: string): string {
  return createHmac("sha256", getAdminPassword()).update(payload).digest("hex");
}

/** Comparaison en temps constant de deux chaînes */
function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

export function checkPassword(password: string): boolean {
  return safeEqual(password, getAdminPassword());
}

/** Crée un jeton de session signé : admin.<expiry>.<hmac> */
export function createSessionToken(): { token: string; maxAge: number } {
  const expiry = Date.now() + SESSION_SECONDS * 1000;
  const payload = `admin.${expiry}`;
  return { token: `${payload}.${sign(payload)}`, maxAge: SESSION_SECONDS };
}

/** Vérifie un jeton de session (format, signature, expiration) */
export function verifySessionToken(token?: string | null): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [prefix, expiryStr, signature] = parts;
  if (prefix !== "admin") return false;
  const expiry = Number(expiryStr);
  if (!Number.isFinite(expiry) || expiry < Date.now()) return false;
  return safeEqual(signature, sign(`admin.${expiryStr}`));
}

/** Vérifie la session depuis les cookies (composants serveur) */
export async function isAdminSession(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(ADMIN_COOKIE)?.value);
}

/** Vérifie la session depuis une requête (routes API) */
export function isAdminRequest(req: NextRequest): boolean {
  return verifySessionToken(req.cookies.get(ADMIN_COOKIE)?.value);
}

/* ------------------- Anti force-brute (en mémoire) ------------------- */

const attempts = new Map<string, { count: number; lockedUntil: number }>();

export function isLoginBlocked(ip: string): boolean {
  const entry = attempts.get(ip);
  if (!entry) return false;
  if (entry.lockedUntil > Date.now()) return true;
  if (entry.lockedUntil <= Date.now() && entry.lockedUntil !== 0) {
    attempts.delete(ip); // le verrou est expiré
  }
  return false;
}

export function recordLoginFailure(ip: string): void {
  const entry = attempts.get(ip) ?? { count: 0, lockedUntil: 0 };
  entry.count += 1;
  if (entry.count >= MAX_ATTEMPTS) {
    entry.lockedUntil = Date.now() + LOCK_MS;
    entry.count = 0;
  }
  attempts.set(ip, entry);
}

export function clearLoginFailures(ip: string): void {
  attempts.delete(ip);
}

/** Extrait l'IP cliente (best-effort) */
export function clientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}
