import { Response } from 'express'
import { AuthRequest } from '../middlewares/authMiddleware'
import { CartService } from '../services/cartService'

export class CartController {
    private cartService = new CartService()

    async getCart(req: AuthRequest, res: Response) {
        try {
            const userId = req.userId!
            const cart = await this.cartService.getCart(userId)
            res.json(cart)
        }   catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }

    async addItem(req: AuthRequest, res: Response) {
        try {
            const { quantity } = req.body
            const userId = req.userId!
            const productId = Number(req.params.productId)
            const cart = await this.cartService.addItem(userId, productId, quantity)
            res.status(201).json(cart)
        } catch (error: any) {
            res.status(404).json({ message: error.message })
        }
    }

    async removeItem(req: AuthRequest, res: Response) {
        try {
            const userId = req.userId!
            const productId = Number(req.params.productId)
            const cart = await this.cartService.removeItem(userId, productId)
            res.json(cart)
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }

    async clearCart(req: AuthRequest, res: Response) {
        try {
            const userId = req.userId!
            const cart = await this.cartService.clearCart(userId)
            res.json(cart)
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }
}