import { MdLocationOn, MdArrowRightAlt } from "react-icons/md";

interface BasicInformationFormProps {
  onNext: () => void;
}

const BasicInformationForm = ({ onNext }: BasicInformationFormProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 h-full flex flex-col">
      <h2 className="text-[24px] font-bold font-serif mb-6 text-gray-900 tracking-tight">Basic Information</h2>

      <div className="space-y-6">
        {/* Place Name */}
        <div>
          <label className="block text-[14px] font-bold text-gray-800 mb-2">Place Name</label>
          <input
            type="text"
            placeholder="e.g. Sigiriya Rock Fortress"
            className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B]"
          />
        </div>

        {/* 3 Columns Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-[14px] font-bold text-gray-800 mb-2">Province</label>
            <div className="relative">
              <select className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B] bg-white appearance-none">
                <option value="">Select a province</option>
                <option value="central">Central Province</option>
                <option value="north-central">North Central Province</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-[14px] font-bold text-gray-800 mb-2">District</label>
            <input
              type="text"
              placeholder="e.g. Matale"
              className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B]"
            />
          </div>
          <div>
            <label className="block text-[14px] font-bold text-gray-800 mb-2">Era</label>
            <input
              type="text"
              placeholder="e.g. Anuradhapura"
              className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B]"
            />
          </div>
        </div>

        {/* Map Location */}
        <div>
          <label className="block text-[14px] font-bold text-gray-800 mb-2">Map Location</label>
          <div className="border border-gray-300 rounded-lg h-[240px] flex items-center justify-center bg-white text-gray-400">
             <div className="flex items-center gap-2">
                <MdLocationOn size={18} />
                <span className="text-[14px]">Drop a pin on the map</span>
             </div>
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-[14px] font-bold text-gray-800 mb-2">Short Description</label>
          <textarea
            placeholder="A brief description about the place"
            rows={4}
            className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B] resize-none"
          ></textarea>
        </div>

        {/* Historical Story */}
        <div>
          <label className="block text-[14px] font-bold text-gray-800 mb-2">Historical Story</label>
          <textarea
            placeholder="A brief description about the place"
            rows={4}
            className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B] resize-none"
          ></textarea>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-4 mt-auto">
          <button 
            onClick={onNext}
            className="bg-[#1E604B] text-white px-8 py-2.5 rounded-md text-[14px] font-medium hover:bg-[#144b3a] transition-colors flex items-center gap-2 shadow-sm"
          >
            Continue
            <MdArrowRightAlt size={20} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default BasicInformationForm;
