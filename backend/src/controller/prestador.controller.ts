import { Request, Response } from 'express';
import { localDb } from '../database';
import { Prestador } from '../models';
import { validatePrestador } from '../middleware';

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
            const { id, userId, prestador: nombrePrestador, localidad, tipo, notas, years } = req.body as Prestador;

            const newPrestador: Prestador = {
                id,
                userId,
                prestador: nombrePrestador,
                localidad,
                tipo,
                notas,
                years
            };

            const validationErrors = validatePrestador(newPrestador);
            if (validationErrors.length > 0) {
                res.status(400).json({ errors: validationErrors });
                return;
            }

            await localDb.none(
                'INSERT INTO prestadores (id, user_id, prestador, localidad, tipo, notas, years) VALUES ($1, $2, $3, $4, $5, $6, CAST($7 AS JSONB[]))',
                [newPrestador.id, newPrestador.userId, newPrestador.prestador, newPrestador.localidad, newPrestador.tipo, newPrestador.notas, newPrestador.years]
            );
            res.status(201).json({ message: 'Prestador created successfully' });
            
        } catch (error) {
            console.error('Error creating prestador:', error);
            res.status(500).json({ error: 'Failed to create prestador' });
        }
    }
}