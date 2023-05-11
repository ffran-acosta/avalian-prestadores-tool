import express from 'express';
const router = express.Router();

import { controller } from '../controller';
router.get('/api/test', controller.test)

export default router;
