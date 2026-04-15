import { ProductRepository } from '../repositories/productRepository';
import redis from '../redis';

const productRepository = new ProductRepository();
const CACHE_KEY = 'products:all'
const CACHE_TTL = 60

export class ProductService {
    async getAll() {
        const cached = await redis.get(CACHE_KEY)
        if(cached){
            return JSON.parse(cached)
        }
        const products = await productRepository.findAll()
        await redis.set(CACHE_KEY, JSON.stringify(products), 'EX', CACHE_TTL)
        return products
    }

    async getById(id: number) {
        const key = `product:${id}`
        const cached = await redis.get(key)
        if(cached) {
            return JSON.parse(cached)
        }

        const product = await productRepository.findById(id);

        if(!product) {
            throw new Error('Product is not found')
        }

        await redis.set(key, JSON.stringify(product), 'EX', CACHE_TTL)
        return product
    }

    async create(data: {
        name: string
        description?: string
        price: number
        stock: number
        categoryId: number
    }) {
        await redis.del(CACHE_KEY) 
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
        await redis.del(`product:${id}`)
        await redis.del(CACHE_KEY) 
        return productRepository.update(id, data)
    }

    async delete(id: number) {
        const product = await productRepository.findById(id)
        if(!product) {
            throw new Error('Product is not found')
        }
        await redis.del(`product:${id}`)
        await redis.del(CACHE_KEY)
        return productRepository.delete(id)
    }
}