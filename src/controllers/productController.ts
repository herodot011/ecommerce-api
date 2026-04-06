import { Response } from 'express'
import { AuthRequest } from '../middlewares/authMiddleware'
import { ProductService } from '../services/productService'

const productService = new ProductService()

export class ProductController {
    async getAll(req: AuthRequest, res: Response) {
        try {
            const products = await productService.getAll()
            res.json(products)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }

    async getById(req: AuthRequest, res: Response) {
        try {
            const id = Number(req.params.id)
            const product = await productService.getById(id)
            res.json(product)
        } catch (error: any) {
            res.status(404).json({ message: error.message })
        }
    }

    async create(req: AuthRequest, res: Response) {
        try {
            const product = await productService.create(req.body)
            res.status(201).json(product)
        } catch (error: any) {
            res.status(400).json({ message: error.message})
        }
    }

    async update(req: AuthRequest, res: Response) {
        try {
            const id = Number(req.params.id)
            const product = await productService.update(id, req.body)
            res.json(product)
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }

    async delete(req: AuthRequest, res: Response) {
        try {
            const id = Number(req.params.id)
            await productService.delete(id)
            res.json({ message: 'Product is deleted'})
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }
}