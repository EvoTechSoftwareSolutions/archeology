import { dashboardApi } from "../api/dashboardApi";
import type { DashboardStats } from "../types/dashboard.types";

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const response = await dashboardApi.getAll();

    return response.data.data;
  },
};
