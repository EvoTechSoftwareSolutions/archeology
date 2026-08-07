import { useCallback, useEffect, useRef, useState } from "react";
import useNotificationsSocket from "../../../hooks/useNotificationsSocket";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiSearch, FiBell, FiChevronDown, FiLogOut, FiSettings, FiUser, FiX } from "react-icons/fi";
import { authService } from "../../../services/auth.service";
import { useSearchContext } from "../../../contexts/SearchContext";
import type { LoginUser } from "../../../types/auth.types";

interface HeaderProps {
  onToggleSidebar: () => void;
}

const getStoredUser = (): LoginUser | null => {
  try {
    const raw = localStorage.getItem("adminUser");
    return raw ? (JSON.parse(raw) as LoginUser) : null;
  } catch {
    return null;
  }
};

const getInitials = (name?: string) => {
  if (!name) return "AD";
  const parts = name.trim().split(/\s+/);
  const initials = parts.slice(0, 2).map((p) => p.charAt(0).toUpperCase());
  return initials.join("") || "AD";
};

const Header = ({ onToggleSidebar }: HeaderProps) => {
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm } = useSearchContext();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsState, setNotificationsState] = useState<Array<{title:string; subtitle?:string; time?:string; id?:any}>>([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [currentUser, setCurrentUser] = useState<LoginUser | null>(getStoredUser);
  const [loggingOut, setLoggingOut] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const notifications = notificationsState;

  const handleNotification = useCallback((n: any) => {
    const item = { title: n?.title || "Notification", subtitle: n?.subtitle || "", time: "Just now", id: n?.id };
    setNotificationsState((prev) => [item, ...prev]);
  }, []);

  // Setup socket for real-time notifications
  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
  useNotificationsSocket(token, handleNotification);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
        setShowProfileMenu(false);
        setShowMobileSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Revalidate the cached user against the server in the background.
  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await authService.getCurrentUser();

        console.log("Current User:", user);

        setCurrentUser(user);

        localStorage.setItem("adminUser", JSON.stringify(user));
      } catch (error) {
        console.log(error);
      }
    };

    loadUser();
  }, []);

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
      navigate("/admin/login");
    }
  };

  const displayName = currentUser?.name ?? "Admin";
  const displayRole = currentUser?.role ?? "Administrator";

  return (
    <header
      ref={containerRef}
      className="sticky top-0 min-h-[72px] sm:h-22 bg-[#F8F6F1] flex items-center justify-between gap-2 px-3 sm:px-4 lg:px-8 py-3 z-10"
    >
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="lg:hidden shrink-0 p-2 bg-white rounded-full border border-gray-200 shadow-sm text-gray-600 hover:bg-gray-50"
          aria-label="Toggle sidebar"
        >
          <FiMenu size={20} />
        </button>

        {/* Desktop / tablet search */}
        <div className="hidden sm:block flex-1 min-w-0 max-w-lg">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <FiSearch size={18} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search places, users..."
              className="w-full min-w-0 pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#275949]/50 focus:border-[#275949] text-sm text-gray-700 placeholder-gray-400 font-['Inter'] shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2 sm:gap-3 relative shrink-0">
        {/* Mobile search toggle */}
        <button
          type="button"
          onClick={() => setShowMobileSearch((prev) => !prev)}
          className="sm:hidden p-2 text-gray-500 hover:text-gray-700 transition-colors bg-white rounded-full border border-gray-100 shadow-sm w-10 h-10 flex items-center justify-center shrink-0"
          aria-label="Toggle search"
        >
          {showMobileSearch ? <FiX size={20} /> : <FiSearch size={20} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications((prev) => !prev);
              setShowProfileMenu(false);
              setShowMobileSearch(false);
            }}
            className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors bg-white rounded-full border border-gray-100 shadow-sm w-10 h-10 flex items-center justify-center shrink-0"
            aria-label="Notifications"
          >
            <FiBell size={20} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {showNotifications && (
            <div className="fixed sm:absolute left-1/2 sm:left-auto right-auto sm:right-0 -translate-x-1/2 sm:translate-x-0 top-[70px] sm:top-auto sm:mt-3 w-[90vw] sm:w-80 max-w-sm bg-white border border-gray-200 rounded-3xl shadow-xl overflow-hidden z-20">
              <div className="px-5 py-4 bg-[#F3F7F5] border-b border-gray-100">
                <h2 className="text-sm font-semibold text-gray-900">Notifications</h2>
                <p className="text-xs text-gray-500">Latest updates for your account</p>
              </div>
              <div className="divide-y divide-gray-100 max-h-[60vh] overflow-y-auto">
                {notifications.map((item, index) => (
                  <div key={index} className="px-5 py-4 hover:bg-gray-50 transition-colors">
                    <p className="text-sm font-medium text-gray-900 break-words">{item.title}</p>
                    <p className="text-sm text-gray-500 break-words">{item.subtitle}</p>
                    <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                  </div>
                ))}
              </div>
              <button className="w-full px-5 py-3 text-sm font-medium text-[#275949] hover:bg-[#F3F7F5] transition-colors">
                See all notifications
              </button>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu((prev) => !prev);
              setShowNotifications(false);
              setShowMobileSearch(false);
            }}
            className="flex items-center gap-2 sm:gap-3 bg-white rounded-full border border-gray-100 shadow-sm px-2 sm:px-3 py-2 text-sm text-gray-700 hover:border-gray-200 transition-colors shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1E5646] text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-sm shrink-0">
              {getInitials(currentUser?.name)}
            </div>
            <div className="hidden md:block text-left min-w-0">
              <p className="font-bold text-gray-900 leading-tight truncate max-w-[140px]">{displayName}</p>
              <p className="text-gray-500 text-xs capitalize truncate max-w-[140px]">{displayRole}</p>
            </div>
            <FiChevronDown size={18} className="text-gray-500 hidden xs:block shrink-0" />
          </button>

          {showProfileMenu && (
            <div className="fixed sm:absolute left-1/2 sm:left-auto right-auto sm:right-0 -translate-x-1/2 sm:translate-x-0 top-[70px] sm:top-auto sm:mt-3 w-[85vw] sm:w-56 max-w-xs bg-white border border-gray-200 rounded-3xl shadow-xl overflow-hidden z-20">
              <div className="px-5 py-4 border-b border-gray-100 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{displayName}</p>
                <p className="text-xs text-gray-500 truncate">
                  {currentUser?.email ?? "Manage your profile and settings"}
                </p>
              </div>
              <div className="space-y-1 p-2">
                <button
                  onClick={() => {
                    navigate("/admin/profile");
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <FiUser size={16} /> Profile
                </button>
                <button
                  onClick={() => {
                    navigate("/admin/settings");
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <FiSettings size={16} /> Settings
                </button>
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-sm text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <FiLogOut size={16} /> {loggingOut ? "Logging out..." : "Logout"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile search bar (expands below the header row) */}
      {showMobileSearch && (
        <div className="absolute left-0 right-0 top-full sm:hidden px-3 pt-2 pb-3 bg-[#F8F6F1] border-b border-gray-200 shadow-sm z-20">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <FiSearch size={18} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              autoFocus
              placeholder="Search places, users..."
              className="w-full min-w-0 pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#275949]/50 focus:border-[#275949] text-sm text-gray-700 placeholder-gray-400 font-['Inter'] shadow-sm"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;