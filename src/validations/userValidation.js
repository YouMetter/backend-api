import Joi from "joi";

const register = Joi.object({
    username: Joi.string().min(8).max(16).required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(4).max(32).required(),
    email: Joi.string().email().required()
});

const login = Joi.object({
    username: Joi.string().min(8).max(16).required(),
    password: Joi.string().min(8).required()
})

export default{
    register,
    login
}