import { FiSearch, FiBell } from "react-icons/fi";

const Header = () => {
  return (
    <header className="h-[5.5rem] bg-[#F8F6F1] flex items-center justify-between px-8 z-10 sticky top-0">
      
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
      <div className="flex items-center gap-6">
        
        {/* Notifications */}
        <button className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors bg-white rounded-full border border-gray-100 shadow-sm w-10 h-10 flex items-center justify-center">
          <FiBell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-[#1E5646] text-white flex items-center justify-center font-bold text-sm shadow-sm">
            EV
          </div>
          <div className="hidden md:block text-sm">
            <p className="font-bold text-gray-900 font-['Inter'] leading-tight">Evo Tech</p>
            <p className="text-gray-500 text-xs font-['Inter']">Administrator</p>
          </div>
        </div>

      </div>
      
    </header>
  );
};

export default Header;