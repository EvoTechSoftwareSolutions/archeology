import React, { useState } from "react";
import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiShield,
  FiToggleLeft,
  FiToggleRight,
} from "react-icons/fi";
import { useUsers } from "../../hooks/useUsers";
import type { User } from "../../types/user.types";

const roleColors: Record<string, string> = {
  ADMIN: "#1E4538",
  EDITOR: "#C9A84C",
  RESEARCHER: "#D97757",
  VIEWER: "#6b7280",
};

const Users: React.FC = () => {
  const { users, loading, error, reload, createUser, updateUser, deleteUser } =
    useUsers();
  const [searchTerm, setSearchTerm] = useState("");

  // Add / Edit modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    role: "USER" as User["role"],
  });

  const getInitials = (name: string) =>
    name
      .split(" ")
      .filter(Boolean)
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const handleOpenModal = (user: User | null = null) => {
    if (user) {
      setEditingUser(user);

      setFormData({
        name: user.name,
        email: user.email,
        password: "",
        department: user.department || "",
        role: user.role,
      });
    } else {
      setEditingUser(null);

      setFormData({
        name: "",
        email: "",
        password: "",
        department: "",
        role: "USER",
      });
    }

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingUser) {
        await updateUser(editingUser.id, {
          name: formData.name,
          department: formData.department,
          role: formData.role,
        });
      } else {
        await createUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          department: formData.department,
          role: formData.role,
        });
      }

      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  //for delete a user not exactly delete but make the user inactive
  const handleToggleStatus = async (user: User) => {
    try {
      await updateUser(user.id, {
        isActive: !user.isActive,
      });

      await reload();
    } catch (error) {
      console.error(error);
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="w-full font-['Inter'] relative px-3 sm:px-4 lg:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6 sm:mb-8">
        <div className="min-w-0">
          <p className="text-[12px] sm:text-sm text-gray-400 mb-2">Home &gt; Users</p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#2a2a2a] mb-1 tracking-tight break-words">
            Users
          </h1>
          <p className="text-gray-500 text-[13px] sm:text-sm">
            Manage administrators, editors, researchers and viewers.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="w-full sm:w-auto shrink-0 bg-[#1E4538] hover:bg-[#15342a] text-white px-5 py-2.5 rounded-full flex items-center justify-center gap-2 text-sm font-medium transition-colors shadow-sm whitespace-nowrap"
        >
          <FiPlus size={18} />
          Add User
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-100 mb-6 flex items-center gap-4">
        <div className="relative flex-1 w-full min-w-0 sm:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search users by name, email or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full min-w-0 pl-10 pr-4 py-2.5 bg-gray-50/50 border-none rounded-xl focus:ring-2 focus:ring-[#1E4538]/20 transition-all text-sm outline-none"
          />
        </div>
      </div>

      {/* Table */}
      {error && (
        <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 px-4 sm:px-5 py-4 text-sm text-red-700 break-words">
          {error}
        </div>
      )}
      {loading ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-8 sm:p-10 text-center text-sm sm:text-base text-gray-500">
          Loading users from the database...
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-4 sm:px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                    User
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                    Role
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                    Last Active
                  </th>
                  <th className="px-4 sm:px-6 py-4 w-12"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50/40 transition-colors"
                  >
                    {/* Avatar + Name */}
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        <div className="w-9 h-9 shrink-0 rounded-full bg-[#1E4538]/10 text-[#1E4538] flex items-center justify-center font-semibold text-xs">
                          {getInitials(user.name)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#2a2a2a] truncate max-w-[160px] sm:max-w-none">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-400 truncate max-w-[160px] sm:max-w-none">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-4 sm:px-6 py-4">
                      <span
                        className="flex items-center gap-1.5 text-sm font-medium whitespace-nowrap"
                        style={{ color: roleColors[user.role] || "#6b7280" }}
                      >
                        <FiShield size={14} className="shrink-0" />
                        {user.role}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 sm:px-6 py-4">
                      <span className="flex items-center gap-1.5 text-sm whitespace-nowrap">
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${user.isActive ? "bg-emerald-500" : "bg-gray-300"}`}
                        />
                        <span
                          className={
                            user.isActive
                              ? "text-emerald-600 font-medium"
                              : "text-gray-400 font-medium"
                          }
                        >
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </span>
                    </td>

                    {/* Last Active */}
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {new Date(user.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    {/* Actions */}
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenModal(user)}
                          className="p-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-600 transition shrink-0"
                          title="Edit User"
                        >
                          <FiEdit2 size={14} />
                        </button>

                        <button
                          onClick={() => handleToggleStatus(user)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                            user.isActive
                              ? "bg-green-50 text-green-600 hover:bg-green-100"
                              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                          }`}
                        >
                          {user.isActive ? (
                            <FiToggleRight size={20} />
                          ) : (
                            <FiToggleLeft size={20} />
                          )}

                          {user.isActive ? "Active" : "Inactive"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-16 text-gray-400 text-sm"
                    >
                      No users found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/20 backdrop-blur-sm overflow-y-auto"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-md my-6 sm:my-0 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 sm:px-8 py-4 sm:py-6 border-b border-gray-100 flex justify-between items-center gap-3 bg-gray-50/30 shrink-0">
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#2a2a2a] break-words min-w-0">
                {editingUser ? "Edit User" : "Add New User"}
              </h2>
              <button
                onClick={handleCloseModal}
                aria-label="Close"
                className="shrink-0 text-gray-400 hover:text-gray-600 text-2xl leading-none transition-colors"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSave} className="p-5 sm:p-8 overflow-y-auto">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    disabled={!!editingUser}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full min-w-0 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E4538]/20 focus:border-[#1E4538] transition-all outline-none text-sm text-gray-800 disabled:opacity-60"
                    placeholder="e.g. Kamal Silva"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    disabled={!!editingUser}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full min-w-0 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E4538]/20 focus:border-[#1E4538] transition-all outline-none text-sm text-gray-800 disabled:opacity-60"
                    placeholder="e.g. kamal@heritage.lk"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>

                  <input
                    type="password"
                    required={!editingUser}
                    disabled={!!editingUser}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      })
                    }
                    className="w-full min-w-0 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E4538]/20 focus:border-[#1E4538] transition-all outline-none text-sm text-gray-800 disabled:opacity-60"
                    placeholder="Enter password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>

                  <input
                    type="text"
                    required
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        department: e.target.value,
                      })
                    }
                    className="w-full min-w-0 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E4538]/20 focus:border-[#1E4538] transition-all outline-none text-sm text-gray-800"
                    placeholder="IT"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        role: e.target.value as User["role"],
                      })
                    }
                    className="w-full min-w-0 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E4538]/20 focus:border-[#1E4538] transition-all outline-none text-sm text-gray-800 appearance-none cursor-pointer"
                  >
                    <option value="ADMIN">Admin</option>
                    <option value="SUPERADMIN">Super Admin</option>
                    <option value="USER">User</option>
                  </select>
                </div>
              </div>
              <div className="mt-8 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end pt-4 border-t border-gray-50">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-gray-600 font-medium hover:bg-gray-100 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#1E4538] hover:bg-[#15342a] text-white font-medium shadow-sm transition-colors text-sm"
                >
                  {editingUser ? "Save Changes" : "Add User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;