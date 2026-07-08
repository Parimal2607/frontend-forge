"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/common/Button";
import { DashboardSummary } from "@/features/dashboard/components/DashboardSummary";
import { useAppStore } from "@/store/app-store";
import { formatDate } from "@/utils/formatDate";

export function HomeView() {
  const { sidebarOpen, toggleSidebar } = useAppStore();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-10">
        <section className="space-y-2">
          <p className="text-sm uppercase tracking-wide text-zinc-500">
            Enterprise Architecture
          </p>
          <h1 className="text-3xl font-bold">Layered, scalable structure</h1>
          <p className="text-zinc-600">
            Features, services, providers, and store work together.{" "}
            {formatDate(new Date())}
          </p>
        </section>

        <section className="rounded-lg border bg-white p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-medium">Global store</h2>
            <Button onClick={toggleSidebar}>
              Sidebar {sidebarOpen ? "Open" : "Closed"}
            </Button>
          </div>
          <DashboardSummary />
        </section>
      </main>
      <Footer />
    </div>
  );
}
