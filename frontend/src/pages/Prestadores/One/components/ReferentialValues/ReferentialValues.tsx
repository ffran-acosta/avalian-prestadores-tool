import { useEffect, useState } from 'react';
import { getRefValuesRequest } from '../../../../../services/refValues.service';
import { ninetyPercent, ninetyPercentArray, ninetyTwoPercent, ninetyTwoPercentArray, oneYearEffectiveInterestRates, oneYearNominalInterestRates } from '../../../../../util';
import { Mes } from '../../../../../model';
import ModalEditarValores from './components/ModalRefValues';


const ReferentialValues = () => {
    const [refValues, setRefValues] = useState<Mes[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchRefValues = async () => {
            try {
                const data = await getRefValuesRequest();
                setRefValues(data);
            } catch (error) {
                console.error('Error al obtener los valores de referencia:', error);
            }
        };

        fetchRefValues();
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {refValues.map((item) => (
                            <th key={item.mes}>{item.mes}</th>
                        ))}
                        <th>Tot Lineal</th>
                        <th>Tot Acum.</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="font-bold">SSS</td>
                        {refValues.map((item) => (
                            <td key={item.mes}>{item.valor}%</td>
                        ))}
                        <td className="font-bold">{oneYearNominalInterestRates(refValues)}%</td>
                        <td className="font-bold">{oneYearEffectiveInterestRates(refValues)}%</td>
                    </tr>
                    <tr>
                        <td className="font-bold">90%</td>
                        {refValues.map((item) => (
                            <td key={item.mes}>{ninetyPercent(item.valor)}%</td>
                        ))}
                        <td className="font-bold">{ninetyPercentArray(refValues)}%</td>
                        <td className="font-bold"></td>
                    </tr>
                    <tr>
                        <td className="font-bold">92%</td>
                        {refValues.map((item) => (
                            <td key={item.mes}>{ninetyTwoPercent(item.valor)}%</td>
                        ))}
                        <td className="font-bold">{ninetyTwoPercentArray(refValues)}%</td>
                    </tr>
                </tbody>
            </table>
            <div className='flex w-full justify-center'>
                <button
                    className='mt-2 px-4 py-2 bg-blue-500 text-white rounded'
                    onClick={openModal}
                >
                    Editar SSS
                </button>
            </div>

            {isModalOpen && <ModalEditarValores onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default ReferentialValues;