import axios from "axios";
import { getRequestConfig } from "../store";
import { Mes } from "../model";

import { urlTest } from ".";

// const apiUrl = import.meta.env.VITE_API_URL;
const apiUrl = urlTest

export const getRefValuesRequest = async () => {
    try {
        const config = getRequestConfig();
        if (config) {
            const response = await axios.get(`${apiUrl}/api/prestadores/ref-values`, config);
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
            const response = await axios.put(`${apiUrl}/api/prestadores/update-ref-values`, newValues, config);
            return response?.data;
        }
    } catch (error) {
        console.error('Error al actualizar los valores de referencia:', error);
    }
};