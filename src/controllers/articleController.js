import articleService from "../services/articleService.js"

const getList = async (req, res, next) => {
    try {
        const user = req.user
        const result = await articleService.getList(user)
        res.status(200).json({
            success: true,
            data: result,
            message: 'berhasil mengambil list articel'
        })
    } catch (error) {
        next(error)
    }
}

const getDetailById = async (req, res, next) => {
    try {
        const articleId = req.params.articleId
        console.log(req.params);
        const result = await articleService.getDetailById(articleId)
        res.status(200).json({
            success: true,
            data: result,
            message: 'berhasil mengambil detail articel'
        })
    } catch (error) {
        next(error)
    }
}

export default{
    getList,
    getDetailById
}