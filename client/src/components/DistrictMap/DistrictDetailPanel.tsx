import type { District } from "../../types/district";
import District3DView from "./District3DView";
import useDistrictHeritage from "../../hooks/useDistrictHeritage";

interface Props {
  district: District | null;
  onClose: () => void;
}

const DistrictDetailPanel = ({ district, onClose }: Props) => {
  const { places, isLoading, error } = useDistrictHeritage(district?.id ?? null);

  return (
    <div
      className={`flex w-[400px] flex-shrink-0 flex-col items-center gap-3 px-2 transition-all duration-500 ease-out ${
        district
          ? "translate-x-0 opacity-100"
          : "pointer-events-none translate-x-10 opacity-0"
      }`}
    >
      {district && (
        <>
          <div className="flex w-full items-center justify-between">
            <h2 className="font-serif text-2xl text-[#3B2F1E]">
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
        </>
      )}
    </div>
  );
};

export default DistrictDetailPanel;
