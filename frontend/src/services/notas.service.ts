import axios from "axios";
import { getRequestConfig } from "../store";

const BASE_URL = 'http://localhost:3031';

export const createNotaRequest = async (prestadorId: number, nota: string) => {
    try {
        const config = getRequestConfig();
        if (config) {
            const response = await axios.post(
                `${BASE_URL}/api/prestadores/create-note/${prestadorId}`,
                { nota },
                config
            );
            return response?.data;
        }
    } catch (error) {
        console.error('Error al crear la nota:', error);
    }
};

export const updateNotaRequest = async (prestadorId: number, notaIndex: number, newNota: string) => {
    try {
        const config = getRequestConfig();
        if (config) {
            console.log(prestadorId, notaIndex, newNota);
            const response = await axios.put(
                `${BASE_URL}/api/prestadores/update-note/${prestadorId}/${notaIndex}`,
                { newNota },
                config
            );
            return response?.data;
        }
    } catch (error) {
        console.error('Error al actualizar la nota:', error);
    }
};

export const deleteNotaRequest = async (prestadorId: number, notaIndex: number) => {
    try {
        const config = getRequestConfig();
        if (config) {
            const response = await axios.delete(
                `${BASE_URL}/api/prestadores/delete-note/${prestadorId}/${notaIndex}`,
                config
            );
            return response?.data;
        }
    } catch (error) {
        console.error('Error al eliminar la nota:', error);
    }
};