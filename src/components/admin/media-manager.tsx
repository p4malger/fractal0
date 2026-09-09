"use client";

/**
 * ============================================================
 *  GESTIONNAIRE DE MÉDIAS — تبويب « الوسائط » في لوحة التحكم
 * ------------------------------------------------------------
 *  ✨ الصق روابط الفيديو والصور مباشرة — بدون تعقيدات البرمجة:
 *  • الفيديوهات: الصق رابط يوتيوب (أي شكل) → يُعرض في الصفحة
 *    فورًا مع مصغّرة تلقائية وزر تشغيل مدمج
 *  • الروابط الأخرى (فيسبوك…) → تُفتح في تبويب جديد
 *  • الصور: ضع رابط صورة الدكتور / صورة الواجهة / الخلفية
 *  • اترك الحقل فارغًا → تُستعمل الصورة الافتراضية الحالية
 * ============================================================
 */
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  Plus,
  Trash2,
  Video,
  ImageIcon,
  ExternalLink,
  Youtube,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  RefreshCw,
  Eye,
} from "lucide-react";
import {
  parseYouTubeId,
  youtubeThumbnail,
  isHttpUrl,
  type MediaVideoInput,
  type SiteImagesInput,
} from "@/lib/media";

/* ------------------- Types & helpers ------------------- */

interface MediaResponse {
  ok: boolean;
  videos: MediaVideoInput[];
  images: SiteImagesInput;
  imageDefaults: SiteImagesInput;
  maxVideos: number;
}

function newVideoId(): string {
  return `v-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

const EMPTY_IMAGES: SiteImagesInput = {
  trainerPhoto: "",
  heroImage: "",
  ctaBackground: "",
};

const inputCls =
  "w-full rounded-xl border border-navy-200 bg-white px-3.5 py-2.5 text-sm text-navy-900 shadow-sm outline-none placeholder:text-navy-300 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20";

const inputLtr = `${inputCls} text-left`;

/* ------------------- Badge d'état du lien ------------------- */

function LinkStatus({ link }: { link: string }) {
  const s = (link ?? "").trim();
  if (!s) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-50 px-3 py-1 text-[0.7rem] font-bold text-navy-500">
        <Video className="h-3 w-3" aria-hidden="true" />
        بدون رابط — يظهر « قريبًا » في الصفحة
      </span>
    );
  }
  const yt = parseYouTubeId(s);
  if (yt) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-[0.7rem] font-bold text-green-700">
        <Youtube className="h-3 w-3" aria-hidden="true" />
        يوتيوب ✓ — سيُعرض بقارئ مدمج ومصغّرة تلقائية
      </span>
    );
  }
  if (isHttpUrl(s)) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-[0.7rem] font-bold text-amber-700">
        <ExternalLink className="h-3 w-3" aria-hidden="true" />
        رابط خارجي — سيُفتح في تبويب جديد عند الضغط
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-[0.7rem] font-bold text-red-600">
      <AlertCircle className="h-3 w-3" aria-hidden="true" />
      رابط غير صالح — يجب أن يبدأ بـ http
    </span>
  );
}

/* ------------------- Aperçu miniature ------------------- */

function ThumbPreview({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return null;
  return (
    <span className="relative block h-[76px] w-[135px] shrink-0 overflow-hidden rounded-lg border border-navy-200 bg-navy-50">
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        onError={() => setFailed(true)}
      />
    </span>
  );
}

/* ------------------- Éditeur d'une vidéo ------------------- */

function VideoEditor({
  index,
  video,
  max,
  onChange,
  onRemove,
}: {
  index: number;
  video: MediaVideoInput;
  max: number;
  onChange: (v: MediaVideoInput) => void;
  onRemove: () => void;
}) {
  const yt = parseYouTubeId(video.link);
  const thumb = yt ? youtubeThumbnail(yt) : "";

  return (
    <li className="flex flex-col gap-4 rounded-2xl border border-navy-100 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-sm font-extrabold text-navy-950">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-navy-900 text-[0.75rem] font-bold text-gold-400">
            {index + 1}
          </span>
          فيديو
        </p>
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-red-100 bg-red-50 px-3 text-xs font-bold text-red-600 transition-colors hover:bg-red-100"
        >
          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
          حذف الفيديو
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        {thumb ? (
          <ThumbPreview src={thumb} alt={`معاينة مصغّرة الفيديو ${index + 1}`} />
        ) : (
          <span className="flex h-[76px] w-[135px] shrink-0 items-center justify-center rounded-lg border border-dashed border-navy-200 bg-navy-50 text-navy-300">
            <Video className="h-6 w-6" aria-hidden="true" />
          </span>
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="grid gap-3 sm:grid-cols-[1fr_130px]">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-navy-700">العنوان (يظهر فوق الفيديو)</span>
              <input
                type="text"
                value={video.title}
                onChange={(e) => onChange({ ...video, title: e.target.value })}
                placeholder="مثال: تقديم الدورة"
                maxLength={120}
                className={inputCls}
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-navy-700">المدة (اختياري)</span>
              <input
                type="text"
                value={video.duration}
                onChange={(e) => onChange({ ...video, duration: e.target.value })}
                placeholder="مثال: 5:30"
                maxLength={40}
                className={inputCls}
              />
            </label>
          </div>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-navy-700">
              رابط الفيديو — الصق رابط يوتيوب كما هو (watch?v=… أو youtu.be/… أو shorts/…)
            </span>
            <input
              type="text"
              inputMode="url"
              dir="ltr"
              value={video.link}
              onChange={(e) => onChange({ ...video, link: e.target.value })}
              placeholder="https://www.youtube.com/watch?v=…"
              maxLength={500}
              className={inputLtr}
            />
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <LinkStatus link={video.link} />
            {yt && (
              <a
                href={video.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[0.7rem] font-bold text-navy-500 underline hover:text-gold-700"
              >
                <Eye className="h-3 w-3" aria-hidden="true" />
                معاينة على يوتيوب
              </a>
            )}
          </div>
        </div>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-bold text-navy-700">الوصف (يظهر تحت الفيديو)</span>
        <textarea
          value={video.description}
          onChange={(e) => onChange({ ...video, description: e.target.value })}
          placeholder="وصف قصير للفيديو…"
          rows={2}
          maxLength={600}
          className={`${inputCls} resize-y`}
        />
      </label>

      {index === max - 1 && (
        <p className="text-[0.7rem] text-navy-400">الحد الأقصى {max} فيديو.</p>
      )}
    </li>
  );
}

/* ------------------- Éditeur d'une image ------------------- */

function ImageField({
  label,
  hint,
  value,
  defaultValue,
  onChange,
}: {
  label: string;
  hint: string;
  value: string;
  defaultValue: string;
  onChange: (v: string) => void;
}) {
  const preview = value.trim() || defaultValue;
  const invalid = value.trim() !== "" && !isHttpUrl(value.trim()) && !value.trim().startsWith("/");
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-navy-100 bg-white p-4 shadow-sm sm:flex-row sm:items-start">
      <ThumbPreview src={preview} alt={`معاينة ${label}`} />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <p className="text-sm font-extrabold text-navy-950">{label}</p>
        <input
          type="text"
          inputMode="url"
          dir="ltr"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://… (اتركه فارغًا للصورة الحالية)"
          maxLength={500}
          className={inputLtr}
        />
        <p className="text-[0.7rem] leading-relaxed text-navy-500">{hint}</p>
        {invalid && (
          <p className="flex items-center gap-1.5 text-[0.7rem] font-bold text-red-600">
            <AlertCircle className="h-3 w-3" aria-hidden="true" />
            الرابط غير صالح — يجب أن يبدأ بـ https://
          </p>
        )}
        {!value.trim() && (
          <p className="text-[0.7rem] font-bold text-gold-700">✓ تستعمل الصورة الافتراضية حاليًا</p>
        )}
      </div>
    </div>
  );
}

/* ------------------- Gestionnaire principal ------------------- */

export function MediaManager() {
  const router = useRouter();
  const [videos, setVideos] = useState<MediaVideoInput[] | null>(null);
  const [images, setImages] = useState<SiteImagesInput>(EMPTY_IMAGES);
  const [defaults, setDefaults] = useState<SiteImagesInput>(EMPTY_IMAGES);
  const [maxVideos, setMaxVideos] = useState(12);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/media", { cache: "no-store" });
      if (res.status === 401) {
        router.refresh();
        return;
      }
      const data = (await res.json()) as MediaResponse;
      if (!res.ok || !data.ok) throw new Error();
      setVideos(data.videos);
      setImages(data.images);
      setDefaults(data.imageDefaults);
      setMaxVideos(data.maxVideos);
    } catch {
      setError("تعذّر تحميل إعدادات الوسائط — أعد المحاولة");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  async function save() {
    if (!videos) return;
    setSaving(true);
    setSavedMsg(false);
    setError(null);
    try {
      const res = await fetch("/api/admin/media", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videos, images }),
      });
      if (res.status === 401) {
        router.refresh();
        return;
      }
      if (!res.ok) throw new Error();
      setSavedMsg(true);
      window.setTimeout(() => setSavedMsg(false), 6000);
    } catch {
      setError("تعذّر الحفظ — تحقّق من الروابط ثم أعد المحاولة");
    } finally {
      setSaving(false);
    }
  }

  async function resetDefaults() {
    if (!window.confirm("استعادة الإعدادات الافتراضية؟ سيتم حذف كل الروابط التي أضفتها.")) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/media", { method: "DELETE" });
      if (!res.ok) throw new Error();
      await load();
    } catch {
      setError("تعذّرت استعادة الافتراضي");
    } finally {
      setSaving(false);
    }
  }

  function updateVideo(v: MediaVideoInput) {
    setVideos((prev) => (prev ? prev.map((x) => (x.id === v.id ? v : x)) : prev));
  }

  function removeVideo(id: string) {
    setVideos((prev) => (prev ? prev.filter((x) => x.id !== id) : prev));
  }

  function addVideo() {
    setVideos((prev) =>
      prev && prev.length < maxVideos
        ? [
            ...prev,
            {
              id: newVideoId(),
              title: "",
              description: "",
              link: "",
              duration: "À venir",
            },
          ]
        : prev
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-navy-400">
        <RefreshCw className="h-7 w-7 animate-spin" aria-hidden="true" />
        <p className="text-sm font-semibold">جارٍ تحميل إعدادات الوسائط…</p>
      </div>
    );
  }

  if (!videos) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-3xl border border-red-100 bg-red-50 p-10 text-center">
        <AlertCircle className="h-8 w-8 text-red-500" aria-hidden="true" />
        <p className="text-sm font-bold text-red-700">{error ?? "خطأ غير متوقع"}</p>
        <button
          type="button"
          onClick={load}
          className="rounded-xl bg-navy-900 px-4 py-2 text-xs font-bold text-white hover:bg-gold-600"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  const hasVideos = videos.length > 0;

  return (
    <div className="flex flex-col gap-6">
      {/* ---------- Barre d'action ---------- */}
      <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gold-200 bg-gradient-to-l from-gold-50 to-white p-3.5 shadow-sm">
        <p className="flex items-center gap-2 text-xs font-bold text-navy-700">
          <ImageIcon className="h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
          الصق الروابط ثم اضغط « حفظ » — التغييرات تظهر فورًا في الصفحة الرئيسية بعد تحديثها
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={resetDefaults}
            disabled={saving}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-navy-200 bg-white px-3.5 text-xs font-bold text-navy-700 transition-colors hover:border-red-200 hover:text-red-600 disabled:opacity-50"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            استعادة الافتراضي
          </button>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="btn-shine inline-flex min-h-10 items-center gap-2 rounded-xl bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 px-5 text-sm font-extrabold text-navy-950 shadow-md shadow-gold-500/30 transition-all hover:-translate-y-0.5 disabled:opacity-50"
          >
            <Save className="h-4 w-4" aria-hidden="true" />
            {saving ? "جارٍ الحفظ…" : "حفظ التغييرات"}
          </button>
        </div>
      </div>

      {savedMsg && (
        <p role="status" className="flex flex-wrap items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-bold text-green-700">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
          تم الحفظ بنجاح ✓ — افتح الصفحة الرئيسية وحدّثها (F5) لرؤية التغييرات
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 underline"
          >
            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
            معاينة الصفحة
          </a>
        </p>
      )}
      {error && (
        <p role="alert" className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-xs font-bold text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}

      {/* ---------- Vidéos ---------- */}
      <section className="flex flex-col gap-4">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-extrabold text-navy-950">
              <Video className="h-5 w-5 text-gold-600" aria-hidden="true" />
              روابط الفيديوهات
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-navy-500">
              الصق رابط يوتيوب كما نسخته (أي شكل كان) — الموقع يستخرج الفيديو والمصغّرة تلقائيًا.
              الروابط من منصات أخرى تُفتح في تبويب جديد.
            </p>
          </div>
          <button
            type="button"
            onClick={addVideo}
            disabled={videos.length >= maxVideos}
            className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-navy-900 px-4 text-xs font-bold text-white transition-colors hover:bg-gold-600 disabled:opacity-40"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            إضافة فيديو
          </button>
        </header>

        {hasVideos ? (
          <ul className="flex flex-col gap-4">
            {videos.map((v, i) => (
              <VideoEditor
                key={v.id}
                index={i}
                video={v}
                max={maxVideos}
                onChange={updateVideo}
                onRemove={() => removeVideo(v.id)}
              />
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-navy-200 bg-white py-10 text-center">
            <Video className="h-8 w-8 text-navy-300" aria-hidden="true" />
            <p className="text-sm font-bold text-navy-700">لا توجد فيديوهات — قسم الفيديو مخفي من الصفحة</p>
            <p className="text-xs text-navy-500">اضغط « إضافة فيديو » لإنشاء بطاقة جديدة.</p>
          </div>
        )}
      </section>

      {/* ---------- Images ---------- */}
      <section className="flex flex-col gap-4">
        <header>
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-navy-950">
            <ImageIcon className="h-5 w-5 text-gold-600" aria-hidden="true" />
            روابط الصور
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-navy-500">
            ضع رابط صورة مباشرة (ينتهي بـ .jpg أو .png…) — اترك الحقل فارغًا للاحتفاظ بالصورة الحالية.
          </p>
        </header>
        <div className="flex flex-col gap-4">
          <ImageField
            label="صورة الدكتور (الصورة الشخصية)"
            hint="تظهر في الواجهة وفي قسم Formateur — مربعة الشكل أفضل."
            value={images.trainerPhoto}
            defaultValue={defaults.trainerPhoto}
            onChange={(v) => setImages((prev) => ({ ...prev, trainerPhoto: v }))}
          />
          <ImageField
            label="صورة الواجهة الرئيسية"
            hint="الصورة الكبيرة بجانب العنوان — طولية (عمودية) أفضل."
            value={images.heroImage}
            defaultValue={defaults.heroImage}
            onChange={(v) => setImages((prev) => ({ ...prev, heroImage: v }))}
          />
          <ImageField
            label="خلفية القسم الختامي"
            hint="الخلفية خلف « Réservez votre place dès maintenant »."
            value={images.ctaBackground}
            defaultValue={defaults.ctaBackground}
            onChange={(v) => setImages((prev) => ({ ...prev, ctaBackground: v }))}
          />
        </div>
      </section>
    </div>
  );
}
