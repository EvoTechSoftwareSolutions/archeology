import { useEffect, useState } from "react";
import { MdDelete, MdCheckCircle } from "react-icons/md";

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

const ContactMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [stats, setStats] = useState({ total: 0, unread: 0, read: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const [replyText, setReplyText] = useState("");
  const [replying, setReplying] = useState(false);

  useEffect(() => {
    void fetchData(true);

    const intervalId = window.setInterval(() => {
      void fetchData(false);
    }, 5000);

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        void fetchData(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const fetchData = async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoading(true);
      }
      const token = localStorage.getItem("adminToken");

      const [statsRes, messagesRes] = await Promise.all([
        fetch("http://localhost:5000/api/v1/contact/stats", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:5000/api/v1/contact/messages", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData.data);
      }

      if (messagesRes.ok) {
        const messagesData = await messagesRes.json();
        setMessages(messagesData.data || []);
      }
    } catch (err) {
      setError("Failed to load contact messages");
      console.error(err);
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  };

  const handleMarkResolved = async (id: number) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`http://localhost:5000/api/v1/contact/messages/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "archived" }),
      });

      if (response.ok) {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === id ? { ...msg, status: "archived" } : msg))
        );
        setSelectedMessage(null);
      }
    } catch (err) {
      console.error("Failed to update message", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await fetch(`http://localhost:5000/api/v1/contact/messages/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          setMessages((prev) => prev.filter((msg) => msg.id !== id));
          setSelectedMessage(null);
        }
      } catch (err) {
        console.error("Failed to delete message", err);
      }
    }
  };

  const handleReply = async (id: number) => {
    if (!replyText.trim()) return;
    try {
      setReplying(true);
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`http://localhost:5000/api/v1/contact/messages/${id}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ replyText }),
      });

      if (response.ok) {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === id ? { ...msg, status: "archived" } : msg))
        );
        setSelectedMessage(prev => prev ? { ...prev, status: "archived" } : null);
        setReplyText("");
        alert("Reply sent successfully!");
      } else {
        alert("Failed to send reply");
      }
    } catch (err) {
      console.error("Failed to send reply", err);
      alert("Failed to send reply");
    } finally {
      setReplying(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Messages</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
            <p className="text-gray-600 text-xs mb-1">Total</p>
            <h3 className="text-2xl font-bold text-[#275949]">{stats.total}</h3>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
            <p className="text-gray-600 text-xs mb-1">Unread</p>
            <h3 className="text-2xl font-bold text-orange-600">{stats.unread}</h3>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
            <p className="text-gray-600 text-xs mb-1">Read</p>
            <h3 className="text-2xl font-bold text-blue-600">{stats.read}</h3>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
            <p className="text-gray-600 text-xs mb-1">Resolved</p>
            <h3 className="text-2xl font-bold text-green-600">{stats.resolved}</h3>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">From</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Subject</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {messages.length > 0 ? (
                    messages.map((msg) => (
                      <tr
                        key={msg.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedMessage(msg)}
                      >
                        <td className="px-6 py-4 text-sm text-gray-900">{msg.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{msg.subject}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            msg.status === "unread"
                              ? "bg-orange-100 text-orange-800"
                              : msg.status === "read"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}>
                            {msg.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(msg.id);
                            }}
                            className="text-red-600 hover:text-red-800"
                          >
                            <MdDelete size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                        No messages yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {selectedMessage && (
          <div className="bg-white rounded-lg shadow border border-gray-100 p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-900">Message Detail</h2>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-600 mb-1">From</p>
                <p className="font-semibold text-gray-900">{selectedMessage.name}</p>
                <p className="text-sm text-gray-600">{selectedMessage.email}</p>
              </div>

              <div>
                <p className="text-xs text-gray-600 mb-1">Subject</p>
                <p className="font-semibold text-gray-900">{selectedMessage.subject}</p>
              </div>

              <div>
                <p className="text-xs text-gray-600 mb-1">Date</p>
                <p className="text-sm text-gray-600">
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-600 mb-1">Message</p>
                <p className="text-sm text-gray-900 whitespace-pre-wrap bg-gray-50 p-3 rounded">
                  {selectedMessage.message}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-600 mb-2">Status</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  selectedMessage.status === "unread"
                    ? "bg-orange-100 text-orange-800"
                    : selectedMessage.status === "read"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}>
                  {selectedMessage.status}
                </span>
              </div>

              {selectedMessage.status !== "archived" && (
                <>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-600 mb-2">Send Reply</p>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#275949] focus:outline-none"
                      rows={4}
                      placeholder="Type your reply here..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    ></textarea>
                    <button
                      onClick={() => handleReply(selectedMessage.id)}
                      disabled={replying || !replyText.trim()}
                      className="w-full mt-2 bg-[#275949] hover:bg-[#1f473a] disabled:bg-gray-400 text-white px-4 py-2 rounded font-medium"
                    >
                      {replying ? "Sending..." : "Send Reply"}
                    </button>
                  </div>
                  
                  <button
                    onClick={() => handleMarkResolved(selectedMessage.id)}
                    className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center justify-center gap-2 font-medium"
                  >
                    <MdCheckCircle /> Mark as Resolved
                  </button>
                </>
              )}

              <button
                onClick={() => handleDelete(selectedMessage.id)}
                className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center justify-center gap-2 font-medium"
              >
                <MdDelete /> Delete Message
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactMessages;
