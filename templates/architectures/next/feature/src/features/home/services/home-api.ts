import { env } from "@/config/env";
import type { HomeStats } from "../types";

const fallbackStats: HomeStats[] = [
  { label: "Features", value: "2" },
  { label: "Shared Modules", value: "5" },
  { label: "Ready", value: "Yes" },
];

export async function fetchHomeStats(): Promise<HomeStats[]> {
  try {
    const response = await fetch(`${env.apiUrl}/home/stats`);

    if (!response.ok) {
      return fallbackStats;
    }

    return response.json();
  } catch {
    return fallbackStats;
  }
}
