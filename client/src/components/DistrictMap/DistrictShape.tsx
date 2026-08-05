import type { District } from "../../types/district";

interface Props {
  district: District;
  fillColor: string;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: (id: string | number) => void;
  onHoverStart: (id: string | number) => void;
  onHoverEnd: () => void;
}

const DistrictShape = ({
  district,
  fillColor,
  isSelected,
  isHovered,
  onSelect,
  onHoverStart,
  onHoverEnd,
}: Props) => {
  return (
    <g
      onMouseEnter={() => onHoverStart(district.id)}
      onMouseLeave={onHoverEnd}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(district.id);
      }}
      className="cursor-pointer"
    >
      <path
        d={district.path}
        fill={fillColor}
        stroke={isSelected ? "#7A2A22" : "#ffffff"}
        strokeWidth={isSelected ? 2 : 1}
        vectorEffect="non-scaling-stroke"
        opacity={isSelected ? 1 : isHovered ? 0.95 : 0.85}
        className="transition-opacity duration-200 ease-in-out"
      />
      <text
        x={district.labelX}
        y={district.labelY}
        textAnchor="middle"
        // name color follows the two-tone split too: selected district's
        // label pops white-on-accent, siblings get a muted dark label
        className={`pointer-events-none select-none text-[10px] font-medium drop-shadow-sm ${
          isSelected ? "fill-white" : "fill-[#3B2F1E]"
        }`}
      >
        {district.name}
      </text>
    </g>
  );
};

export default DistrictShape;