import { Request, Response } from 'express';
import { db } from '../database';
import { Prestador} from '../models';
import { prestadorExists } from '../utils';


export const prestadorController = {
    getPrestadores: async (req: Request, res: Response) => {
        try {
            const userId: string = req.user.id;
            const prestadores = await db.any<Prestador>('SELECT * FROM prestadores WHERE user_id = $1', [userId]);
            res.json(prestadores);
        } catch (error) {
            console.error('Error retrieving prestadores:', error);
            res.status(500).json({ error: 'Failed to retrieve prestadores' });
        }
    },

    createPrestador: async (req: Request, res: Response) => {
        try {
            const newPrestador: Prestador = { ...req.body };
            await db.none(
                'INSERT INTO prestadores (id, user_id, prestador, localidad, tipo, notas, years) VALUES ($1, $2, $3, $4, $5, $6, CAST($7 AS JSONB[]))',
                [
                    newPrestador.id,
                    newPrestador.userId,
                    newPrestador.prestador,
                    newPrestador.localidad,
                    newPrestador.tipo,
                    newPrestador.notas,
                    newPrestador.years,
                ]
            );
            res.status(201).json({ message: 'Prestador created successfully' });
        } catch (error) {
            console.error('Error creating prestador:', error);
            res.status(500).json({ error: 'Failed to create prestador' });
        }
    },

    updatePrestador: async (req: Request, res: Response) => {
        try {
            const prestadorId: string = req.params.id;
            const { prestador, localidad, tipo }: Partial<Prestador> = req.body;

            const existingPrestador = await prestadorExists(prestadorId, req.user.id);
            if (!existingPrestador) {
                return res.status(404).json({ error: 'Prestador not found' });
            }
            const updatedPrestador: Prestador = {
                ...existingPrestador,
                prestador: prestador || existingPrestador.prestador,
                localidad: localidad || existingPrestador.localidad,
                tipo: tipo || existingPrestador.tipo,
            };
            await db.none(
                'UPDATE prestadores SET prestador = $1, localidad = $2, tipo = $3 WHERE id = $4',
                [updatedPrestador.prestador, updatedPrestador.localidad, updatedPrestador.tipo, prestadorId]
            );
            res.status(200).json({ message: 'Prestador updated successfully' });
        } catch (error) {
            console.error('Error updating prestador:', error);
            res.status(500).json({ error: 'Failed to update prestador' });
        }
    },

    deletePrestador: async (req: Request, res: Response) => {
        try {
            const prestadorId: string = req.params.id;

            const prestador = await prestadorExists(prestadorId, req.user.id);
            if (!prestador) {
                return res.status(404).json({ error: 'Prestador not found' });
            }
            await db.none('DELETE FROM prestadores WHERE id = $1', [prestadorId]);
            res.status(200).json({ message: 'Prestador deleted successfully' });
        } catch (error) {
            console.error('Error deleting prestador:', error);
            res.status(500).json({ error: 'Failed to delete prestador' });
        }
    },


    // importXSLX: async (req: Request, res: Response) => {
    //     try {
    //         const file: any = req.file;
    //         const workbook = xlsx.readFile(file.path);
    //         const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    //         const jsonData: any[][] = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    //         const groupedData: { [id: string]: any[] } = {};
    //         for (const row of jsonData) {
    //             const id: string = row[0];
    //             if (id !== undefined) {
    //                 if (!groupedData[id]) {
    //                     groupedData[id] = [];
    //                 }
    //                 groupedData[id].push(row);
    //             }
    //         }
    //         for (const id in groupedData) {
    //             const rows = groupedData[id];
    //             const prestador = await prestadorExists(id, req.user.id);
    //             const years: Year[] = [];
    //             let currentYear: Year | null = null;
    //             for (const row of rows) {
    //                 const [, , localidad, tipo, year, ...meses] = row;
    //                 if (year !== undefined) {
    //                     const parsedYear = parseInt(year);
    //                     currentYear = {
    //                         year: parsedYear,
    //                         meses: [],
    //                     };
    //                     years.push(currentYear);
    //                 }
    //                 const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    //                 if (currentYear) {
    //                     for (let i = 0; i < meses.length; i++) {
    //                         const valor: number = parseInt(row[i + 5]) || 0;
    //                         const mesObj: Mes = {
    //                             mes: months[i],
    //                             valor,
    //                         };
    //                         currentYear.meses.push(mesObj);
    //                     }
    //                 }
    //             }
    //             if (prestador) {
    //                 const updatedPrestador: Prestador = {
    //                     ...prestador,
    //                     years,
    //                 };
    //                 await db.none(
    //                     'UPDATE prestadores SET years = CAST($1 AS JSONB[]) WHERE id = $2',
    //                     [JSON.stringify(years), prestador.id]
    //                 );
    //             } else {
    //                 const newPrestador: Prestador = {
    //                     id: parseInt(id),
    //                     userId: req.user.id,
    //                     prestador: rows[0][1],
    //                     localidad: rows[0][2],
    //                     tipo: rows[0][3],
    //                     notas: [],
    //                     years,
    //                 };
    //                 await db.none(
    //                     'INSERT INTO prestadores (id, user_id, prestador, localidad, tipo, notas, years) VALUES ($1, $2, $3, $4, $5, $6, CAST($7 AS JSONB[]))',
    //                     [
    //                         newPrestador.id,
    //                         newPrestador.userId,
    //                         newPrestador.prestador,
    //                         newPrestador.localidad,
    //                         newPrestador.tipo,
    //                         newPrestador.notas,
    //                         newPrestador.years,
    //                     ]
    //                 );
    //             }
    //         }
    //         res.status(200).json({ message: 'Prestadores imported successfully' });
    //     } catch (error) {
    //         console.error('Error importing prestadores:', error);
    //         res.status(500).json({ error: 'Failed to import prestadores' });
    //     }
    // },
};