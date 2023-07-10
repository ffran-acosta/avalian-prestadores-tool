import axios from "axios";
import { User } from "../model";

const apiUrl = import.meta.env.VITE_API_URL as string;

export const loginRequest = async (name: string, password: string) => {
    return await axios.post(`${apiUrl}/users/auth/login`, {
        name: name,
        password: password
    })
}

export const singupRequest = async (name: string, email: string, password: string) => {
    return await axios.post(`${apiUrl}/users/create`, {
        name: name,
        email: email,
        password: password
    })
}

export const userExists = async (): Promise<User[]> => {
    const response = await axios.get<User[]>(`${apiUrl}/users/checkinfo`);
    return response.data;
}