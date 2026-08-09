import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNewsletter } from "../../hooks/useNewsletter";
import { FiSend, FiRefreshCw, FiTrash2, FiToggleLeft, FiToggleRight, FiSearch } from "react-icons/fi";

const Newsletter = () => {
  const { subscribers, stats, loading, actionLoading, error, reload, toggleStatus, deleteSubscriber } = useNewsletter();
  const [search, setSearch] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const filtered = subscribers.filter(s =>
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    if (confirmDelete === id) {
      await deleteSubscriber(id);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(id);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3 text-gray-500">
          <FiRefreshCw className="animate-spin" size={28} />
          <span className="text-sm">Loading newsletter data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-3 sm:px-4 lg:px-0">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Newsletter Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage subscribers and send campaigns</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={reload}
              className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition"
              title="Refresh"
            >
              <FiRefreshCw size={16} />
            </button>
            <Link
              to="/admin/newsletter/campaign"
              className="flex items-center gap-2 bg-[#275949] hover:bg-[#1a3f33] text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
            >
              <FiSend size={14} />
              Send Campaign
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-xs sm:text-sm mb-1">Total Subscribers</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#275949]">{stats.total}</h3>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-xs sm:text-sm mb-1">Active (Subscribed)</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-green-600">{stats.active}</h3>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 col-span-2 md:col-span-1">
            <p className="text-gray-500 text-xs sm:text-sm mb-1">Unsubscribed</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-red-500">{stats.total - stats.active}</h3>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Search bar */}
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search by email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#275949]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Email</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Status</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Joined</th>
                <th className="px-4 sm:px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length > 0 ? (
                filtered.map((sub) => {
                  const isSubscribed = sub.status === "SUBSCRIBED";
                  const isActioning = actionLoading === sub.id;
                  return (
                    <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 max-w-[240px] truncate">
                        {sub.email}
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          isSubscribed
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${isSubscribed ? "bg-green-500" : "bg-red-400"}`} />
                          {isSubscribed ? "Subscribed" : "Unsubscribed"}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-500">
                        {new Date(sub.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {/* Toggle Subscribe/Unsubscribe */}
                          <button
                            onClick={() => toggleStatus(sub)}
                            disabled={isActioning}
                            title={isSubscribed ? "Unsubscribe" : "Re-subscribe"}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all disabled:opacity-50 ${
                              isSubscribed
                                ? "bg-orange-50 text-orange-600 hover:bg-orange-100 border border-orange-200"
                                : "bg-green-50 text-green-600 hover:bg-green-100 border border-green-200"
                            }`}
                          >
                            {isActioning ? (
                              <FiRefreshCw className="animate-spin" size={12} />
                            ) : isSubscribed ? (
                              <FiToggleRight size={14} />
                            ) : (
                              <FiToggleLeft size={14} />
                            )}
                            {isSubscribed ? "Unsubscribe" : "Subscribe"}
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(sub.id)}
                            disabled={isActioning}
                            title={confirmDelete === sub.id ? "Click again to confirm" : "Delete subscriber"}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all disabled:opacity-50 border ${
                              confirmDelete === sub.id
                                ? "bg-red-600 text-white border-red-600"
                                : "bg-red-50 text-red-500 hover:bg-red-100 border-red-200"
                            }`}
                          >
                            <FiTrash2 size={12} />
                            {confirmDelete === sub.id ? "Confirm?" : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-400 text-sm">
                    {search ? `No subscribers found matching "${search}"` : "No subscribers yet"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filtered.length > 0 && (
          <div className="px-4 sm:px-6 py-3 border-t border-gray-100 bg-gray-50 text-xs text-gray-500">
            Showing {filtered.length} of {subscribers.length} subscribers
          </div>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
