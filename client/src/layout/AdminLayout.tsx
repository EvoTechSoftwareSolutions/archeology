import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/layout/admin/SideBar";
import AdminHeader from "../components/layout/admin/Header";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F8F6F1] font-['Inter'] overflow-hidden">
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
        <AdminHeader onToggleSidebar={() => setIsSidebarOpen(true)} />
        <main className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-4 py-4 md:px-8 md:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
