
const Joi = require('joi');

class Validate {

    loginSchema = Joi.object({
        email: Joi.string()
            .email({tlds : {allow : false}})
            .trim()
            .min(3)
            .required(),
        password: Joi.string()
            .alphanum()
            .trim()
            .min(8)
            .required(),
    });

    registerSchema = Joi.object({
        email: Joi.string()
            .email({tlds : {allow : false}})
            .trim()
            .min(3)
            .required(),
        first_name: Joi.string()
            .min(3)
            .trim()
            .required(),
        last_name: Joi.string()
            .min(2)
            .trim()
            .required(),
        username: Joi.string()
            .min(3)
            .trim()
            .required(),
        job: Joi.string()
            .min(3)
            .trim()
            .required(),
        age: Joi.number()
            .min(18)
            .required(),
        password : Joi.string()
            .alphanum()
            .trim()
            .min(8)
            .required(),
        confirm_password : Joi.ref('password'),
    })

    updateUserSchema = Joi.object({
        email: Joi.string()
            .email({tlds : {allow : false}})
            .trim()
            .min(3)
            .required(),
        first_name: Joi.string()
            .min(3)
            .trim()
            .required(),
        last_name: Joi.string()
            .min(2)
            .trim()
            .required(),
        username: Joi.string()
            .min(3)
            .trim()
            .required(),
        job: Joi.string()
            .min(3)
            .trim()
            .required(),
        age: Joi.number()
            .min(18)
            .required(),
    })

    updatePasswordSchema = Joi.object({
        password : Joi.string()
            .alphanum()
            .trim()
            .min(8)
            .required(),
        confirm_password : Joi.ref('password'),
    })

    createPostSchema = Joi.object({
        description: Joi.string()
            .trim()
            .allow('')
            .max(1000),
        picture : Joi.string()
            .trim()
            .allow('')
            .max(250),
    })

    createCommentSchema = Joi.object({
        message: Joi.string()
            .trim()
            .max(250)
            .required(),
    })

    updatePostSchema = Joi.object({
        description: Joi.string()
            .trim()
            .max(1000)
            .required(),
    })
}

export default new Validate();