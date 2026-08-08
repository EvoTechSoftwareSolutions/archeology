import { historicalPlaceRepository } from "../repositories/historicalPlace.repository.js";
import { ApiError } from "../utils/ApiError.js";

export const historicalPlaceService = {
  async createPlace(data: any) {
    const existingPlace = await historicalPlaceRepository.getByName(data.name);

    if (existingPlace) {
      throw new ApiError(409, "Historical place already exists");
    }

    return historicalPlaceRepository.create(data);
  },


  getAllPlaces(params?: {
    search?: string;
    districtId?: number;
    provinceId?: number;
    category?: string;
    statusFlag?: string;
  }) {
    return historicalPlaceRepository.getAll(params);
  },

<<<<<<< HEAD

=======
>>>>>>> b5ce798b64be24d9c83e857493f72fd9c5136252
  async getPlaceById(idOrSlug: number | string) {
    let place = null;
    const numericId = Number(idOrSlug);

    if (!isNaN(numericId) && numericId > 0) {
      place = await historicalPlaceRepository.getById(numericId);
    }

    if (!place && typeof idOrSlug === "string") {
      place = await historicalPlaceRepository.getBySlugOrName(idOrSlug);
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

  async deletePlace(id: number) {
    const place = await historicalPlaceRepository.getById(id);

    if (!place) {
      throw new ApiError(404, "Historical place not found");
    }

    return historicalPlaceRepository.delete(id);
  },
};
