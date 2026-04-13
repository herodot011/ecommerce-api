import { Router } from 'express'
import { OrderController } from '../controllers/orderController'
import { authenticate, requireAdmin } from '../middlewares/authMiddleware'
import { createOrderValidator } from '../validators/orderValidator'
import { validate } from '../middlewares/validate'

const orderController = new OrderController()
const router = Router()

router.get('/', authenticate, (req, res) => orderController.getMyOrders(req, res))
router.get('/all', authenticate, requireAdmin, (req, res) => orderController.getAllOrders(req, res))
router.post('/', authenticate, createOrderValidator, validate, orderController.createOrder)
router.get('/:id', authenticate, (req, res) => orderController.getOrderById(req, res))
router.patch('/:id/status', authenticate, requireAdmin, (req, res) => orderController.updateStatus(req, res))

export default router