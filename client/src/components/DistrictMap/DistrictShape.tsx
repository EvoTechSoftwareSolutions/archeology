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
  const words = district.name.split(" ");

  const stroke = isSelected
    ? "#D92D20"
    : isHovered
    ? "#3B2F1E"
    : "#FFFFFF";

  const strokeWidth = isSelected
    ? 3
    : isHovered
    ? 2
    : 1.1;

  return (
    <g>
      <path
        d={district.path}
        fill={district.color}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        style={{
          filter: isHovered
            ? "brightness(1.18) drop-shadow(0 0 8px rgba(255,255,255,0.7))"
            : isSelected
            ? "brightness(1.08)"
            : "none",
          transition: "all .25s ease",
        }}
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
        className="cursor-pointer outline-none transition-all duration-200"
      />

      <text
        x={district.labelX}
        y={district.labelY}
        textAnchor="middle"
        dominantBaseline="middle"
        className="pointer-events-none select-none transition-all duration-200"
        style={{
          fill: isSelected ? "#FFFFFF" : "#2B2118",
          fontWeight: isSelected ? 800 : isHovered ? 700 : 600,
          fontSize: isSelected ? "15px" : "14px",
          paintOrder: "stroke",
          stroke: isSelected ? "#2B2118" : "#FFFFFF",
          strokeWidth: isSelected ? 1.8 : 0.6,
        }}
      >
        {words.map((word, i) => (
          <tspan
            key={word}
            x={district.labelX}
            dy={i === 0 ? -((words.length - 1) * 5) : 10}
          >
            {word}
          </tspan>
        ))}
      </text>
    </g>
  );
};

export default DistrictShape;