import { UserDashBoard } from "@/features/dashboards/user/userDashboard";
import { UserRoute } from "@/features/protected-Routes/user";

export default function Page() {
    return (
        <UserRoute>
            <UserDashBoard />
        </UserRoute>
    );
}
