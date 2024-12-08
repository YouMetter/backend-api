import { pool } from "../database/postgresql/pool.js"
import { ResponseError } from "../exceptions/responseError.js"
import userRepository from "../repositories/userRepository.js"
import userValidation from "../validations/userValidation.js"
import { validation } from "../validations/validation.js"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import { v4 as uuidV4} from 'uuid'

const register = async (request) => {
    const requestValid = await validation(userValidation.register, request);
    const client = await pool.connect();

    const [usernameExist, emailExist] = await Promise.all([
        userRepository.findUserByUsername(client, requestValid.username),
        userRepository.findUserByEmail(client, requestValid.email)
    ])
    if(usernameExist) {
        throw new ResponseError(409, 'username sudah ada')
    }
    if(emailExist) {
        throw new ResponseError(409, 'email sudah ada')
    }

    const passwordHash = await bcrypt.hash(requestValid.password, 8);
    const id = uuidV4()
    const user = {
        id,
        username: requestValid.username,
        email: requestValid.email,
        password: passwordHash
    }

    await userRepository.createUser(client, user);
    await client.release()

}

const login = async (request) => {
    const requestValid = await validation(userValidation.login, request);
    
    const client = await pool.connect()
    const user = await userRepository.findUserByUsername(client, requestValid.username);
    await client.release()
    if(!user) {
        throw new ResponseError(404, 'user tidak ditemukan')
    }

    const isPasswordValid = await bcrypt.compare(requestValid.password, user.password);
    if (!isPasswordValid) {
        throw new ResponseError(400, 'username atau password salah')
    }

    const token = jwt.sign({id : user.id, username: user.username}, process.env.JWT_SECRET, {expiresIn : 60*60*2});
    return token;
}

export default {
    register,
    login
}