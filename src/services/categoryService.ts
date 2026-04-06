import { CategoryRepository } from "../repositories/categoryRepository"

const categoryRepository = new CategoryRepository()

export class CategoryService {
    async getAll() {
        return categoryRepository.findAll()
    }

    async getById(id: number) {
        const category = await categoryRepository.findById(id)
        if(!category) {
            throw new Error('Category is not found')
        }
        return category
    }

    async create(name: string) {
        return categoryRepository.create(name)
    }

    async delete(id: number) {
        const category = await categoryRepository.findById(id)
        if(!category) {
            throw new Error('Category is not found')
        }
        return categoryRepository.delete(id)
    }
}