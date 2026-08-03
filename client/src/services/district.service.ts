import { districtApi } from "../api/district.api";
import type { DistrictHeritageApiResponse } from "../types/districtHeritage.types";
import type { HistoricalPlace } from "../types/district";

/**
 * Fetches a district by id and returns just its heritage places, already
 * scoped server-side (no client-side filtering, no risk of getting places
 * from other districts back).
 */
export async function getDistrictHeritagePlaces(districtId: number): Promise<HistoricalPlace[]> {
  const response = await districtApi.getById(districtId);
  const payload = response.data as DistrictHeritageApiResponse;
  const places = payload.data?.historicalPlaces ?? [];

  return places.map((place) => ({
    id: place.id,
    name: place.name,
    image: place.image ?? "",
    description: place.description,
    latitude: place.latitude,
    longitude: place.longitude,
    // 0–100 in the DB -> 0–1 fraction for the marker math
    anchorXPct: place.anchorXPct / 100,
    anchorYPct: place.anchorYPct / 100,
  }));
}
