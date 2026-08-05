import { ApiError } from "../utils/ApiError.js";
import { UserRepository } from "../repositories/user.repository.js";


class UserService {

  private userRepository = new UserRepository();


  async getAllUsers(){
    return this.userRepository.findAll();
  }


  async getUserById(id:number){

    const user =
      await this.userRepository.findById(id);

    if(!user){
      throw new ApiError(404,"User not found");
    }

    return user;
  }


  async updateUser(id:number,data:any){

    const existingUser =
      await this.userRepository.findById(id);


    if(!existingUser){
      throw new ApiError(404,"User not found");
    }


    return this.userRepository.update(id,data);
  }





}


export const userService = new UserService();