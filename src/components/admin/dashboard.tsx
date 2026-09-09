"use client";

/**
 * ============================================================
 *  TABLEAU DE BORD ADMIN — لوحة الإدارة
 * ------------------------------------------------------------
 *  تبويبان :
 *  • « المسجلون » : إحصائيات + بحث + تصفية + حالات + CSV
 *  • « الوسائط » : روابط الفيديو والصور مباشرة بدون برمجة
 * ============================================================
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  RefreshCw,
  LogOut,
  Download,
  Search,
  Trash2,
  BadgeCheck,
  CalendarDays,
  MapPin,
  Phone,
  Mail,
  UserRound,
  BriefcaseMedical,
  MessageSquareText,
  AlertCircle,
  Inbox,
  ClipboardList,
  Video,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { WhatsAppIcon } from "@/components/landing/brand";
import { CONTACT } from "@/lib/course-data";
import { MediaManager } from "./media-manager";

/* ------------------- Types & constantes ------------------- */

interface RegistrationRow {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  profession: string;
  city: string | null;
  level: string;
  message: string | null;
  status: string;
  adminNote: string | null;
  source: string;
  createdAt: string;
  updatedAt: string;
}

interface Stats {
  total: number;
  nouveau: number;
  contacte: number;
  confirme: number;
  paye: number;
  annule: number;
  last7: number;
}

const STATUSES: { value: string; label: string; badge: string; dot: string }[] = [
  { value: "nouveau", label: "جديد", badge: "bg-blue-50 text-blue-800 border-blue-200", dot: "bg-blue-500" },
  { value: "contacte", label: "تم الاتصال", badge: "bg-amber-50 text-amber-800 border-amber-200", dot: "bg-amber-500" },
  { value: "confirme", label: "مؤكد", badge: "bg-green-50 text-green-800 border-green-200", dot: "bg-green-600" },
  { value: "paye", label: "مدفوع", badge: "bg-gold-100/60 text-gold-800 border-gold-300", dot: "bg-gold-500" },
  { value: "annule", label: "ملغى", badge: "bg-red-50 text-red-800 border-red-200", dot: "bg-red-500" },
];

function statusConfig(value: string) {
  return STATUSES.find((s) => s.value === value) ?? STATUSES[0];
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const date = d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const time = d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  return `${date} ${time}`;
}

/** Normalise un numéro algérien vers le format international wa.me */
function waHref(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, "");
  let intl = digits;
  if (intl.startsWith("00")) intl = intl.slice(2);
  if (intl.startsWith("0")) intl = "213" + intl.slice(1);
  else if (!intl.startsWith("213") && intl.length >= 9 && intl.length <= 10) {
    intl = "213" + intl;
  }
  return `https://wa.me/${intl}`;
}

/* ------------------- Composants utilitaires ------------------- */

function StatCard({
  icon: Icon,
  label,
  value,
  active,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={`flex items-center gap-3.5 rounded-2xl border bg-white p-4 text-start shadow-sm transition-all duration-200 ${
        active
          ? "border-gold-400 ring-2 ring-gold-500/30"
          : "border-navy-100 hover:border-gold-300"
      } ${onClick ? "cursor-pointer hover:-translate-y-0.5 hover:shadow-md" : "cursor-default"}`}
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
          active ? "bg-gold-100/70" : "bg-navy-50"
        }`}
      >
        <Icon className={`h-5 w-5 ${active ? "text-gold-600" : "text-navy-500"}`} aria-hidden="true" />
      </span>
      <span className="flex flex-col">
        <span className="font-display text-2xl font-bold leading-none text-navy-950" dir="ltr">
          {value}
        </span>
        <span className="mt-1 text-xs font-semibold text-navy-700/70">{label}</span>
      </span>
    </button>
  );
}

function FieldChip({
  icon: Icon,
  children,
  ltr,
  href,
}: {
  icon?: LucideIcon;
  children: React.ReactNode;
  ltr?: boolean;
  href?: string;
}) {
  const inner = (
    <>
      {Icon && <Icon className="h-3.5 w-3.5 shrink-0 text-navy-400" aria-hidden="true" />}
      <span className="truncate" dir={ltr ? "ltr" : undefined}>{children}</span>
    </>
  );
  const cls =
    "flex min-w-0 items-center gap-1.5 rounded-lg bg-navy-50 px-2.5 py-1.5 text-xs text-navy-800";
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${cls} transition-colors hover:bg-gold-100/60 hover:text-gold-800`}>
      {inner}
    </a>
  ) : (
    <span className={cls}>{inner}</span>
  );
}

/* ------------------- Ligne (tableau et carte) ------------------- */

/** Badge de statut coloré — شارة الحالة */
function StatusBadge({ status }: { status: string }) {
  const st = statusConfig(status);
  return (
    <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.7rem] font-bold ${st.badge}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${st.dot}`} aria-hidden="true" />
      {st.label}
    </span>
  );
}

/** Sélecteur de statut — تغيير الحالة */
function StatusSelect({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="تغيير الحالة"
      className={
        className ??
        "mt-2 block w-full max-w-36 cursor-pointer rounded-lg border border-navy-200 bg-white px-2 py-1.5 text-xs font-semibold text-navy-800 outline-none focus:border-gold-500"
      }
    >
      {STATUSES.map((s) => (
        <option key={s.value} value={s.value}>{s.label}</option>
      ))}
    </select>
  );
}

/** Champ de note interne avec bouton « حفظ » — ملاحظة داخلية */
function NoteField({
  rowId,
  initial,
  onNote,
  className,
}: {
  rowId: string;
  initial: string | null;
  onNote: (id: string, note: string) => Promise<void>;
  className?: string;
}) {
  const [note, setNote] = useState(initial ?? "");
  const [saving, setSaving] = useState(false);
  const dirty = note !== (initial ?? "");
  const inputCls =
    className ??
    "w-full min-w-32 max-w-48 rounded-lg border border-navy-200 bg-white px-2.5 py-1.5 text-xs text-navy-800 outline-none placeholder:text-navy-300 focus:border-gold-500";

  return (
    <div className="flex items-center gap-1.5">
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="ملاحظة داخلية…"
        className={inputCls}
      />
      {dirty && (
        <button
          type="button"
          onClick={async () => {
            setSaving(true);
            await onNote(rowId, note);
            setSaving(false);
          }}
          disabled={saving}
          className="shrink-0 rounded-lg bg-navy-900 px-2.5 py-1.5 text-[0.7rem] font-bold text-white transition-colors hover:bg-gold-600 disabled:opacity-50"
        >
          {saving ? "…" : "حفظ"}
        </button>
      )}
    </div>
  );
}

/** Ligne du tableau (desktop) — صف الجدول */
function TableRow({
  row,
  onStatus,
  onNote,
  onDelete,
}: {
  row: RegistrationRow;
  onStatus: (id: string, status: string) => void;
  onNote: (id: string, note: string) => Promise<void>;
  onDelete: (id: string) => void;
}) {
  return (
    <tr className="border-b border-navy-100/70 transition-colors last:border-0 hover:bg-gold-50/40">
      <td className="whitespace-nowrap px-4 py-3 text-xs text-navy-600" dir="ltr">
        {formatDate(row.createdAt)}
      </td>
      <td className="px-4 py-3">
        <span className="font-bold text-navy-950">{row.name}</span>
        {row.message && (
          <details className="group mt-1">
            <summary className="cursor-pointer list-none text-[0.7rem] font-semibold text-gold-700 hover:underline">
              رسالة المسجل…
            </summary>
            <p className="mt-1 max-w-56 rounded-lg bg-navy-50 p-2 text-[0.72rem] leading-relaxed text-navy-700">
              {row.message}
            </p>
          </details>
        )}
      </td>
      <td className="px-4 py-3">
        <a
          href={waHref(row.phone)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#25D366]/10 px-2.5 py-1.5 text-xs font-bold text-[#128C7E] transition-colors hover:bg-[#25D366]/20"
          dir="ltr"
          title="مراسلة على واتساب"
        >
          <WhatsAppIcon className="h-3.5 w-3.5" />
          {row.phone}
        </a>
        {row.email && (
          <span className="mt-1 block text-[0.72rem] text-navy-500" dir="ltr">{row.email}</span>
        )}
      </td>
      <td className="px-4 py-3 text-xs text-navy-800">
        {row.profession}
        {row.city && <span className="mt-0.5 block text-navy-500">{row.city}</span>}
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={row.status} />
        <StatusSelect value={row.status} onChange={(v) => onStatus(row.id, v)} />
      </td>
      <td className="px-4 py-3">
        <NoteField rowId={row.id} initial={row.adminNote} onNote={onNote} />
      </td>
      <td className="px-4 py-3 text-center">
        <button
          type="button"
          onClick={() => onDelete(row.id)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-50 hover:text-red-700"
          title="حذف المسجل"
          aria-label={`حذف ${row.name}`}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </td>
    </tr>
  );
}

/** Carte (mobile) — بطاقة الهاتف */
function CardRow({
  row,
  onStatus,
  onNote,
  onDelete,
}: {
  row: RegistrationRow;
  onStatus: (id: string, status: string) => void;
  onNote: (id: string, note: string) => Promise<void>;
  onDelete: (id: string) => void;
}) {
  return (
    <li className="flex flex-col gap-3 rounded-2xl border border-navy-100 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-bold text-navy-950">{row.name}</p>
          <p className="mt-0.5 text-[0.7rem] text-navy-500" dir="ltr">{formatDate(row.createdAt)}</p>
        </div>
        <StatusBadge status={row.status} />
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        <FieldChip icon={Phone} href={waHref(row.phone)} ltr>{row.phone}</FieldChip>
        <FieldChip icon={BriefcaseMedical}>{row.profession}</FieldChip>
        {row.city && <FieldChip icon={MapPin}>{row.city}</FieldChip>}
        {row.email && <FieldChip icon={Mail} ltr>{row.email}</FieldChip>}
      </div>

      {row.message && (
        <details className="rounded-xl bg-navy-50 p-2.5">
          <summary className="cursor-pointer text-[0.72rem] font-bold text-gold-700">رسالة المسجل…</summary>
          <p className="mt-1.5 text-xs leading-relaxed text-navy-700">{row.message}</p>
        </details>
      )}

      <div className="flex items-center gap-2">
        <StatusSelect
          value={row.status}
          onChange={(v) => onStatus(row.id, v)}
          className="flex-1 cursor-pointer rounded-xl border border-navy-200 bg-white px-3 py-2 text-xs font-bold text-navy-800 outline-none focus:border-gold-500"
        />
        <button
          type="button"
          onClick={() => onDelete(row.id)}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-red-500 transition-colors hover:bg-red-50"
          aria-label={`حذف ${row.name}`}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <NoteField
        rowId={row.id}
        initial={row.adminNote}
        onNote={onNote}
        className="flex-1 min-w-0 rounded-xl border border-navy-200 bg-white px-3 py-2 text-xs text-navy-800 outline-none placeholder:text-navy-300 focus:border-gold-500"
      />
    </li>
  );
}

/* ------------------- Onglets ------------------- */

function TabButton({
  active,
  icon: Icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl px-4 text-sm font-extrabold transition-all ${
        active
          ? "bg-navy-900 text-white shadow-md shadow-navy-900/20"
          : "bg-navy-50 text-navy-600 hover:bg-gold-100/60 hover:text-gold-800"
      }`}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  );
}

/* ------------------- Tableau de bord ------------------- */

type Tab = "regs" | "media";

export function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("regs");
  const [rows, setRows] = useState<RegistrationRow[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/registrations", { cache: "no-store" });
      if (res.status === 401) {
        router.refresh();
        return;
      }
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error();
      setRows(data.registrations);
      setStats(data.stats);
    } catch {
      setError("تعذّر تحميل قائمة المسجلين — أعد المحاولة");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (statusFilter && r.status !== statusFilter) return false;
      if (!needle) return true;
      return [r.name, r.phone, r.email, r.city, r.profession]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(needle));
    });
  }, [rows, q, statusFilter]);

  async function updateStatus(id: string, status: string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    const res = await fetch(`/api/admin/registrations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) load();
  }

  async function saveNote(id: string, adminNote: string) {
    const res = await fetch(`/api/admin/registrations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adminNote }),
    });
    if (res.ok) {
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, adminNote } : r)));
    }
  }

  async function removeRow(id: string) {
    if (!window.confirm("هل تريد حقًا حذف هذا المسجل؟ لا يمكن التراجع عن الحذف.")) return;
    const res = await fetch(`/api/admin/registrations/${id}`, { method: "DELETE" });
    if (res.ok) setRows((prev) => prev.filter((r) => r.id !== id));
  }

  function exportCsv() {
    const header = [
      "Date", "Nom", "Téléphone", "Email", "Profession", "Ville",
      "Niveau", "Message", "Statut", "Note interne",
    ];
    const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const lines = [header.map(esc).join(";")];
    for (const r of filtered) {
      lines.push(
        [
          formatDate(r.createdAt), r.name, r.phone, r.email ?? "", r.profession,
          r.city ?? "", r.level, r.message ?? "", statusConfig(r.status).label, r.adminNote ?? "",
        ].map(esc).join(";")
      );
    }
    const blob = new Blob(["\uFEFF" + lines.join("\r\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `inscriptions-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <div className="min-h-screen">
      {/* En-tête */}
      <header className="relative overflow-hidden bg-navy-950">
        <div className="bg-fractal-dark absolute inset-0 opacity-70" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:px-8">
          <div className="min-w-0">
            <h1 className="text-xl font-extrabold text-white sm:text-2xl">
              لوحة إدارة المسجلين
            </h1>
            <p className="mt-1 text-xs text-azure-200/70 sm:text-sm">
              Approches Quantiques Fractales — 1، 2، 3 أكتوبر 2026
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            {tab === "regs" && (
              <button
                type="button"
                onClick={load}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-bold text-azure-100 backdrop-blur-sm transition-all hover:border-gold-500/50 hover:text-gold-300 disabled:opacity-50"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} aria-hidden="true" />
                تحديث
              </button>
            )}
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-bold text-azure-100 backdrop-blur-sm transition-all hover:border-red-400/60 hover:bg-red-500/10 hover:text-red-300"
            >
              <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
              خروج
            </button>
          </div>
        </div>
      </header>

      {/* Barre d'onglets — المسجلون / الوسائط */}
      <nav aria-label="أقسام لوحة التحكم" className="border-b border-navy-100 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          <TabButton
            active={tab === "regs"}
            icon={ClipboardList}
            label="المسجلون"
            onClick={() => setTab("regs")}
          />
          <TabButton
            active={tab === "media"}
            icon={Video}
            label="الوسائط (روابط الفيديو والصور)"
            onClick={() => setTab("media")}
          />
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {tab === "media" ? (
          <MediaManager />
        ) : (
        <>
        {/* Statistiques cliquables (filtres) */}
        {stats && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
            <StatCard icon={UserRound} label="الإجمالي" value={stats.total} active={!statusFilter} onClick={() => setStatusFilter("")} />
            <StatCard icon={Inbox} label="جديد" value={stats.nouveau} active={statusFilter === "nouveau"} onClick={() => setStatusFilter("nouveau")} />
            <StatCard icon={Phone} label="تم الاتصال" value={stats.contacte} active={statusFilter === "contacte"} onClick={() => setStatusFilter("contacte")} />
            <StatCard icon={BadgeCheck} label="مؤكد" value={stats.confirme} active={statusFilter === "confirme"} onClick={() => setStatusFilter("confirme")} />
            <StatCard icon={Download} label="مدفوع" value={stats.paye} active={statusFilter === "paye"} onClick={() => setStatusFilter("paye")} />
            <StatCard icon={Trash2} label="ملغى" value={stats.annule} active={statusFilter === "annule"} onClick={() => setStatusFilter("annule")} />
            <StatCard icon={CalendarDays} label="آخر 7 أيام" value={stats.last7} active={false} />
          </div>
        )}

        {/* Barre d'outils */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <div className="relative min-w-0 flex-1 sm:max-w-xs">
            <Search className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" aria-hidden="true" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="بحث: الاسم، الهاتف، البريد…"
              className="min-h-11 w-full rounded-xl border border-navy-200 bg-white ps-10 pe-4 text-sm text-navy-900 shadow-sm outline-none placeholder:text-navy-300 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
            />
          </div>
          <button
            type="button"
            onClick={exportCsv}
            disabled={filtered.length === 0}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-navy-200 bg-white px-4 text-sm font-bold text-navy-800 shadow-sm transition-all hover:border-gold-400 hover:text-gold-700 disabled:opacity-40"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            تصدير CSV ({filtered.length})
          </button>
          {error && (
            <p role="alert" className="flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-xs font-bold text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              {error}
            </p>
          )}
        </div>

        {/* Liste */}
        {loading && rows.length === 0 ? (
          <div className="mt-8 flex flex-col items-center gap-3 py-16 text-navy-400">
            <RefreshCw className="h-7 w-7 animate-spin" aria-hidden="true" />
            <p className="text-sm font-semibold">جارٍ تحميل المسجلين…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-8 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-navy-200 bg-white py-16 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-100/60">
              <Inbox className="h-7 w-7 text-gold-600" aria-hidden="true" />
            </span>
            <p className="text-base font-bold text-navy-800">
              {rows.length === 0 ? "لا يوجد مسجلون بعد" : "لا توجد نتائج مطابقة للبحث"}
            </p>
            <p className="max-w-sm text-xs leading-relaxed text-navy-500">
              {rows.length === 0
                ? "سيظهر هنا كل من أرسل نموذج التسجيل من الصفحة الرئيسية."
                : "جرّب تغيير كلمة البحث أو تصفية حالة أخرى."}
            </p>
          </div>
        ) : (
          <>
            {/* Tableau desktop */}
            <div className="mt-5 hidden overflow-x-auto rounded-2xl border border-navy-100 bg-white shadow-sm lg:block">
              <table className="w-full min-w-[980px] text-sm">
                <thead>
                  <tr className="border-b border-navy-100 bg-navy-50/70 text-[0.72rem] font-bold text-navy-600">
                    <th className="px-4 py-3 text-start">التاريخ</th>
                    <th className="px-4 py-3 text-start">الاسم</th>
                    <th className="px-4 py-3 text-start">الهاتف / البريد</th>
                    <th className="px-4 py-3 text-start">المهنة / المدينة</th>
                    <th className="px-4 py-3 text-start">الحالة</th>
                    <th className="px-4 py-3 text-start">ملاحظة</th>
                    <th className="px-4 py-3 text-center">حذف</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row) => (
                    <TableRow
                      key={row.id}
                      row={row}
                      onStatus={updateStatus}
                      onNote={saveNote}
                      onDelete={removeRow}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cartes mobile */}
            <ul className="mt-5 flex flex-col gap-3 lg:hidden">
              {filtered.map((row) => (
                <CardRow
                  key={row.id}
                  row={row}
                  onStatus={updateStatus}
                  onNote={saveNote}
                  onDelete={removeRow}
                />
              ))}
            </ul>

            <p className="mt-4 text-center text-[0.7rem] text-navy-400">
              {filtered.length} من أصل {rows.length} مسجلًا — كل بطاقة تُفتح مباشرة في واتساب عبر رقمها
            </p>
          </>
        )}

        {/* Rappel contact */}
        <p className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-navy-500">
          <MessageSquareText className="h-3.5 w-3.5 shrink-0 text-gold-600" aria-hidden="true" />
          لتنبيه الفريق: رسائل النموذج تصلك أيضًا على واتساب {CONTACT.whatsappDisplay}
        </p>
        </>
        )}
      </main>
    </div>
  );
}
