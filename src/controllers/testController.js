import testService from "../services/testService.js";

const getTestByName = async (req, res, next) => {
    try {
        const testName = req.params.testName;
        const result = await testService.getDetailTestByName(testName);
        res.status(200).json({
            success: true,
            data: result,
            message: 'berhasil mendapatkan data test'
        })
    } catch (error) {
        next(error)
    }
}

const submittedTest = async (req, res, next) => {
    try {
        const testName = req.params.testName
        const request = req.body
        const user = req.user
        await testService.submittedTest(user, testName, request.answers)

        res.status(201).json({
            success: true,
            data: {},
            message: 'berhasil submit jawaban test'
        })
    } catch (error) {
        next(error)
    }
}

const getScoreTestBySubmittedId = async (req, res, next) => {
    try {
        const user = req.user
        const testName = req.params.testName
        const submmitedId = req.params.submittedId

        const result = await testService.getScoreTestBySubmittedId(user, testName, submmitedId)
        res.status(200).json({
            success: true,
            data: result,
            message: 'berhasil mendapatkan score'
        })
    } catch (error) {
        next(error)
    }
}

export default {
    getTestByName,
    submittedTest,
    getScoreTestBySubmittedId
}