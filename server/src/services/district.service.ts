import { districtRepository } from "../repositories/district.repository.js";
import { ApiError } from "../utils/ApiError.js";

export const districtService = {

    async createDistrict(data: any) {
        const existingDistrict = await districtRepository.getByName(data.name);

        if(existingDistrict){
            throw new ApiError(409, "District Already Added");
        }
        return districtRepository.create(data);
    },


    async getAllDistricts() {
        return districtRepository.getAll();
    },

    async getDistrictById(id:number){

    const district =
        await districtRepository.getById(id);


    if(!district){

        throw new ApiError(
            404,
            "District not found"
        );

    }


    return district;

},

    async updateDistrict(id:number, data:any){
        const district = await districtRepository.getById(id);

        if(!district){
            throw new ApiError(404, "District Not found")
        }

        return districtRepository.update(id,data);
    },

      async deleteDistrict(id: number) {
        const district = await districtRepository.getById(id);
    
        if (!district) {
          throw new ApiError(404, "district not found");
        }
    
        return districtRepository.delete(id);
      },
}