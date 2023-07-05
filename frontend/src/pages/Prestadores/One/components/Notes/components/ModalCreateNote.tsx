import React, { useState } from 'react';
import { createNotaRequest } from '../../../../../../services';
import { ModalPage } from '../../../../../../model';

const ModalCreateNotes: React.FC<ModalPage> = ({ prestador, onClose }) => {
    const [nota, setNota] = useState('');
    const [error, setError] = useState('');

    const handleNotaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNota(e.target.value);
        setError('');
    };

    const handleCreateNote = async () => {
        try {
            if (nota.trim() === '') {
                setError('El campo de nota no puede estar vacío');
                return;
            }
            if (prestador) {
                await createNotaRequest(prestador.id, nota);
            }
            onClose();
            window.location.reload();
        } catch (error) {
            console.error('Error creating the note:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 w-full">
            <div className="bg-white p-4 rounded-lg w-2/4">
                <h2 className="text-xl font-bold mb-4">Crear Nueva Nota</h2>
                <form>
                    <div className="mb-4">
                        <label className="block font-bold mb-1" htmlFor="nota">
                            Nota
                        </label>
                        <div>
                            <input
                                type="text"
                                id="nota"
                                name="nota"
                                value={nota}
                                onChange={handleNotaChange}
                                className="border border-gray-400 p-2 rounded-md w-full"
                            />
                            {error && <p className="text-red-500">{error}</p>}
                        </div>
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
                            onClick={handleCreateNote}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Guardar Nota
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalCreateNotes;