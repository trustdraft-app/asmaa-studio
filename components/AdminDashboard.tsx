"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient, type Session } from "@supabase/supabase-js";
import {
  CalendarCheck,
  CheckCircle2,
  Clock3,
  Loader2,
  LockKeyhole,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UsersRound
} from "lucide-react";
import { whatsappLink } from "../lib/content";
import {
  adminConfigReady,
  normalizePhone,
  reservationPackage,
  reservationStatuses,
  type ReservationRecord,
  type ReservationStatus
} from "../lib/reservations";

type ReservationDbRow = {
  id: string;
  bride_name: string;
  phone: string;
  event_type: string;
  event_date: string;
  city: string;
  venue: string;
  package_id: string;
  package_name: string;
  guest_count: string | null;
  ceremony_time: string | null;
  needs_first_look: boolean;
  notes: string | null;
  status: ReservationStatus;
  source: string;
  created_at: string;
  updated_at: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const supabase = adminConfigReady() ? createClient(supabaseUrl, supabaseAnonKey) : null;

export function AdminDashboard() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(Boolean(supabase));
  const [sendingLink, setSendingLink] = useState(false);
  const [reservations, setReservations] = useState<ReservationRecord[]>([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ReservationStatus | "all">("all");
  const [notice, setNotice] = useState("");

  const loadReservations = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .order("event_date", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      setNotice("تعذر تحميل الحجوزات. تأكدي من تطبيق قاعدة البيانات وصلاحيات المدير.");
      setLoading(false);
      return;
    }

    setReservations((data ?? []).map(fromDbRow));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
      if (data.session) void loadReservations();
    });

    const { data } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      if (currentSession) void loadReservations();
    });

    return () => data.subscription.unsubscribe();
  }, [loadReservations]);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return reservations.filter((item) => {
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      const matchesQuery =
        !normalizedQuery ||
        [item.brideName, item.phone, item.city, item.venue, item.packageName]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      return matchesStatus && matchesQuery;
    });
  }, [query, reservations, statusFilter]);

  const metrics = useMemo(() => buildMetrics(reservations), [reservations]);

  const signIn = async () => {
    const ownerEmail = email.trim().toLowerCase();
    if (!supabase || !ownerEmail) return;
    setSendingLink(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: ownerEmail,
      options: { emailRedirectTo: window.location.href }
    });
    setSendingLink(false);
    setNotice(error ? "لم نتمكن من إرسال رابط الدخول." : "تم إرسال رابط الدخول إلى البريد.");
  };

  const updateStatus = async (id: string, status: ReservationStatus) => {
    if (!supabase) return;
    setReservations((items) => items.map((item) => (item.id === id ? { ...item, status } : item)));
    const { error } = await supabase.from("reservations").update({ status }).eq("id", id);
    if (error) {
      setNotice("لم يتم حفظ تغيير الحالة. أعيدي تحميل الصفحة وتحققي من الصلاحيات.");
      void loadReservations();
    }
  };

  if (!supabase) {
    return <AdminSetupState />;
  }

  if (!session) {
    return (
      <main className="page-shell admin-page" dir="rtl">
        <section className="admin-login">
          <Link className="brand-lockup" href="/">
            <span className="brand-mark" aria-hidden="true">
              <span>AS</span>
            </span>
            <span>
              <strong>Asmaa Studio</strong>
              <span>لوحة الحجوزات</span>
            </span>
          </Link>
          <div className="login-card">
            <LockKeyhole size={32} />
            <span className="eyebrow">دخول صاحبة العمل</span>
            <h1>لوحة بسيطة لكل الحجوزات القادمة.</h1>
            <p>اكتبي بريد المدير المضاف في Supabase. سيصل رابط دخول بدون كلمة مرور.</p>
            <label className="field">
              <span>بريد المدير</span>
              <input
                autoComplete="email"
                inputMode="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="owner@example.com"
                type="email"
                value={email}
              />
            </label>
            <button className="cta" disabled={sendingLink || !email.trim()} onClick={signIn} type="button">
              {sendingLink ? <Loader2 className="spin" size={18} /> : <ShieldCheck size={18} />}
              أرسلي رابط الدخول
            </button>
            {notice && <p className="login-notice">{notice}</p>}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell admin-page" dir="rtl">
      <nav className="nav reserve-nav" aria-label="تنقل لوحة الحجوزات">
        <Link className="brand-lockup" href="/">
          <span className="brand-mark" aria-hidden="true">
            <span>AS</span>
          </span>
          <span>
            <strong>Asmaa Studio</strong>
            <span>لوحة الحجوزات</span>
          </span>
        </Link>
        <div className="button-row">
          <Link className="ghost-cta compact" href="/reserve">
            رابط العروس
          </Link>
          <button className="ghost-cta compact" onClick={() => supabase.auth.signOut()} type="button">
            خروج
          </button>
        </div>
      </nav>

      <section className="admin-hero">
        <div>
          <span className="eyebrow">متابعة بدون تعقيد</span>
          <h1>كل طلب حجز يتحول إلى قرار واضح.</h1>
          <p>من هذه الصفحة تعرفين من ينتظر الرد، من يحتاج عربون، وما هي أقرب مناسبة قادمة.</p>
        </div>
        <a className="cta" href={whatsappLink("admin-dashboard")} target="_blank" rel="noreferrer">
          <MessageCircle size={18} />
          واتساب العمل
        </a>
      </section>

      <section className="metric-grid" aria-label="مؤشرات الحجوزات">
        <Metric icon={Sparkles} label="طلبات جديدة" value={metrics.newCount} />
        <Metric icon={CalendarCheck} label="حجوزات قادمة" value={metrics.upcomingCount} />
        <Metric icon={CheckCircle2} label="مؤكد أو عربون" value={metrics.confirmedCount} />
        <Metric icon={TrendingUp} label="أقرب تاريخ" value={metrics.nextDate} />
      </section>

      <section className="admin-board">
        <div className="board-toolbar">
          <label className="search-box">
            <Search size={18} />
            <input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="بحث باسم العروس، الجوال، المدينة، القاعة..."
              value={query}
            />
          </label>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as ReservationStatus | "all")}>
            <option value="all">كل الحالات</option>
            {reservationStatuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
          <button className="ghost-cta compact" disabled={loading} onClick={loadReservations} type="button">
            {loading ? <Loader2 className="spin" size={16} /> : <Clock3 size={16} />}
            تحديث
          </button>
        </div>

        {notice && <div className="submission-message error">{notice}</div>}

        {loading ? (
          <div className="admin-empty">
            <Loader2 className="spin" size={28} />
            <p>جاري تحميل الحجوزات...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="admin-empty">
            <UsersRound size={30} />
            <h2>لا توجد حجوزات مطابقة.</h2>
            <p>شاركي رابط العروس في واتساب وانستقرام ليصل كل طلب إلى هذه اللوحة.</p>
          </div>
        ) : (
          <div className="reservation-list">
            {filtered.map((reservation) => (
              <article className="reservation-row" key={reservation.id}>
                <div className="reservation-main">
                  <span className={`status-pill ${reservation.status}`}>
                    {reservationStatuses.find((status) => status.value === reservation.status)?.label}
                  </span>
                  <h2>{reservation.brideName}</h2>
                  <p>
                    {reservation.eventType} · {reservation.city} · {reservation.venue}
                  </p>
                  <small>
                    {reservation.eventDate} · {reservation.packageName}
                  </small>
                </div>
                <div className="reservation-meta">
                  <span>{reservation.phone}</span>
                  <span>{reservation.ceremonyTime || "وقت البداية غير محدد"}</span>
                  <span>{reservation.needsFirstLook ? "First Look مطلوب" : "بدون First Look"}</span>
                </div>
                <div className="reservation-actions">
                  <select
                    aria-label="تغيير حالة الحجز"
                    value={reservation.status}
                    onChange={(event) => updateStatus(reservation.id, event.target.value as ReservationStatus)}
                  >
                    {reservationStatuses.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                  <a className="ghost-cta compact" href={whatsappForReservation(reservation)} target="_blank" rel="noreferrer">
                    <MessageCircle size={16} />
                    متابعة
                  </a>
                </div>
                {reservation.notes && <p className="reservation-notes">{reservation.notes}</p>}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function AdminSetupState() {
  return (
    <main className="page-shell admin-page" dir="rtl">
      <section className="admin-login">
        <Link className="brand-lockup" href="/">
          <span className="brand-mark" aria-hidden="true">
            <span>AS</span>
          </span>
          <span>
            <strong>Asmaa Studio</strong>
            <span>لوحة الحجوزات</span>
          </span>
        </Link>
        <div className="login-card setup-card">
          <ShieldCheck size={32} />
          <span className="eyebrow">جاهزة للربط</span>
          <h1>لوحة الإدارة جاهزة، وتحتاج تفعيل قاعدة الحجوزات.</h1>
          <p>
            رابط العروس يعمل الآن برسالة واتساب مرتبة. ظهور الحجوزات داخل هذه اللوحة يحتاج
            ربط قاعدة البيانات حتى تظهر الطلبات القادمة في مكان واحد.
          </p>
          <div className="setup-steps">
            <span>1. تجهيز قاعدة الحجوزات</span>
            <span>2. تفعيل رابط حفظ الطلب</span>
            <span>3. إضافة بريد صاحبة العمل للدخول</span>
          </div>
          <Link className="cta" href="/reserve">
            تجربة رابط العروس
          </Link>
        </div>
      </section>
    </main>
  );
}

function Metric({
  icon: Icon,
  label,
  value
}: {
  icon: typeof Sparkles;
  label: string;
  value: number | string;
}) {
  return (
    <article className="metric-card">
      <Icon size={24} />
      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  );
}

function fromDbRow(row: ReservationDbRow): ReservationRecord {
  return {
    id: row.id,
    brideName: row.bride_name,
    phone: row.phone,
    eventType: row.event_type,
    eventDate: row.event_date,
    city: row.city,
    venue: row.venue,
    packageId: row.package_id,
    packageName: row.package_name || reservationPackage(row.package_id).name,
    guestCount: row.guest_count ?? "",
    ceremonyTime: row.ceremony_time ?? "",
    needsFirstLook: row.needs_first_look,
    notes: row.notes ?? "",
    status: row.status,
    source: row.source,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function buildMetrics(reservations: ReservationRecord[]) {
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = reservations.filter((item) => item.eventDate >= today && item.status !== "cancelled");
  const next = upcoming[0]?.eventDate ?? "لا يوجد";

  return {
    newCount: reservations.filter((item) => item.status === "new").length,
    upcomingCount: upcoming.length,
    confirmedCount: reservations.filter((item) => item.status === "confirmed" || item.status === "deposit_paid").length,
    nextDate: next
  };
}

function whatsappForReservation(reservation: ReservationRecord) {
  const normalizedPhone = normalizePhone(reservation.phone);
  const whatsappPhone = normalizedPhone
    .replace(/^\+/, "")
    .replace(/^05/, "9665")
    .replace(/^5/, "9665");
  const text = [
    `السلام عليكم ${reservation.brideName}`,
    "معك Asmaa Studio بخصوص طلب الحجز:",
    `${reservation.eventType} بتاريخ ${reservation.eventDate}`,
    `الباقة: ${reservation.packageName}`,
    "نؤكد لك التوفر والخطوة التالية."
  ].join("\n");

  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(text)}`;
}
