import { pool } from "../database/postgresql/pool.js"
import { ResponseError } from "../exceptions/responseError.js";
import testRepository from "../repositories/testRepository.js"
import { v4 as uuid } from "uuid";

const getDetailTestByName = async (name) => {
    const client = await pool.connect()
    try {
        const test = await testRepository.getTestByName(client, name);
        if(!test) {
            throw new ResponseError(404, 'test tidak ditemukan')
        }

        const categories = await testRepository.getListCategoryByTestId(client, test.id)
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
                const options = await testRepository.getListOptionByQuestionId(client, questions[j].id);
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

const submittedTest = async (user, name, answers) => {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')
        console.log(name);
        const test = await testRepository.getTestByName(client,name)
        console.log(test);
        if(!test) {
            throw new ResponseError(404, 'test tidak ditemukan')
        }
        const data = []
        for (let i = 0; i < answers.length; i++) {
            const question = await testRepository.getQuestionByQuestionIdAndTestId(client, answers[i].questionId, test.id)
            if(!question) {
                throw new ResponseError(404, 'soal tidak ditemukan')
            }
            const option = await testRepository.getOptionByOptionIdAndQuestionId(client, answers[i].optionId, answers[i].questionId);
            if(!option) {
                throw new ResponseError(404, 'opsi tidak ada')
            }
            data.push({questionId : question.id, optionId: option.id})
        }

        console.log(data);
        const submittedId = uuid()
        
        await testRepository.createSubmitTest(client, submittedId, user.id, test.id);

        await testRepository.createAnswerQuestion(client, submittedId, data);
        await client.query('COMMIT')
        
    } catch (error) {
        await client.query('ROLLBACK')
        throw error
    } finally {
        await client.release()
    }

}

const getScoreTestBySubmittedId = async (user, name, submittedId) => {
    const client = await pool.connect()
    try {
        const test = await testRepository.getTestByName(client, name)
        if(!test) {
            throw new ResponseError(404, 'test tidak ditemukan')
        }
        const submitted = await testRepository.getSubmittedBySubmmitedIdAndTestId(client, submittedId, test.id)
        if (!submitted) {
            throw new ResponseError(404, 'submmited tidak ditemukan')
        }

        if(submitted.user_id != user.id) {
            throw new ResponseError(403, 'tidak bisa mendapatkan akses')
        }

        const categories = await testRepository.getListCategoryByTestId(client, test.id)
        const data = {}
        for (let i =0; i < categories.length; i++) {
            const detailScoope = await testRepository.getDetailScoopeByScoopeId(client, categories[i].scoope_id)
            const questions = await testRepository.getListQuestionByScoopeIdAndTestId(client, categories[i].scoope_id, test.id, true)
            const subData = {
                score: 0,
                correctAnswer: 0,
                wrongAnswer: 0,
                questionCount: questions.length
            }
            for(let j = 0; j < questions.length; j++) {
                const answer = await testRepository.getAnswerByQuestionIdAndSubmmitedId(client, questions[j].id, submitted.id)
                let isCorrect = false
                console.log('ini jawaban', answer);
                if (answer) {
                    const detailOption = await testRepository.getOptionByOptionIdAndQuestionId(client, answer.option_id, answer.question_id)
                    if(detailOption.name == questions[j].correctOption) {
                        isCorrect = true
                    }
                }
                if(isCorrect){
                    subData.correctAnswer += 1
                } else {
                    subData.wrongAnswer += 1
                }
            }
            const score = (100 / subData.questionCount) * subData.correctAnswer
            subData.score = score
            data[detailScoope.name] = subData
        }
        return data
        
    } catch (error) {
        throw error
    } finally {
        client.release()
    }
}

export default {
    getDetailTestByName,
    submittedTest,
    getScoreTestBySubmittedId
}