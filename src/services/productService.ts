import { ProductRepository } from '../repositories/productRepository';

const productRepository = new ProductRepository();

export class ProductService {
    async getAll() {
        return productRepository.findAll()
    }

    async getById(id: number) {
        const product = await productRepository.findById(id);
        if(!product) {
            throw new Error('Product is not found')
        }
        return product
    }

    async create(data: {
        name: string
        description?: string
        price: number
        stock: number
        categoryId: number
    }) {
        return productRepository.create(data);
    }

    async update(id: number, data: {
        name?: string
        description?: string
        price?: number
        stock?: number
        categoryId?: number
    }) {
        const product = await productRepository.findById(id)
        if(!product) {
            throw new Error('Product is not found')
        }
        return productRepository.update(id, data)
    }

    async delete(id: number) {
        const product = await productRepository.findById(id)
        if(!product) {
            throw new Error('Product is not found')
        }
        return productRepository.delete(id)
    }
}