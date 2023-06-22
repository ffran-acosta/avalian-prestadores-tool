import { Request, Response } from 'express';
import { localDb } from '../database';
import { Prestador } from '../models';

export const prestadorController = {
    getPrestadores: async (req: Request, res: Response) => {
        try {
            const userId = req.user.id;
            const prestadores = await localDb.any<Prestador>('SELECT * FROM prestadores WHERE user_id = $1', [userId]);
            res.json(prestadores)
        } catch (error) {
            console.error('Error retrieving test:', error);
            res.status(500).json({ error: 'Failed to retrieve prestadores' });
        }
    }
}