import { Year, Mes } from "../models";

export const mesesArray: Mes[] = [
    { mes: 'ENE', valor: 0 },
    { mes: 'FEB', valor: 0 },
    { mes: 'MAR', valor: 0 },
    { mes: 'ABR', valor: 0 },
    { mes: 'MAY', valor: 0 },
    { mes: 'JUN', valor: 0 },
    { mes: 'JUL', valor: 0 },
    { mes: 'AGO', valor: 0 },
    { mes: 'SEP', valor: 0 },
    { mes: 'OCT', valor: 0 },
    { mes: 'NOV', valor: 0 },
    { mes: 'DIC', valor: 0 },
];

export const formatYearDb = (year: number): Year => {
    return {
        year,
        meses: [...mesesArray]
    };
};

export const getDefaultYear = (): Year => {
    const currentYear = new Date().getFullYear();
    return {
        year: currentYear,
        meses: [...mesesArray]
    };
}