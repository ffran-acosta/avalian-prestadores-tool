import { useState } from 'react';
import { Mes, YearPage } from '../../../../../model';
import { calculateCompoundInterest, nominalInterestRates } from '../../../../../util';

const PeriodCalc: React.FC<YearPage> = ({ years }) => {
    const [startYear, setStartYear] = useState<number>(years[0]?.year || 0);
    const [startMonth, setStartMonth] = useState<string>(years[0]?.meses[0]?.mes || '');
    const [endYear, setEndYear] = useState<number>(years[0]?.year || 0);
    const [endMonth, setEndMonth] = useState<string>(years[0]?.meses[0]?.mes || '');
    const [sumResult, setSumResult] = useState<{ sum: number; cumulativeSum: number }>({ sum: 0, cumulativeSum: 0 });

    const calculateSum = () => {
        const startYearObj = years.find((year) => year.year === startYear);
        const endYearObj = years.find((year) => year.year === endYear);
        if (startYearObj && endYearObj) {
            const startMonthObj = startYearObj.meses.find((mes) => mes.mes === startMonth);
            const endMonthObj = endYearObj.meses.find((mes) => mes.mes === endMonth);
            if (startMonthObj && endMonthObj) {
                const startIndex = startYearObj.meses.indexOf(startMonthObj);
                const endIndex = endYearObj.meses.indexOf(endMonthObj);
                const selectedMonths: Mes[] = [];
                for (let i = startYearObj.year; i <= endYearObj.year; i++) {
                    const yearObj = years.find((year) => year.year === i);
                    if (yearObj) {
                        const start = yearObj === startYearObj ? startIndex : 0;
                        const end = yearObj === endYearObj ? endIndex + 1 : yearObj.meses.length;
                        selectedMonths.push(...yearObj.meses.slice(start, end));
                    }
                }
                const percentages = selectedMonths.map((mes) => mes.valor);
                const totalLineal = nominalInterestRates(percentages);
                const totalAcumulado = calculateCompoundInterest(percentages);
                setSumResult({ sum: totalLineal, cumulativeSum: totalAcumulado });
            }
        }
    };


    return (
        <div className="flex flex-col items-center border bg-gray-300 p-5 rounded-md mt-9">
            <div className="flex justify-between w-full mb-8">
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl mb-2">DESDE:</h2>
                    <div className="flex items-center">
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

                <div className="flex flex-col items-center">
                    <h2 className="text-2xl mb-2">HASTA:</h2>
                    <div className="flex items-center">
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

            <div className="flex items-center">
                <button onClick={calculateSum} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                    Calcular Interés
                </button>
                {sumResult.sum !== 0 && (
                    <div className="flex flex-row items-center ">
                        <p className="mr-2 text-xl mb-2 bg-yellow-300 p-1 rounded-md font-bold">Total Lineal: <span className='text-red-500'>{sumResult.sum}%</span></p>
                        <p className="mr-2 text-xl mb-2 bg-yellow-300 p-1 rounded-md font-bold">Total Acumulado: <span className='text-red-500'>{sumResult.cumulativeSum}%</span></p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PeriodCalc;