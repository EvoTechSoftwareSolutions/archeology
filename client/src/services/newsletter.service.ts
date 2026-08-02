import { newsletterApi } from "../api/newsletter.api";

export const newsletterService = {

    async getSubscribers(){

        const response =
        await newsletterApi.getSubscribers();

        return response.data.data;

    },

    async getStats(){

        const response =
        await newsletterApi.getStats();

        return response.data.data;

    },

    async deleteSubscriber(id:number){

        const response =
        await newsletterApi.deleteSubscriber(id);

        return response.data;

    }

};