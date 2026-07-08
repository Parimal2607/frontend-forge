"use client";

import { Button } from "@/shared/components/common/Button";
import { useToggle } from "@/shared/hooks/useToggle";
import { useHome } from "../hooks/useHome";

export function HomeHero() {
  const { value, toggle } = useToggle();
  const { stats, loading } = useHome();

  return (
    <section className="space-y-4 rounded-lg border p-6">
      <div>
        <p className="text-sm uppercase tracking-wide text-zinc-500">
          Home Feature
        </p>
        <h1 className="text-3xl font-bold">Organized by feature</h1>
        <p className="mt-2 text-zinc-600">
          This page lives inside the home feature with its own hooks and
          services.
        </p>
      </div>

      <Button onClick={toggle}>Feature toggle: {value ? "On" : "Off"}</Button>

      {!loading && (
        <div className="grid gap-3 sm:grid-cols-3">
          {stats.map((stat) => (
            <article key={stat.label} className="rounded-md border p-3">
              <p className="text-sm text-zinc-500">{stat.label}</p>
              <p className="text-xl font-semibold">{stat.value}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
