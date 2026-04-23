import { AdminLayout } from "@/components/admin/admin-layout";
import { AdminRoute } from "@/components/auth/admin-route";

export default function AdminDashboard() {
  return (
    <AdminRoute>
      <AdminLayout>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-lg font-semibold">Welcome</h3>
            <p className="mt-2 text-sm text-slate-400">
              Use the admin panel to generate QR stickers for vehicles.
            </p>
          </div>
        </div>
      </AdminLayout>
    </AdminRoute>
  );
}