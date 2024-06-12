import {instance} from "../api";

export const getUserInfo = async (userId:number) => {
    try {
        const response = await instance.get(`/Auth/get-user-info/${userId}`);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}