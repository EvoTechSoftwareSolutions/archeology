import { historicalPlaceRepository } from "../repositories/historicalPlace.repository.js";
import { ApiError } from "../utils/ApiError.js";
export const historicalPlaceService = {
    async createPlace(data) {
        const existingPlace = await historicalPlaceRepository.getByName(data.name);
        if (existingPlace) {
            throw new ApiError(409, "Historical place already exists");
        }
        return historicalPlaceRepository.create(data);
    },
    async getAllPlaces() {
        return historicalPlaceRepository.getAll();
    },
    async getPlaceById(id) {
        const place = await historicalPlaceRepository.getById(id);
        if (!place) {
            throw new ApiError(404, "Historical place not found");
        }
        return place;
    },
    async getPlacesByDistrictId(districtId) {
        return historicalPlaceRepository.getByDistrictId(districtId);
    },
    async getPlacesByDistrictName(districtName) {
        return historicalPlaceRepository.getByDistrictName(districtName);
    },
    async updatePlace(id, data) {
        const place = await historicalPlaceRepository.getById(id);
        if (!place) {
            throw new ApiError(404, "Historical place not found");
        }
        return historicalPlaceRepository.update(id, data);
    },
    async deletePlace(id) {
        const place = await historicalPlaceRepository.getById(id);
        if (!place) {
            throw new ApiError(404, "Historical place not found");
        }
        return historicalPlaceRepository.delete(id);
    },
};
