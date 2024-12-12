import pg from "pg";
const { Client } = pg;

const getByName = async (client, name) => {
    if (client instanceof Client) {
        const query = {
            text: `SELECT id FROM tests WHERE name = $1`,
            values: [name]
        }

        const result = await client.query(query);
        return result.rows[0]
    }
}

const getListCategoryIdById = async (client, id) => {
    if(client instanceof Client) {
        const query = {
            text: `SELECT scoope_id FROM category_tests WHERE test_id = $1`,
            values: [id]
        }

        const result = await client.query(query);
        return result.rows
    }
}

const getDetailScoopeByScoopeId = async (client, id) => {
    if (client instanceof Client) {
        const query = {
            text: `SELECT id, name FROM scoope_question_tests WHERE id = $1`,
            values: [id]
        }

        const result = await client.query(query);
        return result.rows[0]
    }
}

const getListQuestionByScoopeIdAndTestId = async (client, scoopeId, testId) => {
    if (client instanceof Client) {
        const query = {
            text: `SELECT id, description, correct_option, created_at FROM question_tests WHERE test_id = $1 AND scoope_id = $2`,
            values: [testId, scoopeId]
        }
        const result = await client.query(query)
        return result.rows.map((value) =>  ({
            id: value.id,
            description: value.description,
            createdAt: value.created_at
        }))
    }
}

const getListOptionQuestionByQuestionId = async (client, questionId) => {
    if (client instanceof Client) {
        const query = {
            text: `SELECT id, name FROM option_question_tests WHERE question_id = $1`,
            values: [questionId]
        }

        const result = await client.query(query);
        return result.rows
    }
}

export default {
    getByName,
    getListCategoryIdById,
    getDetailScoopeByScoopeId,
    getListQuestionByScoopeIdAndTestId,
    getListOptionQuestionByQuestionId
}