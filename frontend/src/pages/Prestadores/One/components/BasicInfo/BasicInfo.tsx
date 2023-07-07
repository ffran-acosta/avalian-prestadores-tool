import { useState } from 'react';
import { PrestadorPage } from '../../../../../model';
import { ModalPrestadorUpdate } from '..';
import { oneYearNominalInterestRates } from '../../../../../util';

const BasicInfo: React.FC<PrestadorPage> = ({ prestador }) => {
    const [showEditModal, setShowEditModal] = useState(false);

    const handleEditPrestador = () => {
        setShowEditModal(true);
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Prestador</th>
                        <th>Localidad</th>
                        <th>Tipo</th>
                        <th>Total Lineal</th>
                        <th>Total Acumulado</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={prestador.id}>
                        <td>{prestador.id}</td>
                        <td>{prestador.prestador}</td>
                        <td>{prestador.localidad}</td>
                        <td>{prestador.tipo}</td>
                        <td>%</td>
                        <td>1%</td>
                        <td>
                            <button onClick={handleEditPrestador}>Editar Prestador</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            {showEditModal && (
                <ModalPrestadorUpdate prestador={prestador} onClose={() => setShowEditModal(false)} />
            )}
        </div>
    );
};

export default BasicInfo;