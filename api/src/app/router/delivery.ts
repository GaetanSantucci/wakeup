import { getAllAreas } from '../controller/delivery.js';

// ~ ROUTER CONFIG ~ //
import { Router } from 'express';
const router = Router();

router.get('/delivery', getAllAreas);


export { router };