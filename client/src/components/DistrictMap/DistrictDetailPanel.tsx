import type { District } from "../../types/district";
import District3DView from "./District3DView";
import useDistrictHeritage from "../../hooks/useDistrictHeritage";

interface Props {
  district: District | null;
  onClose: () => void;
}

const DistrictDetailPanel = ({ district, onClose }: Props) => {
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
        <h2 className="font-serif text-base text-[#3B2F1E] sm:text-xl lg:text-2xl">
          {district.name} District
        </h2>
        <button
          onClick={onClose}
          className="text-xs font-medium text-[#8A7550] hover:text-[#C1483F] sm:text-sm"
        >
          ✕ Close
        </button>
      </div>

      {isLoading && (
        <p className="text-xs text-[#8A7550] sm:text-sm">Loading heritage places…</p>
      )}
      {error && <p className="text-xs text-[#C1483F] sm:text-sm">{error}</p>}
      {!isLoading && !error && places.length === 0 && (
        <p className="text-xs text-[#8A7550] sm:text-sm">
          No heritage places added for this district yet.
        </p>
      )}

      <District3DView district={district} historicalPlaces={places} />
    </div>
  );
};

export default DistrictDetailPanel;