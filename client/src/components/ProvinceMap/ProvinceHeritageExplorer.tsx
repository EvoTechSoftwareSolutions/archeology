import useProvinceMap from "../../hooks/useProvinceMap";
import SriLankaProvinceMap from "./SriLankaProvinceMap";
import ProvinceDetailPanel from "./ProvinceDetailPanel";

const ProvinceHeritageExplorer = () => {
  const {
    provinces,
    selectedId,
    selectedProvince,
    hoveredId,
    setHoveredId,
    selectProvince,
    closeDetail,
  } = useProvinceMap();

  return (
    <div className="mx-auto flex w-full max-w-6xl items-start overflow-hidden px-1 py-0">
      {/* Full map: w-full and centered at rest, shrinks to the left half once a province is picked */}
      <div
        className={`flex flex-shrink-0 justify-center transition-all duration-500 ease-out ${
          selectedProvince ? "w-1/2" : "w-full"
        }`}
      >
        <SriLankaProvinceMap
          provinces={provinces}
          selectedId={selectedId}
          hoveredId={hoveredId}
          onSelect={selectProvince}
          onHoverStart={setHoveredId}
          onHoverEnd={() => setHoveredId(null)}
        />
      </div>

      {/* Detail panel: slides in from the right once a province is picked */}
      <ProvinceDetailPanel province={selectedProvince} onClose={closeDetail} />
    </div>
  );
};

export default ProvinceHeritageExplorer;
