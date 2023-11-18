// ~ ROUTER CONFIG ~ //
import { Router } from 'express'
const router = Router()

import {
  getAllProducts,
  getProductById,
  createNewProduct,
} from '../controller/product.js'

router.get('/products', getAllProducts)
router.get('/products/:plateId(\\d+)', getProductById)
router.post('/products', createNewProduct)

export { router }
