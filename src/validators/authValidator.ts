import { body } from 'express-validator'

export const registerValidator = [
    body('email')
        .isEmail()
        .withMessage('Неккоректный email'),
    
    body('password')
        .isLength({ min: 6 })
        .withMessage('Пароль минимум 6 символов'),
    
    body('name')
        .notEmpty()
        .withMessage('Имя обязательно')
]