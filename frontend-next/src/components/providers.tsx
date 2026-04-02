"use client";

import { MyState } from "@/context/mystate";

import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MyState>
      {children}
      <Toaster position="top-center" reverseOrder={false} />
    </MyState>
  );
}
