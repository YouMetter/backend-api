import pg from "pg";
const { Client } = pg;

const createUser = async (client, user) => {
    const query = {
        text: `INSERT INTO users(id, username, email, password, name) VALUES($1, $2, $3, $4, $5)`,
        values: [user.id, user.username, user.email, user.password, user.name]
    };
    await client.query(query)
}

const findUserByUsername = async (client, username) => {
    if (client instanceof Client) {
        const query = {
            text: `SELECT * FROM users WHERE username = $1`,
            values: [username]
        }
        const result = await client.query(query);
        return result.rows[0]
    }
}

const findUserByEmail = async (client, email) => {
    if (client instanceof Client) {
        const query = {
            text: `SELECT * FROM users WHERE email = $1`,
            values: [email]
        }
        const result = await client.query(query);
        return result.rows[0]
    }
}

export default {
    createUser,
    findUserByUsername,
    findUserByEmail
}