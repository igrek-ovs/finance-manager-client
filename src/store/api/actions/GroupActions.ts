import {instance} from "../api";
import {toast} from "react-toastify";

export const createGroup = async(name:string, password:string) => {
    const group = {
        name,
        userId: localStorage.getItem('userId'),
        password
    }

    try {
        const response = await instance.post('/Group', group).catch((error) => {
            toast.error("Smth went wrong during adding a group");
        });
    }
    catch(error){
        throw error;
    }
}

export const getAllGroupsForUser = async() => {
    try {
        const response = await instance.get(`/Group/user/${localStorage.getItem('userId')}`);
        return response.data;
    }
    catch(error){
        throw error;
    }
}

export const joinGroup = async (groupName:string, password:string) => {
     const userId = localStorage.getItem('userId');

    try {
        const response = await instance.post('/Group/enter', null, {params: {groupName, password, userId}});
        return response.data;
    }
    catch(error){
        throw error;
    }
}

export const getGroupName = async(groupId:number) => {
    try {
        const response = await instance.get(`/Group/get-group-name`, {params: {groupId} });
        return response.data;
    }
    catch(error){
        throw error;
    }
}

