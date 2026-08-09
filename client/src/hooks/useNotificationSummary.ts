import { useEffect, useState, useCallback } from "react";
import { notificationService } from "../services/notification.service";
import type { NotificationSummary, NotificationItem } from "../services/notification.service";
import useNotificationsSocket from "./useNotificationsSocket";

export function useNotificationSummary() {
  const [summary, setSummary] = useState<NotificationSummary>({
    unreadContactsCount: 0,
    newSubscribersCount: 0,
    notifications: [],
  });
  const [loading, setLoading] = useState(false);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const data = await notificationService.getSummary();
      setSummary(data);
    } catch (err) {
      console.warn("Failed to fetch notification summary", err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewNotification = useCallback((n: any) => {
    const item: NotificationItem = {
      id: n?.id || String(Date.now()),
      type: n?.type || "general",
      title: n?.title || "Notification",
      subtitle: n?.subtitle || "",
      time: "Just now",
      link: n?.link || "#",
    };

    setSummary((prev) => {
      const isContact = n?.type === "contact";
      const isNewsletter = n?.type === "newsletter";
      return {
        unreadContactsCount: isContact ? prev.unreadContactsCount + 1 : prev.unreadContactsCount,
        newSubscribersCount: isNewsletter ? prev.newSubscribersCount + 1 : prev.newSubscribersCount,
        notifications: [item, ...prev.notifications.filter((x) => x.id !== item.id)],
      };
    });
  }, []);

  /** Clear contact badge immediately (optimistic) and persist via API */
  const clearContactCount = useCallback(async () => {
    setSummary((prev) => ({ ...prev, unreadContactsCount: 0 }));
    try {
      await notificationService.markContactsRead();
    } catch {
      // silently fail — badge will re-sync on next summary fetch
    }
  }, []);

  /** Clear newsletter badge immediately (optimistic) and persist via API */
  const clearNewsletterCount = useCallback(async () => {
    setSummary((prev) => ({ ...prev, newSubscribersCount: 0 }));
    try {
      await notificationService.markNewsletterSeen();
    } catch {
      // silently fail
    }
  }, []);

  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
  useNotificationsSocket(token, handleNewNotification);

  useEffect(() => {
    if (token) {
      fetchSummary();
    }
  }, [token]);

  return {
    ...summary,
    totalUnread: summary.unreadContactsCount + summary.newSubscribersCount,
    loading,
    refresh: fetchSummary,
    clearContactCount,
    clearNewsletterCount,
  };
}
