import Joi from "joi";

export const signupSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required(),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required(),
});

export const otpSchema = Joi.object({
	email: Joi.string().email().required(),
	otp: Joi.string().length(6).required(),
});