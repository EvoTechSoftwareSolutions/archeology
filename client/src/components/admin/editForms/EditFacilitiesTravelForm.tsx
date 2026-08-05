import React from "react";
import { MdOutlineSave, MdArrowRightAlt, MdArrowBack } from "react-icons/md";

export interface EditFacilitiesTravelFormProps {
  value: {
    nearbyHotels: string;
    nearbyHospitals: string;
    nearbyRestaurant: string;
    travelTips: string;
  };
  onChange: (
    field: "nearbyHotels" | "nearbyHospitals" | "nearbyRestaurant" | "travelTips",
    value: string
  ) => void;
  onNext: () => void;
  onBack: () => void;
  onSave?: () => void;
  submitting?: boolean;
}

const EditFacilitiesTravelForm: React.FC<EditFacilitiesTravelFormProps> = ({
  value,
  onChange,
  onNext,
  onBack,
  onSave,
  submitting = false,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col h-full">
      <h2 className="text-[24px] font-bold font-serif mb-6 text-gray-900 tracking-tight">
        Edit Facilities & Travel Information
      </h2>

      <div className="space-y-6 flex-1 pt-2">
        {/* Nearby Hotels */}
        <div>
          <label className="block text-[14px] font-bold text-gray-800 mb-2">
            Nearby Hotels / Accommodation
          </label>
          <textarea
            rows={3}
            placeholder="Mention popular stays or hotel recommendations nearby..."
            value={value.nearbyHotels}
            onChange={(e) => onChange("nearbyHotels", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B] resize-none"
          />
        </div>

        {/* Nearby Hospitals */}
        <div>
          <label className="block text-[14px] font-bold text-gray-800 mb-2">
            Nearby Medical Facilities / Hospitals
          </label>
          <textarea
            rows={3}
            placeholder="Nearest hospitals or emergency medical centers..."
            value={value.nearbyHospitals}
            onChange={(e) => onChange("nearbyHospitals", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B] resize-none"
          />
        </div>

        {/* Nearby Restaurants */}
        <div>
          <label className="block text-[14px] font-bold text-gray-800 mb-2">
            Nearby Dining & Restaurants
          </label>
          <textarea
            rows={3}
            placeholder="Recommended dining spots or local food areas..."
            value={value.nearbyRestaurant}
            onChange={(e) => onChange("nearbyRestaurant", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B] resize-none"
          />
        </div>

        {/* Travel Tips */}
        <div>
          <label className="block text-[14px] font-bold text-gray-800 mb-2">
            Travel Tips & Visitor Guidance
          </label>
          <textarea
            rows={4}
            placeholder="Best time to visit, dress code, ticketing advice, safety guidelines..."
            value={value.travelTips}
            onChange={(e) => onChange("travelTips", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B] resize-none"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-8 mt-auto border-t border-gray-100">
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2.5 rounded-md text-[14px] font-medium transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <MdArrowBack size={18} />
          Back
        </button>

        <div className="flex items-center gap-3">
          {onSave && (
            <button
              type="button"
              onClick={onSave}
              disabled={submitting}
              className="border border-[#1E604B] text-[#1E604B] hover:bg-[#1E604B]/5 px-6 py-2.5 rounded-md text-[14px] font-medium transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <MdOutlineSave size={18} />
              Save Changes
            </button>
          )}

          <button
            type="button"
            onClick={onNext}
            disabled={submitting}
            className="bg-[#1E604B] text-white px-8 py-2.5 rounded-md text-[14px] font-medium hover:bg-[#144b3a] transition-colors flex items-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
          >
            Continue
            <MdArrowRightAlt size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditFacilitiesTravelForm;