import { Router } from 'express'
import { ProductController } from '../controllers/productController';
import { authenticate, requireAdmin } from '../middlewares/authMiddleware';

const productController = new ProductController()
const router = Router()

router.get('/', (req, res) => productController.getAll(req, res))
router.get('/:id', (req, res) => productController.getById(req, res))
router.post('/', authenticate, requireAdmin, (req, res) => productController.create(req, res))
router.put('/:id', authenticate, requireAdmin, (req, res) => productController.update(req, res))
router.delete('/:id', authenticate, requireAdmin, (req, res) => productController.delete(req, res))

export default router