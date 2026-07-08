"use client";

import { Header } from "@/shared/components/layout/Header";
import { Footer } from "@/shared/components/layout/Footer";
import { ProfileCard } from "@/features/profile/components/ProfileCard";
import { HomeHero } from "./HomeHero";

export function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 py-10">
        <HomeHero />
        <ProfileCard />
      </main>
      <Footer />
    </div>
  );
}
