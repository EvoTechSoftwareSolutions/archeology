import { MdSearch, MdNotifications } from "react-icons/md";

const Header = () => {
  return (
    <header className="h-20 flex items-center justify-between px-8 bg-[#FAFAFA] border-b border-gray-100">
      {/* Search Bar */}
      <div className="relative w-full max-w-xl">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <MdSearch className="text-gray-400" size={20} />
        </div>
        <input
          type="text"
          placeholder="Search places, users..."
          className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E4A] focus:border-transparent transition-all"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        {/* Notification */}
        <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors bg-white shadow-sm border border-gray-100">
          <MdNotifications size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#1B5E4A] flex items-center justify-center text-white font-semibold text-sm shadow-md">
            EV
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-800">Evo Tech</span>
            <span className="text-[11px] text-gray-500 font-medium">Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;