import type { Province } from "../../types/province";

interface Props {
  province: Province;
}

const PADDING = 14;

const ProvinceOutline = ({ province }: Props) => {
  const { x, y, width, height } = province.bbox;
  const viewBox = `${x - PADDING} ${y - PADDING} ${width + PADDING * 2} ${
    height + PADDING * 2
  }`;

  return (
    <svg
      viewBox={viewBox}
      className="h-auto w-full max-w-xs drop-shadow-[0_10px_24px_rgba(0,0,0,0.2)]"
      role="img"
      aria-label={`Outline of ${province.name} Province`}
    >
      <path
        d={province.path}
        fill="none"
        stroke="#C1483F"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ProvinceOutline;
