export interface NearbyPlaceSource {
  id: number;
  name: string;
  image?: string | null;
  districtId: number;
  anchorXPct?: number | null;
  anchorYPct?: number | null;
  district?: {
    id: number;
    name: string;
  } | null;
}

export interface NearbyPlaceResult {
  place: NearbyPlaceSource;
  distance: number;
}

const DEFAULT_RADIUS = 0.05;

export function getNearbyPlaces(
  currentPlace: NearbyPlaceSource,
  places: NearbyPlaceSource[],
  radius: number = DEFAULT_RADIUS,
): NearbyPlaceResult[] {
  if (
    currentPlace.anchorXPct == null ||
    currentPlace.anchorYPct == null ||
    currentPlace.districtId == null
  ) {
    return [];
  }

  return places
    .filter((place) => {
      // Never include the current place
      if (place.id === currentPlace.id) {
        return false;
      }

      // Must be inside the same district
      if (place.districtId !== currentPlace.districtId) {
        return false;
      }

      // Places without map coordinates cannot be calculated
      if (place.anchorXPct == null || place.anchorYPct == null) {
        return false;
      }

      const dx = place.anchorXPct - currentPlace.anchorXPct!;
      const dy = place.anchorYPct - currentPlace.anchorYPct!;

      const distance = Math.sqrt(dx * dx + dy * dy);

      return distance <= radius;
    })
    .map((place) => {
      const dx = place.anchorXPct! - currentPlace.anchorXPct!;

      const dy = place.anchorYPct! - currentPlace.anchorYPct!;

      const distance = Math.sqrt(dx * dx + dy * dy);

      return {
        place,
        distance,
      };
    })
    .sort((a, b) => a.distance - b.distance);
}
