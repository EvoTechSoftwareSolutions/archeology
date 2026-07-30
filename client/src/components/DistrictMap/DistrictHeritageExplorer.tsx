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
  } = useDistrictMap();

  return (
    <div className="mx-auto flex w-full max-w-7xl items-center overflow-hidden px-20 py-1">
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
