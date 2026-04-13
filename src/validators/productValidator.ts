import { body } from 'express-validator'

export const createProductValidator = [
    body('name')
        .notEmpty()
        .withMessage('Имя обязательно'),
    
    body('price')
        .isFloat({ min: 0 })
        .withMessage('Цена должна быть числом больше 0'),

    body('stock')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Остаток должен быть целым числом больше 0'),

    body('categoryId')
        .isInt({ min: 1 })
        .withMessage('categoryId обязателен')
]

export const updateProductValidator = [
    body('price')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Цена должна быть числом больше 0'),
    
    body('stock')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Остаток должен быть целым числом больше 0'),
    
    body('categoryId')
        .optional()
        .isInt({ min: 1})
        .withMessage('categoryId должен быть числом')
]