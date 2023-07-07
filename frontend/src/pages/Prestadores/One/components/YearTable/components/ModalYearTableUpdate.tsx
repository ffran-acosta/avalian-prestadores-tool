import React, { useState } from 'react';
import { ModalPage, Year } from '../../../../../../model';
import { deleteYearRequest, updateYearsRequest } from '../../../../../../services';

interface ModalEditValuesProps extends ModalPage {
    years: Year[];
}

const ModalEditValues: React.FC<ModalEditValuesProps> = ({ onClose, years, prestador }) => {
    const [editedYears, setEditedYears] = useState<Year[]>(years);

    const handleYearValueChange = (yearIndex: number, mesIndex: number, value: string) => {
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue)) {
            const updatedYears = [...editedYears];
            updatedYears[yearIndex].meses[mesIndex].valor = numericValue;
            setEditedYears(updatedYears);
        }
    };

    const handleDeleteYear = async (year: number) => {
        try {
            if (prestador && prestador.id) {
                const prestadorId: string = prestador.id.toString();
                await deleteYearRequest(prestadorId, year);
                // Realiza cualquier otra acción necesaria después de eliminar el año
            }
        } catch (error) {
            console.error('Error deleting year:', error);
        }
    };

    const handleSaveChanges = async () => {
        try {
            if (prestador && prestador.id) {
                const prestadorId: string = prestador.id.toString();
                await updateYearsRequest(prestadorId, editedYears);
                onClose();
                window.location.reload();
            }
        } catch (error) {
            console.error('Error updating years:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-4 rounded-lg max-w-4/5 overflow-x-auto">
                {editedYears.map((year) => (
                    <div key={year.year} className="mb-4">
                        <div className="flex items-center mb-2">
                            <h3 className="text-lg font-bold mr-2">{year.year}</h3>
                            <button
                                type="button"
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleDeleteYear(year.year)}
                            >
                                Eliminar Año
                            </button>
                        </div>
                        <div className="flex flex-wrap">
                            {year.meses.map((mes) => (
                                <div key={mes.mes} className="flex flex-col items-center mr-4 mb-4">
                                    <label htmlFor={`valor-${year.year}-${mes.mes}`} className="mb-1">
                                        {mes.mes}
                                    </label>
                                    <input
                                        type="number"
                                        id={`valor-${year.year}-${mes.mes}`}
                                        name={`valor-${year.year}-${mes.mes}`}
                                        value={mes.valor.toString()}
                                        onChange={(e) =>
                                            handleYearValueChange(
                                                editedYears.findIndex((y) => y.year === year.year),
                                                year.meses.findIndex((m) => m.mes === mes.mes),
                                                e.currentTarget.value
                                            )
                                        }
                                        onClick={(e) => (e.currentTarget.value = '')}
                                        className="border border-gray-400 p-2 rounded-md w-20 text-center"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
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
                        onClick={handleSaveChanges}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalEditValues;