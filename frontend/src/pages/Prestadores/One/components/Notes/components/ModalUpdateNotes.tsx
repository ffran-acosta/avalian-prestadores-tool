import React, { useState } from 'react';
import { deleteNotaRequest, updateNotaRequest } from '../../../../../../services';
import { ModalPage } from '../../../../../../model';


const ModalEditNotes: React.FC<ModalPage> = ({ prestador, onClose }) => {
    const [notasData, setNotasData] = useState<string[]>(prestador?.notas || []);
    const handleNotaChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedNotas = [...notasData];
        updatedNotas[index] = e.target.value;
        setNotasData(updatedNotas);
    };

    const handleUpdateNote = async (index: number) => {
        try {
            const updatedNota = notasData[index];
            if (prestador) {
                await updateNotaRequest(prestador.id, index, updatedNota);
            }
            onClose();
            window.location.reload();
        } catch (error) {
            console.error('Error al actualizar la nota:', error);
        }
    };

    const handleDeleteNote = async (index: number) => {
        try {
            const confirmDelete = window.confirm('¿Estás seguro de que deseas borrar esta nota?');
            if (confirmDelete) {
                if (prestador) {
                    await deleteNotaRequest(prestador.id, index);
                }
                onClose();
                window.location.reload();
            }
        } catch (error) {
            console.error('Error deleting the note:', error);
        }
    };
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 w-full">
            <div className="bg-white p-4 rounded-lg w-2/4">
                <h2 className="text-xl font-bold mb-4">Editar Notas</h2>
                <div className="h-96 overflow-y-auto my-4 px-4">
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
                                    onClick={() => handleUpdateNote(index)}
                                    className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Actualizar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteNote(index)}
                                    className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Borrar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
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

export default ModalEditNotes;