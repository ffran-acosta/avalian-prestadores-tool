import axios from "axios";
import { User } from "../model";

const BASE_URL = 'http://localhost:3031'

export const loginRequest = async (name: string, password: string) => {
    return await axios.post(`${BASE_URL}/users/auth/login`, {
        name: name,
        password: password
    })
}

export const singupRequest = async (name: string, email: string, password: string) => {
    return await axios.post(`${BASE_URL}/users/create`, {
        name: name,
        email: email,
        password: password
    })
}

export const userExists = async (): Promise<User[]> => {
    const response = await axios.get<User[]>(`${BASE_URL}/users/checkinfo`);
    return response.data;
}