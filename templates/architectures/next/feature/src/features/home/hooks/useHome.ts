"use client";

import { useEffect, useState } from "react";
import { fetchHomeStats } from "../services/home-api";
import type { HomeStats } from "../types";

export function useHome() {
  const [stats, setStats] = useState<HomeStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeStats()
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  return { stats, loading };
}
