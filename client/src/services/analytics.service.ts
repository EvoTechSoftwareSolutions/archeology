import { analyticsApi } from "../api/analytics.api";
import type { AnalyticsData } from "../types/analytics.types";

export const analyticsService = {
  async getAnalytics(): Promise<AnalyticsData> {
    const response = await analyticsApi.getAll();
    const raw = response.data.data;

    // The API currently returns a flatter, differently-named shape than
    // AnalyticsData. Normalize it here so the rest of the app can rely on
    // the AnalyticsData contract without null checks everywhere.
    return {
      stats: {
        historicalPlaces: raw.historicalPlaces ?? 0,
        // Not provided by the API yet — defaults to 0 until backend adds it.
        unescoSites: raw.unescoSites ?? 0,
        // Not provided by the API yet — defaults to 0 until backend adds it.
        images: raw.images ?? 0,
        monthlyVisitors: raw.visitors ?? raw.monthlyVisitors ?? 0,
      },
      visitorAnalytics: raw.visitorAnalytics ?? {
        months: [],
        locals: [],
        foreigners: [],
      },
      // API currently sends this as "provinceChart".
      provinceDistribution: raw.provinceDistribution ?? raw.provinceChart ?? [],
      mostSearched: raw.mostSearched ?? [],
    };
  },
};