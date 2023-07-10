import React, { useState } from 'react';
import { PrestadorPage } from '../../../../../model';
import ModalCreateNotes from './components/ModalCreateNote';
import ModalUpdateNotes from './components/ModalUpdateNotes';
import { standarBlueButton } from '../../../../../styles';

const Notes: React.FC<PrestadorPage> = ({ prestador }) => {
  
  const [isModalCrearOpen, setIsModalCreateOpen] = useState(false);
  const [isModalEditarOpen, setIsModalEditOpen] = useState(false);

  const openModalCrear = () => {
    setIsModalCreateOpen(true);
  };

  const closeModalCreate = () => {
    setIsModalCreateOpen(false);
  };

  const openModalEdit = () => {
    setIsModalEditOpen(true);
  };

  const closeModalEdit = () => {
    setIsModalEditOpen(false);
  };

  const showEditButton = prestador.notas.length > 0

  return (
    <div className='flex pt-10 w-full justify-center flex-wrap'>
      <div className='flex w-full justify-center'>
        <ul className="list-disc pl-4">
          {prestador.notas.map((nota, index) => (
            <li key={index} className="mb-2">{nota}</li>
          ))}
        </ul>
      </div>

      <div className='flex w-full justify-center'>
        <button
          onClick={openModalCrear}
          className={standarBlueButton}
        >
          Crear Nota
        </button>
        {showEditButton && (
          <button
            onClick={openModalEdit}
            className={standarBlueButton}
          >
            Editar
          </button>
        )}
      </div>

      {isModalCrearOpen && (
        <ModalCreateNotes prestador={prestador} onClose={closeModalCreate} />
      )}

      {isModalEditarOpen && (
        <ModalUpdateNotes prestador={prestador} onClose={closeModalEdit} />
      )}
    </div>
  );
};

export default Notes;