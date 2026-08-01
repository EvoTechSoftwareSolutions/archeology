import { useMemo, useState } from "react";
import { MdLocationOn } from "react-icons/md";

import { districts } from "../../data/districts";
import type { District } from "../../types/district";
import DistrictShape from "../DistrictMap/DistrictShape";

interface LocationMapPickerProps {
  selectedDistrictName: string;
  latitude: string;
  longitude: string;
  onDistrictSelect: (district: District) => void;
  onCoordinatesChange: (latitude: string, longitude: string) => void;
}

const LocationMapPicker = ({
  selectedDistrictName,
  latitude,
  longitude,
  onDistrictSelect,
  onCoordinatesChange,
}: LocationMapPickerProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const selectedDistrict = useMemo(
    () => districts.find((district) => district.name === selectedDistrictName) ?? null,
    [selectedDistrictName],
  );

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-gray-200 bg-[#f9faf8] p-4">
        <div className="mb-3 flex items-center gap-2 text-gray-700">
          <MdLocationOn size={18} className="text-[#1E604B]" />
          <span className="text-[14px] font-bold">Map Location</span>
        </div>

        <p className="mb-4 text-[13px] text-gray-500">
          Click a district on the map to sync the district and province fields.
        </p>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <svg
            viewBox="0 0 1000 1000"
            className="h-[380px] w-full max-w-full"
            role="group"
            aria-label="Sri Lanka district map"
          >
            {districts.map((district) => (
              <DistrictShape
                key={district.id}
                district={district}
                isSelected={district.name === selectedDistrictName}
                isHovered={district.id === hoveredId}
                onSelect={() => onDistrictSelect(district)}
                onHoverStart={(id) => setHoveredId(id)}
                onHoverEnd={() => setHoveredId(null)}
              />
            ))}
          </svg>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-[13px] font-bold text-gray-700">Latitude</span>
            <input
              type="number"
              step="any"
              value={latitude}
              onChange={(event) => onCoordinatesChange(event.target.value, longitude)}
              placeholder="7.8731"
              className="w-full rounded-lg border border-gray-300 p-3 text-[14px] text-gray-700 focus:border-[#1E604B] focus:outline-none focus:ring-1 focus:ring-[#1E604B]"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-[13px] font-bold text-gray-700">Longitude</span>
            <input
              type="number"
              step="any"
              value={longitude}
              onChange={(event) => onCoordinatesChange(latitude, event.target.value)}
              placeholder="80.7718"
              className="w-full rounded-lg border border-gray-300 p-3 text-[14px] text-gray-700 focus:border-[#1E604B] focus:outline-none focus:ring-1 focus:ring-[#1E604B]"
            />
          </label>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <p className="text-[13px] font-semibold uppercase tracking-wide text-gray-400">Selected area</p>
        {selectedDistrict ? (
          <div className="mt-2 space-y-1 text-[14px] text-gray-700">
            <p className="font-bold text-gray-900">{selectedDistrict.name}</p>
            <p>{selectedDistrict.province} Province</p>
            <p className="text-gray-500">Use the coordinates fields to fine-tune the exact pin location.</p>
          </div>
        ) : (
          <p className="mt-2 text-[14px] text-gray-500">
            No district selected yet. Pick one on the map to continue.
          </p>
        )}
      </div>
    </div>
  );
};

export default LocationMapPicker;