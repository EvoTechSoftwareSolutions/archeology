import { useEffect, useState } from "react";

import { analyticsService } from "../services/analytics.service";

import type { AnalyticsData } from "../types/analytics.types";

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadAnalytics = async () => {
    try {
      const data = await analyticsService.getAnalytics();

      setAnalytics(data);
    } catch {
      setError("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  return {
    analytics,

    loading,

    error,
  };
};
