import {instance} from "../api";
import {toast} from "react-toastify";

export const getExpenses = async (userId:number) => {
    try {
        const groupId = localStorage.getItem('groupId')
        const response = await instance.get(`/Expense/get-expenses-for-user`, {params: {groupId, userId}});
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

export const getFilteredExpenses = async (userId: number, IExpenseFilter:any) => {
    try {
        const groupId = localStorage.getItem('groupId')
        const response = await instance.post(`/Expense/get-filtered-expenses-for-user`, IExpenseFilter, {params: {groupId, userId}});
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

export const addExpense = async(expense: any) => {
    try {
        const response = await instance.post(`/Expense/add-expense`, expense);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

export const removeExpense = async(expenseId: number) => {
    try {
        const response = await instance.delete(`/Expense/remove-expense`, {params: {expenseId} });
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

export const updateCategoryOfExpense = async(expenseId: number, newCategoryId: number) => {
    try {
        const response = await instance.put(`/Expense/update-category`,null, {params:{expenseId, newCategoryId}});
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

export const updateAmountOfExpense = async(expenseId: number, newAmount: number) => {
    try {
        const response = await instance.put(`/Expense/update-amount`,null, {params:{expenseId, newAmount}});
        return response.data;
    }
    catch (error) {
        throw error;
    }
}