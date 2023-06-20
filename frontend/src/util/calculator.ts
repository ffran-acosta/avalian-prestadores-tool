import { Mes, Year } from "../model";

// YEAR TABLE CALCS
// TNA NominalInterestRates
const nominalInterestRates = (percentages: number[]): number => {
    const interestRate = percentages.reduce((acc, percentages) => acc + percentages, 0);
    return +interestRate.toFixed(2);
};

export const oneYearNominalInterestRates = (meses: Mes[]): number => {
    const percentages = meses.map((mes) => mes.valor);
    return nominalInterestRates(percentages);
};

export const historicNominalInterestRates = (years: Year[]): number => {
    const percentages = years.flatMap((year) => year.meses.map((mes) => mes.valor));
    return nominalInterestRates(percentages);
};

// TEA EffectiveInterestRates
export const calculateCompoundInterest = (interests: number[]): number => {
    let totalAmount = 0;
    for (let i = 0; i < interests.length; i++) {
        const interest = interests[i];
        const interestRate = (i + 1) / 100;
        const interestAmount = totalAmount * interestRate;
        totalAmount += interestAmount + interest;
    }
    return parseFloat(totalAmount.toFixed(2))
}

export const oneYearEffectiveInterestRates = (meses: Mes[]): number => {
    const percentages = meses.map((mes) => mes.valor);
    return calculateCompoundInterest(percentages);
};

export const historicEffectiveInterestRates = (years: Year[]): number => {
    const percentages = years.flatMap((year) => year.meses.map((mes) => mes.valor));
    return calculateCompoundInterest(percentages);
};

// REFERENTIAL VALUES CALCS
export const ninetyPercent = (number: number) => {
    const result = number * 0.9;
    return result.toFixed(2);
}

export const ninetyPercentArray = (meses: Mes[]) => {
    const acc = oneYearNominalInterestRates(meses)
    return ninetyPercent(acc)
}

export const calculatePorcent = (percentages: number, number: number) => {
    const percentagesConverted = percentages / 100
    const result = number * percentagesConverted
    return result.toFixed(2);
}
