import type { Prisma } from "@prisma/client";
import { prisma } from "../prisma/prisma.js";


export class DashboardRepository {
  async countHistoricalPlaces() {
    return prisma.historicalPlace.count();
  }

  async countSubscribers() {
    return prisma.newsletterSubscriber.count({
      where: {
        status: "ACTIVE",
      },
    });
  }

  async countUnreadMessages() {
    return prisma.contactMessage.count({
      where: {
        status: "unread",
      },
    });
  }
}
