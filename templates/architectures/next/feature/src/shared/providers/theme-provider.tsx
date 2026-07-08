"use client";

import { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-white text-zinc-900">{children}</div>;
}
