import { useState } from 'react';
import { Year } from '../../../../../model';

interface CalcularSumaProps {
    years: Year[];
}

const PeriodCalc: React.FC<CalcularSumaProps> = ({ years }) => {
    const [startYear, setStartYear] = useState<number>(years[0]?.year || 0);
    const [startMonth, setStartMonth] = useState<string>(years[0]?.meses[0]?.mes || '');
    const [endYear, setEndYear] = useState<number>(years[0]?.year || 0);
    const [endMonth, setEndMonth] = useState<string>(years[0]?.meses[0]?.mes || '');

    // Función para calcular la suma de los valores dentro del rango de meses seleccionado
    const calculateSum = (): number => {
        let sum = 0;

        const startYearObj = years.find((year) => year.year === startYear);
        const endYearObj = years.find((year) => year.year === endYear);

        if (startYearObj && endYearObj) {
            const startMonthIndex = startYearObj.meses.findIndex((mes) => mes.mes === startMonth);
            const endMonthIndex = endYearObj.meses.findIndex((mes) => mes.mes === endMonth);

            if (startMonthIndex >= 0 && endMonthIndex >= 0) {
                const selectedMonths = endYearObj.meses.slice(startMonthIndex, endMonthIndex + 1);
                sum = selectedMonths.reduce((total, mes) => total + mes.valor, 0);
            }
        }

        return sum;
    };
    return (
        <div>
            <div className="flex justify-center">
                <div className="flex items-center mr-4">
                    <div>
                        <label htmlFor="startYear" className="mr-2 font-bold">AÑO:</label>
                        <select
                            id="startYear"
                            value={startYear}
                            onChange={(e) => setStartYear(Number(e.target.value))}
                            className="mr-2"
                        >
                            {years.map((year) => (
                                <option key={year.year} value={year.year}>
                                    {year.year}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="startMonth" className="mr-2 font-bold">MES:</label>
                        <select
                            id="startMonth"
                            value={startMonth}
                            onChange={(e) => setStartMonth(e.target.value)}
                            className="mr-2"
                        >
                            {startYear &&
                                years.find((year) => year.year === startYear)?.meses.map((mes) => (
                                    <option key={mes.mes} value={mes.mes}>
                                        {mes.mes}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>

                <div className="flex items-center">
                    <div>
                        <label htmlFor="endYear" className="mr-2 font-bold">AÑO:</label>
                        <select
                            id="endYear"
                            value={endYear}
                            onChange={(e) => setEndYear(Number(e.target.value))}
                            className="mr-2"
                        >
                            {years.map((year) => (
                                <option key={year.year} value={year.year}>
                                    {year.year}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="endMonth" className="mr-2 font-bold">MES:</label>
                        <select
                            id="endMonth"
                            value={endMonth}
                            onChange={(e) => setEndMonth(e.target.value)}
                            className="mr-2"
                        >
                            {endYear &&
                                years.find((year) => year.year === endYear)?.meses.map((mes) => (
                                    <option key={mes.mes} value={mes.mes}>
                                        {mes.mes}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* <button onClick={calculateSum}>Calcular suma</button> */}
            <p>Suma: {calculateSum()}</p>
        </div>
    );
};

export default PeriodCalc;