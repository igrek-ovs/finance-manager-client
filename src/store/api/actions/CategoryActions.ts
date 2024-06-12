import {instance} from "../api";
import category from "../../../models/category";
import {toast} from "react-toastify";

export const getCategories = async () => {
    try {
        const groupId = localStorage.getItem('groupId')
        const response = await instance.get(`/Category/${groupId}`);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

export const addCategory = async(category: any) => {
    try {
        const response = await instance.post(`/Category`, category);
        return response.data;
    }
    catch (error) {
        toast.error('Error adding category');
        throw error;
    }
}

export const deleteCategory = async(id: number) => {
    try {
        const response = await instance.delete(`/Category/${id}`);
        return response.data;
    }
    catch (error) {
        toast.error('Error deleting category');
        throw error;
    }
}

