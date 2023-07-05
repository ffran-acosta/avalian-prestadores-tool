import express from 'express';
import { prestadorController } from '../controller';
import { reqAuth } from '../middleware';
import { prestadorValidations } from '../validations';
const router = express.Router();

// prestadores
router.get('/all', reqAuth, prestadorController.getPrestadores);
router.post('/create', reqAuth, prestadorValidations.validateCreatePrestador, prestadorController.createPrestador);

// notes
router.post('/create-note/:id', reqAuth, prestadorController.createNota);
router.put('/update-note/:id/:index', reqAuth, prestadorController.updateNota);
router.delete('/delete-note/:id/:index', reqAuth, prestadorController.deleteNota);

// years

// ref values


export default router;

