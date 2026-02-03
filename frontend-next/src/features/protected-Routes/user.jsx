"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const UserRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userStr = localStorage.getItem("users");
    const user = userStr ? JSON.parse(userStr) : null;
    if (user && user.role === "user") {
      setIsAuthorized(true);
    } else {
      router.push("/login"); // Redirect to login if not authorized
    }
  }, [router]);

  if (!isAuthorized) {
    return null;
  }

  return children;
};
