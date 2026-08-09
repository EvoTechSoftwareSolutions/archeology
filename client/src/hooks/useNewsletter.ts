import { useEffect, useState } from "react";

import { newsletterService } from "../services/newsletter.service";

import type { Subscriber, NewsletterStats } from "../types/newsletter.type";

export function useNewsletter() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  const [stats, setStats] = useState<NewsletterStats>({
    total: 0,
    active: 0,
  });

  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);

      const [subs, stat] = await Promise.all([
        newsletterService.getSubscribers(),
        newsletterService.getStats(),
      ]);

      setSubscribers(subs);
      setStats(stat);
    } catch {
      setError("Failed to load newsletter");
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (subscriber: Subscriber) => {
    const newStatus = subscriber.status === "SUBSCRIBED" ? "UNSUBSCRIBED" : "SUBSCRIBED";
    setActionLoading(subscriber.id);
    try {
      await newsletterService.updateSubscriber(subscriber.id, newStatus);
      await load();
    } catch {
      setError("Failed to update subscriber status");
    } finally {
      setActionLoading(null);
    }
  };

  const deleteSubscriber = async (id: number) => {
    setActionLoading(id);
    try {
      await newsletterService.deleteSubscriber(id);
      await load();
    } catch {
      setError("Failed to delete subscriber");
    } finally {
      setActionLoading(null);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return {
    subscribers,
    stats,
    loading,
    actionLoading,
    error,
    reload: load,
    toggleStatus,
    deleteSubscriber,
  };
}
