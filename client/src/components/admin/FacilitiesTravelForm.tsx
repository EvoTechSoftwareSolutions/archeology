import FormField from "../common/FormField";

interface FacilitiesTravelFormProps {
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
  onBack: () => void;
  onNext: () => void;
}

const FacilitiesTravelForm = ({
  value,
  onChange,
  onBack,
  onNext,
}: FacilitiesTravelFormProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8 flex flex-col h-full w-full min-w-0">
      <h2 className="text-[20px] sm:text-[22px] lg:text-[24px] font-bold font-serif mb-4 sm:mb-6 text-gray-900 tracking-tight">
        Facilities & Travel
      </h2>

      <div className="space-y-5 sm:space-y-6 flex-1">
        {/* Nearby Hotels */}
        <FormField
          label="Nearby Hotels"
          tooltipText="List nearby hotels and accommodation options for visitors."
        >
          <textarea
            placeholder="List nearby accommodation options"
            rows={4}
            value={value.nearbyHotels}
            onChange={(event) => onChange("nearbyHotels", event.target.value)}
            className="w-full min-w-0 border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B] resize-none"
          />
        </FormField>

        {/* Nearby Hospitals */}
        <FormField
          label="Nearby Hospitals"
          tooltipText="List nearby medical centers and emergency health facilities."
        >
          <textarea
            placeholder="List nearby medical facilities"
            rows={4}
            value={value.nearbyHospitals}
            onChange={(event) => onChange("nearbyHospitals", event.target.value)}
            className="w-full min-w-0 border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B] resize-none"
          />
        </FormField>

        {/* Nearby Restaurant */}
        <FormField
          label="Nearby Restaurant"
          tooltipText="List recommended restaurants or food options near the venue."
        >
          <textarea
            placeholder="List nearby restaurants"
            rows={4}
            value={value.nearbyRestaurant}
            onChange={(event) => onChange("nearbyRestaurant", event.target.value)}
            className="w-full min-w-0 border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B] resize-none"
          />
        </FormField>

        {/* Travel Tips */}
        <FormField
          label="Travel Tips"
          tooltipText="Include helpful guidelines such as best visiting hours, entry fees, or dress codes."
        >
          <textarea
            placeholder="Best time to visit, entry fee, dress code"
            rows={4}
            value={value.travelTips}
            onChange={(event) => onChange("travelTips", event.target.value)}
            className="w-full min-w-0 border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B] resize-none"
          />
        </FormField>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-6 sm:pt-8 mt-auto">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center sm:justify-start gap-2 text-gray-500 hover:text-gray-700 text-[14px] font-medium transition-colors py-2 sm:py-0"
        >
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="w-full sm:w-auto bg-[#1E604B] text-white px-8 py-2.5 rounded-md text-[14px] font-medium hover:bg-[#144b3a] transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          Continue
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FacilitiesTravelForm;