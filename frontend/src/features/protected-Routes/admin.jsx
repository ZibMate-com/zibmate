import { Navigate } from "react-router-dom";

export const AdminRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('users'));
    if (user && user.role === "admin") {
        return children
    }
    else {
        return <Navigate to={"/login"} />
    }
}