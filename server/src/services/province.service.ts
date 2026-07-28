import { provinceRepository } from "../repositories/province.repository.js";
import { ApiError } from "../utils/ApiError.js";

export const provinceService = {
  async createProvince(data: any) {
    const existingProvince = await provinceRepository.getByName(data.name);

    if (existingProvince) {
      throw new ApiError(409, "Province already exists");
    }

    return provinceRepository.create(data);
  },

  async getAllProvinces() {
    return provinceRepository.getAll();
  },

    getProvinceById(id:number){
        return provinceRepository.getById(id);
    },


  async updateProvince(id: number, data: any) {
    const province = await provinceRepository.getById(id);

    if (!province) {
      throw new ApiError(404, "Province not found");
    }

    return provinceRepository.update(id, data);
  },

  async deleteProvince(id: number) {
    const province = await provinceRepository.getById(id);

    if (!province) {
      throw new ApiError(404, "Province not found");
    }

    return provinceRepository.delete(id);
  },
};
