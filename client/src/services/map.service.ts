import { historicalPlaceApi } from "../api/historicalPlace.api";
import { districts } from "../data/districts";
import { provinces as staticProvinces } from "../data/provinces";
import type { Province } from "../data/provinces";

const normalizeAnchor = (val: number) => (val > 1 ? val / 100 : val);

/**
 * Fetches all historical places from the API and merges them into a deep
 * clone of the static province/district shapes. Returns Province[] so that
 * the map always shows the latest data from the database.
 */
export async function getMapProvinces(): Promise<Province[]> {
  const res = await historicalPlaceApi.getAll();
  const payload = res.data?.data;
  const places: any[] = Array.isArray(payload) ? payload : payload?.items ?? [];

  // Deep-clone provinces so we never mutate the static module singleton.
  const merged: Province[] = staticProvinces.map((province) => ({
    ...province,
    districts: province.districts.map((district) => ({
      ...district,
      historicalPlaces: places
        .filter(
          (p) =>
            p.districtId === district.id ||
            (p.district?.name ?? "").toLowerCase() === district.name.toLowerCase()
        )
        .map((p) => ({
          id: p.id,
          name: p.name,
          image: p.image ?? "",
          description: p.description,
          latitude: p.latitude,
          longitude: p.longitude,
          anchorXPct: normalizeAnchor(p.anchorXPct),
          anchorYPct: normalizeAnchor(p.anchorYPct),
        })),
    })),
  }));

  return merged;
}

/**
 * @deprecated Use getMapProvinces() instead.
 * Kept for backward compatibility with any existing callers.
 */
export async function getMapDistricts() {
  const districtShapes = [...districts];

  const res = await historicalPlaceApi.getAll();
  const payload = res.data?.data;
  const rawPlaces = Array.isArray(payload) ? payload : payload?.items ?? [];

  for (const district of districtShapes) {
    district.historicalPlaces = rawPlaces
      .filter(
        (p: any) =>
          (p.district?.name ?? "").toLowerCase() === district.name.toLowerCase()
      )
      .map((p: any) => ({
        id: p.id,
        name: p.name,
        image: p.image,
        description: p.description,
        anchorXPct: normalizeAnchor(p.anchorXPct),
        anchorYPct: normalizeAnchor(p.anchorYPct),
      }));
  }

  return districtShapes;
}
