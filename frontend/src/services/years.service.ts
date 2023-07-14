import axios from "axios";
import { getRequestConfig } from "../store";
import { Year } from "../model";

// const apiUrl = import.meta.env.VITE_API_URL as string;

export const createYearRequest = async (prestadorId: string, year: number) => {
    try {
        const config = getRequestConfig();
        if (config) {
            const response = await axios.post(
                `https://centro-gestion.up.railway.app/api/prestadores/create-year/${prestadorId}`,
                { year },
                config
            );
            return response?.data;
        }
    } catch (error) {
        console.error('Error creating year:', error);
    }
};

export const updateYearsRequest = async (prestadorId: string, years: Year[]) => {
    try {
        const config = getRequestConfig();
        if (config) {
            const response = await axios.put(
                `https://centro-gestion.up.railway.app/api/prestadores/update-years/${prestadorId}`,
                { years },
                config
            );
            return response?.data;
        }
    } catch (error) {
        console.error('Error updating years:', error);
    }
};

export const deleteYearRequest = async (prestadorId: string, year: number) => {
    try {
        const config = getRequestConfig();
        if (config) {
            const response = await axios.delete(
                `https://centro-gestion.up.railway.app/api/prestadores/delete-year/${prestadorId}/${year}`,
                config
            );
            return response?.data;
        }
    } catch (error) {
        console.error('Error deleting year:', error);
    }
};