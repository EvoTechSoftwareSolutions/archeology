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

  const lastUnreadRef = useRef<number>(0);

  // Silent refetch: updates data in the background without triggering loading spinners
  const refreshAll = async () => {
    try {
      setError("");
      const [statsData, messagesData] = await Promise.all([
        contactService.getStats(),
        contactService.getMessages(),
      ]);

      setStats(statsData);
      setMessages(messagesData);
      lastUnreadRef.current = statsData.unread;
    } catch (err: any) {
      setError(err?.message ?? "Failed to refresh contact messages");
    }
  };

  // Full load: used ONLY on initial page mount
  const loadAll = async () => {
    try {
      setLoading(true);
      await refreshAll();
    } finally {
      setLoading(false);
    }
  };

  const pollForNewMessages = async () => {
    try {
      const statsData = await contactService.getStats();
      setStats(statsData);

      if (statsData.unread !== lastUnreadRef.current) {
        lastUnreadRef.current = statsData.unread;
        const messagesData = await contactService.getMessages();
        setMessages(messagesData);
      }
    } catch (err: any) {
      setError(err?.message ?? "Failed to check for new messages");
    }
  };

  const markAsRead = async (id: number) => {
    // 1. Optimistic update (UI updates instantly without waiting for network)
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, status: "read" } : msg))
    );
    setStats((prev) => ({
      ...prev,
      unread: Math.max(0, prev.unread - 1),
      read: prev.read + 1,
    }));

    // 2. Call API & silently sync
    await contactService.updateStatus(id, "read");
    await refreshAll();
  };

  const markAsReplied = async (id: number) => {
    await contactService.updateStatus(id, "replied");
    await refreshAll();
  };

  const deleteMessage = async (id: number) => {
    // 1. Optimistic remove
    setMessages((prev) => prev.filter((msg) => msg.id !== id));

    // 2. Call API & silently sync
    await contactService.deleteMessage(id);
    await refreshAll();
  };

  const sendReply = async (id: number, text: string) => {
    // 1. Optimistic update
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, status: "replied" } : msg))
    );

    // 2. Call API & silently sync
    await contactService.reply(id, text);
    await refreshAll();
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
    reload: refreshAll,
    markAsRead,
    markAsReplied,
    deleteMessage,
    sendReply,
  };
}