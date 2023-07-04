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

    createNota: async (req: Request, res: Response) => {
        try {
            const prestadorId = req.params.id; 
            const { nota } = req.body;

            const prestador = await localDb.oneOrNone<Prestador>('SELECT * FROM prestadores WHERE id = $1 AND user_id = $2', [prestadorId, req.user.id]);
            if (!prestador) {
                return res.status(404).json({ error: 'Prestador not found' });
            }

            prestador.notas.push(nota);

            await localDb.none('UPDATE prestadores SET notas = $1 WHERE id = $2', [prestador.notas, prestadorId]);

            res.status(201).json({ message: 'Nota created successfully' });
            
        } catch (error) {
            console.error('Error creating nota:', error);
            res.status(500).json({ error: 'Failed to create nota' });
        }
    },

    updateNota: async (req: Request, res: Response) => {
        try {
            const prestadorId = req.params.id;
            const { notaIndex, newNota } = req.body;

            const prestador = await localDb.oneOrNone<Prestador>('SELECT * FROM prestadores WHERE id = $1 AND user_id = $2', [prestadorId, req.user.id]);
            if (!prestador) {
                return res.status(404).json({ error: 'Prestador not found' });
            }

            if (notaIndex < 0 || notaIndex >= prestador.notas.length) {
                return res.status(400).json({ error: 'Invalid nota index' });
            }

            prestador.notas[notaIndex] = newNota;

            await localDb.none('UPDATE prestadores SET notas = $1 WHERE id = $2', [prestador.notas, prestadorId]);

            res.json({ message: 'Nota updated successfully' });

        } catch (error) {
            console.error('Error updating nota:', error);
            res.status(500).json({ error: 'Failed to update nota' });
        }
    }
}