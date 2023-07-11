import { useState } from 'react';
import { PrestadorPage } from '../../../../../model';
import { ModalPrestadorUpdate } from '..';
import { standarBlueButton } from '../../../../../styles';

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
                        <th>PRESTADOR</th>
                        <th>LOCALIDAD</th>
                        <th>TIPO</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={prestador.id}>
                        <td>{prestador.id}</td>
                        <td className='text-red-500 text-transform: uppercase'>{prestador.prestador}</td>
                        <td>{prestador.localidad}</td>
                        <td>{prestador.tipo}</td>
                        <td>
                            <button className={standarBlueButton} onClick={handleEditPrestador}>Editar Prestador</button>
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