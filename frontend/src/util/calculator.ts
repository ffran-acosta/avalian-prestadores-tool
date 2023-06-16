import { Mes, Year } from "../model";

const calculateTNA = (percentages: number[]): number => {
    const interestRate = percentages.reduce((acc, percentages) => acc + percentages, 0);
    return interestRate
};

export const oneYearTNA = (meses: Mes[]): number => {
    const percentages = meses.map((mes) => mes.valor);
    return calculateTNA(percentages);
};

export const historicTNA = (years: Year[]): number => {
    const porcentajes = years.flatMap((year) => year.meses.map((mes) => mes.valor));
    return calculateTNA(porcentajes);
};


