import { Mes, Prestador, Year } from "../model";

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

export const calcularPorcentajeAcumuladoPeriodo = (
    prestadores: Prestador[],
    inicioIndex: [number, number], 
    finIndex: [number, number] 
): number => {
    const [inicioAnio, inicioMes] = inicioIndex;
    const [finAnio, finMes] = finIndex;

    const porcentajesPeriodo: number[] = [];

    for (let i = inicioAnio; i <= finAnio; i++) {
        const year = prestadores[i].years;

        let inicio = 0;
        let fin = year.length - 1;

        if (i === inicioAnio) {
            inicio = inicioMes;
        }
        if (i === finAnio) {
            fin = finMes;
        }

        for (let j = inicio; j <= fin; j++) {
            const meses = year[j].meses;

            let inicioMesIndex = 0;
            let finMesIndex = meses.length - 1;

            if (j === inicio && i === inicioAnio) {
                inicioMesIndex = inicioMes;
            }
            if (j === fin && i === finAnio) {
                finMesIndex = finMes;
            }

            for (let k = inicioMesIndex; k <= finMesIndex; k++) {
                const porcentaje = meses[k].valor;
                porcentajesPeriodo.push(porcentaje);
            }
        }
    }

    return calculateTNA(porcentajesPeriodo);
};

