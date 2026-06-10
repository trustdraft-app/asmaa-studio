import type { MetadataRoute } from "next";

// Static export (output: "export") pre-renders this at build time as
// /manifest.webmanifest and Next auto-injects <link rel="manifest"> in <head>.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Asmaa Video | تصوير فيديو زواجات نسائي",
    short_name: "Asmaa Video",
    description:
      "تصوير فيديو للأعراس والخطوبة في الأحساء والدمام والخبر مع باقات واضحة ومونتاج احترافي.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    dir: "rtl",
    lang: "ar",
    background_color: "#0c0c0d",
    theme_color: "#f1cb82",
    icons: [
      {
        src: "/favicon.png",
        sizes: "256x256",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png"
      },
      {
        src: "/brand/asmaa-logo-square.png",
        sizes: "256x256",
        type: "image/png",
        purpose: "maskable"
      }
    ]
  };
}
