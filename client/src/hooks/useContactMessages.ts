import { useEffect, useState } from "react";
import { contactService } from "../services/contact.service";

import type { ContactMessage, ContactStats } from "../types/contact.types";

export function useContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  const [stats, setStats] = useState<ContactStats>({
    total: 0,
    unread: 0,
    read: 0,
    resolved: 0,
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);

      const [statsData, messagesData] = await Promise.all([
        contactService.getStats(),

        contactService.getMessages(),
      ]);

      setStats(statsData);

      setMessages(messagesData);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createMessage = async (data: any) => {
    await contactService.createMessage(data);
  };

  const markResolved = async (id: number) => {
    await contactService.updateStatus(id, "archived");

    await loadData();
  };

  const deleteMessage = async (id: number) => {
    await contactService.deleteMessage(id);

    await loadData();
  };

  const sendReply = async (id: number, text: string) => {
    await contactService.reply(id, text);

    await loadData();
  };

  useEffect(() => {
    loadData();

    const timer = setInterval(loadData, 5000);

    return () => clearInterval(timer);
  }, []);

  return {
    messages,

    stats,

    loading,

    error,

    reload: loadData,

    createMessage,

    markResolved,

    deleteMessage,

    sendReply,
  };
}
