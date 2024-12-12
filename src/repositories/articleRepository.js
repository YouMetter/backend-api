import pg from "pg";
import { atricleListModel } from "../validations/transform.js";
const { Client } = pg;

const getList = async (client, interests) => {
    if(client instanceof Client) {
        if (interests.length < 1) {
            const query = {
                text: `SELECT id, category_id, title, description, content, cover_image, created_at FROM articles WHERE 1 = 1`,
                values: []
            }

            const result = await client.query(query);
            return result.rows
        } else {
            const values = []
            const clause = []
            for(let i = 0; i < interests.length ; i++) {
                values.push(interests[i]);
                clause.push(`category_id = $${i+1} `)
            }

            const query = {
                text: `SELECT id, category_id, title, description, content, cover_image, created_at FROM articles WHERE ${clause.join('OR ')}`,
                values: values
            }
            const result = await client.query(query)
            return result.rows.map((value) => atricleListModel(value))
        }
    }
}

const getDetailById = async (client, articleId) => {
    if(client instanceof Client) {
        const query = {
            text: `SELECT id, category_id, title, description, content, cover_image, created_at FROM articles WHERE id = $1`,
            values: [articleId]
        }
    
        const result = await client.query(query);
        const article = result.rows[0]
        if (!article) {
            return undefined
        }
        return {
            id: article.id,
            cetegoryId: article.category_id,
            title: article.title,
            content: article.content,
            coverImage: article.cover_image ?? 'https://google.com/image',
            createdAt: article.created_at
            
        }

    }
}

export default {
    getList,
    getDetailById
}