import api from "../lib/axios";

export const newsletterApi = {
  getSubscribers() {
    return api.get("/newsletter/subscribers");
  },

  getStats() {
    return api.get("/newsletter/stats");
  },

  deleteSubscriber(id: number) {
    return api.delete(`/newsletter/${id}`);
  },
};
