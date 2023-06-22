import { Request, Response } from 'express';
import { Prestador } from '../models/Prestador';
import { localDb } from '../database';


export const prestadorController = {
    getPrestadores: async (_req: Request, res: Response) => {
        try {
            const query = `
        SELECT
            P.id,
            P.prestador,
            P.localidad,
            P.tipo,
            N.nota,
            A.year,
            M.mes,
            M.valor
        FROM Prestadores AS P
        LEFT JOIN Notas AS N ON P.id = N.prestadorId
        LEFT JOIN Anios AS A ON P.id = A.prestadorId
        LEFT JOIN Meses AS M ON A.id = M.anioId;
        `;
            const result = await localDb.any(query);
            const prestadoresMap = new Map<number, Prestador>();
            const prestadores: Prestador[] = [];
            result.forEach((row: any) => {
                const prestadorId = row.id;
                if (!prestadoresMap.has(prestadorId)) {
                    const prestador: Prestador = {
                        id: prestadorId,
                        prestador: row.prestador,
                        localidad: row.localidad,
                        tipo: row.tipo,
                        notas: [],
                        years: [],
                    };
                    prestadoresMap.set(prestadorId, prestador);
                    prestadores.push(prestador);
                }
                if (row.nota) {
                    const prestador = prestadoresMap.get(prestadorId);
                    // Verificación adicional antes de acceder a las propiedades
                    if (prestador) {
                        prestador.notas.push(row.nota);
                    }
                }
                if (row.year && row.mes && row.valor) {
                    const prestador = prestadoresMap.get(prestadorId);
                    // Verificación adicional antes de acceder a las propiedades
                    if (prestador) {
                        const year = prestador.years.find((y) => y.year === row.year);
                        if (year) {
                            year.meses.push({ mes: row.mes, valor: row.valor });
                        } else {
                            prestador.years.push({
                                year: row.year,
                                meses: [{ mes: row.mes, valor: row.valor }],
                            });
                        }
                    }
                }
            });
            res.json(prestadores);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los prestadores' });
        }
    },
};