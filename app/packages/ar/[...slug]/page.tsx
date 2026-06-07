import type { Metadata } from "next";
import Link from "next/link";
import {
  allCityServiceModifierTriples,
  allCityServicePairs
} from "../../../../lib/seo-grid";
import { SiteHeader } from "../../../../components/SiteHeader";
import { SiteFooter } from "../../../../components/SiteFooter";

type Props = { params: Promise<{ slug: string[] }> };

// Catch-all redirect for /packages/ar/{anything} → /ar/{anything}
// Mohammed flagged a 404 on /packages/ar/dammam/half-day-tasweer/musawira;
// the real route is /ar/dammam/half-day-tasweer/musawira.
// This catch-all generates every URL that COULD have been mistyped and
// meta-refreshes to the canonical AR URL.

export function generateStaticParams() {
  // Generate the same shape as the AR programmatic routes so any mistyped
  // /packages/ar/{city}/{service}[/{modifier}] resolves to a real page.
  const out: { slug: string[] }[] = [];
  for (const { city, service } of allCityServicePairs()) {
    out.push({ slug: [city.slug, service.slug] });
  }
  for (const { city, service, modifier } of allCityServiceModifierTriples()) {
    out.push({ slug: [city.slug, service.slug, modifier.slug] });
  }
  return out;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const canonical = `https://asmaa.video/ar/${slug.join("/")}`;
  return {
    title: { absolute: "تحويل إلى الصفحة الصحيحة" },
    description: "يتم تحويلك تلقائياً إلى صفحة Asmaa Studio الصحيحة.",
    alternates: { canonical },
    robots: { index: false, follow: true },
    other: { refresh: `0; url=/ar/${slug.join("/")}` }
  };
}

export default async function PackagesArRedirect({ params }: Props) {
  const { slug } = await params;
  const realUrl = `/ar/${slug.join("/")}`;
  return (
    <main className="page-shell" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 48, textAlign: "center" }}>
      <SiteHeader />
      <section>
        <h1 style={{ color: "#fff6df", fontSize: 28, marginBottom: 16 }}>التحويل جارٍ…</h1>
        <p style={{ color: "rgba(255, 248, 236, 0.78)", marginBottom: 24 }}>
          يتم تحويلك خلال ثوانٍ إلى الصفحة الصحيحة. إذا لم يتم التحويل تلقائياً، اضغطي على الرابط بالأسفل.
        </p>
        <Link className="cta" href={realUrl} style={{ display: "inline-flex", alignItems: "center", gap: 8, minHeight: 48, padding: "14px 28px", borderRadius: 999, background: "linear-gradient(135deg, #c8a060 0%, #b8924d 100%)", color: "#1a1410", textDecoration: "none", fontWeight: 600 }}>
          فتح الصفحة الصحيحة
        </Link>
      </section>
    <SiteFooter />
    </main>
  );
}
