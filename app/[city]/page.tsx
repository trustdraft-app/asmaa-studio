import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, MessageCircle } from "lucide-react";
import { packages, serviceAreas, whatsappLink } from "../../lib/content";

type Props = {
  params: Promise<{ city: string }>;
};

export function generateStaticParams() {
  return serviceAreas.map((area) => ({ city: area.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const area = serviceAreas.find((item) => item.slug === city) ?? serviceAreas[0];
  return {
    title: `تصوير فيديو زواجات في ${area.ar}`,
    description: `Asmaa Studio تقدم تصوير فيديو نسائي للأعراس والخطوبة في ${area.ar} مع باقات واضحة ومونتاج احترافي وتواصل مباشر عبر واتساب.`,
    alternates: {
      canonical: `/${area.slug}`
    }
  };
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const area = serviceAreas.find((item) => item.slug === city) ?? serviceAreas[0];

  return (
    <main className="page-shell">
      <section className="section">
        <div className="section-inner">
          <Link className="ghost-cta" href="/">
            العودة للرئيسية
          </Link>
          <div style={{ marginTop: 40 }}>
            <span className="eyebrow">
              <MapPin size={16} /> {area.ar}
            </span>
            <h1 className="section-title">تصوير فيديو زواجات نسائي في {area.ar}</h1>
            <p className="section-copy">
              صفحة محلية مخصصة للباحثات عن مصورة فيديو زواج وخطوبة في {area.ar}. تعرض الباقات
              الأساسية، طريقة الحجز، وزر واتساب مباشر لتأكيد التوفر حسب التاريخ.
            </p>
            <div className="button-row" style={{ marginTop: 28 }}>
              <a className="cta" href={whatsappLink(area.slug)} target="_blank" rel="noreferrer">
                <MessageCircle size={19} />
                اسألي عن توفر {area.ar}
              </a>
            </div>
          </div>

          <div className="packages-grid">
            {packages.slice(0, 3).map((item) => (
              <article className="package-card" key={item.id}>
                <header>
                  <small>بكج {item.id}</small>
                  <h2>{item.name}</h2>
                  <p className="price">{item.price} ريال</p>
                </header>
                <ul>
                  <li>{item.summary}</li>
                  <li>مدة التصوير: {item.duration}</li>
                </ul>
                <footer>
                  <a href={whatsappLink(`${area.slug}-package-${item.id}`)} target="_blank" rel="noreferrer">
                    واتساب البكج
                  </a>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
