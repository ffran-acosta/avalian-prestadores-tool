import express from 'express';
const router = express.Router();

import { authController, userController } from '../controller';
import { reqAuth } from '../middleware';

// auth login
router.post('/auth/login', authController.login)
router.get('/auth/profile', reqAuth, authController.profile)

// crud
router.get('/all', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/create', userController.createUser);
router.delete('/:id', userController.deleteUser);




export default router;
