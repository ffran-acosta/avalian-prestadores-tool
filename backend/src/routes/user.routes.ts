import express from 'express';
const router = express.Router();

import { userController } from '../controller';

// auth login
router.post('/auth/login', userController.login)

// crud
router.get('/all', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/create', userController.createUser);
router.delete('/:id', userController.deleteUser);

export default router
