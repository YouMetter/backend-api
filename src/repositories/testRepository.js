import pg from "pg";
const { Client } = pg;

const getTestByName = async (client, name) => {
    if (client instanceof Client) {
        const query = {
            text: `SELECT id FROM tests WHERE name = $1`,
            values: [name]
        }

        const result = await client.query(query);
        return result.rows[0]
    }
}

const getListCategoryByTestId = async (client, id) => {
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

const getListQuestionByScoopeIdAndTestId = async (client, scoopeId, testId, isCorrect = false) => {
    if (client instanceof Client) {
        const query = {
            text: `SELECT id, description, correct_option, created_at FROM question_tests WHERE test_id = $1 AND scoope_id = $2`,
            values: [testId, scoopeId]
        }
        const result = await client.query(query)
        if(isCorrect) {
            return result.rows.map((value) =>  ({
                id: value.id,
                description: value.description,
                correctOption: value.correct_option,
                createdAt: value.created_at
            }))
        } else {
            return result.rows.map((value) =>  ({
                id: value.id,
                description: value.description,
                createdAt: value.created_at
            }))
        }
    }
}

const getListOptionByQuestionId = async (client, questionId) => {
    if (client instanceof Client) {
        const query = {
            text: `SELECT id, name FROM option_question_tests WHERE question_id = $1`,
            values: [questionId]
        }

        const result = await client.query(query);
        return result.rows
    }
}

const createSubmitTest = async (client, id, userId, testId) => {
    if (client instanceof Client) {
        const query = {
            text: `INSERT INTO submit_tests(id, user_id, test_id) VALUES ($1, $2, $3)`,
            values: [id, userId, testId]
        }

        await client.query(query)
    }
}

const getQuestionByQuestionIdAndTestId = async (client, questionId, testId) => {
    if(client instanceof Client) {
        const query = {
            text: `SELECT id FROM question_tests WHERE id = $1 AND test_id = $2`,
            values: [questionId, testId]
        }

        const result = await client.query(query);
        return result.rows[0]
    }
}

const getOptionByOptionIdAndQuestionId = async (client, optionId, questionId) => {
    if(client instanceof Client) {
        const query = {
            text: `SELECT id, name, question_id FROM option_question_tests WHERE id = $1 AND question_id = $2`,
            values: [optionId, questionId]
        }

        const result = await client.query(query)
        return result.rows[0]
    }
}

const createAnswerQuestion = async (client, submittedId, answers) => {
    if(client instanceof Client ) {
        const clause = [];
        const value = [];
        let index = 2
        for (let i = 2; i < answers.length+2 ; i++) {
            clause.push(`($1, $${index}, $${i+1})`)
            value.push(answers[i-2].questionId)
            value.push(answers[i-2].optionId)
            index = i + 2
        }

        const query = {
            text: `INSERT INTO answer_questions(submitted_id, question_id, option_id) VALUES ${clause.join(', ')}`,
            values: [submittedId, ...value]
        }

        await client.query(query);
    }
}

const getSubmittedBySubmmitedIdAndTestId = async (client, submittedId, testId) => {
    if (client instanceof Client) {
        const query = {
            text : `SELECT id, test_id, user_id FROM submit_tests where id = $1 AND test_id = $2`,
            values: [submittedId, testId]
        }

        const result = await client.query(query)
        return result.rows[0]
    }
}

const getAnswerByQuestionIdAndSubmmitedId = async (client, questionId, submittedId) => {
    if(client instanceof Client) {
        const query = {
            text: `SELECT submitted_id, question_id, option_id FROM answer_questions WHERE question_id = $1 AND submitted_id = $2`,
            values: [questionId, submittedId]
        }

        const result = await client.query(query)
        return result.rows[0]
    }
}

export default {
    getTestByName,
    getListCategoryByTestId,
    getDetailScoopeByScoopeId,
    getListQuestionByScoopeIdAndTestId,
    getListOptionByQuestionId,
    createSubmitTest,
    createAnswerQuestion,
    getOptionByOptionIdAndQuestionId,
    getQuestionByQuestionIdAndTestId,
    getSubmittedBySubmmitedIdAndTestId,
    getAnswerByQuestionIdAndSubmmitedId
}