"use client";

/**
 * Connexion à l'espace d'administration — تسجيل الدخول
 * Mot de passe : ADMIN_PASSWORD dans le fichier .env
 */
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock, ShieldCheck, Eye, EyeOff } from "lucide-react";

export function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (!password || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        router.refresh(); // recharge la page serveur → tableau de bord
      } else {
        setError(data.message || "كلمة المرور غير صحيحة");
      }
    } catch {
      setError("تعذّر الاتصال بالخادم — أعد المحاولة");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 p-4">
      <div className="bg-fractal-dark pointer-events-none fixed inset-0 opacity-60" aria-hidden="true" />
      <div className="relative w-full max-w-md">
        <div className="overflow-hidden rounded-3xl border border-gold-500/40 bg-white/95 p-8 shadow-2xl shadow-navy-950/40 backdrop-blur-sm md:p-10">
          <div className="mb-8 flex flex-col items-center gap-4 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-950 shadow-lg">
              <Lock className="h-7 w-7 text-gold-400" aria-hidden="true" />
            </span>
            <div>
              <h1 className="text-2xl font-extrabold text-navy-950">
                لوحة إدارة المسجلين
              </h1>
              <p className="mt-1.5 text-sm text-navy-700/70">
                GO Healthy Academy — Approches Quantiques Fractales
              </p>
              <p className="mt-1 text-xs text-navy-600/60">
                1، 2، 3 أكتوبر 2026 — فندق El Hani، المحمدية، الجزائر
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label htmlFor="admin-password" className="text-sm font-bold text-navy-900">
              كلمة المرور
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                dir="ltr"
                className="min-h-12 w-full rounded-xl border border-navy-200 bg-white px-4 pe-12 text-left text-base text-navy-900 outline-none transition-all placeholder:text-navy-300 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/25"
                placeholder="••••••••••"
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute inset-y-0 end-3 flex items-center text-navy-400 transition-colors hover:text-navy-700"
                aria-label={show ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
              >
                {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {error && (
              <p role="alert" className="rounded-lg bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy || !password}
              className="btn-shine mt-2 inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 px-6 text-base font-bold text-navy-950 shadow-lg shadow-gold-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              {busy ? "جارٍ التحقق…" : "دخول"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs leading-relaxed text-navy-600/60">
            محمي بجلسة آمنة لمدة 7 أيام — 5 محاولات كحد أقصى كل 10 دقائق
          </p>
        </div>
      </div>
    </div>
  );
}
