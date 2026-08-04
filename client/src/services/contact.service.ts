import { contactApi } from "../api/contact.api";
import type {
  ContactMessage,
  ContactStats,
  CreateContactPayload,
} from "../types/contact.types";

export const contactService = {
  async createMessage(data: CreateContactPayload) {
    const response = await contactApi.create(data);
    return response.data;
  },

  async getMessages(): Promise<ContactMessage[]> {
    const response = await contactApi.getMessages();
    return response.data.data;
  },

  async getStats(): Promise<ContactStats> {
    const response = await contactApi.getStats();
    return response.data.data;
  },

  async updateStatus(id: number, status: "unread" | "read" | "replied") {
    const response = await contactApi.updateStatus(id, status);
    return response.data;
  },

  async deleteMessage(id: number) {
    const response = await contactApi.deleteMessage(id);
    return response.data;
  },

  async reply(id: number, text: string) {
    const response = await contactApi.reply(id, text);
    return response.data;
  },
};
