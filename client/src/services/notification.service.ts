import api from "../lib/axios";

export interface NotificationItem {
  id: string;
  type: "contact" | "newsletter" | string;
  title: string;
  subtitle: string;
  time: string;
  isRead?: boolean;
  link?: string;
}

export interface NotificationSummary {
  unreadContactsCount: number;
  newSubscribersCount: number;
  notifications: NotificationItem[];
}

export const notificationService = {
  async getSummary(): Promise<NotificationSummary> {
    const res = await api.get("/notifications/summary");
    return res.data.data;
  },

  async markContactsRead(): Promise<void> {
    await api.patch("/notifications/contacts/mark-read");
  },

  async markNewsletterSeen(): Promise<void> {
    await api.patch("/notifications/newsletter/mark-seen");
  },
};
