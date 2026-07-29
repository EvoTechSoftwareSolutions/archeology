import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/layout/admin/SideBar";

import AdminHeader from "../components/layout/admin/Header";

const AdminLayout = () => {
  return (
    <div
      className="
flex
min-h-screen
bg-[#FAFAFA]
"
    >
      {/* Sidebar */}

      <AdminSidebar />

      {/* Right Section */}

      <div
        className="
flex-1
flex
flex-col
"
      >
        {/* Header */}

        <AdminHeader />

        {/* Page Content */}

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
