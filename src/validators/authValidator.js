const Joi = require("joi");

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{8,30}$/)
        .trim()
        .required(),
    confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .trim()
        .required()
        .strip(),
    role: Joi.string(),
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    nickName: Joi.string().trim().required(),
    phoneNumber: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required(),
    gender: Joi.string(),
    birthDate: Joi.date().max("now").min("1-1-1974"),
});
exports.registerSchema = registerSchema;

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

exports.loginSchema = loginSchema;
