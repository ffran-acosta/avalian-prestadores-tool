import axios from "axios";
import { getRequestConfig } from "../store";
import { Year } from "../model";

const BASE_URL = 'http://localhost:3031';

export const createYearRequest = async (prestadorId: string, year: number) => {
    try {
        const config = getRequestConfig();
        if (config) {
            const response = await axios.post(
                `${BASE_URL}/api/prestadores/create-year/${prestadorId}`,
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
                `${BASE_URL}/api/prestadores/update-years/${prestadorId}`,
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
                `${BASE_URL}/api/prestadores/delete-year/${prestadorId}/${year}`,
                config
            );
            return response?.data;
        }
    } catch (error) {
        console.error('Error deleting year:', error);
    }
};