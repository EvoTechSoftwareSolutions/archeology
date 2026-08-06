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
    <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-4 py-10 lg:flex-row lg:items-center lg:gap-4">
      {/* Map column — full width until lg, then shrinks to make room
          for the detail panel once a district is selected */}
      <div
        className={`flex w-full flex-shrink-0 justify-center transition-all duration-500 ease-out ${
          selectedDistrict ? "lg:w-3/5" : "lg:w-full"
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

      {/* Detail panel — only takes up layout space once something is
          selected, so it never reserves empty space on mobile */}
      {selectedDistrict && (
        <div className="w-full lg:w-2/5">
          <DistrictDetailPanel district={selectedDistrict} onClose={closeDetail} />
        </div>
      )}
    </div>
  );
};

export default DistrictHeritageExplorer;