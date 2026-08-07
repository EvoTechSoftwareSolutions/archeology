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

  const pinnedProvinceId = useMemo(() => {
    if (!selectedDistrict) return null;
    const found = provinces.find((p) => p.name === selectedDistrict.province);
    return found ? String(found.id) : null;
  }, [selectedDistrict]);

  const activeProvinceId = hoveredProvinceId ?? pinnedProvinceId;

  const closeDetail = () => {
    setSelectedDistrictId(null);
    setHoveredDistrictId(null);
  };

  return (
    <div className="relative mx-auto flex w-full max-w-7xl flex-row items-center justify-center gap-4 px-4 py-10 lg:gap-4">
      {/* Map column — always side-by-side, shrinks when district selected */}
      <div
        className={`flex flex-shrink-0 justify-center transition-all duration-500 ease-out ${
          selectedDistrict ? "w-[55%] sm:w-[55%] lg:w-3/5" : "w-full"
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

      {/* Detail panel — always appears to the right side */}
      {selectedDistrict && (
        <div className="w-[45%] sm:w-[45%] lg:w-2/5">
          <DistrictDetailPanel district={selectedDistrict} onClose={closeDetail} />
        </div>
      )}
    </div>
  );
};

export default DistrictHeritageExplorer;