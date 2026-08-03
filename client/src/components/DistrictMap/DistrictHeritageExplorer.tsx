import useDistrictMap from "../../hooks/useDistrictMap";
import SriLankaDistrictMap from "./SriLankaDistrictMap";
import DistrictDetailPanel from "./DistrictDetailPanel";

const DistrictHeritageExplorer = () => {
  const {
    districts,
    selectedId,
    selectedDistrict,
    hoveredId,
    setHoveredId,
    selectDistrict,
    closeDetail,
    error,
  } = useDistrictMap();

  return (
    <div className="relative mx-auto flex w-full max-w-7xl items-center overflow-hidden px-4 py-10">
      {error && (
        <div className="absolute top-0 left-0 right-0 mx-auto mb-4 max-w-4xl rounded-xl bg-red-100 px-4 py-2 text-center text-sm text-red-700 shadow-sm">
          {error}
        </div>
      )}
      {/* Full map: bigger, w-full at rest, shrinks to the left 2/3 once a district is picked */}
      <div
        className={`flex flex-shrink-0 justify-center transition-all duration-500 ease-out ${
          selectedDistrict ? "w-3/5" : "w-full"
        }`}
      >
        <SriLankaDistrictMap
          districts={districts}
          selectedId={selectedId}
          hoveredId={hoveredId}
          onSelect={selectDistrict}
          onHoverStart={setHoveredId}
          onHoverEnd={() => setHoveredId(null)}
        />
      </div>

      {/* Detail panel: smaller, slides in from the right once a district is picked */}
      <DistrictDetailPanel district={selectedDistrict} onClose={closeDetail} />
    </div>
  );
};

export default DistrictHeritageExplorer;
