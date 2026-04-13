import { body } from 'express-validator'

export const createOrderValidator = [
    body('items')
        .isArray({ min: 1 })
        .withMessage('Items должен быть непустым массивом'),

    body('items.*.productId')
        .isInt({ min: 1 })
        .withMessage('ProductId должен быть числом'),
    
    body('items.*.quantity')
        .isInt({ min: 1 })
        .withMessage('Quantity минимум 1')
]