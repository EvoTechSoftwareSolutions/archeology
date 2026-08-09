import type { Province } from "../../types/province";
import DistrictShape from "./DistrictShape";

interface Props {
  province: Province;
  isActive: boolean;

  selectedDistrictId: string | number | null;
  hoveredDistrictId: string | number | null;

  onProvinceEnter: (id: string | number) => void;
  onProvinceLeave: () => void;

  onDistrictSelect: (id: string | number) => void;
  onDistrictHoverStart: (id: string | number) => void;
  onDistrictHoverEnd: () => void;
}

const SELECTED_DISTRICT_COLOR = "#C1483F";
const SIBLING_DISTRICT_COLOR = "#D9CBB2";

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
  const hasSelectionHere =
    province.districts?.some(
      (district) =>
        String(district.id) ===
        String(selectedDistrictId)
    ) ?? false;

  const showDistricts =
    isActive || hasSelectionHere;

  return (
    <g
      data-province-id={province.id}
      data-province-name={province.name}
      className="cursor-pointer"
      onMouseEnter={() =>
        onProvinceEnter(province.id)
      }
      onMouseLeave={onProvinceLeave}
      style={{
        /**
         * IMPORTANT
         * SVG transform must use view-box coordinates.
         */
        transformBox: "view-box",

        /**
         * Scale from the province center.
         */
        transformOrigin: `${province.labelX}px ${province.labelY}px`,

        /**
         * Smooth hover scale.
         */
        transform: isActive
          ? "scale(1.4)"
          : "scale(1)",

        /**
         * Smooth enter + leave animation.
         */
        transition:
          "transform 450ms cubic-bezier(0.16, 1, 0.3, 1)",

        /**
         * Helps browser optimize the transform.
         */
        willChange: "transform",

        /**
         * Keeps this SVG group isolated.
         */
        isolation: "isolate",
      }}
    >
      {/* =========================================
          PROVINCE BACKGROUND
          ========================================= */}

      <path
        d={province.path}
        fill={
          isActive
            ? "#B8A47E"
            : "#C9B896"
        }
        stroke="#ffffff"
        strokeWidth={1.5}
        vectorEffect="non-scaling-stroke"
        style={{
          transition:
            "fill 250ms ease-in-out",
        }}
      />

      {/* =========================================
          PROVINCE NAME
          ========================================= */}

      {province.name && (
        <text
          x={province.labelX}
          y={province.labelY}
          textAnchor="middle"
          className="
            pointer-events-none
            select-none
            fill-[#3B2F1E]
            text-[13px]
            font-serif
          "
        >
          {province.name}
        </text>
      )}

      {/* =========================================
          DISTRICTS
          ========================================= */}

      <g
        style={{
          opacity: showDistricts ? 1 : 0,

          pointerEvents: showDistricts
            ? "auto"
            : "none",

          transition:
            "opacity 300ms ease-in-out",
        }}
      >
        {province.districts?.map(
          (district) => {
            const isSelected =
              String(district.id) ===
              String(selectedDistrictId);

            const isHovered =
              String(district.id) ===
              String(hoveredDistrictId);

            return (
              <DistrictShape
                key={district.id}
                district={district}
                fillColor={
                  isSelected
                    ? SELECTED_DISTRICT_COLOR
                    : SIBLING_DISTRICT_COLOR
                }
                isSelected={isSelected}
                isHovered={isHovered}
                onSelect={onDistrictSelect}
                onHoverStart={
                  onDistrictHoverStart
                }
                onHoverEnd={
                  onDistrictHoverEnd
                }
              />
            );
          }
        )}
      </g>
    </g>
  );
};

export default ProvinceShape;