import React, { useState } from "react";
import {
  FiMoreHorizontal,
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiShield,
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
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

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
    setOpenMenuId(null);
    if (user) {
      setEditingUser(user);
      const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        department: "",
        role: "USER" as User["role"],
      });
    } else {
      setEditingUser(null);
      setFormData({ name: "", email: "", password: "", department: "", role: "ADMIN" });
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

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      await deleteUser(id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleStatus = async (id: number) => {
    const user = users.find((u) => u.id === id);

    if (!user) return;

    try {
      await updateUser(id, {
        role: user.role,
        isActive: !user.isActive,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="w-full font-['Inter'] relative">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <p className="text-sm text-gray-400 mb-2">Home &gt; Users</p>
          <h1 className="text-4xl font-bold font-serif text-[#2a2a2a] mb-1 tracking-tight">
            Users
          </h1>
          <p className="text-gray-500 text-sm">
            Manage administrators, editors, researchers and viewers.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-[#1E4538] hover:bg-[#15342a] text-white px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium transition-colors shadow-sm"
        >
          <FiPlus size={18} />
          Add User
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6 flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search users by name, email or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border-none rounded-xl focus:ring-2 focus:ring-[#1E4538]/20 transition-all text-sm outline-none"
          />
        </div>
      </div>

      {/* Table */}
      {error && (
        <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700">
          {error}
        </div>
      )}
      {loading ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center text-gray-500">
          Loading users from the database...
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-visible relative">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-4 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50/40 transition-colors"
                >
                  {/* Avatar + Name */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-full bg-[#1E4538]/10 text-[#1E4538] flex items-center justify-center font-semibold text-xs">
                        {getInitials(user.name)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#2a2a2a]">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4">
                    <span
                      className="flex items-center gap-1.5 text-sm font-medium"
                      style={{ color: roleColors[user.role] || "#6b7280" }}
                    >
                      <FiShield size={14} />
                      {user.role}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-sm">
                      <span
                        className={`w-2 h-2 rounded-full ${user.isActive ? "bg-emerald-500" : "bg-gray-300"}`}
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
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === user.id ? null : user.id)
                      }
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <FiMoreHorizontal size={18} />
                    </button>

                    {openMenuId === user.id && (
                      <div className="absolute right-6 top-12 w-44 bg-white rounded-xl shadow-lg border border-gray-100 z-50 py-1 overflow-hidden">
                        <button
                          onClick={() => handleOpenModal(user)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <FiEdit2 size={14} /> Edit User
                        </button>
                        <button
                          onClick={() => handleToggleStatus(user.id)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <FiShield size={14} />{" "}
                          {user.isActive ? "Deactivate" : "Activate"}
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <FiTrash2 size={14} /> Remove User
                        </button>
                      </div>
                    )}
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
      )}

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
              <h2 className="text-2xl font-bold font-serif text-[#2a2a2a]">
                {editingUser ? "Edit User" : "Add New User"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none transition-colors"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSave} className="p-8">
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
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E4538]/20 focus:border-[#1E4538] transition-all outline-none text-sm text-gray-800 disabled:opacity-60"
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
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E4538]/20 focus:border-[#1E4538] transition-all outline-none text-sm text-gray-800 disabled:opacity-60"
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
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
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
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
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
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E4538]/20 focus:border-[#1E4538] transition-all outline-none text-sm text-gray-800 appearance-none cursor-pointer"
                  >
                    <option value="ADMIN">Admin</option>
                    <option value="SUPERADMIN">Super Admin</option>
                    <option value="USER">User</option>
                  </select>
                </div>
              </div>
              <div className="mt-8 flex gap-3 justify-end pt-4 border-t border-gray-50">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 rounded-xl text-gray-600 font-medium hover:bg-gray-100 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#1E4538] hover:bg-[#15342a] text-white font-medium shadow-sm transition-colors text-sm"
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
