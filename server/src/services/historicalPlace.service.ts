import { historicalPlaceRepository } from "../repositories/historicalPlace.repository.js";
import { ApiError } from "../utils/ApiError.js";

export const historicalPlaceService = {
  async createPlace(data: any) {
    const existingPlace = await historicalPlaceRepository.getByName(
      data.name,
    );

    if (existingPlace) {
      throw new ApiError(409, "Historical place already exists");
    }

    return historicalPlaceRepository.create(data);
  },

  async getAllPlaces(params?: {
    search?: string;
    districtId?: number;
    provinceId?: number;
    category?: string;
    statusFlag?: string;
  }) {
    return historicalPlaceRepository.getAll(params);
  },

  async getActivePlaces(params?: {
    search?: string;
    districtId?: number;
    provinceId?: number;
    category?: string;
    statusFlag?: string;
  }) {
    return historicalPlaceRepository.getActiveAll(params);
  },

  /**
   * Get nearby historical places based on anchor coordinates.
   *
   * Rules:
   * 1. Only places from the same district are considered.
   * 2. The current place itself is excluded.
   * 3. Only active places are considered.
   * 4. Places without anchor coordinates are excluded.
   * 5. Distance is calculated using anchorXPct and anchorYPct.
   * 6. Results are sorted from nearest to farthest.
   * 7. Maximum 5 nearby places are returned.
   */
  async getNearbyPlaces(
    currentPlaceId: number,
    districtId: number,
    anchorXPct: number,
    anchorYPct: number,
  ) {
    // Maximum coordinate distance from the selected place.
    //
    // If you want ±0.50 coordinate range, use 0.50.
    const RADIUS = 0.30;

    const places = await historicalPlaceRepository.getNearbyPlaces(
      districtId,
      currentPlaceId,
    );

    const nearbyPlaces = places
      .map((place) => {
        if (
          place.anchorXPct === null ||
          place.anchorYPct === null
        ) {
          return null;
        }

        const dx = place.anchorXPct - anchorXPct;
        const dy = place.anchorYPct - anchorYPct;

        const distance = Math.sqrt(dx * dx + dy * dy);

        return {
          ...place,
          distance,
        };
      })
      .filter(
        (place): place is NonNullable<typeof place> =>
          place !== null,
      )
      .filter((place) => place.distance <= RADIUS)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);

    return nearbyPlaces;
  },

  async getPlaceById(idOrSlug: number | string) {
    let place = null;

    const numericId = Number(idOrSlug);

    if (Number.isInteger(numericId) && numericId > 0) {
      place = await historicalPlaceRepository.getById(numericId);
    }

    if (!place && typeof idOrSlug === "string") {
      place = await historicalPlaceRepository.getBySlugOrName(
        idOrSlug,
      );
    }

    if (!place) {
      throw new ApiError(404, "Historical place not found");
    }

    return place;
  },

  async getPlacesByDistrictId(districtId: number) {
    return historicalPlaceRepository.getByDistrictId(districtId);
  },

  async updatePlace(id: number, data: any) {
    const place = await historicalPlaceRepository.getById(id);

    if (!place) {
      throw new ApiError(404, "Historical place not found");
    }

    return historicalPlaceRepository.update(id, data);
  },

  async togglePlaceActive(id: number) {
    const place = await historicalPlaceRepository.getById(id);

    if (!place) {
      throw new ApiError(404, "Historical place not found");
    }

    const updatedPlace =
      await historicalPlaceRepository.toggleActive(id);

    if (!updatedPlace) {
      throw new ApiError(404, "Historical place not found");
    }

    return updatedPlace;
  },

  async deletePlace(id: number) {
    const place = await historicalPlaceRepository.getById(id);

    if (!place) {
      throw new ApiError(404, "Historical place not found");
    }

    return historicalPlaceRepository.delete(id);
  },
};