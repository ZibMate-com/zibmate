import OwnerDashboard from "@/features/dashboards/owner/pg-owner-dashboard";
import { OwnerRoute } from "@/features/protected-Routes/owner";

export default function Page() {
  return (
    <OwnerRoute>
      <OwnerDashboard />
    </OwnerRoute>
  );
}
