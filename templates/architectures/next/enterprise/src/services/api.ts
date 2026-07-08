import { env } from "@/config/env";
import type { User } from "@/types/user";

export async function fetchHealth() {
  const response = await fetch(`${env.apiUrl}/health`);

  if (!response.ok) {
    throw new Error("Health check failed");
  }

  return response.json();
}

export async function fetchCurrentUser(): Promise<User> {
  const response = await fetch(`${env.apiUrl}/users/me`);

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
}
