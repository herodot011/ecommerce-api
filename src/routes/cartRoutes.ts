import { Router } from 'express'
import { CartController } from '../controllers/cartController'
import { authenticate } from '../middlewares/authMiddleware'

const cartController = new CartController()
const router = Router()

router.get('/', authenticate, (req, res) => cartController.getCart(req, res))
router.post('/items/:productId', authenticate, (req, res) => cartController.addItem(req, res))
router.put('/items/:productId', authenticate, (req, res) => cartController.updateItem(req, res))
router.delete('/items/:productId', authenticate, (req, res) => cartController.removeItem(req, res))
router.delete('/', authenticate, (req, res) => cartController.clearCart(req, res))

export default router