import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { localDb } from '../database';
import { User } from '../models';
import { encryptPassword, comparePasswords, generateJwtSecret } from '../utils';

export const userController = {
    getUsers: async (_req: Request, res: Response) => {
        try {
            const users: User[] = await localDb.any('SELECT * FROM users');
            res.json(users);
        } catch (error) {
            console.error('Error retrieving users:', error);
            res.status(500).json({ error: 'Failed to retrieve users' });
        }
    },

    getUsersByEmail: async (_req: Request, res: Response) => {
        try {
            const users = await localDb.any<{ name: string; email: string }>('SELECT name, email FROM users');
            res.json(users);
        } catch (error) {
            console.error('Error retrieving users:', error);
            res.status(500).json({ error: 'Failed to retrieve users' });
        }
    },

    getUserById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const user = await localDb.one<User>('SELECT * FROM users WHERE id = $1', id);
            res.json(user);
        } catch (error) {
            console.error('Error retrieving user:', error);
            res.status(500).json({ error: 'Failed to retrieve user' });
        }
    },

    login: async (req: Request, res: Response) => {
        try {
            const { name, password } = req.body;
            const user = await localDb.oneOrNone<User>('SELECT * FROM users WHERE name = $1', [name]);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const passwordMatch = await comparePasswords(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid password' });
            }
            const jwtSecret = generateJwtSecret();
            const token: string = jwt.sign({ id: user.id, user: user.name }, jwtSecret, { expiresIn: '1d' });
            res.json({ user, token });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ error: 'Failed to login' });
        }
    },

    createUser: async (req: Request, res: Response) => {
        try {
            const { name, password, email } = req.body;
            const hashedPassword = await encryptPassword(password);
            const newUser: User = { name, password: hashedPassword, email };
            const result = await localDb.one<{ id: number }>(
                'INSERT INTO users(name, password, email) VALUES($1, $2, $3) RETURNING id',
                [newUser.name, newUser.password, newUser.email]
            );
            newUser.id = result.id;
            res.json(result);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Failed to create user' });
        }
    },

    deleteUser: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await localDb.none('DELETE FROM users WHERE id = $1', id);
            res.sendStatus(204);
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ error: 'Failed to delete user' });
        }
    },
};
