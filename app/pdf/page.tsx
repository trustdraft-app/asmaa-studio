import type { Metadata } from "next";
import Link from "next/link";

const PDF_URL = "/packages-asmaa-studio.pdf";

export const metadata: Metadata = {
  title: "تحميل دليل الباقات PDF",
  description: "افتحي دليل باقات Asmaa Studio بصيغة PDF.",
  alternates: { canonical: "https://asmaa.video/packages-asmaa-studio.pdf" },
  robots: { index: false, follow: true },
  other: {
    refresh: `0; url=${PDF_URL}`
  }
};

export default function PdfRedirectPage() {
  return (
    <main className="page-shell" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 48 }}>
      <section style={{ maxWidth: 540, textAlign: "center" }}>
        <h1 style={{ fontFamily: '"Noto Kufi Arabic", system-ui, sans-serif', fontSize: 32, marginBottom: 16, color: "#fff6df" }}>
          دليل باقات Asmaa Studio
        </h1>
        <p style={{ color: "rgba(255, 248, 236, 0.78)", marginBottom: 28, lineHeight: 1.8 }}>
          يتم فتح ملف الـ PDF تلقائياً خلال ثوانٍ. إذا لم يفتح، اضغطي على الزر بالأسفل.
        </p>
        <p style={{ marginTop: 24 }}>
          <a
            href={PDF_URL}
            download="Asmaa-Studio-Packages.pdf"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              minHeight: 48,
              padding: "14px 28px",
              borderRadius: 999,
              background: "linear-gradient(135deg, #c8a060 0%, #b8924d 100%)",
              color: "#1a1410",
              fontWeight: 600,
              textDecoration: "none"
            }}
          >
            تحميل دليل الباقات (PDF)
          </a>
        </p>
        <p style={{ marginTop: 16 }}>
          <Link href="/" style={{ color: "#e8c57c", textDecoration: "none" }}>
            العودة إلى Asmaa Studio
          </Link>
        </p>
      </section>
    </main>
  );
}
