import type { District } from "../../types/district";
import District3DView from "./District3DView";
import useDistrictHeritage from "../../hooks/useDistrictHeritage";

interface Props {
  district: District | null;
  onClose: () => void;
}

const DistrictDetailPanel = ({ district, onClose }: Props) => {
  // Convert district.id to string to match hook parameter type
  const districtId = district?.id != null ? String(district.id) : null;
  const { places, isLoading, error } = useDistrictHeritage(districtId);

  if (!district) return null;

  return (
    <div
      className="flex w-full flex-col items-center gap-3 px-2
        animate-[panelIn_0.4s_ease-out]
        lg:max-w-[400px]"
    >
      <div className="flex w-full items-center justify-between">
        <h2 className="font-serif text-xl text-[#3B2F1E] sm:text-2xl">
          {district.name} District
        </h2>
        <button
          onClick={onClose}
          className="text-sm font-medium text-[#8A7550] hover:text-[#C1483F]"
        >
          ✕ Close
        </button>
      </div>

      {isLoading && (
        <p className="text-sm text-[#8A7550]">Loading heritage places…</p>
      )}
      {error && <p className="text-sm text-[#C1483F]">{error}</p>}
      {!isLoading && !error && places.length === 0 && (
        <p className="text-sm text-[#8A7550]">
          No heritage places added for this district yet.
        </p>
      )}

      <District3DView district={district} historicalPlaces={places} />
    </div>
  );
};

export default DistrictDetailPanel;