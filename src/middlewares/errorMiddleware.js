import { ResponseError } from "../exceptions/responseError.js";
import { statusException } from "../utils/validator.js";

const errorMiddleware = async (err, req, res, next) => {
    console.log(err);

    if(!err) {
        return next()
    }
    const code = err instanceof ResponseError ? err.statusCode : 500;
    const status = err instanceof ResponseError? statusException(err.statusCode) : "INTERNAL SERVER ERROR"

    res.status(code).json({
        success : false,
        error: {
            code: code,
            status: status,
            message: err.message
        }
    })
}

export default errorMiddleware