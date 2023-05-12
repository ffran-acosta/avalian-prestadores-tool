import express from 'express';
const router = express.Router();

import { authController, userController } from '../controller';

// crud
router.get('/all', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/create', userController.createUser);
router.delete('/:id', userController.deleteUser);

// login
router.post('/login', authController.login)

export default router;
