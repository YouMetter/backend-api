import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;
    // console.info(req.headers);
    // console.info(authorization);

    if(!authorization) {
        res.status(401).json({
            success: false,
            error: {
                code: 401,
                status: 'UNAUTHORIZED',
                message: 'belum login'
            }
        })
    }
    // console.log(authorization);
    const token = authorization.split(" ")[1];
    try {
        const jwtDecode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = jwtDecode;
    } catch (error) {
        res.status(401).json({
            success: false,
            error: {
                code: 401,
                status: 'UNAUTHORIZED',
                message: 'belum login'
            }
        })
    }
    next()
}

export {
    authMiddleware
}