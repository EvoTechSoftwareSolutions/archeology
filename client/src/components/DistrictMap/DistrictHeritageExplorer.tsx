import { useMemo, useState } from "react";
import { provinces } from "../../data/provinces";
import type { District } from "../../types/district";
import SriLankaProvinceMap from "./SriLankaProvinceMap";
import DistrictDetailPanel from "./DistrictDetailPanel";

const DistrictHeritageExplorer = () => {
  const [hoveredProvinceId, setHoveredProvinceId] = useState<string | null>(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>(null);
  const [hoveredDistrictId, setHoveredDistrictId] = useState<string | null>(null);

  const allDistricts: District[] = useMemo(
    () => provinces.flatMap((p) => p.districts ?? []),
    [],
  );

  const selectedDistrict = useMemo(
    () => allDistricts.find((d) => String(d.id) === selectedDistrictId) ?? null,
    [allDistricts, selectedDistrictId],
  );

  // The province that owns the currently selected district stays "pinned"
  // open/highlighted even after the mouse leaves it.
  const pinnedProvinceId = useMemo(() => {
    if (!selectedDistrict) return null;
    const found = provinces.find((p) => p.name === selectedDistrict.province);
    return found ? String(found.id) : null;
  }, [selectedDistrict]);

  // What the map should visually treat as "active" right now: whatever's
  // under the mouse wins, otherwise fall back to the pinned selection.
  const activeProvinceId = hoveredProvinceId ?? pinnedProvinceId;

  const closeDetail = () => {
    setSelectedDistrictId(null);
    setHoveredDistrictId(null);
  };

  return (
    <div className="relative mx-auto flex w-full max-w-7xl items-center overflow-hidden px-4 py-10">
      <div
        className={`flex flex-shrink-0 justify-center transition-all duration-500 ease-out ${
          selectedDistrict ? "w-3/5" : "w-full"
        }`}
      >
        <SriLankaProvinceMap
          provinces={provinces}
          activeProvinceId={activeProvinceId}
          selectedDistrictId={selectedDistrictId}
          hoveredDistrictId={hoveredDistrictId}
          onProvinceHoverStart={(id) => setHoveredProvinceId(String(id))}
          onProvinceHoverEnd={() => setHoveredProvinceId(null)}
          onDistrictSelect={(id) =>
            setSelectedDistrictId((prev) =>
              prev === String(id) ? null : String(id),
            )
          }
          onDistrictHoverStart={(id) => setHoveredDistrictId(String(id))}
          onDistrictHoverEnd={() => setHoveredDistrictId(null)}
        />
      </div>

      <DistrictDetailPanel district={selectedDistrict} onClose={closeDetail} />
    </div>
  );
};

export default DistrictHeritageExplorer;