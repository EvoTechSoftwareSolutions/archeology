import { FiSearch, FiChevronDown, FiPlus, FiDownload, FiMoreHorizontal } from "react-icons/fi";
import { Link } from "react-router-dom";
import dalada from "../../assets/Admin/daladamaligawa.png";
import sigiriya from "../../assets/Admin/LoginImage.png";

const HistoricalPlaces = () => {

  const places = [
    { id: 1, name: "Sigiriya Rock Fortress", district: "Matale District", province: "Central", era: "Anuradhapura", status: "Published", date: "29 Apr 2026", image: sigiriya },
    { id: 2, name: "Temple of the tooth", district: "Kandy District", province: "Central", era: "Anuradhapura", status: "Published", date: "29 Apr 2026", image: dalada },
    { id: 3, name: "Ruwewanweliseya", district: "Anuradhapura District", province: "North Central", era: "Anuradhapura", status: "In Review", date: "29 Apr 2026", image: sigiriya },
    { id: 4, name: "Galle Dutch Fort", district: "Galle District", province: "Southern", era: "Anuradhapura", status: "Published", date: "29 Apr 2026", image: sigiriya },
    { id: 5, name: "Watadageya", district: "Polonnaruwa District", province: "North Central", era: "Anuradhapura", status: "Draft", date: "29 Apr 2026", image: sigiriya },
    { id: 6, name: "Sigiriya Rock Fortress", district: "Matale District", province: "North Central", era: "Anuradhapura", status: "Published", date: "29 Apr 2026", image: sigiriya },
    { id: 7, name: "Sigiriya Rock Fortress", district: "Matale District", province: "North Central", era: "Anuradhapura", status: "Published", date: "29 Apr 2026", image: sigiriya },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Published":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-green-200 bg-green-50/50 text-[11px] font-semibold text-green-700">
            <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>Published
          </span>
        );
      case "In Review":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-200 bg-amber-50/50 text-[11px] font-semibold text-amber-700">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>In Review
          </span>
        );
      case "Draft":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-red-200 bg-red-50/50 text-[11px] font-semibold text-red-600">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>Draft
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="font-['Inter'] pb-10">
      
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-4">
        <Link to="/admin" className="hover:text-gray-900">Home</Link> &gt; Historical places
      </div>

      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-['Playfair_Display'] font-bold text-gray-900 mb-1">
            Historical Places
          </h1>
          <p className="text-gray-500 text-sm">
            Manage catalogued heritage sites across Sri Lanka.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-800 rounded-lg text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors">
            Export CSV <FiDownload />
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#275949] rounded-lg text-sm font-semibold text-white hover:bg-[#1E4538] transition-colors shadow-sm">
            <FiPlus size={16} /> Add New Place
          </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        
        {/* Filters Bar */}
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white">
          
          <div className="relative w-full sm:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <FiSearch size={16} />
            </div>
            <input 
              type="text" 
              placeholder="Search places, users..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#275949] focus:border-[#275949] text-sm text-gray-700 placeholder-gray-400 font-['Inter']"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-40">
              <select className="w-full appearance-none bg-white border border-gray-200 text-gray-700 text-sm rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-1 focus:ring-[#275949] font-medium cursor-pointer">
                <option>All Provinces</option>
                <option>Central</option>
                <option>North Central</option>
                <option>Southern</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <FiChevronDown />
              </div>
            </div>
            
            <div className="relative w-full sm:w-36">
              <select className="w-full appearance-none bg-white border border-gray-200 text-gray-700 text-sm rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-1 focus:ring-[#275949] font-medium cursor-pointer">
                <option>All Status</option>
                <option>Published</option>
                <option>In Review</option>
                <option>Draft</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <FiChevronDown />
              </div>
            </div>
          </div>
          
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-sm text-gray-700 font-semibold bg-white">
                <th className="p-4 w-12">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#275949] focus:ring-[#275949] cursor-pointer" />
                </th>
                <th className="py-4 px-2 whitespace-nowrap text-gray-500 font-medium">Select all places</th>
                <th className="py-4 px-4 font-bold text-gray-900">Province</th>
                <th className="py-4 px-4 font-bold text-gray-900">Era</th>
                <th className="py-4 px-4 font-bold text-gray-900">Status</th>
                <th className="py-4 px-4 font-bold text-gray-900">Date</th>
                <th className="p-4 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {places.map((place) => (
                <tr key={place.id} className="hover:bg-gray-50 transition-colors bg-white">
                  <td className="p-4">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#275949] focus:ring-[#275949] cursor-pointer" />
                  </td>
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200 shadow-sm">
                        <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-[15px]">{place.name}</h3>
                        <p className="text-gray-500 text-[13px]">{place.district}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{place.province}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{place.era}</td>
                  <td className="py-4 px-4">
                    {getStatusBadge(place.status)}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{place.date}</td>
                  <td className="p-4 text-gray-400 hover:text-gray-700 cursor-pointer text-center">
                    <FiMoreHorizontal size={20} className="mx-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white">
          <div className="text-sm text-gray-500 font-medium">
            Showing 1 - 7 of 12
          </div>
          
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium text-gray-600 bg-[#F3F4F6] hover:bg-gray-200 transition-colors">
              Previous
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded-md bg-[#275949] text-white text-xs font-bold shadow-sm">
              1
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 text-xs font-bold hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium text-gray-600 bg-white hover:bg-gray-50 transition-colors">
              Next
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default HistoricalPlaces;
