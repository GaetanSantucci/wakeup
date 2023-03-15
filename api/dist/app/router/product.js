import { getAllProducts, getProductById, createNewProduct } from '../controller/product.js';
// ~ ROUTER CONFIG ~ //
import { Router } from 'express';
const router = Router();
router.get('/products', getAllProducts);
router.get('/products/:productId', getProductById);
router.post('/products', createNewProduct);
export { router };
