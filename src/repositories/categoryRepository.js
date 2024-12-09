import pg from "pg";
const { Client } = pg;

const getByName = async (client, name) => {
    if(client instanceof Client) {
        const query = {
            text: `SELECT id, title FROM categories WHERE title = $1`,
            values: [name] 
        }

        const result = await client.query(query);
        return result.rows[0];
    }
}

export default {
    getByName
}