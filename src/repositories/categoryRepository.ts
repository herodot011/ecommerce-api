import prisma from '../prisma'

export class CategoryRepository {
    async findAll() {
        return prisma.category.findMany()
    }

    async findById(id: number) {
        return prisma.category.findUnique({
            where: { id }
        })
    }

    async create(name: string) {
        return prisma.category.create({
            data: { name }
        })
    }

    async delete(id: number) {
        return prisma.category.delete({
            where: { id }
        })
    }
}