import { env } from "@/config/env";
import type { DashboardMetric } from "../types";

const fallbackMetrics: DashboardMetric[] = [
  { label: "Active Users", value: "1,248" },
  { label: "Revenue", value: "$42,300" },
  { label: "Uptime", value: "99.9%" },
];

export async function fetchDashboardMetrics(): Promise<DashboardMetric[]> {
  try {
    const response = await fetch(`${env.apiUrl}/dashboard/metrics`);

    if (!response.ok) {
      return fallbackMetrics;
    }

    return response.json();
  } catch {
    return fallbackMetrics;
  }
}
