import express from 'express'
import authRouter from './routes/authRouter'
import productRouter from './routes/productRoutes'
import categoryRouter from './routes/categoryRoutes'

const app = express()

app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok' })
})

app.use('/api/auth', authRouter)
app.use('/api/products', productRouter)
app.use('/api/categories', categoryRouter)

export default app

