import { Request, Response } from 'express';

import { User } from '../models';
import { localDb } from '../database';

import jwt from 'jsonwebtoken';
import { comparePasswords, generateJwtSecret } from '../utils';

export const authController = {

    login: async (req: Request, res: Response) => {
        try {
            const { name, password } = req.body;
            // Check if the user exists in the database
            const user = await localDb.oneOrNone<User>('SELECT * FROM users WHERE name = $1', [name]);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            // Compare the provided password with the stored hash
            const passwordMatch = await comparePasswords(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid password' });
            }
            // Generate a JWT token with a self-generated secret key
            const jwtSecret = generateJwtSecret();
            const token: string = await jwt.sign({ id: user.id, user: user.name }, jwtSecret, { expiresIn: 60 * 60 * 24 });
            // Return the token to the client
            res.json({ user, token })
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ error: 'Failed to login' });
        }
    },

    profile: async (req: Request, res: Response) => {
        // req.user
        return res.json('soy el perfil')
    },

    logout: async (_req: Request, res: Response) => {
        try {
            // Clear any session data or perform any logout operations

            // Clear session cookies
            res.clearCookie('session');
            // Invalidate user's token
            // For example, you can remove the token from the client-side or add it to a token blacklist
            // Clear user-related data from local storage
            localStorage.removeItem('token');
            localStorage.removeItem('userData');

            // Redirect the user to the login page or display a logout success message
            res.json({ message: 'Logout successful' });
        } catch (error) {
            console.error('Error during logout:', error);
            res.status(500).json({ error: 'Failed to logout' });
        }
    }
}