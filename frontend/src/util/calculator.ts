import { Mes, Year } from "../model";

const calculateTNA = (percentages: number[]): number => {
    const interestRate = percentages.reduce((acc, percentages) => acc + percentages, 0);
    return +interestRate.toFixed(2);
};

export const oneYearTNA = (meses: Mes[]): number => {
    const percentages = meses.map((mes) => mes.valor);
    return calculateTNA(percentages);
};

export const historicTNA = (years: Year[]): number => {
    const percentages = years.flatMap((year) => year.meses.map((mes) => mes.valor));
    return calculateTNA(percentages);
};

export const ninetyPercent = (number: number) => {
    const result = number * 0.9;
    return result.toFixed(2);
}

export const ninetyPercentArray = (meses: Mes[]) => {
    const acc = oneYearTNA(meses)
    return ninetyPercent(acc)
}

export const calculatePorcent = (percentages: number, number: number) => {
    const percentagesConverted = percentages / 100
    const result = number * percentagesConverted
    return result.toFixed(2);
}