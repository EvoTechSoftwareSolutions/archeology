import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import useHistoricalPlaceForm from "../../hooks/useHistoricalPlaceForm";
import useDistrictMapPicker from "../../hooks/useDistrictMapPicker";
import AdminDistrictPicker from "../../components/admin/AdminDistrictPicker";
import { districtApiIds } from "../../data/districtapiids";
import { districts } from "../../data/districts";

const CATEGORIES = ["Temple", "Fort", "Ancient City", "Statue", "Museum", "Natural Site", "Other"];
const STATUS_OPTIONS = ["Protected", "Unprotected", "UNDER_RESTORATION"];

const AddHistoricalPlace = () => {
  const { form, updateField, setLocation, errors, isSubmitting, submitError, submit } =
    useHistoricalPlaceForm(); // no id passed = create mode

  const { handleDistrictClick } = useDistrictMapPicker(setLocation);

  const selectedDistrict =
  districts.find(
    (d) => districtApiIds[d.id] === form.districtId
  ) ?? null;

const selectedDistrictCode = selectedDistrict?.id ?? null;

 const onMapClick = (
    e: React.MouseEvent<SVGPathElement>,
    district: (typeof districts)[number]
) => {

    if (!form.districtId) {
        alert("Please select a district first.");
        return;
    }

    const apiId = districtApiIds[district.id];

    handleDistrictClick(e, district, apiId);
};


  return (
    <div className="font-['Inter'] pb-10">
      <div className="text-sm text-gray-500 mb-4">
        <Link to="/admin" className="hover:text-gray-900">Home</Link> &gt;{" "}
        <Link to="/admin/historical-places" className="hover:text-gray-900">Historical places</Link> &gt; Add new
      </div>

      <div className="flex items-center gap-3 mb-8">
        <Link to="/admin/add-place" className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
          <FiArrowLeft size={18} />
        </Link>
        <h1 className="text-3xl font-['Playfair_Display'] font-bold text-gray-900">
          Add Historical Place
        </h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Left: fields */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#275949]/20 focus:border-[#275949] outline-none text-sm text-gray-800"
              placeholder="e.g. Koneswaram Temple"
            />
            {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
          </div>
        <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    District
  </label>

  <select
    value={form.districtId}
    onChange={(e) => updateField("districtId", Number(e.target.value))}
    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
  >
    <option value={0}>Select District</option>

    {districts.map((district) => (
      <option
        key={district.id}
        value={districtApiIds[district.id]}
      >
        {district.name}
      </option>
    ))}
  </select>

  {errors.districtId && (
    <p className="text-xs text-red-600 mt-1">
      {errors.districtId}
    </p>
  )}
</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#275949]/20 focus:border-[#275949] outline-none text-sm text-gray-800 appearance-none cursor-pointer"
              >
                <option value="">Select…</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.category && <p className="text-xs text-red-600 mt-1">{errors.category}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Century</label>
              <input
                type="text"
                value={form.century}
                onChange={(e) => updateField("century", e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#275949]/20 focus:border-[#275949] outline-none text-sm text-gray-800"
                placeholder="e.g. 17th Century"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#275949]/20 focus:border-[#275949] outline-none text-sm text-gray-800"
              placeholder="A short description of this place's history and significance"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
            <input
              type="text"
              value={form.image}
              onChange={(e) => updateField("image", e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#275949]/20 focus:border-[#275949] outline-none text-sm text-gray-800"
              placeholder="https://…"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={form.statusFlag}
              onChange={(e) => updateField("statusFlag", e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#275949]/20 focus:border-[#275949] outline-none text-sm text-gray-800 appearance-none cursor-pointer"
            >
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {submitError && <p className="text-sm text-red-600">{submitError}</p>}

          <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
            <Link
              to="/admin/historical-places"
              className="px-5 py-2.5 rounded-xl text-gray-600 font-medium hover:bg-gray-100 transition-colors text-sm"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-[#275949] hover:bg-[#1E4538] text-white font-medium shadow-sm transition-colors text-sm disabled:opacity-50"
            >
              {isSubmitting ? "Saving…" : "Add Place"}
            </button>
          </div>
        </div>

        {/* Right: location picker */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <p className="text-xs text-gray-500 mb-4">
            Click the exact spot on the district where this place is located.
            {selectedDistrict
    ? `Click anywhere inside ${selectedDistrict.name} to set the location.`
    : "Select a district first, then click on the map."}
          </p>

        <AdminDistrictPicker
    selectedDistrictCode={selectedDistrictCode}
    onDistrictClick={onMapClick}
/>
          {errors.districtId && <p className="text-xs text-red-600 mt-2">{errors.districtId}</p>}

          <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-600">
            <div><span className="text-gray-400">District</span><p className="font-semibold">{selectedDistrictCode ?? "—"}</p></div>
            <div><span className="text-gray-400">Status</span><p className="font-semibold">{form.districtId ? "Set" : "Not set"}</p></div>
            <div><span className="text-gray-400">Latitude</span><p className="font-semibold">{form.latitude || "—"}</p></div>
            <div><span className="text-gray-400">Longitude</span><p className="font-semibold">{form.longitude || "—"}</p></div>
            <div><span className="text-gray-400">anchorXPct</span><p className="font-semibold">{form.anchorXPct}</p></div>
            <div><span className="text-gray-400">anchorYPct</span><p className="font-semibold">{form.anchorYPct}</p></div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddHistoricalPlace;
