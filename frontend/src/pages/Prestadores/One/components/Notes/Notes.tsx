import React, { useState } from 'react';
import { PrestadorPage } from '../../../../../model';
import ModalCrearNotas from './components/ModalCreateNote';
import ModalEditarNotas from './components/ModalUpdateNotes';

const Notes: React.FC<PrestadorPage> = ({ prestador }) => {
  const [isModalCrearOpen, setIsModalCrearOpen] = useState(false);
  const [isModalEditarOpen, setIsModalEditarOpen] = useState(false);

  const openModalCrear = () => {
    setIsModalCrearOpen(true);
  };

  const closeModalCrear = () => {
    setIsModalCrearOpen(false);
  };

  const openModalEditar = () => {
    setIsModalEditarOpen(true);
  };

  const closeModalEditar = () => {
    setIsModalEditarOpen(false);
  };

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
          className='mt-2 mr-1 px-4 py-2 bg-blue-500 text-white rounded'
          onClick={openModalCrear}
        >
          Crear Nota
        </button>
        <button
          className='mt-2 ml-1 px-4 py-2 bg-blue-500 text-white rounded'
          onClick={openModalEditar}
        >
          Editar
        </button>
      </div>

      {isModalCrearOpen && (
        <ModalCrearNotas prestadorId={prestador.id} onClose={closeModalCrear} />
      )}

      {isModalEditarOpen && (
        <ModalEditarNotas prestadorId={prestador.id} notas={prestador.notas} onClose={closeModalEditar} />
      )}
    </div>
  );
};

export default Notes;