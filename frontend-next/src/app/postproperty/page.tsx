import PgForm from "@/features/properties/create/postPropertyForm";
import { OwnerRoute } from "@/features/protected-Routes/owner";

export default function Page() {
  return (
    <OwnerRoute>
      <PgForm />
    </OwnerRoute>
  );
}
