import { useState } from 'react';
import { Prestador } from '../../../../../../model';
import { updatePrestadorRequest, deletePrestadorRequest } from '../../../../../../services';
import { useNavigate } from 'react-router-dom';

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
        <h2 className="text-xl font-bold mb-4">Editar Prestador</h2>
        <button
          type="button"
          onClick={handleDeletePrestador}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Eliminar
        </button>
        <form>
          <div className="mb-4">
            <label htmlFor="prestador">Prestador:</label>
            <input
              type="text"
              id="prestador"
              name="prestador"
              value={editedPrestador.prestador}
              onChange={handleInputChange}
              className="border border-gray-400 p-2 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="localidad">Localidad:</label>
            <input
              type="text"
              id="localidad"
              name="localidad"
              value={editedPrestador.localidad}
              onChange={handleInputChange}
              className="border border-gray-400 p-2 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tipo">Tipo:</label>
            <input
              type="text"
              id="tipo"
              name="tipo"
              value={editedPrestador.tipo}
              onChange={handleInputChange}
              className="border border-gray-400 p-2 rounded-md w-full"
            />
          </div>
          <div className="flex justify-between">
            <div>
              <button
                type="button"
                onClick={onClose}
                className="mr-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveChanges}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PrestadorUpdateModal;