import { useEffect, useState } from "react";

import { dashboardService } from "../services/dashboard.service";

import type { DashboardStats } from "../types/dashboard.types";

import { contactApi } from "../api/contact.api";

export const useDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    historicalPlaces: 0,
    subscribers: 0,
    messages: 0,
    visitors: 0,
  });

  const [recentMessages, setRecentMessages] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      const [dashboardData, messagesResponse] = await Promise.all([
        dashboardService.getStats(),

        contactApi.getMessages(),
      ]);

      setStats(dashboardData);

      setRecentMessages(messagesResponse.data.data ?? []);
    } catch (error) {
      console.error("Dashboard loading failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();

    const interval = setInterval(() => {
      loadDashboard();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return {
    loading,

    historicalPlaceCount: stats.historicalPlaces,

    subscriberCount: stats.subscribers,

    contactCount: stats.messages,

    visitors: stats.visitors,

    recentMessages,
  };
};
