import { CartRepository } from "../repositories/cartRepository"

export class CartService {
    private cartRepository = new CartRepository()

    async getCart(userId: number) {
        const cart = await this.cartRepository.getCart(userId)
        return cart
    }

    async addItem(userId: number, productId: number, quantity: number) {
        const cart = await this.getOrCreateCart(userId)

        const existing = await this.cartRepository.getItem( cart.id, productId )
        if (existing) {
            const newQuantity = existing.quantity + quantity
            if (newQuantity <= 0) {
                await this.cartRepository.removeItem(cart.id, productId)
            } else {
                await this.cartRepository.updateItem( cart.id, productId, newQuantity)
            }
        } else {
            await this.cartRepository.addItem( cart.id, productId, quantity)
        }
        return this.cartRepository.getCart(userId)
    }

    async removeItem(userId: number, productId: number) {
        const cart = await this.getOrCreateCart(userId)
        await this.cartRepository.removeItem(cart.id, productId)
        return this.cartRepository.getCart(userId)
    }

    async clearCart(userId: number) {
        const cart = await this.getOrCreateCart(userId)
        await this.cartRepository.clearCart(cart.id)
        return this.cartRepository.getCart(userId)
    }
 
    private async getOrCreateCart(userId: number) {
        const existing = await this.cartRepository.getCart(userId)
        if (existing) return existing
        return this.cartRepository.createCart(userId)
    }
}