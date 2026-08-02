import api from "../lib/axios";

export const districtApi = {

  getAll() {
    return api.get("/districts");
  },


  getByProvinceId(provinceId:number | string) {
    return api.get(`/districts/province/${provinceId}`);
  },


  getById(id:number | string) {
    return api.get(`/districts/${id}`);
  }

};