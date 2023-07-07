import { Request, Response } from 'express';
import { localDb } from '../database';
import { Prestador, Year } from '../models';
import { formatYearDb } from '../utils/yearFormatDb';

export const yearController = {

    createYear: async (req: Request, res: Response) => {
        try {
            const year: number = req.body.year;
            const prestadorId: string = req.params.id;
            const prestadorExists = await localDb.oneOrNone<Prestador>('SELECT * FROM prestadores WHERE id = $1 AND user_id = $2', [prestadorId, req.user.id]);
            if (!prestadorExists) {
                return res.status(404).json({ error: 'Prestador not found' });
            }
            const newYearObject = formatYearDb(year)
            const updatedYears = [...prestadorExists.years, newYearObject];
            await localDb.none('UPDATE prestadores SET years = $1::jsonb[] WHERE id = $2', [updatedYears, prestadorId]);
            res.status(201).json({ message: 'Year created successfully' });
        } catch (error) {
            console.error('Error creating year:', error);
            res.status(500).json({ error: 'Failed to create year' });
        }
    },

    updateYear: async (req: Request, res: Response) => {
        try {
            const updatedYears: Year[] = req.body.years;
            const prestadorId: string = req.params.id;
            const prestadorExists = await localDb.oneOrNone<Prestador>('SELECT * FROM prestadores WHERE id = $1 AND user_id = $2', [prestadorId, req.user.id]);
            if (!prestadorExists) {
                return res.status(404).json({ error: 'Prestador not found' });
            }
            await localDb.none('UPDATE prestadores SET years = $1 WHERE id = $2', [updatedYears, prestadorId]);
            res.status(200).json({ message: 'Years updated successfully' });
        } catch (error) {
            console.error('Error updating years:', error);
            res.status(500).json({ error: 'Failed to update years' });
        }
    },

    deleteYear: async (req: Request, res: Response) => {
        try {
            const yearToDelete: number = parseInt(req.params.year);
            const prestadorId: string = req.params.id;
            const prestadorExists = await localDb.oneOrNone<Prestador>('SELECT * FROM prestadores WHERE id = $1 AND user_id = $2', [prestadorId, req.user.id]);
            if (!prestadorExists) {
                return res.status(404).json({ error: 'Prestador not found' });
            }
            if (prestadorExists.years.length > 0) {
                return res.status(400).json({ error: 'Failed to delete year' });
            }
            const updatedYears = prestadorExists.years.filter((year: Year) => year.year !== yearToDelete);
            await localDb.none('UPDATE prestadores SET years = $1 WHERE id = $2', [updatedYears, prestadorId]);
            res.status(200).json({ message: 'Year deleted successfully' });
        } catch (error) {
            console.error('Error deleting year:', error);
            res.status(500).json({ error: 'Failed to delete year' });
        }
    },
}