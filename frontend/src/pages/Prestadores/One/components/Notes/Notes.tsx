import React from 'react';
import { Prestador } from '../../../../../model';

interface NotasProps {
  prestador: Prestador;
}

const Notes: React.FC<NotasProps> = ({ prestador }) => {
  return (
    <div className=' flex pt-10 w-full justify-center'>
      <ul className="list-disc pl-4">
        {prestador.notas.map((nota, index) => (
          <li key={index} className="mb-2">{nota}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;