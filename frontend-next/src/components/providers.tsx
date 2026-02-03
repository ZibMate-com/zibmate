"use client";

import { MyState } from "@/context/mystate";

import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  // @ts-ignore - MyState is likely implicit any or JSX
  return (
    <MyState>
      {children}
      <Toaster position="top-center" reverseOrder={false} />
    </MyState>
  );
}
