import { Request, Response } from 'express';
import { db } from '../database';
import { Year } from '../models';
import { formatYearDb, getDefaultYear, prestadorExists } from '../utils';

export const yearController = {
    createYear: async (req: Request, res: Response) => {
        try {
            const year: number = req.body.year;
            const prestadorId: string = req.params.id;
            const prestador = await prestadorExists(prestadorId, req.user.id);
            if (!prestador) {
                return res.status(404).json({ error: 'Prestador not found' });
            }
            const newYearObject: Year = formatYearDb(year);
            const updatedYears: Year[] = [...prestador.years, newYearObject];
            await db.none('UPDATE prestadores SET years = $1::jsonb[] WHERE id = $2', [updatedYears, prestadorId]);
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
            const prestador = await prestadorExists(prestadorId, req.user.id);
            if (!prestador) {
                return res.status(404).json({ error: 'Prestador not found' });
            }
            await db.none('UPDATE prestadores SET years = $1::jsonb[] WHERE id = $2', [updatedYears, prestadorId]);
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
            const prestador = await prestadorExists(prestadorId, req.user.id);
            if (!prestador) {
                return res.status(404).json({ error: 'Prestador not found' });
            }
            let updatedYears: Year[] = prestador.years.filter((year: Year) => year.year !== yearToDelete);
            if (updatedYears.length === 0) {
                const defaultYear = getDefaultYear();
                updatedYears = [defaultYear];
            }
            await db.none('UPDATE prestadores SET years = $1::jsonb[] WHERE id = $2', [updatedYears, prestadorId]);
            res.status(200).json({ message: 'Year deleted successfully', years: updatedYears });
        } catch (error) {
            console.error('Error deleting year:', error);
            res.status(500).json({ error: 'Failed to delete year' });
        }
    },
};