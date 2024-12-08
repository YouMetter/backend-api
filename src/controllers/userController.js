import userService from "../services/userService.js"

const register = async (req, res, next) => {
    try {
        const request = req.body
        await userService.register(request);
        res.status(201).json({
            success: true,
            data: {},
            message: "berhasil mendaftarkan akun"
        })
        
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const request = req.body;

        const result = await userService.login(request);

        res.status(200).json({
            success: true,
            data: {
                token: result
            },
            message: 'berhasil membuat akun'
        })
    } catch (error) {
        next(error)
    }
}

export default {
    register,
    login
}