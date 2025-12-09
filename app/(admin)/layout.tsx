/** @format */

import DashboardNav from "@/features/admin/layouts/nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />
      <main className="max-w-6xl mx-auto px-6 py-12">{children}</main>
    </div>
  );
}
