import React, { useMemo } from "react";
import { MdOutlineSave, MdArrowRightAlt } from "react-icons/md";
import LocationMapPicker from "../LocationMapPicker";
import { useProvince } from "../../../hooks/useProvince";
import { useDistrictsByProvince } from "../../../hooks/useDistrictsByProvince";
import { useCategories } from "../../../hooks/useCategories";

interface EditBasicInformationFormProps {
  value: {
    name: string;
    category: string;
    province: string;
    district: string;
    era: string;
    anchorXPct: string;
    anchorYPct: string;
    shortDescription: string;
    historicalStory: string;
  };
  submitting?: boolean; // Move to top-level props & use optional syntax (?)
  onChange: (
    field:
      | "name"
      | "category"
      | "province"
      | "district"
      | "era"
      | "shortDescription"
      | "historicalStory",
    value: string
  ) => void;
  /** Real DB ids — sent to the backend */
  onProvinceIdChange: (id: number | null) => void;
  onDistrictIdChange: (id: number | null) => void;
  /** Fired on map pick */
  onLocationPick: (
    latitude: string,
    longitude: string,
    anchorXPct: string,
    anchorYPct: string
  ) => void;
  onNext: () => void;
  onSave?: () => void; // Optional direct save handler for edit mode
}

const EditBasicInformationForm = ({
  value,
  submitting = false,
  onChange,
  onProvinceIdChange,
  onDistrictIdChange,
  onLocationPick,
  onNext,
  onSave,
}: EditBasicInformationFormProps) => {
  const { categories, loading: categoriesLoading } = useCategories();
  const { provinces, loading: provincesLoading, error: provincesError } = useProvince();

  // Find selected province ID dynamically based on the current string value
  const selectedProvinceId = useMemo(() => {
    const found = provinces.find((p) => p.name === value.province);
    return found ? Number(found.id) : null;
  }, [provinces, value.province]);

  const {
    districts: districtsForProvince,
    loading: districtsLoading,
    error: districtsError,
  } = useDistrictsByProvince(selectedProvinceId);

  const handleProvinceChange = (provinceName: string) => {
    onChange("province", provinceName);
    onChange("district", "");
    onDistrictIdChange(null);

    const match = provinces.find((p) => p.name === provinceName);
    onProvinceIdChange(match ? Number(match.id) : null);
  };

  const handleDistrictChange = (districtName: string) => {
    onChange("district", districtName);
    const match = districtsForProvince.find((d) => d.name === districtName);
    onDistrictIdChange(match ? Number(match.id) : null);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col h-full">
      <h2 className="text-[24px] font-bold font-serif mb-6 text-gray-900 tracking-tight">
        Edit Basic Information
      </h2>

      <div className="space-y-6 flex-1 pt-2">
        {/* Place Name */}
        <div>
          <label className="block text-[14px] font-bold text-gray-800 mb-2">
            Historical Place Name
          </label>
          <input
            type="text"
            placeholder="e.g. Sigiriya Rock Fortress"
            value={value.name}
            onChange={(e) => onChange("name", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B]"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-[14px] font-bold text-gray-800 mb-2">
            Category
          </label>
          <div className="relative">
            <select
              value={value.category}
              onChange={(e) => onChange("category", e.target.value)}
              disabled={categoriesLoading}
              className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B] bg-white appearance-none disabled:opacity-60 cursor-pointer"
            >
              <option value="">
                {categoriesLoading ? "Loading categories..." : "Select a category"}
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Province / District / Era */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Province Select */}
          <div>
            <label className="block text-[14px] font-bold text-gray-800 mb-2">
              Province
            </label>
            <div className="relative">
              <select
                value={value.province}
                onChange={(e) => handleProvinceChange(e.target.value)}
                disabled={provincesLoading}
                className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B] bg-white appearance-none disabled:opacity-60 cursor-pointer"
              >
                <option value="">
                  {provincesLoading ? "Loading provinces..." : "Select a province"}
                </option>
                {provinces.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name} Province
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {provincesError && <p className="text-[12px] text-red-600 mt-1">{provincesError}</p>}
          </div>

          {/* District Select */}
          <div>
            <label className="block text-[14px] font-bold text-gray-800 mb-2">
              District
            </label>
            <div className="relative">
              <select
                value={value.district}
                onChange={(e) => handleDistrictChange(e.target.value)}
                disabled={value.province ? districtsLoading : true}
                className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B] bg-white appearance-none disabled:opacity-60 cursor-pointer"
              >
                <option value="">
                  {!value.province
                    ? "Select a province first"
                    : districtsLoading
                    ? "Loading districts..."
                    : "Select a district"}
                </option>
                {districtsForProvince.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {value.province && districtsError && (
              <p className="text-[12px] text-red-600 mt-1">{districtsError}</p>
            )}
          </div>

          {/* Era Input */}
          <div>
            <label className="block text-[14px] font-bold text-gray-800 mb-2">
              Era / Century
            </label>
            <input
              type="text"
              placeholder="e.g. 5th Century AD"
              value={value.era}
              onChange={(e) => onChange("era", e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B]"
            />
          </div>
        </div>

        {/* Integrated Location Map Picker */}
        <LocationMapPicker
          selectedDistrictName={value.district}
          anchorXPct={value.anchorXPct}
          anchorYPct={value.anchorYPct}
          onLocationPick={onLocationPick}
        />

        {/* Short Description */}
        <div>
          <label className="block text-[14px] font-bold text-gray-800 mb-2">
            Short Description
          </label>
          <textarea
            rows={3}
            placeholder="Brief overview of the historical site..."
            value={value.shortDescription}
            onChange={(e) => onChange("shortDescription", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B] resize-none"
          />
        </div>

        {/* Historical Story */}
        <div>
          <label className="block text-[14px] font-bold text-gray-800 mb-2">
            Historical Story / Detailed Background
          </label>
          <textarea
            rows={5}
            placeholder="Detailed history and facts..."
            value={value.historicalStory}
            onChange={(e) => onChange("historicalStory", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B] resize-none"
          />
        </div>
      </div>

      {/* Action Buttons Container */}
      <div className="flex justify-end items-center gap-3 pt-8 mt-auto border-t border-gray-100">
        {onSave && (
          <button
            type="button"
            onClick={onSave}
            disabled={submitting}
            className="border border-[#1E604B] text-[#1E604B] hover:bg-[#1E604B]/5 px-6 py-2.5 rounded-md text-[14px] font-medium transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <MdOutlineSave size={18} />
            {submitting ? "Saving..." : "Save Changes"}
          </button>
        )}

        <button
          type="button"
          onClick={onNext}
          className="bg-[#1E604B] text-white px-8 py-2.5 rounded-md text-[14px] font-medium hover:bg-[#144b3a] transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
        >
          Continue
          <MdArrowRightAlt size={20} />
        </button>
      </div>
    </div>
  );
};

export default EditBasicInformationForm;