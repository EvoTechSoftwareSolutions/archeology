import React, { useEffect, useState } from "react";
import { authService } from "../../services/auth.service";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiShield,
  FiEdit2,
  FiSave,
  FiX,
  FiCalendar,
  FiClock,
} from "react-icons/fi";

const AdminProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ ...profile });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await authService.getCurrentUser();

        console.log(user);

        setProfile(user);
      } catch (error) {
        console.log("Profile loading failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
  const handleSave = () => {
    setProfile({ ...formData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...profile });
    setIsEditing(false);
  };

  const stats = [
    { label: "Places Managed", value: "176" },
    { label: "Images Uploaded", value: "9,640" },
    { label: "Edits This Month", value: "48" },
    { label: "Users Managed", value: "12" },
  ];

  const recentActivity = [
    {
      action: "Published",
      target: "Sigiriya Rock Fortress",
      time: "2 min ago",
    },
    { action: "Edited", target: "Temple of the Tooth", time: "1 hr ago" },
    { action: "Added user", target: "Sanduni Alwis", time: "3 hrs ago" },
    {
      action: "Uploaded 12 images to",
      target: "Media Library",
      time: "5 hrs ago",
    },
    {
      action: "Changed status of",
      target: "Galle Dutch Fort",
      time: "Yesterday",
    },
  ];

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (!profile) {
    return <div>User not found</div>;
  }
  return (
    <div className="w-full font-['Inter'] pb-12">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm text-gray-400 mb-2">Home &gt; Profile</p>
        <h1 className="text-4xl font-bold font-serif text-[#2a2a2a] mb-1 tracking-tight">
          My Profile
        </h1>
        <p className="text-gray-500 text-sm">
          View and manage your account details.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-[#1E4538] via-[#275949] to-[#1E4538] relative">
          <div className="absolute -bottom-12 left-8">
            <div className="w-24 h-24 rounded-2xl bg-[#1E4538] border-4 border-white text-white flex items-center justify-center text-3xl font-bold shadow-lg">
              EV
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="pt-16 px-8 pb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="text-2xl font-bold font-serif text-[#2a2a2a] bg-gray-50 border border-gray-200 rounded-xl px-3 py-1 outline-none focus:ring-2 focus:ring-[#1E4538]/20 mb-1"
                />
              ) : (
                <h2 className="text-2xl font-bold font-serif text-[#2a2a2a] mb-1">
                  {profile.name}
                </h2>
              )}
              <div className="flex items-center gap-2 text-sm text-[#1E4538] font-medium">
                <FiShield size={14} />
                {profile.role}
              </div>
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    <FiX size={16} /> Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1E4538] text-white text-sm font-medium hover:bg-[#15342a] transition-colors shadow-sm"
                  >
                    <FiSave size={16} /> Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1E4538] text-white text-sm font-medium hover:bg-[#15342a] transition-colors shadow-sm"
                >
                  <FiEdit2 size={16} /> Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1 block">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#1E4538]/20"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <FiMail size={14} className="text-gray-400" />
                    {profile.email}
                  </div>
                )}
              </div>
              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1 block">
                  Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#1E4538]/20"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <FiPhone size={14} className="text-gray-400" />
                    {profile.phone}
                  </div>
                )}
              </div>
              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1 block">
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#1E4538]/20"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <FiMapPin size={14} className="text-gray-400" />
                    {profile.location}
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1 block">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    value={formData.bio}
                    rows={4}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#1E4538]/20 resize-none"
                  />
                ) : (
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {profile.bio}
                  </p>
                )}
              </div>
              <div className="flex gap-6">
                <div>
                  <label className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1 block">
                    Joined
                  </label>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <FiCalendar size={14} className="text-gray-400" />
                    {profile.joinDate}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1 block">
                    Last Login
                  </label>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <FiClock size={14} className="text-gray-400" />
                    {profile.lastLogin}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <p className="text-3xl font-bold font-serif text-[#1a1a1a] tracking-tight">
              {stat.value}
            </p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold font-serif text-[#2a2a2a] mb-5">
          Recent Activity
        </h3>
        <div className="space-y-0">
          {recentActivity.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-b-0"
            >
              <div className="w-2 h-2 rounded-full bg-[#1E4538] flex-shrink-0" />
              <p className="text-sm text-gray-600 flex-1">
                <span className="font-medium text-gray-800">{item.action}</span>{" "}
                <span className="text-[#1E4538] font-semibold">
                  {item.target}
                </span>
              </p>
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
