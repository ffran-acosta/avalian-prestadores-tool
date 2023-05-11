import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { localDb } from '../database';
import { User } from '../models';


export const controller = {

    getUsers : async (_req: Request, res: Response) => {
        try {
            const users = await localDb.any('SELECT * FROM users');
            res.json(users);
        } catch (error) {
            console.error('Error retrieving test:', error);
            res.status(500).json({ error: 'Failed to retrieve users' });
        }
    },

    getUserById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const user = await localDb.one('SELECT * FROM users WHERE id = $1', id);
            res.json(user);
        } catch (error) {
            console.error('Error retrieving user:', error);
            res.status(500).json({ error: 'Failed to retrieve user' });
        }
    },

    createUser: async (req: Request, res: Response) => {
        try {
            const { name, password, email } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser: User = { name: name, password: hashedPassword, email: email };            
            const result = await localDb.one('INSERT INTO users(name, password, email) VALUES($1, $2, $3) RETURNING id', [
                newUser.name,
                newUser.password,
                newUser.email,
            ]);
            newUser.id = result.id;
            res.json(result);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Failed to create user' });
        }
    },

    // updateUser: async (req: Request, res: Response) => {
    //     try {
    //         const { id } = req.params;
    //         const { name, email } = req.body;
    //         const updatedUser: User = { id: parseInt(id), name, email };
    //         await localDb.none('UPDATE users SET name = $1, email = $2 WHERE id = $3', [updatedUser.name, updatedUser.email, updatedUser.id]);
    //         res.json(updatedUser);
    //     } catch (error) {
    //         console.error('Error updating user:', error);
    //         res.status(500).json({ error: 'Failed to update user' });
    //     }
    // },

    deleteUser: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await localDb.none('DELETE FROM users WHERE id = $1', id);
            res.sendStatus(204);
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ error: 'Failed to delete user' });
        }
    }
}




// import jwt from 'jsonwebtoken';
// const secretKey = 'your-secret-key'; // Replace with your own secret key
// 
// login: async (req: Request, res: Response) => {
//     try {
//         const { name, password } = req.body;
//         // Check if the user exists in the database
//         const user: User | null = await localDb.oneOrNone('SELECT * FROM users WHERE name = $1', name);
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         // Verify the password
//         const passwordMatch = await bcrypt.compare(password, user.password);
//         if (!passwordMatch) {
//             return res.status(401).json({ error: 'Invalid password' });
//         }
//         // Generate a JWT token
//         const token = jwt.sign({ id: user.id, email: user.name }, secretKey, { expiresIn: '1h' });
//         // Return the token to the client
//         res.json({ token });
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).json({ error: 'Failed to login' });
//     }
// }}





