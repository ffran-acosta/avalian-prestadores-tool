import React, { useState } from 'react';
import { createPrestadorRequest } from '../../../../../services';
import { Prestador, Year, Mes, ModalPage } from '../../../../../model';
import { h2, modalLabel, standarBlueButton, standarGreenButton, standarRedButton } from '../../../../../styles';

const ModalCrearPrestador: React.FC<ModalPage> = ({ onClose }) => {
    const [prestadorData, setPrestadorData] = useState<Prestador>({
        id: 0,
        userId: 0,
        prestador: '',
        localidad: '',
        tipo: '',
        notas: [],
        years: [],
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPrestadorData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleYearInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPrestadorData((prevData) => {
            const years = [...prevData.years];
            years[index] = { ...years[index], [name]: value };
            return { ...prevData, years };
        });
    };

    const handleMonthInputChange = (yearIndex: number, monthIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPrestadorData((prevData) => {
            const years = [...prevData.years];
            const months = [...years[yearIndex].meses];
            months[monthIndex] = { ...months[monthIndex], [name]: value };
            years[yearIndex] = { ...years[yearIndex], meses: months };
            return { ...prevData, years };
        });
    };

    const handleCrearPrestador = async () => {
        try {
            console.log(JSON.stringify(prestadorData));
            await createPrestadorRequest(prestadorData);
            onClose();
            window.location.reload();
        } catch (error) {
            console.error('Error al crear el prestador:', error);
        }
    };

    
    
    const handleAddYear = () => {
        const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
        setPrestadorData((prevData) => {
            const newMonths: Mes[] = months.map((month) => ({ mes: month, valor: 0 }));
            const newYear: Year = { year: 0, meses: newMonths };
            return { ...prevData, years: [...prevData.years, newYear] };
        });
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
                <h2 className={h2}>Crear Nuevo Prestador</h2>
                <form className="grid gap-4">
                    <div className="mb-4">
                        <label className={modalLabel} htmlFor="id">
                            ID:
                        </label>
                        <input
                            type="number"
                            id="id"
                            name="id"
                            value={prestadorData.id}
                            onChange={handleInputChange}
                            className="border border-gray-400 p-2 rounded-md w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className={modalLabel} htmlFor="prestador">
                            Prestador:
                        </label>
                        <input
                            type="text"
                            id="prestador"
                            name="prestador"
                            value={prestadorData.prestador}
                            onChange={handleInputChange}
                            className="border border-gray-400 p-2 rounded-md w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className={modalLabel} htmlFor="localidad">
                            Localidad:
                        </label>
                        <input
                            type="text"
                            id="localidad"
                            name="localidad"
                            value={prestadorData.localidad}
                            onChange={handleInputChange}
                            className="border border-gray-400 p-2 rounded-md w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className={modalLabel} htmlFor="tipo">
                            Tipo:
                        </label>
                        <input
                            type="text"
                            id="tipo"
                            name="tipo"
                            value={prestadorData.tipo}
                            onChange={handleInputChange}
                            className="border border-gray-400 p-2 rounded-md w-full"
                        />
                    </div>
                    <div className="mb-4 col-span-2">
                        <div className="grid grid-cols-13 gap-4">
                            {prestadorData.years.map((year, yearIndex) => (
                                <React.Fragment key={yearIndex}>
                                    <div className="col-span-12">
                                        <label className={modalLabel} htmlFor={`year-${yearIndex}`}>
                                            AÑO:
                                        </label>
                                        <input
                                            type="number"
                                            id={`year-${yearIndex}`}
                                            name="year"
                                            value={year.year}
                                            onChange={(e) => handleYearInputChange(yearIndex, e)}
                                            className="border border-gray-400 p-2 rounded-md w-full"
                                        />
                                    </div>
                                    {year.meses.map((mes, monthIndex) => (
                                        <div key={monthIndex} className="col-span-1">
                                            <label className={modalLabel} htmlFor={`valor-${yearIndex}-${monthIndex}`}>
                                                {mes.mes}:
                                            </label>
                                            <input
                                                type="number"
                                                id={`valor-${yearIndex}-${monthIndex}`}
                                                name="valor"
                                                value={mes.valor}
                                                onChange={(e) => handleMonthInputChange(yearIndex, monthIndex, e)}
                                                className="border border-gray-400 p-2 rounded-md w-full"
                                            />
                                        </div>
                                    ))}
                                </React.Fragment>
                            ))}
                        </div>
                        <div className="flex justify-between mt-6">
                            <button
                                type="button"
                                onClick={handleAddYear}
                                className={standarBlueButton}
                            >
                                Agregar Año
                            </button>
                        </div>
                    </div>
                    <div className="col-span-2 flex justify-between">
                        <button
                            type="button"
                            onClick={onClose}
                            className={standarRedButton}
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleCrearPrestador}
                            className={standarGreenButton}
                        >
                            Crear Prestador
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalCrearPrestador;