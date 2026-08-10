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

// Ease-out-circ: rounded, buttery deceleration with zero overshoot/bounce —
// the smoothest-feeling curve for a scale-up/scale-down transition.
const ZOOM_EASE = "cubic-bezier(0, 0.55, 0.45, 1)";
const ZOOM_IN_DURATION_MS = 200;
const ZOOM_OUT_DURATION_MS = 320;

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

  const transformDuration = isActive ? ZOOM_IN_DURATION_MS : ZOOM_OUT_DURATION_MS;

  return (
    <g
      className="cursor-pointer"
      style={{
        transformBox: "fill-box",
        transformOrigin: "center",
        // Smooth scale-up + slight lift while active; eases back to resting
        // scale a touch slower on the way out so it never feels jarring.
        transform: isActive
          ? "scale(1.08) translateX(-5px) translateY(-5px)"
          : "scale(1) translateX(0) translateY(0)",
        transition: `transform ${transformDuration}ms ${ZOOM_EASE}`,
        willChange: "transform",
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
        style={{ transition: `fill ${transformDuration}ms ease-in-out` }}
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
          transition: "opacity 200ms ease-in-out",
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