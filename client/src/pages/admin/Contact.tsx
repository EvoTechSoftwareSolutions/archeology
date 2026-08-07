import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useContactMessages } from "../../hooks/useContactMessages";
import type { ContactMessage } from "../../types/contact.types";

const statusBadgeClass = (status: ContactMessage["status"]) => {
  switch (status) {
    case "unread":
      return "bg-orange-100 text-orange-800";
    case "read":
      return "bg-blue-100 text-blue-800";
    case "replied":
      return "bg-green-100 text-green-800";
  }
};

const Contact = () => {
  const {
    messages,
    stats,
    loading,
    error,
    markAsRead,
    deleteMessage,
    sendReply,
  } = useContactMessages();

  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null,
  );
  const [replyText, setReplyText] = useState("");
  const [replying, setReplying] = useState(false);

  const openMessage = async (msg: ContactMessage) => {
    setSelectedMessage(msg);

    if (msg.status === "unread") {
      try {
        await markAsRead(msg.id);

        setSelectedMessage((prev) =>
          prev && prev.id === msg.id
            ? {
                ...prev,
                status: "read",
              }
            : prev,
        );
      } catch (error) {
        console.error("Failed to mark read", error);
      }
    }
  };

  const handleDelete = (id: number) => {
    if (!window.confirm("Delete this message?")) return;
    void deleteMessage(id);
    if (selectedMessage?.id === id) setSelectedMessage(null);
  };

  const handleReply = async (id: number) => {
    if (!replyText.trim()) return;

    setReplying(true);
    try {
      await sendReply(id, replyText);
      setReplyText("");
      window.alert("Reply sent successfully");
      // Keep the panel's local copy of selectedMessage in sync so the
      // "replied" badge and hidden reply form reflect immediately,
      // without waiting for the next full reload to re-select it.
      setSelectedMessage((prev) =>
        prev && prev.id === id ? { ...prev, status: "replied" } : prev,
      );
    } finally {
      setReplying(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-sm sm:text-base">Loading...</div>;
  }

  return (
    <div className="w-full px-3 sm:px-4 lg:px-0">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 break-words">
          Contact Messages
        </h1>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow border border-gray-100 min-w-0">
            <p className="text-gray-600 text-xs mb-1">Total</p>
            <h3 className="text-xl sm:text-2xl font-bold text-[#275949]">{stats.total}</h3>
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow border border-gray-100 min-w-0">
            <p className="text-gray-600 text-xs mb-1">Unread</p>
            <h3 className="text-xl sm:text-2xl font-bold text-orange-600">
              {stats.unread}
            </h3>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm break-words">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 min-w-0">
          <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px]">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                      From
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                      Subject
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Status
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {messages.length > 0 ? (
                    messages.map((msg) => (
                      <tr
                        key={msg.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => openMessage(msg)}
                      >
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900 max-w-[140px] truncate">
                          {msg.name}
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-600 max-w-[220px] truncate">
                          {msg.subject}
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm whitespace-nowrap">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadgeClass(msg.status)}`}
                          >
                            {msg.status}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(msg.id);
                            }}
                            className="text-red-600 hover:text-red-800"
                            aria-label="Delete message"
                          >
                            <MdDelete size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-8 text-center text-gray-500 text-sm"
                      >
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
          <div className="bg-white rounded-lg shadow border border-gray-100 p-4 sm:p-6 min-w-0 lg:sticky lg:top-4">
            <div className="flex justify-between items-start gap-3 mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                Message Detail
              </h2>
              <button
                onClick={async () => {
                  if (selectedMessage && selectedMessage.status === "unread") {
                    await markAsRead(selectedMessage.id);
                  }

                  setSelectedMessage(null);
                }}
                className="shrink-0 text-gray-500 hover:text-gray-700"
                aria-label="Close message detail"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="min-w-0">
                <p className="text-xs text-gray-600 mb-1">From</p>
                <p className="font-semibold text-gray-900 break-words">
                  {selectedMessage.name}
                </p>
                <p className="text-sm text-gray-600 break-words">{selectedMessage.email}</p>
              </div>

              <div className="min-w-0">
                <p className="text-xs text-gray-600 mb-1">Subject</p>
                <p className="font-semibold text-gray-900 break-words">
                  {selectedMessage.subject}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-600 mb-1">Date</p>
                <p className="text-sm text-gray-600">
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="min-w-0">
                <p className="text-xs text-gray-600 mb-1">Message</p>
                <p className="text-sm text-gray-900 whitespace-pre-wrap break-words bg-gray-50 p-3 rounded">
                  {selectedMessage.message}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-600 mb-2">Status</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusBadgeClass(selectedMessage.status)}`}
                >
                  {selectedMessage.status}
                </span>
              </div>

              {selectedMessage.status === "replied" ? (
                <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded p-3 break-words">
                  A reply has already been sent for this message.
                </p>
              ) : (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-600 mb-2">Send Reply</p>
                  <textarea
                    className="w-full min-w-0 p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#275949] focus:outline-none resize-none"
                    rows={4}
                    placeholder="Type your reply here..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  ></textarea>
                  <button
                    onClick={() => handleReply(selectedMessage.id)}
                    disabled={replying || !replyText.trim()}
                    className="w-full mt-2 bg-[#275949] hover:bg-[#1f473a] disabled:bg-gray-400 text-white px-4 py-2 rounded font-medium text-sm"
                  >
                    {replying ? "Sending..." : "Send Reply"}
                  </button>
                </div>
              )}

              <button
                onClick={() => handleDelete(selectedMessage.id)}
                className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center justify-center gap-2 font-medium text-sm"
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

export default Contact;