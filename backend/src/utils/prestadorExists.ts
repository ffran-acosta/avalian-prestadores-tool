import { db } from '../database';
import { Prestador } from '../models';

export const prestadorExists = async (prestadorId: string, userId: number): Promise<Prestador | null> => {
    const prestadorExists = await db.oneOrNone<Prestador>('SELECT * FROM prestadores WHERE id = $1 AND user_id = $2', [
        prestadorId,
        userId,
    ]);
    return prestadorExists;
};