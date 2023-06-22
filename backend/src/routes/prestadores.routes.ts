import express from 'express';
import { prestadorController } from '../controller';
import { reqAuth } from '../middleware';
const router = express.Router();

// crud
router.get('/all', reqAuth, prestadorController.getPrestadores);

export default router;