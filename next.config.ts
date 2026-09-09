import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Prisma خارج تجميع الحِزم — لازم لعمل قاعدة البيانات على Vercel */
  serverExternalPackages: ["@prisma/client"],
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    /* Autorise les images distantes collées depuis la loupe de contrôle /admin
       (miniatures YouTube automatiques + URL d'images choisies par l'admin)
       يسمح بعرض الصور من روابط خارجية (مصغّرات يوتيوب + صور المدير) */
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
};

export default nextConfig;
