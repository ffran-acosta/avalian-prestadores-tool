import { Request, Response } from 'express';
import { localDb } from '../database';
import { Mes } from '../models';

export const refValuesController = {
    getRefValues: async (req: Request, res: Response) => {
        try {
            const refValues = await localDb.any<Mes>('SELECT * FROM ref_values');
            res.json(refValues);
        } catch (error) {
            console.error('Error retrieving tabla data:', error);
            res.status(500).json({ error: 'Failed to retrieve tabla data' });
        }
    },

    updateRefValues: async (req: Request, res: Response) => {
        try {
            const updatedValues: Mes[] = req.body;
            const updatedValuesQuery = updatedValues.map((value) => `('${value.mes}', ${value.valor})`).join(',');
            await localDb.none(`
                INSERT INTO ref_values (mes, valor)
                VALUES ${updatedValuesQuery}
                ON CONFLICT (mes)
                DO UPDATE SET valor = EXCLUDED.valor
            `);
            res.status(200).json({ message: 'Ref values updated successfully' });
        } catch (error) {
            console.error('Error updating ref values:', error);
            res.status(500).json({ error: 'Failed to update ref values' });
        }
    },
};