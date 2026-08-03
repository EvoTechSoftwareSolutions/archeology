import { useMemo } from "react";
import { MdArrowRightAlt } from "react-icons/md";
import LocationMapPicker from "./LocationMapPicker";
import { useProvince } from "../../hooks/useProvince";
import { useDistrictsByProvince } from "../../hooks/useDistrictsByProvince";
import { useCategories } from "../../hooks/useCategories";

interface BasicInformationFormProps {
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
  /** Real DB ids — this is what actually gets sent to the backend */
  onProvinceIdChange: (id: number | null) => void;
  onDistrictIdChange: (id: number | null) => void;
  /**
   * Still fired on each map click — latitude/longitude are computed and
   * sent to the backend, just no longer shown/edited as visible fields.
   */
  onLocationPick: (latitude: string, longitude: string, anchorXPct: string, anchorYPct: string) => void;
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

  const selectedProvinceId = useMemo(
    () => provinces.find((p) => p.name === value.province)?.id ?? null,
    [provinces, value.province],
  );

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
    onProvinceIdChange(match?.id ?? null);
  };

  const handleDistrictChange = (districtName: string) => {
    onChange("district", districtName);
    const match = districtsForProvince.find((d) => d.name === districtName);
    onDistrictIdChange(match?.id ?? null);
  };

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

        {/* Category */}
        <div>
          <label className="block text-[14px] font-bold text-gray-800 mb-2">Category</label>
          <div className="relative">
            <select
              value={value.category}
              onChange={(event) => onChange("category", event.target.value)}
              disabled={categoriesLoading}
              className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B] bg-white appearance-none disabled:opacity-60"
            >
              <option value="">{categoriesLoading ? "Loading categories..." : "Select a category"}</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        {/* Province / District / Era */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-[14px] font-bold text-gray-800 mb-2">Province</label>
            <div className="relative">
              <select
                value={value.province}
                onChange={(event) => handleProvinceChange(event.target.value)}
                disabled={provincesLoading}
                className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B] bg-white appearance-none disabled:opacity-60"
              >
                <option value="">{provincesLoading ? "Loading provinces..." : "Select a province"}</option>
                {provinces.map((p) => (
                  <option key={p.id} value={p.name}>{p.name} Province</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
            {provincesError && <p className="text-[12px] text-red-600 mt-1">{provincesError}</p>}
          </div>

          <div>
            <label className="block text-[14px] font-bold text-gray-800 mb-2">District</label>
            <div className="relative">
              <select
                value={value.district}
                onChange={(event) => handleDistrictChange(event.target.value)}
                disabled={value.province ? districtsLoading : true}
                className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#1E604B] bg-white appearance-none disabled:opacity-60"
              >
                <option value="">
                  {!value.province ? "Select a province first" : districtsLoading ? "Loading districts..." : "Select a district"}
                </option>
                {districtsForProvince.map((d) => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
            {value.province && districtsError && (
              <p className="text-[12px] text-red-600 mt-1">{districtsError}</p>
            )}
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

        {/* Map picker — this is the only source of anchorXPct/anchorYPct now.
            Latitude/longitude are still computed on click and handed to
            onLocationPick, just no longer shown as separate inputs. */}
        <LocationMapPicker
          selectedDistrictName={value.district}
          anchorXPct={value.anchorXPct}
          anchorYPct={value.anchorYPct}
          onLocationPick={onLocationPick}
        />

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
