import express from 'express';
import dotenv from 'dotenv';
import { gracefulShutdown } from './utils/gracefulShutdown.js';
import { pool } from './database/postgresql/pool.js';
import cors from 'cors'
import { apiPublic } from './routers/api-public.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

dotenv.config()

const app = express();
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json({
        success: true,
        data: {},
        message: 'data berhasil dikirim'
    })
})

app.use(apiPublic);

app.use(errorMiddleware)

process.on('SIGINT', () => { gracefulShutdown(pool)});
process.on('SIGTERM', () => { gracefulShutdown(pool)})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})

export default app