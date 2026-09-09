import type { Metadata } from "next";

/**
 * Layout de l'espace d'administration — لوحة إدارة المسجلين
 * RTL + arabe, non indexé par les moteurs de recherche.
 */
export const metadata: Metadata = {
  title: "لوحة الإدارة | GO Healthy Academy",
  description: "إدارة مسجلي الدورة — Approches Quantiques Fractales",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      lang="ar"
      dir="rtl"
      className="admin-root min-h-screen bg-[#f6f7fb] [font-family:'Segoe_UI',Tahoma,'Noto_Sans_Arabic','Noto_Kufi_Arabic',Arial,sans-serif]"
    >
      {children}
    </div>
  );
}
