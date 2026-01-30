"use client";

import { MyState } from "@/context/mystate";

export function Providers({ children }: { children: React.ReactNode }) {
    // @ts-ignore - MyState is likely implicit any or JSX
    return <MyState>{children}</MyState>;
}
