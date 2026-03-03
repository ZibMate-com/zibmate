"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getToken, getUser } from "../auth/login/repository/token";

export const AdminRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = getUser();
    const token = getToken();
    if (user && user.role === "admin" && token) {
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
