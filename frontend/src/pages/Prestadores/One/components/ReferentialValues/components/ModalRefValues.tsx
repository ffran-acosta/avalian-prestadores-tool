import React, { useEffect, useState } from 'react';
import { getRefValuesRequest, updateRefValuesRequest } from '../../../../../../services/refValues.service';
import { Mes } from '../../../../../../model';
import { h2, modalLabel, standarGreenButton, standarRedButton } from '../../../../../../styles';


interface ModalEditarValoresProps {
    onClose: () => void;
}

const ModalEditarValores: React.FC<ModalEditarValoresProps> = ({ onClose }) => {
    const [refValues, setRefValues] = useState<Mes[]>([]);

    useEffect(() => {
        const fetchRefValues = async () => {
            try {
                const refValuesData = await getRefValuesRequest();
                setRefValues(refValuesData);
            } catch (error) {
                console.error('Error al obtener los valores de referencia:', error);
            }
        };

        fetchRefValues();
    }, []);

    const handleValueChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedRefValues = [...refValues];
        updatedRefValues[index].valor = parseFloat(e.target.value);
        setRefValues(updatedRefValues);
    };

    const handleUpdateValues = async () => {
        try {
            await updateRefValuesRequest(refValues);
            onClose();
            window.location.reload();
        } catch (error) {
            console.error('Error al actualizar los valores de referencia:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 w-full">
            <div className="bg-white p-4 rounded-lg w-2/4">
                <h2 className={h2}>Editar Valores</h2>
                <div className="h-96 overflow-y-auto my-4 px-4">
                    {refValues.map((item, index) => (
                        <div key={index} className="mb-4">
                            <label className={modalLabel} htmlFor={`valor-${index}`}>
                                {item.mes}:
                            </label>
                            <div className="flex">
                                <input
                                    type="number"
                                    id={`valor-${index}`}
                                    name={`valor-${index}`}
                                    value={item.valor !== null ? item.valor.toString() : ''}
                                    step="any"
                                    onChange={(e) => handleValueChange(index, e)}
                                    className="border border-gray-400 p-2 rounded-md w-full"
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className={standarRedButton}
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleUpdateValues}
                        className={standarGreenButton}
                    >
                        Guardar
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ModalEditarValores;