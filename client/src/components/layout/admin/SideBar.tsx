import { Link, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdLocationOn,
  MdAddCircleOutline,
  MdCategory,
  MdPhotoLibrary,
  MdBarChart,
  MdPeople,
  MdLogout,
  MdChevronLeft
} from "react-icons/md";

const SideBar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const activeClasses = "bg-[#144b3a] text-white relative rounded-lg ml-2";
  const inactiveClasses = "text-gray-300 hover:text-white hover:bg-[#1a5542] rounded-lg mx-2";

  const renderLink = (path: string, icon: React.ReactNode, label: string) => {
    const active = isActive(path);
    return (
      <Link
        to={path}
        className={`flex items-center gap-3 px-4 py-3 transition-colors text-[13px] font-medium ${active ? activeClasses : inactiveClasses}`}
      >
        {active && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500 rounded-l-lg -ml-2" />
        )}
        <span className={active ? "text-yellow-500" : "text-gray-300"}>{icon}</span>
        {label}
      </Link>
    );
  };

  return (
    <aside className="w-[260px] min-h-screen bg-[#1E604B] text-white flex flex-col relative z-10 shadow-lg">
      {/* Header / Logo Area */}
      <div className="p-6 pt-8 flex items-center justify-between border-b border-[#2a735a] mb-2">
        <div className="flex items-center gap-3 cursor-pointer relative w-full">
           <img src="/placeholder-logo.png" alt="Sri Lanka Heritage" className="h-10 w-auto" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
           <div className="flex flex-col">
             <span className="font-serif text-[#D4AF37] text-sm font-bold tracking-wider leading-tight">SRI LANKA HERITAGE</span>
             <span className="text-[9px] text-[#A3C4B6] tracking-[0.2em] uppercase mt-0.5">Discover & Inspire</span>
           </div>
           
           <button className="text-[#A3C4B6] hover:text-white rounded-full p-1 border border-[#A3C4B6] hover:border-white transition-colors absolute -right-3 top-1/2 -translate-y-1/2 bg-[#1E604B]">
             <MdChevronLeft size={16} />
           </button>
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-6 custom-scrollbar">
        
        {/* Overview Section */}
        <div>
          <div className="px-6 mb-2 text-[11px] font-semibold text-[#8fb5a6] uppercase tracking-wider">Overview</div>
          <nav className="flex flex-col pr-2 space-y-1">
            {renderLink("/admin/dashboard", <MdDashboard size={20} />, "Dashboard")}
          </nav>
        </div>

        {/* Heritage Section */}
        <div>
          <div className="px-6 mb-2 text-[11px] font-semibold text-[#8fb5a6] uppercase tracking-wider">Heritage</div>
          <nav className="flex flex-col pr-2 space-y-1">
            {renderLink("/admin/heritage", <MdLocationOn size={20} />, "Historical Places")}
            {renderLink("/admin/heritage/add-new", <MdAddCircleOutline size={20} />, "Add New places")}
            {renderLink("/admin/heritage/categories", <MdCategory size={20} />, "Categories")}
            {renderLink("/admin/media-library", <MdPhotoLibrary size={20} />, "Media Library")}
          </nav>
        </div>

        {/* Administration Section */}
        <div>
          <div className="px-6 mb-2 text-[11px] font-semibold text-[#8fb5a6] uppercase tracking-wider">Administration</div>
          <nav className="flex flex-col pr-2 space-y-1">
            {renderLink("/admin/analytics", <MdBarChart size={20} />, "Analytics")}
            {renderLink("/admin/users", <MdPeople size={20} />, "Users")}
            {renderLink("/login", <MdLogout size={20} />, "Logout")}
          </nav>
        </div>

      </div>
    </aside>
  );
};

export default SideBar;