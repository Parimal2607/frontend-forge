"use client";

import { ReactNode } from "react";

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  return <div className="min-h-screen bg-white text-zinc-900">{children}</div>;
}
