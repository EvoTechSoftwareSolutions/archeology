import { userApi } from "../api/user.api";
import type { CreateUserPayload } from "../types/user.types";

export const userService = {

  async getUsers() {
    const response = await userApi.getUsers();

    return response.data.data;
  },


  async createUser(data: CreateUserPayload) {
    const response = await userApi.create(data);

    return response.data;
  },


  async updateUser(id:number,data:any){
    const response = await userApi.updateUser(id,data);

    return response.data;
  },


  async deleteUser(id:number){
    const response = await userApi.deleteUser(id);

    return response.data;
  }

};