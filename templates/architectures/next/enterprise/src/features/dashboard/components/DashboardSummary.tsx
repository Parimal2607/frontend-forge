"use client";

import { useDashboard } from "../hooks/useDashboard";

export function DashboardSummary() {
  const { metrics, loading } = useDashboard();

  if (loading) {
    return <p className="text-sm text-zinc-500">Loading dashboard...</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {metrics.map((metric) => (
        <article key={metric.label} className="rounded-lg border bg-white p-4">
          <p className="text-sm text-zinc-500">{metric.label}</p>
          <p className="mt-1 text-2xl font-semibold">{metric.value}</p>
        </article>
      ))}
    </div>
  );
}
