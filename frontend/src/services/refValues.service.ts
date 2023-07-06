import axios from "axios";
import { getRequestConfig } from "../store";
import { Mes } from "../model";

const BASE_URL = 'http://localhost:3031';

export const getRefValuesRequest = async () => {
    try {
        const config = getRequestConfig();
        if (config) {
            const response = await axios.get(`${BASE_URL}/api/prestadores/ref-values`, config);
            return response?.data;
        }
    } catch (error) {
        console.error('Error al obtener los valores de referencia:', error);
    }
};

export const updateRefValuesRequest = async (newValues: Mes[]) => {
    try {
        const config = getRequestConfig();
        if (config) {
            const response = await axios.put(`${BASE_URL}/api/prestadores/update-ref-values`, newValues, config);
            return response?.data;
        }
    } catch (error) {
        console.error('Error al actualizar los valores de referencia:', error);
    }
};