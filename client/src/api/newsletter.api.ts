import api from "../lib/axios";

export const newsletterApi = {
  getSubscribers() {
    return api.get("/newsletter/subscribers");
  },

  getStats() {
    return api.get("/newsletter/stats");
  },

  updateSubscriber(id: number, data: { status: string }) {
    return api.patch(`/newsletter/subscribers/${id}`, data);
  },

  deleteSubscriber(id: number) {
    return api.delete(`/newsletter/subscribers/${id}`);
  },
};
