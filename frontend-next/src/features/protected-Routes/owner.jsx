"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const OwnerRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userStr = localStorage.getItem("zibmate_users");
    const user = userStr ? JSON.parse(userStr) : null;
    if (user && user.role === "owner") {
      setIsAuthorized(true);
    } else {
      router.push("/login");
    }
  }, [router]);

  if (!isAuthorized) {
    return null; // Or a loading spinner
  }

  return children;
};
