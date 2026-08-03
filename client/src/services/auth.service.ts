import { authApi } from "../api/auth.api";


export const authService = {


    async login(data:{
        email:string;
        password:string;
    }){

        return await authApi.login(data);

    },


    async getCurrentUser(){

        const response = await authApi.me();

        return response.data.data;

    },


    async logout(){

        return await authApi.logout();

    }


};