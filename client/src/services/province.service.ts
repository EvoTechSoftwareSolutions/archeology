import { provinceApi } from "../api/province.api";
import type {
  District,
  Province,
  ProvinceDetailApiResponse,
  ProvinceListApiResponse,
} from "../types/province";

// Converts the raw axios response into the Province[] shape the UI needs.
export const getProvinces = async (): Promise<Province[]> => {
  const response = await provinceApi.getAll();
  const payload = response.data as ProvinceListApiResponse;

  return (payload.data ?? []).map((province) => ({
    id: province.id,
    name: province.name,
  }));
};

// Fetches a single province by id and returns just its nested districts.
export const getDistrictsByProvinceId = async (provinceId: number): Promise<District[]> => {
  const response = await provinceApi.getById(provinceId);
  const payload = response.data as ProvinceDetailApiResponse;

  return (payload.data?.districts ?? []).map((district) => ({
    id: district.id,
    name: district.name,
    provinceId: district.provinceId,
  }));
};