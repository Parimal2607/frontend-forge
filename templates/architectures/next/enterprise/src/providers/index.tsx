"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { AppStoreProvider } from "@/store/app-store";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <AppStoreProvider>{children}</AppStoreProvider>
    </ThemeProvider>
  );
}
