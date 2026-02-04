"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const AdminRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userStr = localStorage.getItem("users");
    const user = userStr ? JSON.parse(userStr) : null;
    if (user && user.role === "admin") {
      setIsAuthorized(true);
    } else {
      router.push("/login");
    }
  }, [router]);

  if (!isAuthorized) {
    return null; 
  }

  return children;
};
