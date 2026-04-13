import { CartRepository } from "../repositories/cartRepository"
import { OrderRepository } from "../repositories/orderRepository"

export class OrderService {
    private cartRepository = new CartRepository()
    private orderRepository = new OrderRepository()

    async getMyOrders (userId: number) {
        return this.orderRepository.findByUser(userId)
    }

    async getOrderById (id: number, userId: number, userRole: string) {
        const order = await this.orderRepository.findById(id)
        if(!order){
            throw new Error('Order not found')
        }
        if (order.userId !== userId && userRole !== 'ADMIN') {
            throw new Error('Access denied')
        }
        return order
    }

    async getAllOrders () {
        return this.orderRepository.findAll()
    }

    async updateStatus(id: number, status: string) {
        const order = await this.orderRepository.findById(id)
        
        if(!order){
            throw new Error('Order not found')
        }
        
        const validStatuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']

        if(!validStatuses.includes(status)) {
            throw new Error('invalid status')
        }

        return this.orderRepository.updateStatus(id, status)
    }

    async create(userId: number) {
        const cart = await this.cartRepository.getCart(userId)

        if(!cart || cart.items.length === 0) {
            throw new Error('Cart is empty')
        }

        let total = 0
        const items = cart.items.map((item: any) => {
            const price = Number(item.product.price)
            total += price * item.quantity
            return {
                productId: item.productId,
                quantity: item.quantity,
                price
            }
        })
        const order = await this.orderRepository.create(userId, total, items)
        await this.cartRepository.clearCart(cart.id)
        return order
    }
}