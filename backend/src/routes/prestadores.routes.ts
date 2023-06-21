import express from 'express';
import { prestadorController } from '../controller';
const router = express.Router();

// crud
router.get('/all', prestadorController.getPrestadores);

export default router;