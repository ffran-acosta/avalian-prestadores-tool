import express from 'express';
const router = express.Router();

import { controller } from '../controller';


router.get('/users', controller.getUsers);
router.get('/users/:id', controller.getUserById);
router.post('/create', controller.createUser);
router.delete('/:id', controller.deleteUser);



export default router;
