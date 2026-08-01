import { useCallback, useEffect, useMemo, useState } from "react";
import { districts } from "../data/districts";
import type { District } from "../types/district";

export default function useDistrictMap() {
  const [districtData, setDistrictData] = useState<District[]>(districts);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDistrictData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/districts");
        if (!res.ok) {
          throw new Error(`Failed to load districts: ${res.status}`);
        }

        const payload = await res.json();
        const apiDistricts = payload?.data ?? [];

        const merged = districts.map((staticDistrict) => {
          const dbDistrict = apiDistricts.find(
            (item: any) => item.name === staticDistrict.name,
          );

          if (!dbDistrict) {
            return staticDistrict;
          }

          const historicalPlaces = Array.isArray(dbDistrict.historicalPlaces)
            ? dbDistrict.historicalPlaces.map((place: any) => ({
                name: place.name,
                image: place.image ?? place.imageUrl ?? "",
                description: place.description ?? "",
                anchorXPct: place.anchorXPct ?? 0.5,
                anchorYPct: place.anchorYPct ?? 0.5,
              }))
            : staticDistrict.historicalPlaces;

          return {
            ...staticDistrict,
            historicalPlaces,
          };
        });

        setDistrictData(merged);
      } catch (loadError) {
        console.error(loadError);
        setError("Unable to load district heritage metadata from the database.");
      }
    };

    void loadDistrictData();
  }, []);

  const selectedDistrict: District | null = useMemo(
    () => districtData.find((d) => d.id === selectedId) ?? null,
    [districtData, selectedId],
  );

  const selectDistrict = useCallback((id: string) => {
    setSelectedId((current) => (current === id ? null : id));
  }, []);

  const closeDetail = useCallback(() => setSelectedId(null), []);

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
