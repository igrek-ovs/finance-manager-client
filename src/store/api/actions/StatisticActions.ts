import {instance} from "../api";


export const getUserStatistic = async (groupId:number) => {
    try{
        const response = await instance.get(`/Expense/get-users-with-statistic`, {params: {groupId}});
        return response.data;
    }
    catch (error) {
        throw error;
    }
}