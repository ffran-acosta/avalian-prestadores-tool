import React, { useState } from 'react';
import { updateNotaRequest } from '../../../../../../services';

interface ModalEditarNotasProps {
    prestadorId: number;
    notas: string[];
    onClose: () => void;
}

const ModalEditarNotas: React.FC<ModalEditarNotasProps> = ({ prestadorId, notas, onClose }) => {
    const [notasData, setNotasData] = useState<string[]>(notas);

    const handleNotaChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedNotas = [...notasData];
        updatedNotas[index] = e.target.value;
        setNotasData(updatedNotas);
    };

    const handleActualizarNota = async (index: number) => {
        try {
            const updatedNota = notasData[index];
            await updateNotaRequest(prestadorId, index, updatedNota);
            onClose();
        } catch (error) {
            console.error('Error al actualizar la nota:', error);
        }
    };

    const handleBorrarNota = async (index: number) => {
        try {
            await updateNotaRequest(prestadorId, index, '');
            onClose();
        } catch (error) {
            console.error('Error al borrar la nota:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Editar Notas</h2>
                {notasData.map((nota, index) => (
                    <div key={index} className="mb-4">
                        <label className="block font-bold mb-1" htmlFor={`nota-${index}`}>
                            Nota {index + 1}
                        </label>
                        <div className="flex">
                            <input
                                type="text"
                                id={`nota-${index}`}
                                name={`nota-${index}`}
                                value={nota}
                                onChange={(e) => handleNotaChange(index, e)}
                                className="border border-gray-400 p-2 rounded-md flex-grow"
                            />
                            <button
                                type="button"
                                onClick={() => handleActualizarNota(index)}
                                className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Actualizar
                            </button>
                            <button
                                type="button"
                                onClick={() => handleBorrarNota(index)}
                                className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Borrar
                            </button>
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
                </div>
            </div>
        </div>
    );
};

export default ModalEditarNotas;