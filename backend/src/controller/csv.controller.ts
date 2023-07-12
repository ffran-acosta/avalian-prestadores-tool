import { Request, Response } from 'express';
import { db } from '../database';
import { Prestador } from '../models';
import { generateCSV } from '../utils';

export const csvController = {
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
    }
};