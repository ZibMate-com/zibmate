import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const getToken = () => {
  return Cookies.get("zibmate_token");
};

export const verifyToken = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      Cookies.remove("zibmate_token");
      localStorage.removeItem("zibmate_users");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Token verification error:", error);
    return false;
  }
};
