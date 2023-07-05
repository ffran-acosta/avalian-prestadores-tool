import { Request, Response } from 'express';
import { localDb } from '../database';
import { Prestador } from '../models';

export const notasController = {

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
            const notaIndex = parseInt(req.params.index)
            const { newNota } = req.body;
            const prestador = await localDb.oneOrNone<Prestador>('SELECT * FROM prestadores WHERE id = $1 AND user_id = $2', [prestadorId, req.user.id]);
            if (!prestador) {
                return res.status(404).json({ error: 'Prestador not found' });
            }
            const { notas } = prestador;
            if (notaIndex < 0 || notaIndex >= notas.length) {
                return res.status(400).json({ error: 'Invalid nota index' });
            }
            notas[notaIndex] = newNota;
            await localDb.none('UPDATE prestadores SET notas = $1 WHERE id = $2', [notas, prestadorId]);
            res.json({ message: 'Nota updated successfully' });
        } catch (error) {
            console.error('Error updating nota:', error);
            res.status(500).json({ error: 'Failed to update nota' });
        }
    },

    deleteNota: async (req: Request, res: Response) => {
        try {
            const prestadorId = req.params.id;
            const notaIndex = parseInt(req.params.index);
            const prestador = await localDb.oneOrNone<Prestador>('SELECT * FROM prestadores WHERE id = $1 AND user_id = $2', [prestadorId, req.user.id]);
            if (!prestador) {
                return res.status(404).json({ error: 'Prestador not found' });
            }
            const { notas } = prestador;
            if (notaIndex < 0 || notaIndex >= notas.length) {
                return res.status(400).json({ error: 'Invalid nota index' });
            }
            notas.splice(notaIndex, 1)
            await localDb.none('UPDATE prestadores SET notas = $1 WHERE id = $2', [notas, prestadorId]);
            res.json({ message: 'Nota deleted successfully' });
        } catch (error) {
            console.error('Error deleting nota:', error);
            res.status(500).json({ error: 'Failed to delete nota' });
        }
    }
}