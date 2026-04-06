import { Router } from 'express'
import { CategoryController } from '../controllers/categoryController'
import { authenticate, requireAdmin } from '../middlewares/authMiddleware'

const categoryController = new CategoryController()
const router = Router()

router.get('/', (req, res) => categoryController.getAll(req, res))
router.get('/:id', (req, res) => categoryController.getById(req, res))
router.post('/', authenticate, requireAdmin, (req, res) => categoryController.create(req, res))
router.delete('/:id', authenticate, requireAdmin, (req, res) => categoryController.delete(req, res))

export default router