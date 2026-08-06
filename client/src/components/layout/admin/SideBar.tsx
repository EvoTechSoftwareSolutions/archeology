import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiPlusCircle,
  FiTag,
  FiImage,
  FiUsers,
  FiLogOut,
  FiChevronLeft,
  FiX,
  FiMail,
  FiMessageSquare,
  FiStar
} from "react-icons/fi";
import { MdAccountBalance, MdBarChart } from "react-icons/md";
import logo from "../../../assets/Admin/logo2.png";
import { authService } from "../../../services/auth.service";

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideBar = ({ isOpen, onClose }: SideBarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const menuSections = [
    {
      title: "Overview",
      items: [
        { name: "Dashboard", path: "/admin", icon: FiGrid }
      ]
    },
    {
      title: "Heritage",
      items: [
        { name: "Historical Places", path: "/admin/heritage", icon: MdAccountBalance },
        { name: "Add New places", path: "/admin/add-place", icon: FiPlusCircle },
        { name: "Categories", path: "/admin/categories", icon: FiTag },
      ]
    },
    {
      title: "Administration",
      items: [
        // { name: "Analytics", path: "/admin/analytics", icon: MdBarChart },
        { name: "Users", path: "/admin/users", icon: FiUsers },
        { name: "Newsletter", path: "/admin/newsletter", icon: FiMail },
        { name: "Contact Messages", path: "/admin/contact", icon: FiMessageSquare },
        { name: "Visitor Reviews", path: "/admin/reviews", icon: FiStar },
        { name: "Logout", path: "/admin/login", icon: FiLogOut, action: "logout" as const },
      ]
    }
  ];

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await authService.logout();
    } catch {
      // Even if the server call fails, still log out locally.
    } finally {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      setLoggingOut(false);
      onClose();
      navigate("/admin/login");
    }
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 transform bg-[#275949] text-white flex flex-col font-['Inter'] transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
        isOpen ? 'translate-x-0 shadow-2xl lg:shadow-none' : '-translate-x-full lg:translate-x-0'
      } ${isCollapsed ? 'w-20' : 'w-64'} lg:w-auto lg:min-h-screen`}
    >

      {/* Logo Area */}
      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} p-6 mb-2 h-20`}>
        {!isCollapsed && (
          <img src={logo} alt="Logo" className="h-8 transition-opacity duration-300" />
        )}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex w-6 h-6 rounded-full border border-white/20 items-center justify-center hover:bg-white/10 transition-colors"
          >
            <FiChevronLeft size={14} className={`text-white/70 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
          </button>
          <button
            onClick={onClose}
            className="lg:hidden w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <FiX size={18} />
          </button>
        </div>
      </div>

      {/* Navigation */}
    <nav className="flex-1 overflow-y-auto overflow-x-hidden pb-4 sidebar-scroll">
        {menuSections.map((section, idx) => (
          <div key={idx} className="mb-6">
            {!isCollapsed ? (
              <h3 className="px-8 text-xs text-white/50 mb-3 whitespace-nowrap overflow-hidden transition-all duration-300">
                {section.title}
              </h3>
            ) : (
              <div className="w-full h-px bg-white/10 my-4"></div>
            )}
            <ul className="space-y-1">
              {section.items.map((item, itemIdx) => {
                const isActive = location.pathname === item.path || (item.path === '/admin' && location.pathname === '/admin/');
                const Icon = item.icon;
                const isLogout = "action" in item && item.action === "logout";

                const content = (
                  <>
                    <Icon size={18} className={`shrink-0 ${isActive ? "text-white" : "text-white/60"}`} />
                    {!isCollapsed && (
                      <span className="whitespace-nowrap overflow-hidden transition-all duration-300">
                        {isLogout && loggingOut ? "Logging out..." : item.name}
                      </span>
                    )}
                  </>
                );

                const sharedClasses = `flex items-center ${isCollapsed ? 'justify-center px-0' : 'gap-4 px-8'} py-3 text-sm font-medium transition-colors border-l-4 w-full text-left ${
                  isActive
                    ? "bg-[#1E4538] text-white border-[#D97757]"
                    : "text-white/70 hover:bg-white/5 hover:text-white border-transparent"
                } ${isLogout && loggingOut ? "opacity-60 cursor-not-allowed" : ""}`;

                return (
                  <li key={itemIdx}>
                    {isLogout ? (
                      <button
                        type="button"
                        onClick={handleLogout}
                        disabled={loggingOut}
                        title={isCollapsed ? item.name : ""}
                        className={sharedClasses}
                      >
                        {content}
                      </button>
                    ) : (
                      <Link
                        to={item.path}
                        title={isCollapsed ? item.name : ""}
                        className={sharedClasses}
                      >
                        {content}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

    </aside>
  );
};

export default SideBar;