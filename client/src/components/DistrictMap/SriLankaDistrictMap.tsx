import type { District } from "../../types/district";
import DistrictShape from "./DistrictShape";

interface Props {
  districts: District[];
  selectedId: string | null;
  hoveredId: string | null;
  onSelect: (id: string) => void;
  onHoverStart: (id: string) => void;
  onHoverEnd: () => void;
}

const SriLankaDistrictMap = ({
  districts,
  selectedId,
  hoveredId,
  onSelect,
  onHoverStart,
  onHoverEnd,
}: Props) => {
  return (
    <svg
      viewBox="0 0 1000 1000"
      className="h-[600px] w-auto max-w-full drop-shadow-[0_16px_36px_rgba(0,0,0,0.28)]"
      role="group"
      aria-label="Districts of Sri Lanka"
    >
      {districts.map((district) => (
        <DistrictShape
          key={district.id}
          district={district}
          isSelected={district.id === selectedId}
          isHovered={district.id === hoveredId}
          onSelect={onSelect}
          onHoverStart={onHoverStart}
          onHoverEnd={onHoverEnd}
        />
      ))}
    </svg>
  );
};

export default SriLankaDistrictMap;
