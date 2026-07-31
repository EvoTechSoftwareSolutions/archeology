interface FacilitiesTravelFormProps {
  value: {
    nearbyHotels: string;
    nearbyHospitals: string;
    nearbyRestaurant: string;
    travelTips: string;
  };
  onChange: (field: "nearbyHotels" | "nearbyHospitals" | "nearbyRestaurant" | "travelTips", value: string) => void;
  onBack: () => void;
  onNext: () => void;
}

const FacilitiesTravelForm = ({ value, onChange, onBack, onNext }: FacilitiesTravelFormProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col h-full">
      <h2 className="text-[24px] font-bold font-serif mb-6 text-gray-900 tracking-tight">Facilities & Travel</h2>

      <div className="space-y-6 flex-1">
        {/* Nearby Hotels */}
        <div>
          <label className="block text-[14px] font-bold text-gray-800 mb-2">Nearby Hotels</label>
          <textarea
            placeholder="List nearby accommodation options"
            rows={4}
            value={value.nearbyHotels}
            onChange={(event) => onChange("nearbyHotels", event.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B] resize-none"
          ></textarea>
        </div>

        {/* Nearby Hospitals */}
        <div>
          <label className="block text-[14px] font-bold text-gray-800 mb-2">Nearby Hospitals</label>
          <textarea
            placeholder="List nearby medical facilities"
            rows={4}
            value={value.nearbyHospitals}
            onChange={(event) => onChange("nearbyHospitals", event.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B] resize-none"
          ></textarea>
        </div>

        {/* Nearby Restaurant */}
        <div>
          <label className="block text-[14px] font-bold text-gray-800 mb-2">Nearby Restaurant</label>
          <textarea
            placeholder="List nearby restaurants"
            rows={4}
            value={value.nearbyRestaurant}
            onChange={(event) => onChange("nearbyRestaurant", event.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B] resize-none"
          ></textarea>
        </div>

        {/* Travel Tips */}
        <div>
          <label className="block text-[14px] font-bold text-gray-800 mb-2">Travel Tips</label>
          <textarea
            placeholder="Best time to visit, entry fee, dress code"
            rows={4}
            value={value.travelTips}
            onChange={(event) => onChange("travelTips", event.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B] resize-none"
          ></textarea>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-8 mt-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-[14px] font-medium transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <button
          onClick={onNext}
          className="bg-[#1E604B] text-white px-8 py-2.5 rounded-md text-[14px] font-medium hover:bg-[#144b3a] transition-colors flex items-center gap-2 shadow-sm"
        >
          Continue
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FacilitiesTravelForm;
