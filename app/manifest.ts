import type { MetadataRoute } from "next";

export const dynamic = "force-static";

/**
 * PWA web app manifest — installable Arabic-first experience.
 * Gold-on-dark matches the Islamic-luxury brand palette.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "أسماء ستوديو | Asmaa Studio",
    short_name: "أسماء ستوديو",
    description:
      "تصوير فيديو زواجات وخطوبة نسائي في الأحساء والدمام والخبر — باقات واضحة من ٦٠٠ إلى ٢٥٠٠ ريال وحجز مباشر عبر واتساب.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    dir: "rtl",
    lang: "ar",
    theme_color: "#C9A84C",
    background_color: "#0A0A0A",
    categories: ["photo", "video", "lifestyle"],
    icons: [
      { src: "/favicon.png", sizes: "256x256", type: "image/png", purpose: "any" },
      { src: "/brand/asmaa-logo-square.png", sizes: "256x256", type: "image/png", purpose: "maskable" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ]
  };
}
