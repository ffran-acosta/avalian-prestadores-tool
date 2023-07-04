import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Prestador } from '../../../model';
import { BasicInfo, Notes, PeriodCalc, ReferentialValues, YearTable } from '.';
import { prestadoresRequest } from '../../../services';

const PrestadorDetail = () => {

  const { id } = useParams<{ id: string }>();
  const prestadorId = parseInt(id || '');
  const [prestador, setPrestador] = useState<Prestador | undefined>(undefined);

  useEffect(() => {
    const fetchPrestador = async () => {
      try {
        const prestadores = await prestadoresRequest();
        const foundPrestador = prestadores.find((p: Prestador) => p.id === prestadorId);
        setPrestador(foundPrestador);
      } catch (error) {
        console.error('Failed to retrieve prestadores: ', error);
      }
    };

    fetchPrestador();
  }, [prestadorId]);


  if (!prestador) {
    return <div>Prestador no encontrado</div>;
  }

  return (
    <div className="flex justify-center mt-10 flex-wrap w-full">
      <div className="flex w-full mt-4 justify-center">
        <BasicInfo prestador={prestador} />
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