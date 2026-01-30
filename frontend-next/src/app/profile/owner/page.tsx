import { AdminDashboard } from "@/features/dashboards/admin/adminDashboard";

// Note: Original route was /profile/owner, component is AdminDashboard.
// Might need protection? Original route didn't have explicit protection wrapper in App.jsx but it was under /profile/owner which implies it.
// App.jsx: path: "/profile/owner", element: <AdminDashboard /> (No Wrapper?)
// Wait, path /profile/user had UserRoute. path /postproperty had OwnerRoute.
// Maybe AdminDashboard checks inside? Or it's public? 
// I'll leave it as is for now, matching App.jsx.
export default function Page() {
    return <AdminDashboard />;
}
