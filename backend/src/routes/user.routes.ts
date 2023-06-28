import express from 'express';
const router = express.Router();

import { userController } from '../controller';
import { userValidations } from '../validations';

// auth login
router.post('/auth/login', userController.login)

// crud
router.get('/all', userController.getUsers);
router.get('/checkinfo', userController.getUsersByEmail);
router.get('/:id', userController.getUserById);
router.post('/create', userValidations.validateCreateUser, userController.createUser);
router.delete('/:id', userController.deleteUser);

export default router
