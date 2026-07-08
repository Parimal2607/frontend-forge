"use client";

import { useProfile } from "../hooks/useProfile";

export function ProfileCard() {
  const { profile, loading } = useProfile();

  if (loading || !profile) {
    return <p className="text-sm text-zinc-500">Loading profile...</p>;
  }

  return (
    <article className="rounded-lg border p-4">
      <p className="text-sm text-zinc-500">Profile Feature</p>
      <h2 className="mt-1 text-xl font-semibold">{profile.name}</h2>
      <p className="text-zinc-600">{profile.role}</p>
    </article>
  );
}
