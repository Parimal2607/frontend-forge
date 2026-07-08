"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type AppStore = {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
};

const AppStoreContext = createContext<AppStore | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const value: AppStore = {
    sidebarOpen,
    toggleSidebar: () => setSidebarOpen((prev) => !prev),
  };

  return (
    <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>
  );
}

export function useAppStore() {
  const context = useContext(AppStoreContext);

  if (!context) {
    throw new Error("useAppStore must be used within AppStoreProvider");
  }

  return context;
}
