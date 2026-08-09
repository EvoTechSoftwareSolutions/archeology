import type { Province } from "../../types/province";
import ProvinceShape from "./ProvinceShape";

interface Props {
  provinces: Province[];

  activeProvinceId:
    | string
    | number
    | null;

  selectedDistrictId:
    | string
    | number
    | null;

  hoveredDistrictId:
    | string
    | number
    | null;

  onProvinceHoverStart: (
    id: string | number
  ) => void;

  onProvinceHoverEnd: () => void;

  onDistrictSelect: (
    id: string | number
  ) => void;

  onDistrictHoverStart: (
    id: string | number
  ) => void;

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
  /**
   * Find currently active / hovered province.
   */
  const activeProvince =
    provinces.find(
      (province) =>
        String(province.id) ===
        String(activeProvinceId)
    );

  /**
   * All provinces except active province.
   */
  const inactiveProvinces =
    provinces.filter(
      (province) =>
        String(province.id) !==
        String(activeProvinceId)
    );

  return (
    <div
      className="
        mx-auto
        w-full
        max-w-[560px]
        sm:max-w-[620px]
        lg:max-w-[700px]
      "
    >
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid meet"
        className="
          aspect-square
          h-auto
          w-full
          overflow-visible
          drop-shadow-[0_12px_24px_rgba(0,0,0,0.15)]
        "
        role="group"
        aria-label="Provinces and districts of Sri Lanka"
      >
        {/* =================================================
            INACTIVE PROVINCES
            ================================================= */}

        <g>
          {inactiveProvinces.map(
            (province) => (
              <ProvinceShape
                key={province.id}
                province={province}
                isActive={false}
                selectedDistrictId={
                  selectedDistrictId
                }
                hoveredDistrictId={
                  hoveredDistrictId
                }
                onProvinceEnter={
                  onProvinceHoverStart
                }
                onProvinceLeave={
                  onProvinceHoverEnd
                }
                onDistrictSelect={
                  onDistrictSelect
                }
                onDistrictHoverStart={
                  onDistrictHoverStart
                }
                onDistrictHoverEnd={
                  onDistrictHoverEnd
                }
              />
            )
          )}
        </g>

        {/* =================================================
            ACTIVE PROVINCE
           
            VERY IMPORTANT:
            This is rendered AFTER all other provinces.

            SVG does not use z-index like HTML.
            Later SVG elements are painted on top.
            ================================================= */}

        {activeProvince && (
          <g
            className="pointer-events-auto"
            style={{
              isolation: "isolate",
            }}
          >
            <ProvinceShape
              key={`active-${activeProvince.id}`}
              province={activeProvince}
              isActive={true}
              selectedDistrictId={
                selectedDistrictId
              }
              hoveredDistrictId={
                hoveredDistrictId
              }
              onProvinceEnter={
                onProvinceHoverStart
              }
              onProvinceLeave={
                onProvinceHoverEnd
              }
              onDistrictSelect={
                onDistrictSelect
              }
              onDistrictHoverStart={
                onDistrictHoverStart
              }
              onDistrictHoverEnd={
                onDistrictHoverEnd
              }
            />
          </g>
        )}
      </svg>
    </div>
  );
};

export default SriLankaProvinceMap;