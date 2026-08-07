import React, { useEffect, useState } from "react";
import { authService } from "../../services/auth.service";
import { useUsers } from "../../hooks/useUsers";
import type { User, UserRole } from "../../types/user.types";
import type { UpdateUserPayload } from "../../hooks/useUsers";
import {
  FiMail,
  FiShield,
  FiBriefcase,
  FiEdit2,
  FiSave,
  FiX,
  FiUser,
  FiCheckCircle,
  FiCalendar,
} from "react-icons/fi";

const AdminProfile: React.FC = () => {
  const { updateUser } = useUsers();

  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state for editing matching UpdateUserPayload
  const [formData, setFormData] = useState<UpdateUserPayload>({
    name: "",
    email: "",
    department: "",
    role: "ADMIN",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const currentUser: User = await authService.getCurrentUser();
        setProfile(currentUser);
        setFormData({
          name: currentUser.name,
          email: currentUser.email,
          department: currentUser.department,
          role: currentUser.role,
        });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to load profile";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    try {
      setSaving(true);
      setError(null);

      // Call hook's updateUser function
      await updateUser(profile.id, formData);

      // Update local profile state
      setProfile((prev) => (prev ? { ...prev, ...formData } : null));
      setIsEditing(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update profile";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        name: profile.name,
        email: profile.email,
        department: profile.department,
        role: profile.role,
      });
    }
    setError(null);
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    return parts.length >= 2
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : name.slice(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <div className="flex items-center gap-3 text-sm font-medium text-gray-500">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#1E4538] border-t-transparent" />
          Loading profile...
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex h-64 w-full flex-col items-center justify-center gap-2 text-center">
        <p className="text-lg font-semibold text-gray-800">Profile Not Found</p>
        <p className="text-sm text-gray-500">Unable to retrieve user details.</p>
      </div>
    );
  }

  return (
    <div className="w-full font-['Inter'] pb-12">
      {/* Page Header */}
      <div className="mb-8">
        <p className="mb-2 text-sm text-gray-400">Home &gt; Profile</p>
        <h1 className="mb-1 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#2a2a2a]">
          My Profile
        </h1>
        <p className="text-sm text-gray-500">
          View and manage your account details.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-xl bg-red-50 p-4 text-sm text-red-700 border border-red-100">
          {error}
        </div>
      )}

      {/* Main Profile Form */}
      <form onSubmit={handleSave}>
        <div className="mb-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          {/* Header Banner */}
          <div className="relative h-32 bg-gradient-to-r from-[#1E4538] via-[#275949] to-[#1E4538]">
            <div className="absolute -bottom-12 left-6 sm:left-8">
              <div
                className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-[#1E4538] font-serif text-3xl font-bold text-white shadow-lg"
                style={
                  profile.initialsColor
                    ? { backgroundColor: profile.initialsColor }
                    : undefined
                }
              >
                {profile.initials || getInitials(profile.name)}
              </div>
            </div>
          </div>

          {/* User Info Header */}
          <div className="px-6 pb-8 pt-16 sm:px-8">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#2a2a2a]">
                  {profile.name}
                </h2>
                <div className="mt-1 flex items-center gap-2 text-sm font-medium text-[#1E4538]">
                  <FiShield className="h-4 w-4" />
                  <span>{profile.role}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-500">
                    {profile.department} Department
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={saving}
                      className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                    >
                      <FiX size={16} /> Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex items-center gap-2 rounded-xl bg-[#1E4538] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#15342a] disabled:opacity-50"
                    >
                      <FiSave size={16} /> {saving ? "Saving..." : "Save Changes"}
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 rounded-xl bg-[#1E4538] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#15342a]"
                  >
                    <FiEdit2 size={16} /> Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Profile Fields */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Full Name
                </label>
                {isEditing ? (
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.name ?? ""}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 pl-10 text-sm text-gray-800 outline-none transition-all focus:border-[#1E4538] focus:bg-white focus:ring-2 focus:ring-[#1E4538]/20"
                    />
                    <FiUser className="absolute left-3.5 top-3 text-gray-400" size={16} />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 py-1 text-sm font-medium text-gray-800">
                    <FiUser className="text-gray-400" size={16} />
                    {profile.name}
                  </div>
                )}
              </div>

              {/* Email Address */}
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Email Address
                </label>
                {isEditing ? (
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={formData.email ?? ""}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 pl-10 text-sm text-gray-800 outline-none transition-all focus:border-[#1E4538] focus:bg-white focus:ring-2 focus:ring-[#1E4538]/20"
                    />
                    <FiMail className="absolute left-3.5 top-3 text-gray-400" size={16} />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 py-1 text-sm font-medium text-gray-800">
                    <FiMail className="text-gray-400" size={16} />
                    {profile.email}
                  </div>
                )}
              </div>

              {/* Department */}
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Department
                </label>
                {isEditing ? (
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.department ?? ""}
                      onChange={(e) =>
                        setFormData({ ...formData, department: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 pl-10 text-sm text-gray-800 outline-none transition-all focus:border-[#1E4538] focus:bg-white focus:ring-2 focus:ring-[#1E4538]/20"
                    />
                    <FiBriefcase className="absolute left-3.5 top-3 text-gray-400" size={16} />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 py-1 text-sm font-medium text-gray-800">
                    <FiBriefcase className="text-gray-400" size={16} />
                    {profile.department}
                  </div>
                )}
              </div>

              {/* Role Select */}
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Role
                </label>
                {isEditing ? (
                  <div className="relative">
                    <select
                      value={formData.role ?? "USER"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          role: e.target.value as UserRole,
                        })
                      }
                      className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 pl-10 text-sm text-gray-800 outline-none transition-all focus:border-[#1E4538] focus:bg-white focus:ring-2 focus:ring-[#1E4538]/20"
                    >
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                      <option value="SUPERADMIN">SUPERADMIN</option>
                    </select>
                    <FiShield className="absolute left-3.5 top-3 text-gray-400" size={16} />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 py-1 text-sm font-medium text-gray-800">
                    <FiShield className="text-gray-400" size={16} />
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-[#1E4538]/10 px-2 py-0.5 text-xs font-semibold text-[#1E4538]">
                      <FiCheckCircle size={12} /> {profile.role}
                    </span>
                  </div>
                )}
              </div>

              {/* Created At Date (Read-only) */}
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Member Since
                </label>
                <div className="flex items-center gap-2 py-1 text-sm font-medium text-gray-600">
                  <FiCalendar className="text-gray-400" size={16} />
                  {new Date(profile.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminProfile;