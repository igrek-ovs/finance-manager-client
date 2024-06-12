import {instance} from "../api";

export const getIsAdmin = async(groupId:number) => {
    const userId = localStorage.getItem('userId');
    try {
        const response = await instance.get(`/Members/get-is-admin`, {params: {groupId, userId}});
        return response.data;
    }
    catch(error){
        throw error;
    }
}

export const getMembers = async(groupId:number) => {
    try {
        const response = await instance.get(`/Members/get-members-for-group`, {params: {groupId}});
        return response.data;
    }
    catch(error){
        throw error;
    }
}