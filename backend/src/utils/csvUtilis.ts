import { Prestador } from '../models';

export const generateCSV = async (prestadores: Prestador[]) => {
    let csvData = 'ID,Prestador,Localidad,Tipo,Año,Mes,Valor\n';

    prestadores.forEach(prestador => {
        prestador.years.forEach(year => {
            year.meses.forEach(mes => {
                csvData += `${prestador.id},${prestador.prestador},${prestador.localidad},${prestador.tipo},${year.year},${mes.mes},${mes.valor}\n`;
            });
        });
    });

    return csvData;
};