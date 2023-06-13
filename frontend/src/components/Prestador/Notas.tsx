import React from 'react';
import { Prestador } from '../../model';

interface Props {
    prestador: Prestador;
}

const NotasSection: React.FC<Props> = ({ prestador }) => {
    return (
        <div className="w-4/5 mx-auto text-center mt-10" >
            <h3 className=''>Notas:</h3>
            <ul>
                {prestador.notas.map((nota, index) => (
                    <li key={index}>{nota}</li>
                ))}
            </ul>
        </div>
    );
};

export default NotasSection;