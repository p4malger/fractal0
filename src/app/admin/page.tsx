/**
 * /admin — page serveur : affiche la connexion ou le tableau de bord
 * حسب حالة الجلسة: شاشة تسجيل الدخول أو لوحة المسجلين
 */
import { isAdminSession } from "@/lib/admin-auth";
import { AdminLogin } from "@/components/admin/login";
import { AdminDashboard } from "@/components/admin/dashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = await isAdminSession();
  return authed ? <AdminDashboard /> : <AdminLogin />;
}
