import { AdminLayout } from "@/components/admin/admin-layout";
import { AdminRoute } from "@/components/auth/admin-route";
import { StickerGenerator } from "@/components/admin/sticker-generator";

export default function AdminStickersPage() {
  return (
    <AdminRoute>
      <AdminLayout>
        <StickerGenerator />
      </AdminLayout>
    </AdminRoute>
  );
}