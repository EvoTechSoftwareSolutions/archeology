import React from "react";
import { FiBell, FiShield } from "react-icons/fi";
import { useProfile } from "../../hooks/useProfile";

const AdminSettings: React.FC = () => {
  const { user, loading, error } = useProfile();

  if (loading) {
    return <div className="text-center py-10">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div className="w-full font-['Inter'] pb-12">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm text-gray-400 mb-2">Home &gt; Settings</p>

        <h1 className="text-4xl font-bold font-serif text-[#2a2a2a] mb-1">
          Account Settings
        </h1>

        <p className="text-gray-500 text-sm">
          Manage your administrator profile information.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        {/* Profile Information */}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center gap-4 mb-8">
            <div
              className="
              w-14 h-14
              rounded-3xl
              bg-[#1E5646]
              text-white
              flex
              items-center
              justify-center
              text-2xl
              font-bold
              "
            >
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-2xl font-bold font-serif text-[#2a2a2a]">
                Personal Information
              </h2>

              <p className="text-sm text-gray-500">Your account details.</p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label>
              <span className="text-xs text-gray-400 uppercase">Name</span>

              <input
                readOnly
                value={user?.name ?? ""}
                className="
                mt-2
                w-full
                rounded-2xl
                border
                border-gray-200
                bg-gray-50
                px-4
                py-3
                text-sm
                "
              />
            </label>

            <label>
              <span className="text-xs text-gray-400 uppercase">Email</span>

              <input
                readOnly
                value={user?.email ?? ""}
                className="
                mt-2
                w-full
                rounded-2xl
                border
                border-gray-200
                bg-gray-50
                px-4
                py-3
                text-sm
                "
              />
            </label>

            <label>
              <span className="text-xs text-gray-400 uppercase">Role</span>

              <input
                readOnly
                value={user?.role ?? ""}
                className="
                mt-2
                w-full
                rounded-2xl
                border
                border-gray-200
                bg-gray-50
                px-4
                py-3
                text-sm
                "
              />
            </label>

            <label>
              <span className="text-xs text-gray-400 uppercase">
                Department
              </span>

              <input
                readOnly
                value={user?.department ?? ""}
                className="
                mt-2
                w-full
                rounded-2xl
                border
                border-gray-200
                bg-gray-50
                px-4
                py-3
                text-sm
                "
              />
            </label>
          </div>

          {/* Security */}

          <div className="mt-8">
            <div
              className="
            rounded-3xl
            border
            border-gray-200
            bg-[#FCFDFB]
            p-5
            "
            >
              <div className="flex items-center gap-3 mb-3 text-[#1E4538]">
                <FiShield size={18} />

                <h3 className="font-semibold text-gray-900">Security</h3>
              </div>

              <p className="text-sm text-gray-600">
                Your account is protected using authentication security.
              </p>

              <div
                className="
              mt-4
              flex
              justify-between
              items-center
              bg-white
              border
              rounded-2xl
              px-4
              py-3
              "
              >
                <div>
                  <p className="text-sm font-medium">Account Role</p>

                  <p className="text-xs text-gray-500">{user?.role}</p>
                </div>

                <span
                  className="
                  px-3
                  py-1
                  text-xs
                  rounded-full
                  bg-green-100
                  text-green-700
                  "
                >
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}

        <div
          className="
        bg-white
        rounded-2xl
        shadow-sm
        border
        border-gray-100
        p-8
        "
        >
          <div className="flex items-center gap-3 mb-5">
            <div
              className="
              w-12
              h-12
              rounded-3xl
              bg-[#1E5646]
              text-white
              flex
              items-center
              justify-center
              text-xl
              font-bold
              "
            >
              {user?.name?.charAt(0)}
            </div>

            <div>
              <h3 className="text-xl font-semibold">Account Summary</h3>

              <p className="text-sm text-gray-500">Current user information.</p>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <div className="rounded-3xl border px-5 py-4">
              <p className="font-medium">Name</p>

              <p>{user?.name}</p>
            </div>

            <div className="rounded-3xl border px-5 py-4">
              <p className="font-medium">Email</p>

              <p>{user?.email}</p>
            </div>

            <div className="rounded-3xl border px-5 py-4">
              <p className="font-medium">Role</p>

              <p>{user?.role}</p>
            </div>

            <div className="rounded-3xl border px-5 py-4">
              <p className="font-medium">Department</p>

              <p>{user?.department}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
