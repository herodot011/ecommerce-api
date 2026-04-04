import express from 'express';
import authRouter from './routes/authRouter';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
})

app.use('/api/auth', authRouter);

export default app;

