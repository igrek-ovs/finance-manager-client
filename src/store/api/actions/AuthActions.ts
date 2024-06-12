import {instance} from "../api";

export const registerUser = async(username:string, password:string, firstName: string, lastName:string) => {
    const user = {
        username,
        password,
        firstName,
        lastName
    }

    try {
        const response = await instance.post('/Auth/register', user);
        return response.data;
    }
    catch(error){
        console.log(error);
        return error;
    }
}

export const loginUser = async(username:string, password:string) => {
        const user = {
            username,
            password
        }
        try{
            const response = await instance.post('/Auth/login', user);
            return response.data;
        }
        catch (error){
            throw error;
        }


}