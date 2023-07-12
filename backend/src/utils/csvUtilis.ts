import { Prestador } from '../models';

export const generateCSV = async (prestadores: Prestador[]) => {
    let csvData = 'ID,PRESTADOR,LOCALIDAD,TIPO,AÑO,'; // Encabezados fijos
    const meses = [
        'ENE',
        'FEB',
        'MAR',
        'ABR',
        'MAY',
        'JUN',
        'JUL',
        'AGO',
        'SEP',
        'OCT',
        'NOV',
        'DIC',
    ];
    csvData += meses.join(',') + '\n';

    prestadores.forEach((prestador) => {
        let primerFila = true;
        let filaBase = `${prestador.id},${prestador.prestador},${prestador.localidad},${prestador.tipo},`;

        prestador.years.forEach((year) => {
            if (primerFila) {
                csvData += filaBase;
                primerFila = false;
            } else {
                csvData += ',,,,';
            }
            csvData += `${year.year},`;
            meses.forEach((mes) => {
                const mesEncontrado = year.meses.find((m) => m.mes === mes);
                if (mesEncontrado) {
                    csvData += mesEncontrado.valor;
                }
                csvData += ',';
            });
            csvData += '\n';
        });
    });
    return csvData;
};
