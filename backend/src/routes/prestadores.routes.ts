import express from 'express';
import { notasController, prestadorController, refValuesController } from '../controller';
import { reqAuth } from '../middleware';
import { prestadorValidations } from '../validations';
const router = express.Router();

// prestadores
router.get('/all', reqAuth, prestadorController.getPrestadores);
router.post('/create', reqAuth, prestadorValidations.validateCreatePrestador, prestadorController.createPrestador);

// notes
router.post('/create-note/:id', reqAuth, notasController.createNota);
router.put('/update-note/:id/:index', reqAuth, notasController.updateNota);
router.delete('/delete-note/:id/:index', reqAuth, notasController.deleteNota);

// years

// ref values
router.get('/ref-values', reqAuth, refValuesController.getRefValues);
router.put('/update-ref-values', reqAuth, refValuesController.updateRefValues);

export default router;

