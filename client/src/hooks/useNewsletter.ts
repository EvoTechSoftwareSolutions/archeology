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

  useEffect(() => {
    load();
  }, []);

  return {
    subscribers,

    stats,

    loading,

    error,

    reload: load,
  };
}
