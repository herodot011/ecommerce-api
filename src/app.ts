console.log("ENV:", process.env.DATABASE_URL)
import express from 'express'
import authRouter from './routes/authRouter'
import productRouter from './routes/productRoutes'
import categoryRouter from './routes/categoryRoutes'
import cartRouter from './routes/cartRoutes'
import orderRouter from './routes/orderRoutes'

const app = express()

app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok' })
})

app.use('/api/auth', authRouter)
app.use('/api/products', productRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/cart', cartRouter)
app.use('/api/orders', orderRouter)

export default app

