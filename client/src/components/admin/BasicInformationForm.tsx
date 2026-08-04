import { useMemo } from "react";
import { MdArrowRightAlt } from "react-icons/md";
import LocationMapPicker from "./LocationMapPicker";
import FormField from "../common/FormField";
import { useProvince } from "../../hooks/useProvince";
import { useDistrictsByProvince } from "../../hooks/useDistrictsByProvince";
import { useCategories } from "../../hooks/useCategories";
import { useFormValidation, type FormValues } from "../../hooks/validations/useFormValidation";

interface BasicInformationFormProps {
  value: FormValues;
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
  onProvinceIdChange: (id: number | null) => void;
  onDistrictIdChange: (id: number | null) => void;
  onLocationPick: (
    latitude: string,
    longitude: string,
    anchorXPct: string,
    anchorYPct: string
  ) => void;
  onNext: () => void;
}

const BasicInformationForm = ({
  value,
  onChange,
  onProvinceIdChange,
  onDistrictIdChange,
  onLocationPick,
  onNext,
}: BasicInformationFormProps) => {
  const { categories, loading: categoriesLoading } = useCategories();
  const { provinces, loading: provincesLoading, error: provincesError } = useProvince();
  const { errors, validateAll, clearFieldError } = useFormValidation(value);

  const selectedProvinceId = useMemo(() => {
    const found = provinces.find((p) => p.name === value.province);
    return found ? Number(found.id) : null;
  }, [provinces, value.province]);

  const {
    districts: districtsForProvince,
    loading: districtsLoading,
    error: districtsError,
  } = useDistrictsByProvince(selectedProvinceId);

  const handleChange = (
    field:
      | "name"
      | "category"
      | "province"
      | "district"
      | "era"
      | "shortDescription"
      | "historicalStory",
    val: string
  ) => {
    onChange(field, val);
    clearFieldError(field);
  };

  const handleProvinceChange = (provinceName: string) => {
    handleChange("province", provinceName);
    handleChange("district", "");
    onDistrictIdChange(null);

    const match = provinces.find((p) => p.name === provinceName);
    onProvinceIdChange(match ? Number(match.id) : null);
  };

  const handleDistrictChange = (districtName: string) => {
    handleChange("district", districtName);
    const match = districtsForProvince.find((d) => d.name === districtName);
    onDistrictIdChange(match ? Number(match.id) : null);
  };

  const handleLocationPickWithValidation = (
    latitude: string,
    longitude: string,
    anchorXPct: string,
    anchorYPct: string
  ) => {
    onLocationPick(latitude, longitude, anchorXPct, anchorYPct);
    clearFieldError("map");
  };

  const handleContinue = () => {
    if (validateAll()) {
      onNext();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 h-full flex flex-col">
      <h2 className="text-[24px] font-bold font-serif mb-6 text-gray-900 tracking-tight">
        Basic Information
      </h2>

      <div className="space-y-6">
        {/* Place Name */}
        <FormField
          label="Place Name"
          tooltipText="Enter the official or common name of the place (e.g., Sigiriya Rock Fortress)."
          required
          error={errors.name}
        >
          <input
            type="text"
            placeholder="e.g. Sigiriya Rock Fortress"
            value={value.name}
            onChange={(event) => handleChange("name", event.target.value)}
            className={`w-full border rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 ${
              errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-[#1E604B] focus:border-[#1E604B]"
            }`}
          />
        </FormField>

        {/* Category */}
        <FormField
          label="Category"
          tooltipText="Select the classification that best fits this site (e.g., Fort, Temple)."
          required
          error={errors.category}
        >
          <div className="relative">
            <select
              value={value.category}
              onChange={(event) => handleChange("category", event.target.value)}
              disabled={categoriesLoading}
              className={`w-full border rounded-lg p-3 text-[14px] text-gray-700 focus:outline-none focus:ring-1 bg-white appearance-none disabled:opacity-60 ${
                errors.category
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[#1E604B]"
              }`}
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
        </FormField>

        {/* Province / District / Era */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            label="Province"
            tooltipText="Choose the administrative province where the location is situated."
            required
            error={errors.province}
          >
            <div className="relative">
              <select
                value={value.province}
                onChange={(event) => handleProvinceChange(event.target.value)}
                disabled={provincesLoading}
                className={`w-full border rounded-lg p-3 text-[14px] text-gray-700 focus:outline-none focus:ring-1 bg-white appearance-none disabled:opacity-60 ${
                  errors.province
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[#1E604B]"
                }`}
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
          </FormField>

          <FormField
            label="District"
            tooltipText="Select the specific district (Province must be selected first)."
            required
            error={errors.district}
          >
            <div className="relative">
              <select
                value={value.district}
                onChange={(event) => handleDistrictChange(event.target.value)}
                disabled={value.province ? districtsLoading : true}
                className={`w-full border rounded-lg p-3 text-[14px] text-gray-700 focus:outline-none focus:ring-1 bg-white appearance-none disabled:opacity-60 ${
                  errors.district
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[#1E604B]"
                }`}
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
          </FormField>

          <FormField
            label="Era"
            tooltipText="Specify the kingdom or historical era (e.g., Anuradhapura)."
            required
            error={errors.era}
          >
            <input
              type="text"
              placeholder="e.g. Anuradhapura"
              value={value.era}
              onChange={(event) => handleChange("era", event.target.value)}
              className={`w-full border rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 ${
                errors.era
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[#1E604B] focus:border-[#1E604B]"
              }`}
            />
          </FormField>
        </div>

        {/* Map Picker Field */}
        <div>
          <LocationMapPicker
            selectedDistrictName={value.district}
            anchorXPct={value.anchorXPct}
            anchorYPct={value.anchorYPct}
            onLocationPick={handleLocationPickWithValidation}
          />
          {errors.map && (
            <p className="text-[12px] text-red-600 font-medium mt-1.5">{errors.map}</p>
          )}
        </div>

        {/* Short Description */}
        <FormField
          label="Short Description"
          tooltipText="Provide a brief overview (at least 20 characters) summarizing the location."
          required
          error={errors.shortDescription}
        >
          <textarea
            placeholder="A brief description about the place"
            rows={4}
            value={value.shortDescription}
            onChange={(event) => handleChange("shortDescription", event.target.value)}
            className={`w-full border rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 resize-none ${
              errors.shortDescription
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-[#1E604B] focus:border-[#1E604B]"
            }`}
          />
        </FormField>

        {/* Historical Story */}
        <FormField
          label="Historical Story"
          tooltipText="Write the detailed historical significance and background (at least 50 characters)."
          required
          error={errors.historicalStory}
        >
          <textarea
            placeholder="A detailed historical background story"
            rows={4}
            value={value.historicalStory}
            onChange={(event) => handleChange("historicalStory", event.target.value)}
            className={`w-full border rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 resize-none ${
              errors.historicalStory
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-[#1E604B] focus:border-[#1E604B]"
            }`}
          />
        </FormField>

        {/* Action Button */}
        <div className="flex justify-end pt-4 mt-auto">
          <button
            type="button"
            onClick={handleContinue}
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