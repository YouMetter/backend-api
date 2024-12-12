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

export default {
    getTestByName
}