import type { District } from "../../types/district";

interface Props {
  district: District;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: (id: string) => void;
  onHoverStart: (id: string) => void;
  onHoverEnd: () => void;
}

const DistrictShape = ({
  district,
  isSelected,
  isHovered,
  onSelect,
  onHoverStart,
  onHoverEnd,
}: Props) => {
  const stroke = isSelected ? "#D92D20" : isHovered ? "#3B2F1E" : "#FFFFFF";
  const strokeWidth = isSelected ? 2.6 : isHovered ? 2 : 1.1;
  const words = district.name.split(" ");

  return (
    <g>
      <path
        d={district.path}
        fill={district.color}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        style={{ filter: isHovered ? "brightness(1.12)" : "none" }}
        onClick={() => onSelect(district.id)}
        onMouseEnter={() => onHoverStart(district.id)}
        onMouseLeave={onHoverEnd}
        onFocus={() => onHoverStart(district.id)}
        onBlur={onHoverEnd}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(district.id);
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`${district.name} District`}
        aria-pressed={isSelected}
        className="cursor-pointer outline-none transition-all duration-200 ease-out focus-visible:stroke-[#D92D20] focus-visible:stroke-[3px]"
      />

      {/* District name, always visible on the map */}
      <text
        x={district.labelX}
        y={district.labelY}
        textAnchor="middle"
        dominantBaseline="middle"
        className="pointer-events-none select-none fill-[#2B2118] text-[14px] font-semibold"
        style={{ paintOrder: "stroke", stroke: "#FFFFFF", strokeWidth: 0.5 }}
      >
        {words.map((word, i) => (
          <tspan key={word} x={district.labelX} dy={i === 0 ? -((words.length - 1) * 5) : 10}>
            {word}
          </tspan>
        ))}
      </text>
    </g>
  );
};

export default DistrictShape;