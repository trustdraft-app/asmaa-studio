import Link from "next/link";
import Image from "next/image";
import { Menu, MessageCircle, Languages } from "lucide-react";
import { assetPath, whatsappLink } from "../lib/content";

const navLinks: { href: string; label: string }[] = [
  { href: "/packages", label: "الباقات" },
  { href: "/portfolio", label: "الألبوم" },
  { href: "/services/full-day-wedding", label: "الخدمات" },
  { href: "/reviews", label: "آراء العرايس" },
  { href: "/process", label: "كيف نعمل" },
  { href: "/about", label: "عن الاستوديو" },
  { href: "/faq", label: "الأسئلة" },
  { href: "/contact", label: "تواصلي معنا" }
];

/**
 * Canonical site chrome header used on every interior page.
 * Mobile menu is a pure-CSS <details> disclosure so it works in the
 * static export with zero client JS.
 */
export function SiteHeader() {
  return (
    <header className="site-header" aria-label="رأس الصفحة">
      <div className="site-header-inner">
        <Link className="site-header-brand" href="/" aria-label="Asmaa Studio — الصفحة الرئيسية">
          <span className="site-header-mark" aria-hidden="true">
            <Image src={assetPath("/brand/asmaa-logo-square.png")} alt="" width={72} height={72} />
          </span>
          <strong>Asmaa Studio</strong>
        </Link>

        <nav className="site-header-links" aria-label="التنقل الرئيسي">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="site-header-actions">
          <a
            className="site-header-whatsapp"
            href={whatsappLink("site-header")}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={16} aria-hidden="true" />
            احجزي الآن
          </a>

          <details className="site-header-menu">
            <summary aria-label="القائمة">
              <Menu size={22} aria-hidden="true" />
            </summary>
            <nav className="site-header-drawer" aria-label="قائمة الجوال">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
              <Link href="/reserve" className="site-header-drawer-cta">
                رابط العروس
              </Link>
              <a
                className="site-header-drawer-wa"
                href={whatsappLink("site-header-drawer")}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={16} aria-hidden="true" />
                واتساب مباشر
              </a>
              <span className="site-header-drawer-lang">
                <Languages size={14} aria-hidden="true" /> AR / EN
              </span>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
