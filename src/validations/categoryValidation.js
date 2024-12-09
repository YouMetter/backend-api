import Joi from "joi";

const add = Joi.array().items(Joi.string().min(1).required()).min(1).required()

export default {
    add
}