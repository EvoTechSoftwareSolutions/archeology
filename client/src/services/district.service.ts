import { districtApi } from "../api/district.api";
import type { DistrictHeritageApiResponse } from "../types/districtHeritage.types";
import type { HistoricalPlace } from "../types/district";

/**
 * Fetches a district by id and returns just its heritage places, already
 * scoped server-side (no client-side filtering, no risk of getting places
 * from other districts back).
 */
const normalizeAnchor = (val: number) => (val > 1 ? val / 100 : val);

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
    anchorXPct: normalizeAnchor(place.anchorXPct),
    anchorYPct: normalizeAnchor(place.anchorYPct),
  }));
}

