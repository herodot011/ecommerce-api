import { Response } from 'express'
import { CategoryService } from '../services/categoryService'
import { AuthRequest } from '../middlewares/authMiddleware'

const categoryService = new CategoryService()

export class CategoryController {
    async getAll(req: AuthRequest, res: Response) {
        try {
            const categories = await categoryService.getAll()
            res.json(categories)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }

    async getById(req: AuthRequest, res: Response) {
        try {
            const id = Number(req.params.id)
            const category = await categoryService.getById(id)
            res.json(category)
        } catch (error: any) {
            res.status(404).json({ message: error.message })
        }
    }

    async create(req: AuthRequest, res: Response) {
        try {
            const { name } = req.body
            const category = await categoryService.create(name)
            res.status(201).json(category)
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }

    async delete(req: AuthRequest, res: Response) {
        try {
            const id = Number(req.params.id)
            await categoryService.delete(id)
            res.json({ message: 'Category deleted' })
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }
}