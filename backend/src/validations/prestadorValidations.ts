import { Request, Response, NextFunction } from 'express';
import { Prestador } from '../models';
import { mesesArray } from '../utils';

export const validateCreatePrestador = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, userId, prestador: nombrePrestador, localidad, tipo, notas, years } = req.body as Prestador;
        if (!id || !userId || !nombrePrestador || !localidad || !tipo || !notas || !years) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        if (id.toString().length !== 6) {
            return res.status(400).json({ error: 'ID must have 6 digits' });
        }
        if (userId <= 0) {
            return res.status(400).json({ error: 'Invalid userId' });
        }
        if (Array.isArray(years) && years.length === 0) {
            const currentYear = new Date().getFullYear();
            const defaultYears = [
                {
                    year: currentYear,
                    meses: [...mesesArray],
                },
            ];
            req.body.years = defaultYears;
        }
        next();
    } catch (error) {
        console.error('Error during prestador validation:', error);
        res.status(500).json({ error: 'Failed to validate prestador' });
    }
};