import { useCallback, useEffect, useMemo, useState } from "react";
import type { District } from "../types/district";
import { districtApi } from "../api/district.api";
import { districts } from "../data/districts";

export default function useDistrictMap() {
  const [districtData, setDistrictData] = useState<District[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDistrictData() {
      try {
        setError(null);

        const response = await districtApi.getAll();
        const apiDistricts = response.data.data ?? [];

        const merged = districts.map((staticDistrict) => {
          const dbDistrict = apiDistricts.find(
            (item: any) =>
              item.name.toLowerCase() === staticDistrict.name.toLowerCase(),
          );

          if (!dbDistrict) {
            return staticDistrict;
          }

          const normalizeAnchor = (val: number) => (val > 1 ? val / 100 : val);

          return {
            ...staticDistrict,
            dbId: dbDistrict.id,
            historicalPlaces: (dbDistrict.historicalPlaces ?? []).map(
              (place: any) => ({
                id: place.id,
                name: place.name,
                image: place.image ?? "",
                description: place.description ?? "",
                latitude: place.latitude,
                longitude: place.longitude,
                anchorXPct: normalizeAnchor(place.anchorXPct),
                anchorYPct: normalizeAnchor(place.anchorYPct),
              }),
            ),
          };
        });


        setDistrictData(merged);
      } catch (error) {
        console.error("Failed to load districts", error);
        setError("Failed to load district data");
      }
    }

    loadDistrictData();
  }, []);

  const selectedDistrict = useMemo(
    () => districtData.find((district) => district.id === selectedId) ?? null,
    [districtData, selectedId],
  );

  const selectDistrict = useCallback((id: string) => {
    setSelectedId((current) => (current === id ? null : id));
  }, []);

  const closeDetail = useCallback(() => {
    setSelectedId(null);
  }, []);

  return {
    districts: districtData,
    selectedId,
    selectedDistrict,
    hoveredId,
    setHoveredId,
    selectDistrict,
    closeDetail,
    error, 
  };
}
