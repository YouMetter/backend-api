import { pool } from "../database/postgresql/pool.js"
import { ResponseError } from "../exceptions/responseError.js";
import testRepository from "../repositories/testRepository.js"

const getDetailTestByName = async (name) => {
    const client = await pool.connect()
    try {
        const test = await testRepository.getByName(client, name);
        if(!test) {
            throw new ResponseError(404, 'test tidak ditemukan')
        }

        const categories = await testRepository.getListCategoryIdById(client, test.id)
        const data = {
            id: test.id
        }

        for (let i = 0; i < categories.length; i++) {
            const scope = await testRepository.getDetailScoopeByScoopeId(client, categories[i].scoope_id);
            data[scope.name] = {
                id: scope.id,
                name: scope.name,
                questions: []
            };
            const questions = await testRepository.getListQuestionByScoopeIdAndTestId(client, categories[i].scoope_id, test.id);
            for (let j = 0; j < questions.length; j++ ) {
                const options = await testRepository.getListOptionQuestionByQuestionId(client, questions[j].id);
                const result = {
                    id: questions[j].id,
                    question: questions[j].description,
                    options: options
                }
                data[scope.name].questions.push(result);
            }
        }
        return data
    } finally {
        client.release()
    }
}

export default {
    getDetailTestByName
}