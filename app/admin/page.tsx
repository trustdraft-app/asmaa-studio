import type { Metadata } from "next";
import { AdminDashboard } from "../../components/AdminDashboard";

export const metadata: Metadata = {
  title: "لوحة الحجوزات | Asmaa Studio",
  description: "لوحة إدارة حجوزات Asmaa Studio لمتابعة طلبات العرائس والمناسبات القادمة.",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminPage() {
  return <AdminDashboard />;
}
