import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/layout/admin/SideBar";
import AdminHeader from "../components/layout/admin/Header";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-[#F8F6F1] font-['Inter']">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
