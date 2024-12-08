import { pool } from "../../src/database/postgresql/pool"

const deleteAllUsers = async () => {
    const client = await pool.connect();
    await client.query(`DELETE FROM users WHERE 1 = 1`)
    await client.release();
}

export {
    deleteAllUsers
}