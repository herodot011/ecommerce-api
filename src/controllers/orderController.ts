import { Response } from 'express'
import { AuthRequest } from '../middlewares/authMiddleware';
import { OrderService } from '../services/orderService'

export class OrderController {
    private orderService = new OrderService()

    async getMyOrders(req: AuthRequest, res: Response) {
        try {
            const userId = req.userId! 
            const orders = await this.orderService.getMyOrders(userId)
            res.json(orders)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }

    async getOrderById(req: AuthRequest, res: Response) {
        try {
            const userId = req.userId!
            const id = Number(req.params.id)
            const userRole = req.userRole!
            const order = await this.orderService.getOrderById(id, userId, userRole)
            res.json(order)
        } catch (error: any) {
            if (error.message === 'Access denied') {
                res.status(403).json({ message: error.message })
            } else {
                res.status(404).json({ message: error.message })
            }
        }
    }

    async getAllOrders(req: AuthRequest, res: Response) {
        try {
            const orders = await this.orderService.getAllOrders()
            res.json(orders)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }

    async updateStatus(req: AuthRequest, res: Response) {
        try {
            const { status } =req.body
            const id = Number(req.params.id)
            const order = await this.orderService.updateStatus(id, status)
            res.json(order)
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }

    async createOrder(req: AuthRequest, res: Response) {
        try {
            const userId = req.userId!
            const order = await this.orderService.create(userId)
            res.status(201).json(order)
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }
}