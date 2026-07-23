import type { Province } from "../../types/province";
import ProvinceShape from "./ProvinceShape";

interface Props {
  provinces: Province[];
  selectedId: string | null;
  hoveredId: string | null;
  onSelect: (id: string) => void;
  onHoverStart: (id: string) => void;
  onHoverEnd: () => void;
}

const SriLankaProvinceMap = ({
  provinces,
  selectedId,
  hoveredId,
  onSelect,
  onHoverStart,
  onHoverEnd,
}: Props) => {
  return (
    <svg
      viewBox="0 0 800 600"
      className="h-auto w-full max-w-xl drop-shadow-[0_16px_36px_rgba(0,0,0,0.28)]"
      role="group"
      aria-label="Provinces of Sri Lanka"
    >
      {provinces.map((province) => (
        <ProvinceShape
          key={province.id}
          province={province}
          isSelected={province.id === selectedId}
          isHovered={province.id === hoveredId}
          onSelect={onSelect}
          onHoverStart={onHoverStart}
          onHoverEnd={onHoverEnd}
        />
      ))}
    </svg>
  );
};

export default SriLankaProvinceMap;
