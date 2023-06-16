import React, { useState } from 'react';
import { Prestador } from '../../../../../model';
import ReactModal from 'react-modal';

interface NotasProps {
  prestador: Prestador;
}
const Notes: React.FC<NotasProps> = ({ prestador }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };
  const handleGuardar = () => {
    closeModal();
  };

  return (
    <div className=' flex pt-10 w-full justify-center flex-wrap'>
      <div className='flex w-full justify-center'>
        <ul className="list-disc pl-4">
          {prestador.notas.map((nota, index) => (
            <li key={index} className="mb-2">{nota}</li>
          ))}
        </ul>
      </div>

      <div className='flex w-full justify-center'>
        <button
          className='mt-2 px-4 py-2 bg-blue-500 text-white rounded'
          onClick={() => setModalOpen(true)}
        >
          Editar Notas
        </button>
      </div>

      <ReactModal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Editar Valores Modal"
        className="bg-white p-4 m-auto"
      >
        <div className='flex justify-center'>
          <div className='flex w-full justify-center'>
            <ul className="list-disc pl-4">
              {prestador.notas.map((nota, index) => (
                <li key={index} className="mb-2">{nota}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className='flex justify-center mt-4'>
          <button
            onClick={handleGuardar}
          >
            Guardar
          </button>
        </div>
      </ReactModal>

    </div>

    
    
  );
};

export default Notes;