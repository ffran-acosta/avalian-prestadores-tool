import { useParams } from 'react-router-dom';
import { Prestadores } from '../../../data';
import { Prestador } from '../../../model';
import { Notes, PeriodCalc, ReferentialValues, YearTable } from '.';
import { historicTNA } from '../../../util';

const PrestadorDetail = () => {
  
  const { id } = useParams<{ id: string }>();
  const prestadorId = parseInt(id || '');
  const prestador: Prestador | undefined = Prestadores.find((p) => p.id === prestadorId);

  if (!prestador) {
    return <div>Prestador no encontrado</div>;
  }

  return (
    <div className="flex justify-center mt-10 flex-wrap w-full">
      <div className="flex w-full mt-4 justify-center">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Prestador</th>
              <th>Localidad</th>
              <th>Tipo</th>
              <th>Total Lineal</th>
              <th>Total Acumulado</th>
            </tr>
          </thead>
          <tbody >
            <tr key={prestador.id}>
              <td>{prestador.id}</td>
              <td>{prestador.prestador}</td>
              <td>{prestador.localidad}</td>
              <td>{prestador.tipo}</td>
              <td>{historicTNA(prestador.years)}</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex w-full mt-4 justify-center">
        <ReferentialValues />
      </div>
      <div className="flex w-full mt-4 justify-center">
        <YearTable years={prestador.years} />
      </div>
      <div className="flex w-full mt-4 justify-center">
        <PeriodCalc years={prestador.years} />
      </div>
      <div className="flex w-full mt-4 justify-center">
        <Notes prestador={prestador} />
      </div>

    </div>
  );
};

export default PrestadorDetail;