import axios from "axios";
import { getRequestConfig } from "../store";

const apiUrl = import.meta.env.VITE_API_URL as string;

export const exportToCSV = async () => {
    try {
        const config = getRequestConfig();
        if (config) {
            const response = await axios.get(`${apiUrl}/api/prestadores/exportToCSV`, config);
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/csv' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Prestadores.csv');
            link.addEventListener('load', () => {
                window.URL.revokeObjectURL(url);
                document.body.removeChild(link);
            });
            document.body.appendChild(link);
            link.click();
        }
    } catch (error) {
        console.error('Error al exportar a CSV:', error);
        throw error;
    }
};