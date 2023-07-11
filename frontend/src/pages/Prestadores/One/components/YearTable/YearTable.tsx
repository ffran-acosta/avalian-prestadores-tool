import React, { useState } from 'react';
import { Year, YearPage } from '../../../../../model';
import ModalCreateYear from './components/ModalYearTable';
import ModalEditValues from './components/ModalYearTableUpdate';
import { oneYearEffectiveInterestRates, oneYearNominalInterestRates } from '../../../../../util';
import { standarBlueButton, standarGreenButton } from '../../../../../styles';

const YearTable: React.FC<YearPage> = ({ years, prestador }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleCreateModalClose = () => {
    setShowCreateModal(false);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleAddYear = () => {
    setShowCreateModal(true);
  };

  const handleEditValues = () => {
    setShowEditModal(true);
  };

  const sortYears = (years: Year[]) => {
    return years.sort((a, b) => b.year - a.year);
  };

  const sortedYears = sortYears(years);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>AÑO</th>
            {years[0].meses.map((mes) => (
              <th key={mes.mes}>{mes.mes}</th>
            ))}
            <th>TOT. LINEAL</th>
            <th>TOT. ACUM.</th>
            <th>DIFERENCIA</th>
          </tr>
        </thead>
        <tbody>
          {sortedYears.map((year) => (
            <tr key={year.year}>
              <td className="font-bold">{year.year}</td>
              {year.meses.map((mes) => (
                <td key={mes.mes}>{mes.valor}%</td>
              ))}
              <td className="font-bold">{oneYearNominalInterestRates(year.meses)}%</td>
              <td className="font-bold">{oneYearEffectiveInterestRates(year.meses)}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex w-full justify-evenly mt-4">
        <button
          className={standarGreenButton}
          onClick={handleAddYear}
        >
          Añadir Año
        </button>
        <button
          className={standarBlueButton}
          onClick={handleEditValues}
        >
          Editar %
        </button>

      </div>

      {showCreateModal && (
        <ModalCreateYear prestador={prestador} onClose={handleCreateModalClose} />
      )}

      {showEditModal && (
        <ModalEditValues prestador={prestador} years={years} onClose={handleEditModalClose} />
      )}
    </div>
  );
};

export default YearTable;