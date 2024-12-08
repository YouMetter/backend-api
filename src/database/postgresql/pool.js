import pg from 'pg';
const {Pool} = pg
import dotenv from 'dotenv'
dotenv.config()

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    connectionTimeoutMillis: 5000,
    max: 20
})

export {
    pool
}