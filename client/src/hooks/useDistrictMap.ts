import { useCallback, useMemo, useState } from "react";
import { districts } from "../data/districts";
import type { District } from "../types/district";

export default function useDistrictMap() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const selectedDistrict: District | null = useMemo(
    () => districts.find((d) => d.id === selectedId) ?? null,
    [selectedId]
  );

  const selectDistrict = useCallback((id: string) => {
    setSelectedId((current) => (current === id ? null : id));
  }, []);

  const closeDetail = useCallback(() => setSelectedId(null), []);

  return {
    districts,
    selectedId,
    selectedDistrict,
    hoveredId,
    setHoveredId,
    selectDistrict,
    closeDetail,
  };
}
