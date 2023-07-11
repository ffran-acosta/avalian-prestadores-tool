import axios from "axios";
import { getRequestConfig, getUserId } from "../store";
import { Prestador } from "../model";

const apiUrl = import.meta.env.VITE_API_URL as string;

export const prestadoresRequest = async () => {
    try {
        const config = getRequestConfig();
        if (config) {
            const response = await axios.get(`${apiUrl}/api/prestadores/all`, config);
            console.log(response?.data);
            return response?.data;
        }
    } catch (error) {
        console.error('Error al obtener los prestadores:', error);
    }
};

export const createPrestadorRequest = async (prestador: Prestador) => {
    try {
        const config = getRequestConfig();
        const userId = getUserId();
        if (config && userId) {
            prestador.userId = userId;
            const response = await axios.post(
                `${apiUrl}/api/prestadores/create`,
                prestador,
                config
            );
            return response?.data;
        }
    } catch (error) {
        console.error('Error al crear el prestador:', error);
    }
};

export const updatePrestadorRequest = async (prestador: Prestador) => {
    try {
        const config = getRequestConfig();
        if (config) {
            const response = await axios.put(
                `${apiUrl}/api/prestadores/update/${prestador.id}`,
                prestador,
                config
            );
            return response?.data;
        }
    } catch (error) {
        console.error('Error al actualizar el prestador:', error);
    }
};

export const deletePrestadorRequest = async (prestadorId: string) => {
    try {
        const config = getRequestConfig();
        if (config) {
            const response = await axios.delete(
                `${apiUrl}/api/prestadores/delete/${prestadorId}`,
                config
            );
            return response?.data;
        }
    } catch (error) {
        console.error('Error al eliminar el prestador:', error);
    }
};