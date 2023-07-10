import { useState } from 'react';
import { Prestador } from '../../../../../../model';
import { updatePrestadorRequest, deletePrestadorRequest } from '../../../../../../services';
import { useNavigate } from 'react-router-dom';
import { h2, inputStyles, modalLabel, standarGreenButton, standarRedButton } from '../../../../../../styles';

interface ModalEditPrestadorProps {
  prestador: Prestador;
  onClose: () => void;
}

const PrestadorUpdateModal: React.FC<ModalEditPrestadorProps> = ({ prestador, onClose }) => {
  const [editedPrestador, setEditedPrestador] = useState<Prestador>(prestador);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedPrestador((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await updatePrestadorRequest(editedPrestador);
      onClose();
      window.location.reload();

    } catch (error) {
      console.error('Error updating prestador:', error);
    }
  };

  const handleDeletePrestador = async () => {
    const confirmation = prompt('Para confirmar, escriba "eliminar"');
    if (confirmation && confirmation.toLowerCase() === 'eliminar') {
      try {
        await deletePrestadorRequest(editedPrestador.id.toString());
        onClose();
        navigate('/prestadores');
      } catch (error) {
        console.error('Error deleting prestador:', error);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg max-w-4/5">
        <h2 className={h2}>Editar Prestador</h2>
        <div className='flex justify-center mb-5'>
          <button
            type="button"
            onClick={handleDeletePrestador}
            className={standarRedButton}
          >
            Eliminar
          </button>
        </div>
        <form>
          <div className="mb-4">
            <label className={modalLabel} htmlFor="prestador">Prestador:</label>
            <input
              type="text"
              id="prestador"
              name="prestador"
              value={editedPrestador.prestador}
              onChange={handleInputChange}
              className={inputStyles}
            />
          </div>
          <div className="mb-4">
            <label className={modalLabel} htmlFor="localidad">Localidad:</label>
            <input
              type="text"
              id="localidad"
              name="localidad"
              value={editedPrestador.localidad}
              onChange={handleInputChange}
              className={inputStyles}
            />
          </div>
          <div className="mb-4">
            <label className={modalLabel} htmlFor="tipo">Tipo:</label>
            <input
              type="text"
              id="tipo"
              name="tipo"
              value={editedPrestador.tipo}
              onChange={handleInputChange}
              className={inputStyles}
            />
          </div>
          <div>
            <div>
              <div>
                <button
                  type="button"
                  onClick={onClose}
                  className={standarRedButton}
                >
                  Cancelar
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleSaveChanges}
                  className={standarGreenButton}
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PrestadorUpdateModal;