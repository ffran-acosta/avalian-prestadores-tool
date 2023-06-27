import axios from "axios";
import { Prestador } from "../model";
import { getAuthToken, getUserId } from "../store";

export const loginRequest = async (name: string, password: string) => {
    return await axios.post('http://localhost:3031/users/auth/login', {
        name: name,
        password: password
    })
}

export const singupRequest = async (name: string, email: string, password: string) => {
    return await axios.post('http://localhost:3031/users/create', {
        name: name,
        email: email,
        password: password
    })
}

export const prestadoresRequest = async () => {
    try {
        const token = getAuthToken();
        if (token) {
            const response = await axios.get('http://localhost:3031/api/prestadores/all', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            return response?.data;
        }
    } catch (error) {
        console.error('Error al obtener los prestadores:', error);
    }
};

export const createPrestadorRequest = async (prestador: Prestador) => {
    try {
        const token = getAuthToken();
        const userId = getUserId();

        if (token && userId) {
            prestador.userId = userId;

            const response = await axios.post(
                'http://localhost:3031/api/prestadores/create',
                prestador,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response?.data;
        }
    } catch (error) {
        console.error('Error al crear el prestador:', error);
    }
};