import type { Province } from "../../types/province";
import ProvinceShape from "./ProvinceShape";

interface Props {
  provinces: Province[];
  activeProvinceId: string | number | null;
  selectedDistrictId: string | number | null;
  hoveredDistrictId: string | number | null;
  onProvinceHoverStart: (id: string | number) => void;
  onProvinceHoverEnd: () => void;
  onDistrictSelect: (id: string | number) => void;
  onDistrictHoverStart: (id: string | number) => void;
  onDistrictHoverEnd: () => void;
}

const SriLankaProvinceMap = ({
  provinces,
  activeProvinceId,
  selectedDistrictId,
  hoveredDistrictId,
  onProvinceHoverStart,
  onProvinceHoverEnd,
  onDistrictSelect,
  onDistrictHoverStart,
  onDistrictHoverEnd,
}: Props) => {
  return (
    // aspect-square + a max-width keeps the map's proportions correct at
    // any viewport instead of fighting a fixed pixel height
    <div className="mx-auto w-full max-w-[560px] sm:max-w-[620px] lg:max-w-[700px]">
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid meet"
        className="aspect-square h-auto w-full overflow-visible drop-shadow-[0_12px_24px_rgba(0,0,0,0.15)]"
        role="group"
        aria-label="Provinces and districts of Sri Lanka"
      >
        {provinces.map((province) => (
          <ProvinceShape
            key={province.id}
            province={province}
            isActive={String(province.id) === String(activeProvinceId)}
            selectedDistrictId={selectedDistrictId}
            hoveredDistrictId={hoveredDistrictId}
            onProvinceEnter={onProvinceHoverStart}
            onProvinceLeave={onProvinceHoverEnd}
            onDistrictSelect={onDistrictSelect}
            onDistrictHoverStart={onDistrictHoverStart}
            onDistrictHoverEnd={onDistrictHoverEnd}
          />
        ))}
      </svg>
    </div>
  );
};

export default SriLankaProvinceMap;