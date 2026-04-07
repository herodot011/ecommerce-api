import prisma from '../prisma'

export class CartRepository {
    
    async getCart(userId: number) {
        return prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        })
    }

    async createCart(userId: number) {
        return prisma.cart.create({
            data: { userId },
            include: { items: true } 
        })
    }

    async getItem(cartId: number, productId: number) {
        return prisma.cartItem.findUnique({
            where: {
                cartId_productId: { cartId, productId }
            }
        })
    }

    async addItem( cartId: number, productId: number, quantity: number ) {
        return prisma.cartItem.create({
            data: {
                cartId,
                productId,
                quantity
            }
        })
    }

    async updateItem(cartId: number, productId: number, quantity: number) {
        return prisma.cartItem.update({
            where: {
                cartId_productId: {cartId, productId}
            },
            data: { quantity }
        })
    }

    async removeItem(cartId: number, productId: number) {
        return prisma.cartItem.delete({
            where: {
                cartId_productId: { cartId, productId }
            }
        })
    }

    async clearCart(cartId: number) {
        return prisma.cartItem.deleteMany({
            where: { cartId }
        })
    }
}