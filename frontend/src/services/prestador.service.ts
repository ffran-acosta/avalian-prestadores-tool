import axios from "axios";
import { getAuthToken, getUserId } from "../store";
import { Prestador } from "../model";

const BASE_URL = 'http://localhost:3031'

export const prestadoresRequest = async () => {
    try {
        const token = getAuthToken();
        if (token) {
            const response = await axios.get(`${BASE_URL}/api/prestadores/all`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response?.data;
        }
    } catch (error) {
        console.error('Error al obtener los prestadores:', error);
    }
}

export const createPrestadorRequest = async (prestador: Prestador) => {
    try {
        const token = getAuthToken();
        const userId = getUserId();
        console.log(userId);
        if (token && userId) {
            prestador.userId = userId;

            const response = await axios.post(
                `${BASE_URL}/api/prestadores/create`,
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
}

export const createNotaRequest = async (prestadorId: number, nota: string) => {
    try {
        const token = getAuthToken();
        if (token) {
            const response = await axios.post(
                `${BASE_URL}/api/prestadores/create-note/${prestadorId}`,
                { nota },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response?.data;
        }
    } catch (error) {
        console.error('Error al crear la nota:', error);
    }
};

export const updateNotaRequest = async (prestadorId: number, notaIndex: number, newNota: string) => {
    try {
        const token = getAuthToken();
        if (token) {
            console.log(prestadorId, notaIndex, newNota);
            const response = await axios.put(
                `${BASE_URL}/api/prestadores/update-note/${prestadorId}/${notaIndex}`,
                { newNota },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response?.data;
        }
    } catch (error) {
        console.error('Error al actualizar la nota:', error);
    }
};