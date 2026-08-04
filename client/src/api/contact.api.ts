import api from "../lib/axios";

export const contactApi = {
  create(data: import("../types/contact.types").CreateContactPayload) {
    return api.post("/contact", data);
  },

  getMessages() {
    return api.get("/contact/messages");
  },

  getStats() {
    return api.get("/contact/stats");
  },

  updateStatus(id: number, status: "unread" | "read" | "replied") {
    return api.patch(`/contact/messages/${id}`, { status });
  },

  deleteMessage(id: number) {
    return api.delete(`/contact/messages/${id}`);
  },

  reply(id: number, text: string) {
    return api.post(`/contact/messages/${id}/reply`, { replyText: text });
  },
};
