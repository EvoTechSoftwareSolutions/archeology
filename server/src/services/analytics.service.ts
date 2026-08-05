import { analyticsRepository } from "../repositories/analytics.repository.js";

class AnalyticsService {
  async getAnalytics() {
    return analyticsRepository.getAnalytics();
  }
}

export const analyticsService = new AnalyticsService();