import prisma from '../prisma';

export class ProductRepository {
    async findAll() {
        return prisma.product.findMany({
            include: { category: true }
        })
    }

    async findById(id: number) {
        return prisma.product.findUnique({
            where: { id },
            include: { category: true }
        })
    }

    async create(data: {
        name: string
        description?: string
        price: number
        stock: number
        categoryId: number
    }) {    
        return prisma.product.create({ data })
    }

    async update(id: number, data: {
        name?: string
        description?: string
        price?: number
        stock?: number
        categoryId?: number
    }) {
        return prisma.product.update({
            where: { id },
            data
        })
    }

    async delete(id: number) {
        return prisma.product.delete({
            where: { id }
        })
    }
}