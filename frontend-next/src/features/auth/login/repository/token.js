import { jwtDecode } from "jwt-decode";

export const getToken = () => {
    return localStorage.getItem('token');
};

export const verifyToken = () => {
    const token = getToken();
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
            localStorage.removeItem('token');
            localStorage.removeItem('users');
            return false;
        }

        return true;
    } catch (error) {
        console.error("Token verification error:", error);
        return false;
    }
};