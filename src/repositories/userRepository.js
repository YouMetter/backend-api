import pg from "pg";
const { Client } = pg;

const createUser = async (client, user) => {
    console.log(user);
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

const findInterestByUserId = async (client, userId) => {
    if(client instanceof Client) {
        const query = {
            text: `SELECT category_id FROM interest_users WHERE user_id = $1`,
            values: [userId]
        }

        const result = await client.query(query);
        console.log(result.rows);
        return result.rows
    }
}

const createInterest = async (client, userId, categories) => {
    if (client instanceof Client) {
        const values = [userId]
        const clause = []
        for(let i = 1; i < categories.length + 1; i++) {
            clause.push(`($1, $${i + 1})`)
            values.push(categories[i-1])
        }
        const query = {
            text: `INSERT INTO interest_users(user_id, category_id) VALUES ${clause.join(', ')}`,
            values: values
        }

        await client.query(query);
    }
}

const findUserById = async (client, userId) => {
  const result = await client.query("SELECT * FROM users WHERE id = $1", [
    userId,
  ]);
  return result.rows[0]; // Ambil baris pertama (user), jika ada
};
  
const updateUserById = async (client, userId, userData) => {
  
  const query = `
    UPDATE users
    SET 
      username = $1,
      email = $2,
      name = $3
    WHERE id = $4
    RETURNING *;
  `;
  
  
  const values = [
    userData.username,
    userData.email,
    userData.updated_at,
    userId,
  ];
  
  const result = await client.query(query, values);
  
  return result.rows[0]; // Kembalikan data pengguna yang diperbarui
};

export default {
    createUser,
    findUserByUsername,
    findUserByEmail,
    createInterest,
    findInterestByUserId,
    findUserById,
    updateUserById
}