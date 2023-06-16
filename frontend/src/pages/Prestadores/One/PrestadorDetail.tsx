import { useParams } from 'react-router-dom';
import { Prestadores } from '../../../data';
import { Prestador } from '../../../model';
import { Notes, PeriodCalc, YearTable } from '.';
import { historicTNA } from '../../../util';
import ReferentialValues from './components/ReferentialValues/ReferentialValuesReferentialValues';

const PrestadorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const prestadorId = parseInt(id || '');
  const prestador: Prestador | undefined = Prestadores.find((p) => p.id === prestadorId);

  if (!prestador) {
    return <div>Prestador no encontrado</div>;
  }

  return (
    <div className="flex justify-center mt-10 flex-wrap w-full">
      <div className="flex justify-center w-5/6">
        <table>
          <thead className="text-center">
            <tr className="border border-gray-800 text-lg">
              <th className="p-4">ID</th>
              <th className="p-4">Prestador</th>
              <th className="p-4">Localidad</th>
              <th className="p-4">Tipo</th>
              <th className="p-4">Total Lineal</th>
              <th className="p-4">Total Acumulado</th>
            </tr>
          </thead>
          <tbody className="text-center border border-gray-800">
            <tr className="border border-gray-800" key={prestador.id}>
              <td className="p-4">{prestador.id}</td>
              <td className="p-4">{prestador.prestador}</td>
              <td className="p-4">{prestador.localidad}</td>
              <td className="p-4">{prestador.tipo}</td>
              <td className="p-4">{historicTNA(prestador.years)}</td>
              <td className="p-4">0</td>
            </tr>
          </tbody>
        </table>
      </div>
      <ReferentialValues/>
      <YearTable years={prestador.years} />
      <PeriodCalc years={prestador.years} />
      <Notes prestador={prestador} />

    </div>
  );
};

export default PrestadorDetail;