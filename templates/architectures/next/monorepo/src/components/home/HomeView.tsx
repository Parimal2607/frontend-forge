"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/common/Button";
import { useToggle } from "@/hooks/useToggle";
import { useDebounce } from "@/hooks/useDebounce";
import { formatDate } from "@/utils/formatDate";

export function HomeView() {
  const { value, toggle } = useToggle();
  const [query, setQuery] = useState("architecture");
  const debouncedQuery = useDebounce(query);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-10">
        <section className="space-y-2">
          <p className="text-sm uppercase tracking-wide text-zinc-500">
            Monorepo Architecture
          </p>
          <h1 className="text-3xl font-bold">Monorepo starter connected end-to-end</h1>
          <p className="text-zinc-600">
            Components, shared packages, and workspace tooling work together from day one.
            Today is {formatDate(new Date())}.
          </p>
        </section>

        <section className="rounded-lg border p-4">
          <h2 className="mb-2 font-medium">Hook demo</h2>
          <p className="mb-3 text-sm text-zinc-600">
            Toggle state: {value ? "On" : "Off"}
          </p>
          <Button onClick={toggle}>Toggle with useToggle</Button>
        </section>

        <section className="rounded-lg border p-4">
          <h2 className="mb-2 font-medium">Debounce demo</h2>
          <input
            className="mb-2 w-full rounded-md border px-3 py-2"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Type to debounce"
          />
          <p className="text-sm text-zinc-600">Debounced: {debouncedQuery}</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
