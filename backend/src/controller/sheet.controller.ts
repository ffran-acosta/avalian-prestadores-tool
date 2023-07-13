import { Request, Response } from 'express';
import { db } from '../database';
import { Mes, Prestador, Year } from '../models';
import { generateCSV, prestadorExists } from '../utils';
import xlsx from 'xlsx';

export const sheetController = {
    exportCSV: async (req: Request, res: Response) => {
        try {
            const userId: string = req.user.id;
            const prestadores = await db.any<Prestador>('SELECT * FROM prestadores WHERE user_id = $1', [userId]);
            const csvData = await generateCSV(prestadores);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename=Prestadores.csv');
            res.send(csvData);
        } catch (error) {
            console.error('Error al exportar a CSV:', error);
            res.status(500).json({ error: 'Error al exportar a CSV' });
        }
    },

    importXSLX: async (req: Request, res: Response) => {
        try {
            const file: any = req.file;
            const workbook = xlsx.readFile(file.path);
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData: any[][] = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
            const groupedData: { [id: string]: any[] } = {};
            for (const row of jsonData) {
                const id: string = row[0];
                if (id !== undefined && id !== 'ID') {
                    if (!groupedData[id]) {
                        groupedData[id] = [];
                    }
                    groupedData[id].push(row);
                }
            }
            for (const id in groupedData) {
                const rows = groupedData[id];
                const prestador = await prestadorExists(id, req.user.id);
                const years: Year[] = [];
                let currentYear: Year | null = null;
                for (const row of rows) {
                    const [, , localidad, tipo, year, ...meses] = row;
                    if (year !== undefined) {
                        const parsedYear = parseInt(year);
                        currentYear = {
                            year: parsedYear,
                            meses: [],
                        };
                        years.push(currentYear);
                    }
                    const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
                    if (currentYear) {
                        for (let i = 0; i < meses.length; i++) {
                            const valor: number = parseInt(row[i + 5]) || 0;
                            const mesObj: Mes = {
                                mes: months[i],
                                valor,
                            };
                            currentYear.meses.push(mesObj);
                        }
                    }
                }
                if (prestador) {
                    await db.none(
                        'UPDATE prestadores SET years = CAST($1 AS JSONB[]) WHERE id = $2',
                        [JSON.stringify(years), parseInt(id)]
                    );
                } else {
                    const newPrestador: Prestador = {
                        id: parseInt(id),
                        userId: req.user.id,
                        prestador: rows[0][1],
                        localidad: rows[0][2],
                        tipo: rows[0][3],
                        notas: [],
                        years,
                    };
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
                }
            }
            res.status(200).json({ message: 'Prestadores imported successfully' });
        } catch (error) {
            console.error('Error importing prestadores:', error);
            res.status(500).json({ error: 'Failed to import prestadores' });
        }
    },


};