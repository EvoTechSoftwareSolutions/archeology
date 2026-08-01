import { MdArrowRightAlt } from "react-icons/md";

import type { District } from "../../types/district";
import LocationMapPicker from "./LocationMapPicker";

interface BasicInformationFormProps {
  value: {
    name: string;
    province: string;
    district: string;
    era: string;
    latitude: string;
    longitude: string;
    shortDescription: string;
    historicalStory: string;
  };
  onChange: (field: "name" | "province" | "district" | "era" | "latitude" | "longitude" | "shortDescription" | "historicalStory", value: string) => void;
  onDistrictSelect: (district: District) => void;
  onNext: () => void;
}

const BasicInformationForm = ({ value, onChange, onDistrictSelect, onNext }: BasicInformationFormProps) => {
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
            value={value.name}
            onChange={(event) => onChange("name", event.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B]"
          />
        </div>

        {/* 3 Columns Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-[14px] font-bold text-gray-800 mb-2">Province</label>
            <div className="relative">
              <select
                value={value.province}
                onChange={(event) => onChange("province", event.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B] bg-white appearance-none"
              >
                <option value="">Select a province</option>
                <option value="Western">Western Province</option>
                <option value="Central">Central Province</option>
                <option value="Southern">Southern Province</option>
                <option value="Northern">Northern Province</option>
                <option value="Eastern">Eastern Province</option>
                <option value="North Western">North Western Province</option>
                <option value="North Central">North Central Province</option>
                <option value="Uva">Uva Province</option>
                <option value="Sabaragamuwa">Sabaragamuwa Province</option>
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
              value={value.district}
              onChange={(event) => onChange("district", event.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B]"
            />
          </div>
          <div>
            <label className="block text-[14px] font-bold text-gray-800 mb-2">Era</label>
            <input
              type="text"
              placeholder="e.g. Anuradhapura"
              value={value.era}
              onChange={(event) => onChange("era", event.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B]"
            />
          </div>
        </div>

        <LocationMapPicker
          selectedDistrictName={value.district}
          latitude={value.latitude}
          longitude={value.longitude}
          onDistrictSelect={onDistrictSelect}
          onCoordinatesChange={(latitude, longitude) => {
            onChange("latitude", latitude);
            onChange("longitude", longitude);
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[14px] font-bold text-gray-800 mb-2">Latitude</label>
            <input
              type="number"
              step="any"
              placeholder="7.8731"
              value={value.latitude}
              onChange={(event) => onChange("latitude", event.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B]"
            />
          </div>
          <div>
            <label className="block text-[14px] font-bold text-gray-800 mb-2">Longitude</label>
            <input
              type="number"
              step="any"
              placeholder="80.7718"
              value={value.longitude}
              onChange={(event) => onChange("longitude", event.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B]"
            />
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-[14px] font-bold text-gray-800 mb-2">Short Description</label>
          <textarea
            placeholder="A brief description about the place"
            rows={4}
            value={value.shortDescription}
            onChange={(event) => onChange("shortDescription", event.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B] resize-none"
          ></textarea>
        </div>

        {/* Historical Story */}
        <div>
          <label className="block text-[14px] font-bold text-gray-800 mb-2">Historical Story</label>
          <textarea
            placeholder="A brief description about the place"
            rows={4}
            value={value.historicalStory}
            onChange={(event) => onChange("historicalStory", event.target.value)}
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
