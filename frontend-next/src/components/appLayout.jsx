"use client";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { usePathname } from "next/navigation";

const AppLayout = ({ children }) => {
  const pathname = usePathname();

  const hideRoutes = ["/login", "/signup", "/booking", "/postproperty"];
  const shouldHideHeaderFooter = hideRoutes.includes(pathname);
  return (
    <div className="">
      {!shouldHideHeaderFooter && <Header />}
      <div className={shouldHideHeaderFooter ? "" : "mt-20"}>{children}</div>
      {!shouldHideHeaderFooter && <Footer />}
    </div>
  );
};

export default AppLayout;
