import axios from "axios";
import { getRequestConfig } from "../store";
import { convertToXLSX } from "../util";

const apiUrl = import.meta.env.VITE_API_URL as string;

export const exportXLSX = async () => {
    try {
        const config = getRequestConfig();
        if (config) {
            const response = await axios.get(`${apiUrl}/api/prestadores/exportPrestadores/`, {
                ...config,
                responseType: 'blob'
            });
            const csvFile = response.data;
            const reader = new FileReader();
            reader.onload = () => {
                const csvData = reader.result as string;
                const xlsxData = convertToXLSX(csvData);
                const url = window.URL.createObjectURL(new Blob([xlsxData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'Prestadores.xlsx');
                link.addEventListener('load', () => {
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(link);
                });
                document.body.appendChild(link);
                link.click();
            };
            reader.readAsText(csvFile);
        }
    } catch (error) {
        console.error('Error al exportar a CSV:', error);
        throw error;
    }
};