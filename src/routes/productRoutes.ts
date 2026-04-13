import { Router } from 'express'
import { ProductController } from '../controllers/productController';
import { authenticate, requireAdmin } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validate'
import { createProductValidator, updateProductValidator } from '../validators/productValidator'

const productController = new ProductController()
const router = Router()

router.get('/', (req, res) => productController.getAll(req, res))
router.get('/:id', (req, res) => productController.getById(req, res))
router.post('/', authenticate, requireAdmin, createProductValidator, validate, productController.create)
router.put('/:id', authenticate, requireAdmin, updateProductValidator, validate, productController.update)
router.delete('/:id', authenticate, requireAdmin, (req, res) => productController.delete(req, res))

export default router