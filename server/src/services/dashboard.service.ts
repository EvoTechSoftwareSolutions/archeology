import { DashboardRepository } from "../repositories/dashboard.repository.js";

class DashboardService {
  private readonly dashboardRepository: DashboardRepository;

  constructor() {
    this.dashboardRepository = new DashboardRepository();
  }

  async getStats() {
    const [historicalPlaces, subscribers, messages] = await Promise.all([
      this.dashboardRepository.countHistoricalPlaces(),

      this.dashboardRepository.countSubscribers(),

      this.dashboardRepository.countUnreadMessages(),
    ]);

    return {
      historicalPlaces,

      subscribers,

      messages,

      visitors: 22000,
    };
  }
}

export const dashboardService = new DashboardService();
