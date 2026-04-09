import prisma from '../prisma'


export class OrderRepository {
    async findByUser (userId: number) {
        return prisma.order.findMany({
            where: { userId },
            include: {
                items: {
                    include: { product: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        })
    }

    async findById (id: number) {
        return prisma.order.findUnique({
            where: { id },
            include: {
                items: {
                    include: { product: true }
                }
            }
        })
    }

    async findAll() {
        return prisma.order.findMany({
            include: {
                user: {
                    select: { id: true, email: true, name: true }
                },
                items: { 
                    include: { product: true }
                }
            },
            orderBy: { createdAt: 'desc'}
        })
    }

    async updateStatus (id: number, status: string) {
        return prisma.order.update({
            where: { id },
            data: { status: status as any }
        })
    }

    async create (userId: number, total: number, items: {
        productId: number,
        quantity: number,
        price: number
    }[]) {
        return prisma.order.create({
            data: {
                userId, 
                total,
                items: {
                    create: items
                }
            },
            include: {
                items: {
                    include: { product: true }
                }
            }
        })
    }
}