import Link from "next/link";
import { MessageCircle, MapPin, ShieldCheck } from "lucide-react";
import { instagramUrl, tiktokUrl, whatsappLink } from "../lib/content";

const footerColumns: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "الخدمة",
    links: [
      { href: "/packages", label: "الباقات والأسعار" },
      { href: "/services/full-day-wedding", label: "تصوير اليوم الكامل" },
      { href: "/engagement", label: "الخطوبة والملكة" },
      { href: "/zaffa", label: "الزفة" }
    ]
  },
  {
    title: "الاستوديو",
    links: [
      { href: "/portfolio", label: "الألبوم" },
      { href: "/reviews", label: "آراء العرايس" },
      { href: "/process", label: "كيف نعمل" },
      { href: "/about", label: "عن الاستوديو" }
    ]
  },
  {
    title: "المدن",
    links: [
      { href: "/alahsa", label: "الأحساء" },
      { href: "/dammam", label: "الدمام" },
      { href: "/khobar", label: "الخبر" },
      { href: "/guides", label: "دليل الزواجات" }
    ]
  },
  {
    title: "تواصلي",
    links: [
      { href: "/reserve", label: "رابط العروس" },
      { href: "/contact", label: "تواصلي معنا" },
      { href: "/faq", label: "الأسئلة الشائعة" },
      { href: "/privacy", label: "سياسة الخصوصية" }
    ]
  }
];

/**
 * Canonical site footer + floating WhatsApp used on every interior page.
 */
export function SiteFooter() {
  return (
    <>
      <footer className="site-footer" aria-label="تذييل الصفحة">
        <div className="site-footer-grid">
          <div className="site-footer-about">
            <strong>Asmaa Studio</strong>
            <p>تصوير فيديو زواجات نسائي في الأحساء والدمام والخبر — باقات واضحة ومونتاج سينمائي هادئ.</p>
            <p className="site-footer-meta">
              <MapPin size={15} aria-hidden="true" /> المنطقة الشرقية · السعودية
            </p>
            <div className="site-footer-social" aria-label="حسابات التواصل">
              <a href={whatsappLink("footer")} target="_blank" rel="noreferrer" aria-label="واتساب">
                <MessageCircle size={18} aria-hidden="true" />
              </a>
              <a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="انستقرام">
                <span aria-hidden="true" style={{ fontWeight: 800, fontSize: 13 }}>Instagram</span>
              </a>
              <a href={tiktokUrl} target="_blank" rel="noreferrer" aria-label="تيك توك">
                <span aria-hidden="true" style={{ fontWeight: 800, fontSize: 13 }}>TikTok</span>
              </a>
            </div>
          </div>

          {footerColumns.map((col) => (
            <nav className="site-footer-col" key={col.title} aria-label={col.title}>
              <h3>{col.title}</h3>
              {col.links.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>

        <div className="site-footer-base">
          <span className="site-footer-trust">
            <ShieldCheck size={15} aria-hidden="true" /> عربون نصف الفاتورة لتثبيت التاريخ — والمتبقي يوم المناسبة
          </span>
          <p>© {new Date().getFullYear()} Asmaa Studio · جميع الحقوق محفوظة · asmaa.video</p>
        </div>
      </footer>

      <a
        className="floating-whatsapp wa-scroll-reveal"
        href={whatsappLink("floating-whatsapp")}
        target="_blank"
        rel="noreferrer"
        aria-label="تواصلي عبر واتساب — عادةً يرد خلال ساعتين"
      >
        <span className="floating-whatsapp-bubble" aria-hidden="true">عادةً يرد خلال ساعتين</span>
        <MessageCircle size={24} aria-hidden="true" />
        <span>واتساب</span>
      </a>
    </>
  );
}
