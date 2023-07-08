import { Mes, Year } from "../model";

// TNA -----------------------------------------------------------
export const nominalInterestRates = (percentages: number[]): number => {
    const interestRate = percentages.reduce((acc, percentages) => acc + percentages, 0);
    return +interestRate.toFixed(2);
};
// TNA ONE YEAR
export const oneYearNominalInterestRates = (meses: Mes[]): number => {
    const percentages = meses.map((mes) => mes.valor);
    return nominalInterestRates(percentages);
};
// TNA HISTORIC
export const historicNominalInterestRates = (years: Year[]): number => {
    const percentages = years.flatMap((year) => year.meses.map((mes) => mes.valor));
    return nominalInterestRates(percentages);
};

// TEA -----------------------------------------------------------
export const calculateCompoundInterest = (interests: number[]): number => {
    let totalFactor = 1;
    for (let i = 0; i < interests.length; i++) {
        const interestRate = 1 + interests[i] / 100;
        totalFactor *= interestRate;
    }
    const totalAmount = (totalFactor - 1) * 100;
    return parseFloat(totalAmount.toFixed(2));
};
// TEA ONE YEAR
export const oneYearEffectiveInterestRates = (meses: Mes[]): number => {
    const percentages = meses.map((mes) => mes.valor);
    return calculateCompoundInterest(percentages);
};
// TEA HISTORIC
export const historicEffectiveInterestRates = (years: Year[]): number => {
    const percentages = years.flatMap((year) => year.meses.map((mes) => mes.valor));
    return calculateCompoundInterest(percentages);
};

// TNA/TEA LAST YEAR
export const lastYearCalculate = (
    years: Year[],
    calculationType: 'nominal' | 'effective'
): number => {
    const lastYear = years.reduce((maxYear, currentYear) => {
        if (!maxYear || currentYear.year > maxYear.year) {
            return currentYear;
        } else {
            return maxYear;
        }
    });

    if (lastYear) {
        const interestRates = lastYear.meses.map((mes) => mes.valor);
        return calculationType === 'nominal'
            ? nominalInterestRates(interestRates)
            : calculateCompoundInterest(interestRates);
    }

    return 0;
};

// REFERENTIAL VALUES CALCS
export const ninetyPercent = (number: number) => {
    const result = number * 0.9;
    return result.toFixed(2);
}

export const ninetyTwoPercent = (number: number) => {
    const result = number * 0.92;
    return result.toFixed(2);
}

export const ninetyPercentArray = (meses: Mes[]) => {
    const acc = oneYearNominalInterestRates(meses)
    return ninetyPercent(acc)
}

export const ninetyTwoPercentArray = (meses: Mes[]) => {
    const acc = oneYearNominalInterestRates(meses)
    return ninetyTwoPercent(acc)
}

export const calculatePorcent = (percentages: number, number: number) => {
    const percentagesConverted = percentages / 100
    const result = number * percentagesConverted
    return result.toFixed(2);
}