// ~ ROUTER CONFIG ~ //
import { Router } from 'express';
const router = Router();

import { getAllPlates, getPlateById, createNewPlate } from '../controller/plate.js';

router.get('/plates', getAllPlates);
router.get('/plates/:plateId(\\d+)', getPlateById);
router.post('/plates', createNewPlate);

export { router };