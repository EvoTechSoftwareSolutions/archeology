import { Link } from "react-router-dom";
import { 
  MdAccountBalance, 
  MdPublic, 
  MdImage, 
  MdPeople,
  MdAdd,
  MdUpload,
  MdPersonOutline,
  MdBarChart
} from "react-icons/md";
import { FiArrowUpRight } from "react-icons/fi";
import daladamaligawa from "../../assets/Admin/daladamaligawa.png";

const Dashboard = () => {

  const stats = [
    { label: "Historical Places", value: "176", trend: "+ 8%", icon: MdAccountBalance },
    { label: "UNESCO Sites", value: "08", trend: "+ 0%", icon: MdPublic },
    { label: "Images", value: "9,640", trend: "+ 5%", icon: MdImage },
    { label: "Monthly Visitors", value: "22,400", trend: "+ 20%", icon: MdPeople },
  ];

  return (
    <div className="font-['Inter'] pb-10 w-full max-w-[1600px] mx-auto px-2 sm:px-4 md:px-0">
      
      {/* Header text */}
      <div className="mb-6">
        <h1 className="text-3xl font-['Playfair_Display'] font-bold text-gray-900 mb-1">
          Dashboard
        </h1>
        <p className="text-gray-500 text-sm">
          Overview of Sri Lanka's digital heritage estate.
        </p>
      </div>

      {/* Hero Banner */}
      <div className="relative w-full h-80 sm:h-72 lg:h-48 rounded-3xl bg-linear-to-r from-[#275949] to-[#1E4538] overflow-hidden mb-8 shadow-md">
        <div className="absolute inset-0 right-0 left-auto w-1/2 md:w-1/3 z-0">
          <img 
            src={daladamaligawa} 
            alt="Dalada Maligawa" 
            className="w-full h-full object-cover opacity-90 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#1E4538] to-transparent"></div>
        </div>
        
        <div className="relative z-10 p-8 flex flex-col justify-center h-full">
          <p className="text-[#D97757] text-xs font-semibold tracking-wide mb-2">Good morning, Evo Tech</p>
          <h2 className="text-white text-3xl font-['Playfair_Display'] font-bold mb-3 max-w-lg">
            176 heritage sites are live and thriving
          </h2>
          <p className="text-white/80 text-sm max-w-md">
            Visitor traffic is up 22% this month. Everything is running smoothly.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-[#E8F1EF] flex items-center justify-center text-[#275949]">
                  <Icon size={20} />
                </div>
                <div className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                  <FiArrowUpRight className="mr-1" />
                  {stat.trend}
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-['Playfair_Display'] font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-500 text-xs font-medium">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        
        {/* Visitor Analytics Chart (Mock) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-bold text-gray-900 font-['Playfair_Display'] mb-1">Visitor Analytics</h3>
              <p className="text-xs text-gray-500">Visitors over the last 7 months</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center text-xs text-gray-600">
                <span className="w-2 h-2 rounded-full bg-[#275949] mr-2"></span> Locals
              </div>
              <div className="flex items-center text-xs text-gray-600">
                <span className="w-2 h-2 rounded-full bg-[#D97757] mr-2"></span> Foreigners
              </div>
            </div>
          </div>
          
          <div className="relative h-64 w-full">
            {/* SVG Chart Mockup */}
            <svg viewBox="0 0 800 250" className="w-full h-full preserve-aspect-ratio-none">
              {/* Grid lines */}
              <g stroke="#f0f0f0" strokeDasharray="4 4" strokeWidth="1">
                <line x1="40" y1="20" x2="780" y2="20" />
                <line x1="40" y1="70" x2="780" y2="70" />
                <line x1="40" y1="120" x2="780" y2="120" />
                <line x1="40" y1="170" x2="780" y2="170" />
                <line x1="40" y1="220" x2="780" y2="220" />
              </g>
              {/* Y Axis Labels */}
              <g className="text-[10px] fill-gray-400 font-['Inter']">
                <text x="30" y="24" textAnchor="end">30K</text>
                <text x="30" y="74" textAnchor="end">24K</text>
                <text x="30" y="124" textAnchor="end">18K</text>
                <text x="30" y="174" textAnchor="end">12K</text>
                <text x="30" y="224" textAnchor="end">6K</text>
              </g>
              {/* X Axis Labels */}
              <g className="text-[10px] fill-gray-400 font-['Inter']">
                <text x="70" y="245" textAnchor="middle">Jan</text>
                <text x="170" y="245" textAnchor="middle">Feb</text>
                <text x="270" y="245" textAnchor="middle">Mar</text>
                <text x="370" y="245" textAnchor="middle">Apr</text>
                <text x="470" y="245" textAnchor="middle">May</text>
                <text x="570" y="245" textAnchor="middle">Jun</text>
                <text x="670" y="245" textAnchor="middle">Jul</text>
              </g>
              {/* Locals Line (Green) */}
              <path d="M 70 170 Q 200 160 370 110 T 670 40" fill="none" stroke="#275949" strokeWidth="2" strokeLinecap="round" />
              {/* Foreigners Line (Gold) */}
              <path d="M 70 210 Q 300 210 470 140 T 670 80" fill="none" stroke="#D97757" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
          <h3 className="font-bold text-gray-900 font-['Playfair_Display'] mb-6">Quick Actions</h3>
          
          <div className="flex-1 flex flex-col gap-4">
            <Link
              to="/admin/add-place"
              className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-[#275949] hover:bg-[#F4F9F8] transition-colors w-full text-left group"
            >
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-white text-[#275949] group-hover:shadow-sm">
                <MdAdd />
              </div>
              <span className="font-semibold text-sm text-gray-800">Add a New Place</span>
            </Link>
            
            <button className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-[#275949] hover:bg-[#F4F9F8] transition-colors w-full text-left group">
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-white text-[#D97757] group-hover:shadow-sm">
                <MdUpload />
              </div>
              <span className="font-semibold text-sm text-gray-800">Upload a Image</span>
            </button>
            
            <button className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-[#275949] hover:bg-[#F4F9F8] transition-colors w-full text-left group">
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-white text-blue-500 group-hover:shadow-sm">
                <MdPersonOutline />
              </div>
              <span className="font-semibold text-sm text-gray-800">Mange Users</span>
            </button>
            
            <button className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-[#275949] hover:bg-[#F4F9F8] transition-colors w-full text-left group">
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-white text-indigo-500 group-hover:shadow-sm">
                <MdBarChart />
              </div>
              <span className="font-semibold text-sm text-gray-800">View Analytics</span>
            </button>
          </div>
        </div>
      </div>

      {/* Provincial Distribution Chart (Mock) */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-900 font-['Playfair_Display'] mb-6">Provincial Distribution</h3>
        <div className="relative h-64 w-full">
          <svg viewBox="0 0 1000 250" className="w-full h-full preserve-aspect-ratio-none">
            {/* Grid lines */}
            <g stroke="#f0f0f0" strokeDasharray="4 4" strokeWidth="1">
              <line x1="40" y1="20" x2="980" y2="20" />
              <line x1="40" y1="70" x2="980" y2="70" />
              <line x1="40" y1="120" x2="980" y2="120" />
              <line x1="40" y1="170" x2="980" y2="170" />
              <line x1="40" y1="220" x2="980" y2="220" />
            </g>
            
            {/* Y Axis Labels */}
            <g className="text-[10px] fill-gray-400 font-['Inter']">
              <text x="30" y="24" textAnchor="end">35</text>
              <text x="30" y="74" textAnchor="end">30</text>
              <text x="30" y="124" textAnchor="end">25</text>
              <text x="30" y="174" textAnchor="end">20</text>
              <text x="30" y="224" textAnchor="end">0</text>
            </g>
            
            {/* X Axis Labels */}
            <g className="text-[10px] fill-gray-500 font-['Inter'] transform origin-center">
              <text x="100" y="240" textAnchor="middle" transform="rotate(-35, 100, 240)">Central</text>
              <text x="200" y="240" textAnchor="middle" transform="rotate(-35, 200, 240)">North Central</text>
              <text x="300" y="240" textAnchor="middle" transform="rotate(-35, 300, 240)">Southern</text>
              <text x="400" y="240" textAnchor="middle" transform="rotate(-35, 400, 240)">Western</text>
              <text x="500" y="240" textAnchor="middle" transform="rotate(-35, 500, 240)">Uva</text>
              <text x="600" y="240" textAnchor="middle" transform="rotate(-35, 600, 240)">Sabaragamuwa</text>
              <text x="700" y="240" textAnchor="middle" transform="rotate(-35, 700, 240)">North Western</text>
              <text x="800" y="240" textAnchor="middle" transform="rotate(-35, 800, 240)">Eastern</text>
              <text x="900" y="240" textAnchor="middle" transform="rotate(-35, 900, 240)">Northern</text>
            </g>
            
            {/* Bars */}
            <g>
              <rect x="75" y="60" width="50" height="160" fill="#1E4538" rx="2"/>
              <rect x="175" y="40" width="50" height="180" fill="#A87F47" rx="2"/>
              <rect x="275" y="70" width="50" height="150" fill="#1E4538" rx="2"/>
              <rect x="375" y="90" width="50" height="130" fill="#A87F47" rx="2"/>
              <rect x="475" y="100" width="50" height="120" fill="#1E4538" rx="2"/>
              <rect x="575" y="85" width="50" height="135" fill="#A87F47" rx="2"/>
              <rect x="675" y="55" width="50" height="165" fill="#1E4538" rx="2"/>
              <rect x="775" y="120" width="50" height="100" fill="#A87F47" rx="2"/>
              <rect x="875" y="60" width="50" height="160" fill="#1E4538" rx="2"/>
            </g>
          </svg>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;