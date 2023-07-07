import React, { useState } from 'react';
import { ModalPage } from '../../../../../../model';
import { createYearRequest } from '../../../../../../services';

const ModalCreateYear: React.FC<ModalPage> = ({ onClose, prestador }) => {
    const [year, setYear] = useState<number>(0);

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedYear = parseInt(event.target.value);
        setYear(selectedYear);
    };

    const handleCreateYear = async () => {
        try {
            if (prestador && prestador.id) {
                const prestadorId: string = prestador.id.toString();
                await createYearRequest(prestadorId, year);
                onClose();
                window.location.reload();
            }
        } catch (error) {
            console.error('Error creating year:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-4 rounded-lg w-1/4">
                <h2 className="text-xl font-bold mb-4">Añadir Año</h2>
                <form>
                    <div className="mb-4 flex justify-center">
                        <label className="block font-bold mb-1 mr-3 text-lg" htmlFor="year">
                            Año
                        </label>
                        <select
                            id="year"
                            name="year"
                            value={year}
                            onChange={handleYearChange}
                            className="border border-gray-400 p-2 rounded-md w-100"
                        >
                            {[2018, 2019, 2020, 2021, 2022, 2023, 2024].map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleCreateYear}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Añadir
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalCreateYear;