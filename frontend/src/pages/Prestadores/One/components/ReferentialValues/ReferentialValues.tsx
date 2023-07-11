import { useEffect, useState } from 'react';
import { getRefValuesRequest } from '../../../../../services/refValues.service';
import { ninetyPercent, ninetyPercentArray, ninetyTwoPercent, ninetyTwoPercentArray, oneYearEffectiveInterestRates, oneYearNominalInterestRates } from '../../../../../util';
import { Mes } from '../../../../../model';
import ModalEditarValores from './components/ModalRefValues';
import { standarBlueButton } from '../../../../../styles';


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
                        <th>INCREMENTOS</th>
                        {refValues.map((item) => (
                            <th key={item.mes}>{item.mes}</th>
                        ))}
                        <th>TOT. LINEAL</th>
                        <th>TOT. ACUM.</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td className="font-bold  text-blue-500">S.S. SALUD</td>
                        {refValues.map((item) => (
                            <td className=' text-blue-500' key={item.mes}>{item.valor}%</td>
                        ))}
                        <td className="font-bold  text-blue-500">{oneYearNominalInterestRates(refValues)}%</td>
                        <td className="font-bold text-blue-500 text-">{oneYearEffectiveInterestRates(refValues)}%</td>
                    </tr>
                    <tr>
                        <td className="font-bold text-green-500">A. PREST: 90%</td>
                        {refValues.map((item) => (
                            <td className='text-green-500' key={item.mes}>{ninetyPercent(item.valor)}%</td>
                        ))}
                        <td className="font-bold text-green-500">{ninetyPercentArray(refValues)}%</td>
                        <td className="font-bold text-green-500">{ninetyPercent(oneYearEffectiveInterestRates(refValues))}%</td>
                    </tr>
                    <tr>
                        <td className="font-bold">U.A.S. 92%</td>
                        {refValues.map((item) => (
                            <td key={item.mes}>{ninetyTwoPercent(item.valor)}%</td>
                        ))}
                        <td className="font-bold">{ninetyTwoPercentArray(refValues)}%</td>
                        <td className="font-bold">{ninetyTwoPercent(oneYearEffectiveInterestRates(refValues))}%</td>
                    </tr>
                </tbody>
            </table>
            <div className='flex w-full justify-center mt-2'>
                <button
                    className={standarBlueButton}
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