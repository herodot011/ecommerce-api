import { Router } from 'express'
import { AuthController } from '../controllers/authController'
import { registerValidator } from '../validators/authValidator'
import { validate } from '../middlewares/validate'

const router = Router();
const authController = new AuthController();

router.post('/register', registerValidator, validate, authController.register);
router.post('/login', authController.login);

export default router;