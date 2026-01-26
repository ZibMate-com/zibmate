import { Navigate } from "react-router-dom";

export const OwnerRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('users'));
    if (user && user.role === "owner") {
        return children
    }
    else {
        return <Navigate to={"/login"} />
    }
}