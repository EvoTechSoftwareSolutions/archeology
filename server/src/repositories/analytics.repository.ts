import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const analyticsRepository = {
  async getAnalytics() {
    const [historicalPlaces, subscribers, messages] = await Promise.all([
      prisma.historicalPlace.count(),

      prisma.newsletterSubscriber.count(),

      prisma.contactMessage.count(),
    ]);

    return {
      historicalPlaces,
      subscribers,
      messages,
      visitors: 22000,

      visitorAnalytics: {
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],

        locals: [10000, 12000, 14000, 15000, 17000, 18500, 19000],

        foreigners: [1000, 2000, 3500, 5000, 7000, 9000, 11000],
      },

      provinceChart: [],

      mostSearched: [
        {
          name: "Sigiriya",
          count: 8420,
        },
        {
          name: "Temple of the Tooth",
          count: 6210,
        },
      ],
    };
  },
};
