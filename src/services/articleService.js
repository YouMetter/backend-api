import { pool } from "../database/postgresql/pool.js"
import { ResponseError } from "../exceptions/responseError.js";
import articleRepository from "../repositories/articleRepository.js";
import userRepository from "../repositories/userRepository.js"

const getList = async (user) => {
    const client = await pool.connect()
    try {
        const interets = await userRepository.findInterestByUserId(client, user.id);
        const interestValue = interets.map((interest) => interest.category_id)
        const result = await articleRepository.getList(client, interestValue)
        return result

    } finally {
        client.release()
    }
}

const getDetailById = async (articleId) => {
    const client = await pool.connect()
    try {
        const result = await articleRepository.getDetailById(client, articleId)
        if(!result) {
            throw new ResponseError(404, 'articel tidak ditemukan')
        }
        return result
    } finally {
        client.release()
    }
}

export default {
    getList,
    getDetailById
}