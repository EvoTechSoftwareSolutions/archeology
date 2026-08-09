import api from "../lib/axios";

export const newsletterApi = {
  getSubscribers() {
    return api.get("/newsletter/subscribers");
  },

  getStats() {
    return api.get("/newsletter/stats");
  },

  updateSubscriber(id: number, data: { status: string }) {
    return api.put(`/newsletter/subscribers/${id}`, data);
  },

  deleteSubscriber(id: number) {
    return api.delete(`/newsletter/subscribers/${id}`);
  },

  unsubscribe(token: string) {
    return api.get(`/newsletter/unsubscribe/${token}`);
  },
};