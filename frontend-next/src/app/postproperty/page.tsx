import PgForm from "@/features/properties/create/postPropertyForm";
import { AdminRoute } from "@/features/protected-Routes/admin";

export default function Page() {
  return (
    <AdminRoute>
      <PgForm />
    </AdminRoute>
  );
}
