import { Request, Response, NextFunction } from 'express';
import { localDb } from '../database';
import { User } from '../models';

export const validateCreateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, password, email } = req.body;
        if (!name || !password || !email) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const existingUser = await localDb.oneOrNone<User>('SELECT * FROM users WHERE name = $1 OR email = $2', [name, email]);
        if (existingUser) {
            return res.status(409).json({ error: 'User with the same name or email already exists' });
        }
        if (name.length <= 6) {
            return res.status(400).json({ error: 'Name must be longer than 6 characters' });
        }
        if (password.length < 8 || !/\d/.test(password)) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long and contain at least one digit' });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }
        next();
    } catch (error) {
        console.error('Error during user validation:', error);
        res.status(500).json({ error: 'Failed to validate user' });
    }
};