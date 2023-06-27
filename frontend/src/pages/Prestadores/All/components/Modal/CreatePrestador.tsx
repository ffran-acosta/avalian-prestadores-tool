import React, { useState } from 'react';
import { createPrestadorRequest } from '../../../../../services';
import { Prestador } from '../../../../../model';

interface ModalCrearPrestadorProps {
    onClose: () => void;
}

const ModalCrearPrestador: React.FC<ModalCrearPrestadorProps> = ({ onClose }) => {
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

    const handleCrearPrestador = async () => {
        try {
            await createPrestadorRequest(prestadorData);
            onClose();
        } catch (error) {
            console.error('Error al crear el prestador:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Crear Nuevo Prestador</h2>
                <form>
                    <div className="mb-4">
                        <label className="block font-bold mb-1" htmlFor="id">
                            ID
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
                        <label className="block font-bold mb-1" htmlFor="prestador">
                            Prestador
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
                        <label className="block font-bold mb-1" htmlFor="localidad">
                            Localidad
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
                        <label className="block font-bold mb-1" htmlFor="tipo">
                            Tipo
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
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleCrearPrestador}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
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
