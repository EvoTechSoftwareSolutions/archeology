import { contactApi } from "../api/contact.api";

export const contactService = {
  async createMessage(data: any) {
    const response = await contactApi.create(data);

    return response.data;
  },

  async getMessages() {
    const response = await contactApi.getMessages();

    return response.data.data;
  },

  async getStats() {
    const response = await contactApi.getStats();

    return response.data.data;
  },

  async updateStatus(id: number, status: string) {
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
