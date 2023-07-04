import express from 'express';
import { prestadorController } from '../controller';
import { reqAuth } from '../middleware';
import { prestadorValidations } from '../validations';
const router = express.Router();

// crud
router.get('/all', reqAuth, prestadorController.getPrestadores);
router.post('/create', reqAuth, prestadorValidations.validateCreatePrestador, prestadorController.createPrestador);
router.post('/create-note', reqAuth, prestadorController.createNota);
router.put('/update-note', reqAuth, prestadorController.updateNota);

export default router;

