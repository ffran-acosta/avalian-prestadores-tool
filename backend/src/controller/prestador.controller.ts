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
            console.error('Error retrieving prestadores:', error);
            res.status(500).json({ error: 'Failed to retrieve prestadores' });
        }
    },

    createPrestador: async (req: Request, res: Response) => {
        try {
            const newPrestador: Prestador = { ...req.body }
            await localDb.none(
                'INSERT INTO prestadores (id, user_id, prestador, localidad, tipo, notas, years) VALUES ($1, $2, $3, $4, $5, $6, CAST($7 AS JSONB[]))',
                [newPrestador.id, newPrestador.userId, newPrestador.prestador, newPrestador.localidad, newPrestador.tipo, newPrestador.notas, newPrestador.years]
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

            const prestadorExists = await localDb.oneOrNone<Prestador>('SELECT * FROM prestadores WHERE id = $1', [prestadorId]);
            if (!prestadorExists) {
                return res.status(404).json({ error: 'Prestador not found' });
            }
            const updatedPrestador: Prestador = {
                ...prestadorExists,
                prestador: prestador || prestadorExists.prestador,
                localidad: localidad || prestadorExists.localidad,
                tipo: tipo || prestadorExists.tipo,
            };
            await localDb.none(
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
            const prestadorExists = await localDb.oneOrNone<Prestador>('SELECT * FROM prestadores WHERE id = $1', [prestadorId]);
            if (!prestadorExists) {
                return res.status(404).json({ error: 'Prestador not found' });
            }
            await localDb.none('DELETE FROM prestadores WHERE id = $1', [prestadorId]);
            res.status(200).json({ message: 'Prestador deleted successfully' });
        } catch (error) {
            console.error('Error deleting prestador:', error);
            res.status(500).json({ error: 'Failed to delete prestador' });
        }
    },
}