import express from 'express';
import multer from 'multer';
import { sheetController, notasController, prestadorController, refValuesController, yearController } from '../controller';
import { reqAuth } from '../middleware';
import { validateCreatePrestador } from '../validations';

const router = express.Router();
const upload = multer({ dest: 'uploads/' })

// prestadores
// router.post('/import-prestadores', reqAuth, upload.single('file'), prestadorController.importXSLX);
router.get('/all', reqAuth, prestadorController.getPrestadores);
router.post('/create', reqAuth, validateCreatePrestador, prestadorController.createPrestador);
router.put('/update/:id', reqAuth, prestadorController.updatePrestador);
router.delete('/delete/:id', reqAuth, prestadorController.deletePrestador);


// notes
router.post('/create-note/:id', reqAuth, notasController.createNota);
router.put('/update-note/:id/:index', reqAuth, notasController.updateNota);
router.delete('/delete-note/:id/:index', reqAuth, notasController.deleteNota);

// years
router.post('/create-year/:id', reqAuth, yearController.createYear);
router.put('/update-years/:id', reqAuth, yearController.updateYear);
router.delete('/delete-year/:id/:year', reqAuth, yearController.deleteYear);

// ref values
router.get('/ref-values', reqAuth, refValuesController.getRefValues);
router.put('/update-ref-values', reqAuth, refValuesController.updateRefValues);

//import/export
router.get('/export-prestadores', reqAuth, sheetController.exportCSV);
router.post('/import-prestadores', reqAuth, upload.single('file'), sheetController.importXSLX);


export default router;


upload.single('file')