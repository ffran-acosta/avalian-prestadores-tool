import { Mes, Prestador, Year } from "../models";

export const parseXLSX = (jsonData: any[][], userId: number): Prestador[] => {
    const idIndex = 0;
    const prestadorIndex = 1;
    const localidadIndex = 2;
    const tipoIndex = 3;
    const yearStartIndex = 4;
    const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

    const prestadores: Prestador[] = [];
    let currentPrestador: Prestador | undefined;

    for (let rowIndex = 1; rowIndex < jsonData.length; rowIndex++) {
        const rowData = jsonData[rowIndex];

        if (rowData[idIndex]) {
            currentPrestador = {
                id: rowData[idIndex],
                userId: userId,
                prestador: rowData[prestadorIndex],
                localidad: rowData[localidadIndex],
                tipo: rowData[tipoIndex],
                notas: [],
                years: []
            };
            prestadores.push(currentPrestador);
        }

        if (currentPrestador !== undefined) {
            const years = rowData.slice(yearStartIndex);
            years.forEach((yearValue, index) => {
                const yearIndex = index * 12;
                const year: Year = {
                    year: yearValue,
                    meses: []
                };

                months.forEach((_, monthIndex) => {
                    const monthValue = rowData[yearIndex + monthIndex + yearStartIndex];
                    if (monthValue !== undefined) {
                        const mes: Mes = {
                            mes: months[monthIndex],
                            valor: monthValue
                        };
                        year.meses.push(mes);
                    }
                });

                currentPrestador!.years.push(year);
            });
        }
    }

    return prestadores;
};