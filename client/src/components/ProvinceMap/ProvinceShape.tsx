import type { Province } from "../../types/province";

interface Props {
  province: Province;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: (id: string) => void;
  onHoverStart: (id: string) => void;
  onHoverEnd: () => void;
}

const ProvinceShape = ({
  province,
  isSelected,
  isHovered,
  onSelect,
  onHoverStart,
  onHoverEnd,
}: Props) => {
  const fill = isSelected ? "#C1483F" : isHovered ? "#EAD9A8" : "#E0C98A";
  const words = province.name.split(" ");

  return (
    <g>
      <path
        d={province.path}
        fill={fill}
        stroke="#FFFFFF"
        strokeWidth={1.6}
        strokeLinejoin="round"
        onClick={() => onSelect(province.id)}
        onMouseEnter={() => onHoverStart(province.id)}
        onMouseLeave={onHoverEnd}
        onFocus={() => onHoverStart(province.id)}
        onBlur={onHoverEnd}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(province.id);
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`${province.name} Province`}
        aria-pressed={isSelected}
        className="cursor-pointer outline-none transition-colors duration-200 ease-out focus-visible:stroke-[#C1483F] focus-visible:stroke-[3px]"
      />

      {/* Province name, always visible on the map */}
      <text
        x={province.labelX}
        y={province.labelY}
        textAnchor="middle"
        dominantBaseline="middle"
        className="pointer-events-none select-none fill-[#3B2F1E] text-[13px] font-medium"
        style={{ paintOrder: "stroke", stroke: "#FFFFFF", strokeWidth: 3 }}
      >
        {words.map((word, i) => (
          <tspan
            key={word}
            x={province.labelX}
            dy={i === 0 ? -((words.length - 1) * 7) : 14}
          >
            {word}
          </tspan>
        ))}
      </text>
    </g>
  );
};

export default ProvinceShape;
