import { Request, Response } from 'express';
import { localDb } from '../database';

export const controller = {
    test : async (req: Request, res: Response) => {
        try {
            const test = await localDb.any('SELECT * FROM testing_table');
            res.json(test);
        } catch (error) {
            console.error('Error retrieving test:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
