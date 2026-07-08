"use client";

import { useEffect, useState } from "react";
import { fetchDashboardMetrics } from "../services/dashboard-api";
import type { DashboardMetric } from "../types";

export function useDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardMetrics()
      .then(setMetrics)
      .finally(() => setLoading(false));
  }, []);

  return { metrics, loading };
}
