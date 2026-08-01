import { useEffect, useState } from "react";
import { MdDelete, MdCheckCircle } from "react-icons/md";

interface Subscriber {
  id: number;
  email: string;
  status: string;
  createdAt: string;
}

const NewsletterManagement = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [stats, setStats] = useState({ total: 0, active: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");

      const [statsRes, subsRes] = await Promise.all([
        fetch("http://localhost:5000/api/v1/newsletter/stats"),
        fetch("http://localhost:5000/api/v1/newsletter/subscribers", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData.data);
      }

      if (subsRes.ok) {
        const subsData = await subsRes.json();
        setSubscribers(subsData.data || []);
      }
    } catch (err) {
      setError("Failed to load newsletter data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Newsletter Management</h1>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
            <p className="text-gray-600 text-sm mb-2">Total Subscribers</p>
            <h3 className="text-3xl font-bold text-[#275949]">{stats.total}</h3>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
            <p className="text-gray-600 text-sm mb-2">Active Subscribers</p>
            <h3 className="text-3xl font-bold text-green-600">{stats.active}</h3>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Subscribed</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {subscribers.length > 0 ? (
                subscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{sub.email}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        sub.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(sub.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
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

export default NewsletterManagement;
