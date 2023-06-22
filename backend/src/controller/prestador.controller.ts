import { Request, Response } from 'express';
import { localDb } from '../database';

export const prestadorController = {
    getPrestadores: async (req: Request, res: Response) => {
        try {
            const prestadores = await localDb.any('SELECT * FROM prestadores')
            res.json(prestadores)
        } catch (error) {
            console.error('Error retrieving test:', error);
            res.status(500).json({ error: 'Failed to retrieve users' });
        }
    }
}