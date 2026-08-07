import type { Province } from "../../types/province";
import DistrictShape from "./DistrictShape";

interface Props {
  province: Province;
  isActive: boolean; // hovered OR pinned by a selection inside it
  selectedDistrictId: string | number | null;
  hoveredDistrictId: string | number | null;
  onProvinceEnter: (id: string | number) => void;
  onProvinceLeave: () => void;
  onDistrictSelect: (id: string | number) => void;
  onDistrictHoverStart: (id: string | number) => void;
  onDistrictHoverEnd: () => void;
}

const SELECTED_DISTRICT_COLOR = "#C1483F"; // accent — the clicked district
const SIBLING_DISTRICT_COLOR = "#D9CBB2"; // everyone else in this province

const ProvinceShape = ({
  province,
  isActive,
  selectedDistrictId,
  hoveredDistrictId,
  onProvinceEnter,
  onProvinceLeave,
  onDistrictSelect,
  onDistrictHoverStart,
  onDistrictHoverEnd,
}: Props) => {
  const hasSelectionHere = province.districts?.some(
    (d) => String(d.id) === String(selectedDistrictId),
  );

  return (
    <g
      className="cursor-pointer"
      style={{
        transformOrigin: `${province.labelX}px ${province.labelY}px`,
        // card-hover pop: scales up while active, settles back when not
        transform: isActive ? "scale(1.05)" : "scale(1)",
        transition: "transform 300ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      onMouseEnter={() => onProvinceEnter(province.id)}
      onMouseLeave={onProvinceLeave}
    >
      {/* Province background — color reacts to isActive, not raw hover,
          so it stays lit while a district inside it is selected */}
      <path
        d={province.path}
        stroke="#ffffff"
        strokeWidth={1.5}
        vectorEffect="non-scaling-stroke"
        fill={isActive ? "#B8A47E" : "#C9B896"}
        style={{ transition: "fill 200ms ease-in-out" }}
      />

      {province.name && (
        <text
          x={province.labelX}
          y={province.labelY}
          textAnchor="middle"
          className="pointer-events-none select-none fill-[#3B2F1E] text-[13px] font-serif"
        >
          {province.name}
        </text>
      )}

      {/* Districts show while active OR while one of them is pinned
          selected — covers "clicked, then mouse moved away" */}
      <g
        style={{
          opacity: isActive || hasSelectionHere ? 1 : 0,
          pointerEvents: isActive || hasSelectionHere ? "auto" : "none",
          transition: "opacity 250ms ease-in-out",
        }}
      >
        {province.districts?.map((district) => {
          const isSelected = String(district.id) === String(selectedDistrictId);
          return (
            <DistrictShape
              key={district.id}
              district={district}
              fillColor={isSelected ? SELECTED_DISTRICT_COLOR : SIBLING_DISTRICT_COLOR}
              isSelected={isSelected}
              isHovered={String(district.id) === String(hoveredDistrictId)}
              onSelect={onDistrictSelect}
              onHoverStart={onDistrictHoverStart}
              onHoverEnd={onDistrictHoverEnd}
            />
          );
        })}
      </g>
    </g>
  );
};

export default ProvinceShape;