import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { oneYearEffectiveInterestRates, oneYearNominalInterestRates } from '../../../../../util';
import { YearPage } from '../../../../../model';

const YearTable: React.FC<YearPage> = ({ years }) => {

  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };
  const handleGuardar = () => {
    closeModal();
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Año</th>
            {years[0].meses.map(mes => (
              <th key={mes.mes}>
                {mes.mes}
              </th>
            ))}
            <th>Tot Lineal</th>
            <th>Tot Acum.</th>
          </tr>
        </thead>
        <tbody >
          {years.map(year => (
            <tr key={year.year}>
              <td className="font-bold">{year.year}</td>
              {year.meses.map(mes => (
                <td key={mes.mes}>
                  {mes.valor}%
                </td>
              ))}
              <td className="font-bold">1 %</td>
              <td className="font-bold">1 %</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='flex w-full justify-center'>
        <button
          className='mt-2 px-4 py-2 bg-blue-500 text-white rounded'
          onClick={() => setModalOpen(true)}
        >
          Editar Valores
        </button>
      </div>

      <ReactModal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Editar Valores Modal"
        className=" bg-white p-4"
      >
        <div className='flex justify-center'>
          <table className=' w-3/5'>
            <thead className='text-center'>
              <tr className="border border-gray-800 text-lg">
                <th className='p-4'>Año</th>
                {years[0].meses.map(mes => (
                  <th key={mes.mes} className='p-4'>{mes.mes}</th>
                ))}
              </tr>
            </thead>
            <tbody className='text-center border border-gray-800'>
              {years.map(year => (
                <tr key={year.year} className='border border-gray-800'>
                  <td className='p-4 text-xl font-bold'>{year.year}</td>
                  {year.meses.map(mes => (
                    <td key={mes.mes} className='p-4'>{mes.valor} %</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='flex justify-center mt-4'>
          <button
            className='px-4 py-2 bg-blue-500 text-white rounded'
            onClick={handleGuardar}
          >
            Guardar
          </button>
        </div>
      </ReactModal>

    </div>    
  );
};

export default YearTable;