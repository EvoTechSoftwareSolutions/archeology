import { useEffect, useRef, useState } from "react";
import { contactService } from "../services/contact.service";
import type { ContactMessage, ContactStats } from "../types/contact.types";

const EMPTY_STATS: ContactStats = { total: 0, unread: 0, read: 0, replied: 0 };
const POLL_INTERVAL_MS = 5000;

export function useContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [stats, setStats] = useState<ContactStats>(EMPTY_STATS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Tracks the last known unread count so the light poll can decide
  // whether a full message reload is actually needed.
  const lastUnreadRef = useRef<number>(0);

  const loadMessages = async () => {
    const messagesData = await contactService.getMessages();
    setMessages(messagesData);
  };

  // Full load: used on mount and after any create/update/delete action.
  const loadAll = async () => {
    try {
      setLoading(true);
      setError("");

      const [statsData, messagesData] = await Promise.all([
        contactService.getStats(),
        contactService.getMessages(),
      ]);

      setStats(statsData);
      setMessages(messagesData);
      lastUnreadRef.current = statsData.unread;
    } catch (err: any) {
      setError(err?.message ?? "Failed to load contact messages");
    } finally {
      setLoading(false);
    }
  };

  // Light poll: only hits /contact/stats. Only triggers the heavier
  // /contact/messages fetch if the unread count actually changed
  // (i.e. a new message arrived, or one got read elsewhere).
  const pollForNewMessages = async () => {
    try {
      const statsData = await contactService.getStats();
      setStats(statsData);

      if (statsData.unread !== lastUnreadRef.current) {
        lastUnreadRef.current = statsData.unread;
        await loadMessages();
      }
    } catch (err: any) {
      setError(err?.message ?? "Failed to check for new messages");
    }
  };

  const markAsReplied = async (id: number) => {
    await contactService.updateStatus(id, "replied");
    await loadAll();
  };

  const markAsRead = async (id: number) => {
  await contactService.updateStatus(id, "read");
  await loadAll();
};

  const deleteMessage = async (id: number) => {
    await contactService.deleteMessage(id);
    await loadAll();
  };

  const sendReply = async (id: number, text: string) => {
    await contactService.reply(id, text);
    await loadAll();
  };

  useEffect(() => {
    loadAll();
    const timer = setInterval(pollForNewMessages, POLL_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return {
    messages,
    stats,
    loading,
    error,
    reload: loadAll,
    markAsRead,
    markAsReplied,
    deleteMessage,
    sendReply,
  };
}