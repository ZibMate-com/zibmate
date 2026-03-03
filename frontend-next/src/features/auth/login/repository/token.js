import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const getToken = () => {
  return Cookies.get("zibmate_token");
};

export const getUser = () => {
  const user = Cookies.get("zibmate_users");
  return user ? JSON.parse(user) : null;
};

export const setUser = (user) => {
  Cookies.set("zibmate_users", JSON.stringify(user), { expires: 7, secure: true });
};

export const clearAuth = () => {
  Cookies.remove("zibmate_token");
  Cookies.remove("zibmate_users");
};

export const setBookingDetails = (details) => {
  Cookies.set("zibmate_booking_details", JSON.stringify(details), { expires: 1, secure: true });
};

export const getBookingDetails = () => {
  const details = Cookies.get("zibmate_booking_details");
  return details ? JSON.parse(details) : null;
};

export const removeBookingDetails = () => {
  Cookies.remove("zibmate_booking_details");
};

export const setTransientRole = (role) => {
  Cookies.set("zibmate_user_role_hint", role, { expires: 30, secure: true });
};

export const getTransientRole = () => {
  return Cookies.get("zibmate_user_role_hint");
};

export const verifyToken = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      clearAuth();
      return false;
    }

    return true;
  } catch (error) {
    console.error("Token verification error:", error);
    clearAuth();
    return false;
  }
};
