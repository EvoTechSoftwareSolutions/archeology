import api from "../lib/axios";

export const contactApi = {
  create(data: any) {
    return api.post("/contact", data);
  },

  getMessages() {
    return api.get("/contact/messages");
  },

  getStats() {
    return api.get("/contact/stats");
  },

  updateStatus(id: number, status: string) {
    return api.patch(`/contact/messages/${id}`, {
      status,
    });
  },

  deleteMessage(id: number) {
    return api.delete(`/contact/messages/${id}`);
  },

  reply(id: number, text: string) {
    return api.post(`/contact/messages/${id}/reply`, {
      replyText: text,
    });
  },
};
