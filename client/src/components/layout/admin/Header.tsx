import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiBell, FiChevronDown, FiLogOut, FiSettings, FiUser } from "react-icons/fi";

const Header = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const notifications = [
    { title: "New place added", subtitle: "Anuradhapura Archaeological Site", time: "2m ago" },
    { title: "User request approved", subtitle: "Kasun Perera", time: "15m ago" },
    { title: "New image uploaded", subtitle: "Trincomalee Fort", time: "1h ago" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header ref={containerRef} className="sticky top-0 h-22 bg-[#F8F6F1] flex items-center justify-between px-8 z-10">
      
      {/* Search Bar */}
      <div className="flex-1 max-w-lg">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <FiSearch size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Search places, users..." 
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#275949]/50 focus:border-[#275949] text-sm text-gray-700 placeholder-gray-400 font-['Inter'] shadow-sm"
          />
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-4 relative">
        
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(prev => !prev);
              setShowProfileMenu(false);
            }}
            className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors bg-white rounded-full border border-gray-100 shadow-sm w-10 h-10 flex items-center justify-center"
          >
            <FiBell size={20} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-3xl shadow-xl overflow-hidden z-20">
              <div className="px-5 py-4 bg-[#F3F7F5] border-b border-gray-100">
                <h2 className="text-sm font-semibold text-gray-900">Notifications</h2>
                <p className="text-xs text-gray-500">Latest updates for your account</p>
              </div>
              <div className="divide-y divide-gray-100">
                {notifications.map((item, index) => (
                  <div key={index} className="px-5 py-4 hover:bg-gray-50 transition-colors">
                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.subtitle}</p>
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
              setShowProfileMenu(prev => !prev);
              setShowNotifications(false);
            }}
            className="flex items-center gap-3 bg-white rounded-full border border-gray-100 shadow-sm px-3 py-2 text-sm text-gray-700 hover:border-gray-200 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-[#1E5646] text-white flex items-center justify-center font-bold text-sm shadow-sm">
              EV
            </div>
            <div className="hidden md:block text-left">
              <p className="font-bold text-gray-900 leading-tight">Evo Tech</p>
              <p className="text-gray-500 text-xs">Administrator</p>
            </div>
            <FiChevronDown size={18} className="text-gray-500" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-3xl shadow-xl overflow-hidden z-20">
              <div className="px-5 py-4 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">Account</p>
                <p className="text-xs text-gray-500">Manage your profile and settings</p>
              </div>
              <div className="space-y-1 p-2">
                <button
                  onClick={() => {
                    navigate('/admin/profile');
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <FiUser size={16} /> Profile
                </button>
                <button
                  onClick={() => {
                    navigate('/admin/settings');
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <FiSettings size={16} /> Settings
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <FiLogOut size={16} /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
    </header>
  );
};

export default Header;