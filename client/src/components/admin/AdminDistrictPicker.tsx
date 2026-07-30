import type { District } from "../../types/district";
import { districts } from "../../data/districts";

interface Props {
  selectedDistrictCode: string | null;
  onDistrictClick: (e: React.MouseEvent<SVGPathElement>, district: District) => void;
}

/**
 * Location-picker map for the admin form. Deliberately separate from the
 * public-facing DistrictShape/SriLankaDistrictMap — this one needs the raw
 * click event (to compute anchorXPct/anchorYPct), which the public map's
 * onSelect(id)-only interface doesn't expose.
 */
const AdminDistrictPicker = ({ selectedDistrictCode, onDistrictClick }: Props) => {
  return (
    <svg
      viewBox="0 0 1000 1000"
      className="h-[420px] w-full max-w-md border-2"
      role="group"
      aria-label="Click a district to set this place's location"
    >
      {districts
    .filter(
        (d) =>
            selectedDistrictCode === null ||
            d.id === selectedDistrictCode
    ).map((d) => (
        <path
          key={d.id}
          d={d.path}
         fill={
    d.id === selectedDistrictCode
        ? "#275949"
        : "#E5E7EB"
}
          stroke="#FFFFFF"
          strokeWidth={1.2}
          className="cursor-pointer transition-colors duration-150 hover:opacity-80"
          onClick={(e) => onDistrictClick(e, d)}
        />
      ))}
    </svg>
  );
};

export default AdminDistrictPicker;
