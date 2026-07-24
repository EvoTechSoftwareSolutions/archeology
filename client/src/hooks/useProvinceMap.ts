import { useCallback, useMemo, useState } from "react";
import { provinces } from "../data/provinces";
import type { Province } from "../types/province";

export default function useProvinceMap() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const selectedProvince: Province | null = useMemo(
    () => provinces.find((p) => p.id === selectedId) ?? null,
    [selectedId]
  );

  const selectProvince = useCallback((id: string) => {
    setSelectedId((current) => (current === id ? null : id));
  }, []);

  const closeDetail = useCallback(() => setSelectedId(null), []);

  return {
    provinces,
    selectedId,
    selectedProvince,
    hoveredId,
    setHoveredId,
    selectProvince,
    closeDetail,
  };
}
