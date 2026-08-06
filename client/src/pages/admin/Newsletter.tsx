import React from "react";
import { useNewsletter } from "../../hooks/useNewsletter";

const Newsletter = () => {
  const { subscribers, stats, loading, error } = useNewsletter();

  if (loading) {
    return <div className="text-center py-8 text-sm sm:text-base">Loading...</div>;
  }

  return (
    <div className="w-full px-3 sm:px-4 lg:px-0">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 break-words">
          Newsletter Management
        </h1>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow border border-gray-100 min-w-0">
            <p className="text-gray-600 text-xs sm:text-sm mb-1 sm:mb-2">Total Subscribers</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#275949]">{stats.total}</h3>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow border border-gray-100 min-w-0">
            <p className="text-gray-600 text-xs sm:text-sm mb-1 sm:mb-2">Active Subscribers</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-green-600">{stats.active}</h3>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm break-words">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px]">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                  Email
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                  Subscribed
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {subscribers.length > 0 ? (
                subscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900 max-w-[220px] sm:max-w-none truncate">
                      {sub.email}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          sub.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-600 whitespace-nowrap">
                      {new Date(sub.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500 text-sm">
                    No subscribers yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;